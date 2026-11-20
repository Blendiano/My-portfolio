// Contact form — validation, submission and status messaging.
//
// The form posts to the serverless function in /api/contact.js, which forwards
// the message to the site owner's inbox. A message is only ever reported as
// sent when the server confirms delivery; every failure path shows an honest
// error and keeps what the visitor typed so they can try again.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELD_RULES = {
  name: {
    required: 'Enter your full name.',
    max: 120,
    maxMessage: 'Keep your full name under 120 characters.'
  },
  email: {
    required: 'Enter your email address.',
    pattern: EMAIL_PATTERN,
    patternMessage: 'Enter a valid email address, like name@example.com.',
    max: 254,
    maxMessage: 'Keep your email address under 254 characters.'
  },
  subject: {
    required: 'Enter a subject.',
    max: 150,
    maxMessage: 'Keep the subject under 150 characters.'
  },
  message: {
    required: 'Enter a message.',
    max: 5000,
    maxMessage: 'Keep the message under 5000 characters.'
  }
};

const NETWORK_ERROR_MESSAGE = 'Sorry — we could not reach the server. Check your connection and try again, or email me directly.';
const GENERIC_ERROR_MESSAGE = 'Sorry — your message could not be sent. Please try again, or email me directly.';
const MISSING_ENDPOINT_MESSAGE = 'Sorry — the contact form is not available right now. Please email me directly and I will get back to you.';
const SUCCESS_MESSAGE = "Thanks — your message is on its way. I'll get back to you soon.";
const INVALID_MESSAGE = 'Please fill in the fields below and try again.';

// How long the button keeps showing its confirmed state before returning to
// its resting label, so the form is ready for another message.
const SUCCESS_STATE_DURATION = 2600;

// How long the floating notification stays on screen before it leaves again.
const NOTIFICATION_DURATION = 5000;

// Matches the exit transition in components.css. The removal timer always runs
// even if the transition never fires (reduced motion, background tab, etc.).
const NOTIFICATION_EXIT_DURATION = 450;

const CHECK_ICON = '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2 6.4l2.7 2.7L10 3.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CLOSE_ICON = '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M1.6 1.6l8.8 8.8M10.4 1.6l-8.8 8.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

/**
 * Shows the floating notification bar. It rises over the page, sits for five
 * seconds, then leaves again on its own (or as soon as it is dismissed).
 */
function showNotification(message) {
  // Only one notification at a time — a second submission replaces the first.
  document.querySelectorAll('.toast').forEach((existing) => existing.remove());

  const toast = document.createElement('div');
  toast.className = 'toast';
  // The single success confirmation. It is also the live region that announces
  // the result, so the form does not display a second copy of the message.
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.setAttribute('aria-atomic', 'true');

  const icon = document.createElement('span');
  icon.className = 'toast__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = CHECK_ICON;

  const text = document.createElement('p');
  text.className = 'toast__message';
  text.textContent = message;

  const close = document.createElement('button');
  close.className = 'toast__close';
  close.type = 'button';
  close.setAttribute('aria-label', 'Dismiss notification');
  close.innerHTML = CLOSE_ICON;

  toast.append(icon, text, close);
  document.body.appendChild(toast);

  // Two frames, so the browser has painted the resting state before the
  // entrance transition starts.
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => toast.classList.add('toast--visible'));
  });

  let hideTimer = null;
  let removeTimer = null;
  let dismissed = false;

  function dismiss() {
    // Both the timer and the close button can call this — only run once.
    if (dismissed) return;
    dismissed = true;

    window.clearTimeout(hideTimer);
    window.clearTimeout(removeTimer);
    document.removeEventListener('keydown', onKeydown);
    close.removeEventListener('click', dismiss);

    toast.classList.remove('toast--visible');

    // The safety timer guarantees the node leaves the DOM even when the exit
    // transition is skipped, so the bar can never get stuck on the page.
    removeTimer = window.setTimeout(() => toast.remove(), NOTIFICATION_EXIT_DURATION);
  }

  function onKeydown(event) {
    if (event.key === 'Escape') dismiss();
  }

  hideTimer = window.setTimeout(dismiss, NOTIFICATION_DURATION);
  close.addEventListener('click', dismiss);
  document.addEventListener('keydown', onKeydown);
}

