# Password reset with Better Auth (Bloggish)

This document explains how the Bloggish password-reset feature works end-to-end using **Better Auth**, covering both client and server pieces, email delivery, and data flow.

## High-level flow
1) **User requests reset** on `/request-password-reset` with their email.
2) **Client calls** `authClient.requestPasswordReset({ email, redirectTo })`.
3) **Server (Better Auth)** validates the user and generates a reset token + URL, then calls our `sendResetPassword` handler.
4) **Email is sent** with a reset link pointing to `/reset-password?token=...`.
5) **User clicks link** → lands on `/reset-password`, submits new password.
6) **Client calls** `authClient.resetPassword({ newPassword, token })`.
7) **Server updates password** (account table) and completes the flow.

## Client: request reset form
- File: `app/(auth)/request-password-reset/page.tsx`
- Stack: React Hook Form + Zod + our `FormInput`, `FormSubmitButton`, `FormRootError`.
- Validation: zod email schema; trims and requires a valid email.
- Redirect target: builds `redirectTo = ${origin}/reset-password` using `window.location.origin` (fallback `NEXT_PUBLIC_APP_URL` on server render).
- API call:
  ```ts
  const { error } = await authClient.requestPasswordReset({
    email,
    redirectTo, // page that will handle token + new password
  });
  ```
- UX: shows toast on success; navigates back to `/sign-in`. On errors, sets field/root errors.

## Client: reset password form
- File: `app/(auth)/reset-password/page.tsx`
- Stack: React Hook Form + Zod + `FormInput`, `FormSubmitButton`, `FormRootError`.
- Token: read from `useSearchParams()` (`/reset-password?token=...`). If missing, show root error.
- Validation: password 8–48 chars, trimmed.
- API call:
  ```ts
  const { error } = await authClient.resetPassword({
    newPassword,
    token,
  });
  ```
- UX: toast success, redirect to `/sign-in`; on error, show root error.

## Server: Better Auth config
- File: `lib/auth/auth.ts`
- Relevant options:
  - `emailAndPassword.enabled: true`
  - `autoSignIn: false`
  - `requireEmailVerification: true`
  - `sendResetPassword: async ({ user, url }) => sendResetPasswordEmail(user.email, url)`
  - `emailVerification.sendVerificationEmail` similarly wired.
- Adapter: `prismaAdapter(prisma)` with PostgreSQL.
- Session shape: `customSession` plugin keeps `username` in the session payload.

## Email sending
- File: `lib/email.ts`
- Template: `components/emails/reset-password-email.tsx`
- Sender: Resend (`RESEND_API_KEY` required).
- Flow: Better Auth supplies `url` with token → `sendResetPasswordEmail(to, url)` renders the template, sends HTML + text.

## Token and data handling
- Better Auth owns token creation, storage, expiry, and validation.
- The reset link includes `token` as a query param. Client passes it back to `resetPassword`.
- Passwords are stored in Better Auth’s account table (not the user table). We don’t handle hashing directly; the library does.

## Environment requirements
- `NEXT_PUBLIC_APP_URL` (used for building `redirectTo` on server-rendered form).
- `RESEND_API_KEY` for email delivery.
- Database configured via Prisma adapter (PostgreSQL).

## Error handling
- Client: field/root errors via React Hook Form + Sonner toasts.
- Server: wrap email sending in try/catch; log and rethrow to surface errors.

## Extending
- Add a “Change password” page for signed-in users:
  ```ts
  await authClient.changePassword({
    currentPassword,
    newPassword,
    revokeOtherSessions: true,
  });
  ```
- Adjust password policy by updating Zod schema in `/reset-password` form.
- Brand emails by editing `components/emails/reset-password-email.tsx`.
