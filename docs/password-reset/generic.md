# Password reset: generic implementation (no auth library)

This document explains a **library-agnostic** password reset flow: client UI, server endpoints, tokens, email delivery, and security considerations.

## High-level flow
1) User requests reset with their email.
2) Server generates a single-use, time-limited token and stores it (DB).
3) Server emails a link: `/reset-password?token=...`.
4) User opens the link, submits a new password.
5) Server validates token, hashes new password, updates account, invalidates token.

## Data model (minimal)
- `users` table: `id`, `email` (unique), `password_hash`, `created_at`, `updated_at`.
- `password_reset_tokens` table: `id`, `user_id`, `token_hash`, `expires_at`, `used_at`, `created_at`.

## Server endpoints
### POST /request-password-reset
- Input: `{ email }`
- Steps:
  1. Find user by email; respond 200 even if not found (avoid user enumeration).
  2. Generate random token (crypto secure), store `token_hash` (e.g., SHA-256), `user_id`, `expires_at` (e.g., 30–60 minutes), `used_at = null`.
  3. Send email with link `/reset-password?token=<plainToken>`.
  4. Return 200.
- Rate limit by IP/email; optionally captcha.

### POST /reset-password
- Input: `{ token, newPassword }`
- Steps:
  1. Hash provided token, lookup in `password_reset_tokens` where `used_at IS NULL` and `expires_at > now()`.
  2. If not found → 400 (invalid/expired).
  3. Hash new password (bcrypt/argon2).
  4. Update `users.password_hash`.
  5. Mark token `used_at = now()` to prevent reuse.
  6. Optionally revoke other sessions.
  7. Return 200.

## Client UI
- Request form: email input, basic validation, call POST `/request-password-reset`.
- Reset form: password input, reads `token` from URL, calls POST `/reset-password`.
- Success states: inform the user to check email; after reset, link to sign-in.
- Error UX: generic messages to avoid leaking existence of accounts.

## Token generation & storage
- Generate: `crypto.randomBytes(32)` → base64url/plain token.
- Store only a **hash**: `token_hash = sha256(token)`.
- Expiry: 30–60 minutes recommended.
- One-time use: set `used_at` after success.
- Optionally store `request_ip` and `user_agent` for audit.

## Email delivery
- Template: short message + button + raw link.
- Subject: “Reset your password”.
- Content: explain link validity and to ignore if not requested.
- Avoid leaking whether account exists; always send generic response.

## Security considerations
- Do not reveal whether an email exists (constant-time responses).
- Rate-limit requests per IP/email; consider captcha.
- Use HTTPS everywhere; tokens must not be logged.
- Short-lived tokens and single use.
- Hash passwords with strong algorithm (argon2id preferred; bcrypt if needed).
- Revoke other active sessions after password change (optional but recommended).
- Monitor and alert on unusual volume of reset requests.

## Extending
- Add “change password” for authenticated users (requires current password).
- Add device/session invalidation after reset.
- Add audit logging for reset requests and completions.
- Localize email templates and UI copy.
