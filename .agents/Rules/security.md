---
trigger: always_on
---

# Security

## 1. Purpose

This document defines security and privacy requirements for the portfolio MVP.

The portfolio is primarily a static frontend and should not introduce unnecessary security complexity.

---

## 2. Security Principles

Follow:

- Least privilege
- Data minimization
- Secure defaults
- Input validation
- No exposed secrets
- No unnecessary data collection

---

## 3. Secrets

Never place the following inside public source files:

- API keys
- Passwords
- Authentication tokens
- Private credentials
- Database credentials
- Secret environment variables
- Private service keys

Do not commit `.env` files containing secrets.

Use `.gitignore` appropriately.

---

## 4. Environment Variables

If environment variables become necessary:

- `.env`
- `.env.local`

must not be committed when they contain secrets.

Use `.env.example` for documenting required variable names without secret values.

Example:

```text
CONTACT_SERVICE_API_KEY=
```

Never place the real key in the example file.

---

## 5. External Links

External links should:

- Use valid URLs
- Clearly identify their destination
- Avoid misleading labels

When using `target="_blank"`, also use `rel="noopener noreferrer"` when appropriate.

---

## 6. User Input

If the portfolio contains forms, validate:

- Required fields
- Email format
- Input length
- Unexpected input

Do not trust client-side validation alone if data is later processed by a backend service.

---

## 7. Contact Form

Never tell a user that a message has been successfully delivered unless an actual delivery mechanism confirms it.

Correct:

```text
Your message has been submitted.
```

only when submission actually occurred.

If the form cannot submit:

```text
We couldn't send your message. Please try again or contact me directly by email.
```

---

## 8. XSS Prevention

Do not insert untrusted user input directly into HTML.

Avoid unsafe patterns such as:

```javascript
element.innerHTML = userInput;
```

Prefer:

```javascript
element.textContent = userInput;
```

When HTML rendering is genuinely required, sanitize untrusted content before rendering.

---

## 9. Third-Party Dependencies

Before adding a third-party library:

- Confirm that it is necessary.
- Use a trusted source.
- Keep dependencies minimal.
- Avoid abandoned packages where practical.
- Do not add dependencies merely for convenience.

---

## 10. Content Security

Do not embed unknown third-party scripts.

Every external script or service should have a clear purpose.

Avoid unnecessary tracking.

---

## 11. Personal Information

The portfolio may publicly display information intentionally provided for professional purposes, such as:

- Name
- Professional title
- Professional links
- Public social links
- Professional email
- Portfolio projects

Do not expose private information.

---

## 12. Analytics

Analytics should only be implemented if intentionally included.

Do not collect:

- Sensitive personal information
- Health information
- Private messages
- Unnecessary personal identifiers

Analytics should focus on portfolio usage and performance.

---

## 13. HTTPS

Production deployment should use HTTPS.

The deployed website must not intentionally transmit sensitive information over insecure connections.

---

## 14. Headers

Where the deployment platform supports security headers, consider appropriate headers such as:

- `Content-Security-Policy`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`

Do not introduce restrictive policies that break required functionality.

---

## 15. Dependencies and Supply Chain

Keep dependencies limited.

When a package is added:

- Confirm its purpose.
- Confirm it is actively maintained where practical.
- Avoid unnecessary packages.
- Check for known security concerns.
- Document meaningful dependencies.

---

## 16. Git Security

Never commit:

- `.env`
- `.env.local`
- `*.key`
- `*.pem`
- `credentials.json`
- `secrets.json`

unless a file contains intentionally public example values.

---

## 17. Deployment Security

Before deployment verify:

- No secrets in source code.
- No development credentials.
- No test accounts.
- No private project information.
- No debugging endpoints.
- No exposed stack traces.

---

## 18. Error Messages

Public error messages should not expose:

- Stack traces
- File paths
- API credentials
- Internal system details
- Database information

Provide useful but safe messages.

---

## 19. Security Rule

The portfolio is intentionally simple.

Do not create a backend, authentication system, database, or API simply because it appears more advanced.

Every new security surface must have a legitimate product requirement.