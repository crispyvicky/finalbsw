# GoDaddy SMTP Configuration

## Environment Variables Required

Add these to your `.env.local` file:

```
EMAIL_HOST=smtpout.secureserver.net
EMAIL_PORT=465
EMAIL_USER=info@infinityinteriors.co
EMAIL_PASS=your_email_password_here
```

## How to Get Your Email Password

1. Log in to your GoDaddy account
2. Go to **Email & Office** → **Email Accounts**
3. Find `info@infinityinteriors.co`
4. Click **Manage** or **Settings**
5. Look for **Password** or **Reset Password**
6. Copy the password and add it to `.env.local`

## Testing the Email

1. Create the `.env.local` file in your project root
2. Add the environment variables above
3. Restart your dev server: `npm run dev`
4. Go to `/admin/payments`
5. Click on an invoice
6. Click the **Email** button
7. Check if the email was sent successfully

## Troubleshooting

### Error: "Authentication failed"
- Double-check your email password
- Make sure you're using the correct email address

### Error: "Connection timeout"
- Try port `587` instead of `465`
- Change `secure: true` to `secure: false` in the code

### Error: "Self-signed certificate"
- Add this to the transporter config:
  ```typescript
  tls: {
      rejectUnauthorized: false
  }
  ```

## Alternative: Use Port 587 (TLS)

If port 465 doesn't work, update `.env.local`:

```
EMAIL_PORT=587
```

And update the code to use `secure: false` for port 587.

---

**Once configured, emails will be sent automatically from `info@infinityinteriors.co` when you click the Email button!**
