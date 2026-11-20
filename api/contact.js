/**
 * Contact form endpoint — Vercel serverless function.
 *
 * The portfolio contact form posts here. This function validates the payload
 * and sends the message to the site owner's inbox over SMTP with Nodemailer.
 * It only reports success once the SMTP server has accepted the message — the
 * form never tells a visitor that a message was sent when it was not.
 *
 * Environment variables (Vercel → Project → Settings → Environment Variables):
 *   SMTP_HOST           Required. e.g. smtp.gmail.com, smtp.office365.com,
 *                       smtp-mail.outlook.com, smtp.yahoo.com
 *   SMTP_PORT           Optional. Defaults to 587 (STARTTLS). Use 465 for
 *                       implicit TLS.
 *   SMTP_SECURE         Optional. "true" to force TLS-on-connect. Defaults to
 *                       true on port 465 and false elsewhere.
 *   SMTP_USER           Required. The mailbox that sends the notification.
 *   SMTP_PASSWORD       Required. The account password or, where the provider
 *                       requires it, an app password.
 *   CONTACT_TO_EMAIL    Optional. Where the messages should land. Defaults to
 *                       SMTP_USER.
 *   CONTACT_FROM_EMAIL  Optional. The sender shown on the notification.
 *                       Defaults to SMTP_USER.
 *
 * For Gmail and Outlook, use an app password rather than the account
 * password — see .env.example for the steps.
 */

const nodemailer = require('nodemailer');

const REQUEST_TIMEOUT_MS = 20000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Upper bounds keep a single request from pushing an oversized email.
const FIELD_LIMITS = {
  name: 120,
  email: 254,
  subject: 150,
  message: 5000
};

const MESSAGES = {
  invalid: 'Please fill in the fields below and try again.',
  failed: 'Your message could not be sent right now. Please try again in a moment, or email me directly.',
  unconfigured: 'The contact form is not configured yet. Please email me directly instead.',
  sent: "Thanks — your message is on its way. I'll get back to you soon."
};

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));
}

function parseBody(body) {
  if (!body) return {};
  if (typeof body === 'object') return body;
  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (error) {
      return {};
    }
  }
  return {};
}

function validate(payload) {
  const values = {
    name: clean(payload.name),
    email: clean(payload.email),
    subject: clean(payload.subject),
    message: clean(payload.message)
  };

  const errors = {};

  if (!values.name) {
    errors.name = 'Enter your full name.';
  } else if (values.name.length > FIELD_LIMITS.name) {
    errors.name = `Keep your full name under ${FIELD_LIMITS.name} characters.`;
  }

  if (!values.email) {
    errors.email = 'Enter your email address.';
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Enter a valid email address, like name@example.com.';
  } else if (values.email.length > FIELD_LIMITS.email) {
    errors.email = `Keep your email address under ${FIELD_LIMITS.email} characters.`;
  }

  if (!values.subject) {
    errors.subject = 'Enter a subject.';
  } else if (values.subject.length > FIELD_LIMITS.subject) {
    errors.subject = `Keep the subject under ${FIELD_LIMITS.subject} characters.`;
  }

  if (!values.message) {
    errors.message = 'Enter a message.';
  } else if (values.message.length > FIELD_LIMITS.message) {
    errors.message = `Keep the message under ${FIELD_LIMITS.message} characters.`;
  }

  return { values, errors };
}

function buildEmail({ name, email, subject, message }) {
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    '',
    message
  ].join('\n');

  const html = [
    '<p><strong>New message from the portfolio contact form</strong></p>',
    '<table cellpadding="0" cellspacing="0" style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #171717;">',
    `<tr><td style="padding: 4px 12px 4px 0; color: #666666;">Name</td><td style="padding: 4px 0;">${escapeHtml(name)}</td></tr>`,
    `<tr><td style="padding: 4px 12px 4px 0; color: #666666;">Email</td><td style="padding: 4px 0;">${escapeHtml(email)}</td></tr>`,
    `<tr><td style="padding: 4px 12px 4px 0; color: #666666;">Subject</td><td style="padding: 4px 0;">${escapeHtml(subject)}</td></tr>`,
    '</table>',
    `<p style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #171717; white-space: pre-wrap;">${escapeHtml(message)}</p>`
  ].join('');

  return { subject: `Portfolio contact — ${subject}`, text, html };
}

/** Reads the SMTP settings from the environment. */
function readConfig() {
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE.trim().toLowerCase() === 'true'
    : port === 465;

  return {
    host: clean(process.env.SMTP_HOST),
    port,
    secure,
    user: clean(process.env.SMTP_USER),
    pass: process.env.SMTP_PASSWORD || '',
    to: clean(process.env.CONTACT_TO_EMAIL) || clean(process.env.SMTP_USER),
    from: clean(process.env.CONTACT_FROM_EMAIL) || clean(process.env.SMTP_USER)
  };
}