function validateField(field) {
  const value = field.value.trim();
  const rules = FIELD_RULES[field.name];
  if (!rules) return '';

  if (!value) return rules.required;
  if (rules.pattern && !rules.pattern.test(value)) return rules.patternMessage;
  if (rules.max && value.length > rules.max) return rules.maxMessage;
  return '';
}

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const statusEl = document.getElementById('contact-form-status');
  const submitButton = form.querySelector('button[type="submit"]');
  const submitLabel = submitButton
    ? submitButton.querySelector('.contact-form__submit-label')
    : null;
  const restingLabel = submitLabel ? submitLabel.textContent.trim() : 'Send Message';
  const endpoint = form.dataset.endpoint || '/api/contact';

  // Lets the button go back to its resting label after a confirmed send.
  let successTimer = null;
  // True only while a request is genuinely on its way.
  let isSubmitting = false;

  // Only the four real fields take part in validation — the honeypot does not.
  const fields = Array.from(form.querySelectorAll('.contact-form__input[name]'))
    .filter((input) => Boolean(FIELD_RULES[input.name]));

  function setFieldError(input, message) {
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) errorEl.textContent = message;
    if (message) {
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }
  }

  function setStatus(message, state) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.remove('contact-form__status--success', 'contact-form__status--error');
    if (state) statusEl.classList.add(`contact-form__status--${state}`);
  }

  function focusStatus() {
    if (statusEl && typeof statusEl.focus === 'function') statusEl.focus();
  }

  /**
   * Drives the button through its three states:
   *   idle    — the resting "Send Message" label
   *   loading — a spinner while the message is on its way
   *   success — a tick and a confirmed label once the server accepts it
   */
  function setButtonState(state) {
    if (!submitButton) return;

    submitButton.classList.remove('is-loading', 'is-success');
    submitButton.disabled = false;
    if (submitLabel) submitLabel.textContent = restingLabel;

    if (state === 'loading') {
      submitButton.classList.add('is-loading');
      submitButton.disabled = true;
      if (submitLabel) submitLabel.textContent = 'Sending…';
    } else if (state === 'success') {
      // The confirmed state never blocks the button — the form stays usable
      // the moment the message is away.
      submitButton.classList.add('is-success');
      if (submitLabel) submitLabel.textContent = 'Message Sent';
    }
  }

  // Plain-HTML fallback: the endpoint redirects back with the outcome.
  function showFallbackStatus() {
    const state = new URLSearchParams(window.location.search).get('contact');
    if (!state) return;

    if (state === 'sent') {
      setStatus(SUCCESS_MESSAGE, 'success');
      // The no-JavaScript path has no floating bar, so the inline confirmation
      // clears itself after the same five seconds.
      window.setTimeout(() => {
        if (statusEl && statusEl.textContent === SUCCESS_MESSAGE) setStatus('');
      }, NOTIFICATION_DURATION);
    } else {
      setStatus(GENERIC_ERROR_MESSAGE, 'error');
    }

    // Keep the URL clean so the message is not replayed on refresh.
    window.history.replaceState({}, '', `${window.location.pathname}#contact`);
    focusStatus();
  }

  fields.forEach((input) => {
    // Clear the error as soon as the field becomes valid again.
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') !== 'true') return;
      if (!validateField(input)) setFieldError(input, '');
    });

    // Give feedback on blur, but do not complain about a field that is simply empty.
    input.addEventListener('blur', () => {
      if (!input.value.trim()) return;
      const message = validateField(input);
      if (message) setFieldError(input, message);
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Ignore a second submission while the first one is still in flight.
    if (isSubmitting) return;

    setStatus('');

    let firstInvalid = null;
    fields.forEach((input) => {
      const message = validateField(input);
      setFieldError(input, message);
      if (message && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      setStatus(INVALID_MESSAGE, 'error');
      firstInvalid.focus();
      return;
    }

    const payload = {};
    fields.forEach((input) => {
      payload[input.name] = input.value.trim();
    });

    const honeypot = form.querySelector('input[name="website"]');
    if (honeypot) payload.website = honeypot.value;

    if (successTimer) {
      window.clearTimeout(successTimer);
      successTimer = null;
    }

    setButtonState('loading');
    form.setAttribute('aria-busy', 'true');
    isSubmitting = true;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get('content-type') || '';
      const result = contentType.includes('application/json')
        ? await response.json().catch(() => ({}))
        : {};

      if (!response.ok || !result.ok) {
        // Surface the server's field errors so the visitor can fix them in place.
        let firstInvalid = null;
        if (result.errors) {
          fields.forEach((input) => {
            if (result.errors[input.name]) {
              setFieldError(input, result.errors[input.name]);
              if (!firstInvalid) firstInvalid = input;
            }
          });
        }

        // A missing endpoint answers with an error page rather than JSON, so
        // say so plainly instead of blaming the visitor's message.
        let message = result.message;
        if (!message) {
          message = response.status === 404 ? MISSING_ENDPOINT_MESSAGE : GENERIC_ERROR_MESSAGE;
          console.warn(`Contact form request failed: HTTP ${response.status}`);
        }

        setStatus(message, 'error');
        setButtonState('idle');
        if (firstInvalid) {
          firstInvalid.focus();
        } else {
          focusStatus();
        }
        return;
      }

      const successMessage = result.message || SUCCESS_MESSAGE;

      form.reset();
      fields.forEach((input) => setFieldError(input, ''));
      // Show one confirmation only. The floating bar carries the message,
      // announces it to screen readers, and leaves on its own after five
      // seconds, so the inline status stays empty for a successful send.
      setStatus('');
      setButtonState('success');
      showNotification(successMessage);

      // Let the confirmed state settle, then hand the button back so the
      // visitor can send another message if they want to.
      successTimer = window.setTimeout(() => {
        successTimer = null;
        setButtonState('idle');
      }, SUCCESS_STATE_DURATION);
    } catch (error) {
      setStatus(NETWORK_ERROR_MESSAGE, 'error');
      setButtonState('idle');
      focusStatus();
    } finally {
      isSubmitting = false;
      form.removeAttribute('aria-busy');
    }
  });

  showFallbackStatus();
}