function isConfigured(config) {
  return Boolean(config.host && config.user && config.pass && config.to);
}

/**
 * Turns a raw Nodemailer/SMTP error into a line the owner can act on.
 * The full error is always logged too — this just names the likely cause.
 */
function describeSmtpError(error) {
  const text = `${error.code || ''} ${error.message || ''}`;
  if (/EAUTH|535|Invalid login|Invalid credentials|authentication failed/i.test(text)) {
    return 'SMTP authentication failed — check SMTP_USER and SMTP_PASSWORD. Gmail (and most providers) need an app password, not the account password.';
  }
  if (/ETIMEDOUT|ECONNREFUSED|ENOTFOUND|EAI_AGAIN|timeout|getaddrinfo/i.test(text)) {
    return 'Could not reach the SMTP server — check SMTP_HOST, SMTP_PORT and whether the provider blocks direct SMTP.';
  }
  return 'The SMTP server rejected the message.';
}

function createTransport(config) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass
    },
    // Fail fast rather than leaving a visitor waiting on a dead server
    connectionTimeout: REQUEST_TIMEOUT_MS,
    greetingTimeout: REQUEST_TIMEOUT_MS,
    socketTimeout: REQUEST_TIMEOUT_MS
  });
}

/** The visitor is on the plain-HTML fallback path when they posted without JavaScript. */
function expectsJson(request) {
  const accept = request.headers.accept || '';
  const contentType = request.headers['content-type'] || '';
  return accept.includes('application/json') || contentType.includes('application/json');
}

function respond(request, response, status, body) {
  if (expectsJson(request)) {
    return response.status(status).json(body);
  }
  // No JavaScript: send the visitor back to the page with the outcome.
  const query = body.ok ? 'contact=sent' : 'contact=failed';
  return response.redirect(303, `/?${query}#contact`);
}

module.exports = async function handler(request, response) {
  // A GET is a health check — it verifies the SMTP credentials without
  // sending a message, so the setup can be confirmed from a browser.
  if (request.method === 'GET') {
    const config = readConfig();
    if (!isConfigured(config)) {
      return response.status(503).json({
        ok: false,
        configured: false,
        message: 'The contact form is not configured yet.'
      });
    }

    try {
      await createTransport(config).verify();
      return response.status(200).json({
        ok: true,
        configured: true,
        message: 'SMTP connection verified.'
      });
    } catch (error) {
      console.error('SMTP verification failed:', error.message);
      console.error(describeSmtpError(error));
      return response.status(502).json({
        ok: false,
        configured: true,
        message: 'SMTP connection failed — check the server logs.'
      });
    }
  }

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return respond(request, response, 405, {
      ok: false,
      message: 'This endpoint only accepts message submissions.'
    });
  }

  const payload = parseBody(request.body);

  // Honeypot — the field is hidden from people, so only automated scripts fill it.
  if (clean(payload.website)) {
    console.warn('Contact form submission rejected by the honeypot field.');
    return respond(request, response, 400, {
      ok: false,
      message: 'Your message could not be sent. Please email me directly instead.'
    });
  }

  const { values, errors } = validate(payload);
  if (Object.keys(errors).length > 0) {
    return respond(request, response, 400, {
      ok: false,
      message: MESSAGES.invalid,
      errors
    });
  }

  const config = readConfig();

  if (!isConfigured(config)) {
    console.error('Contact form is not configured — set SMTP_HOST, SMTP_USER and SMTP_PASSWORD.');
    return respond(request, response, 503, {
      ok: false,
      message: MESSAGES.unconfigured
    });
  }

  const email = buildEmail(values);

  try {
    const info = await createTransport(config).sendMail({
      from: config.from,
      to: config.to,
      replyTo: values.email,
      subject: email.subject,
      text: email.text,
      html: email.html
    });

    // Some SMTP servers resolve sendMail() while rejecting the recipient. That
    // is not a delivery, so never report success in that case.
    const accepted = Array.isArray(info.accepted) ? info.accepted : [];
    const rejected = Array.isArray(info.rejected) ? info.rejected : [];

    if (rejected.length > 0 || accepted.length === 0) {
      console.error('Contact form delivery rejected:', { accepted, rejected });
      return respond(request, response, 502, {
        ok: false,
        message: MESSAGES.failed
      });
    }

    console.log('Contact form message sent:', info.messageId || 'no id returned');
    return respond(request, response, 200, {
      ok: true,
      message: MESSAGES.sent
    });
  } catch (error) {
    // Logged in full server-side; the visitor only gets a readable message.
    console.error('Contact form delivery failed:', error.message);
    console.error(describeSmtpError(error));
    return respond(request, response, 502, {
      ok: false,
      message: MESSAGES.failed
    });
  }
};
