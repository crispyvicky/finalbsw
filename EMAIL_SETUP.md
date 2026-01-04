# Email Setup Instructions for info@infinityinteriors.co

## Current Implementation

The email button now uses the API endpoint `/api/send-invoice-email` which formats professional invoice emails from `info@infinityinteriors.co`.

Currently, it opens the user's default email client with pre-filled content. To send emails directly from the server, you need to set up one of the following options:

---

## Option 1: Resend (Recommended - Easiest)

Resend is a modern email API that's perfect for Next.js applications.

### Steps:

1. **Sign up for Resend**
   - Go to https://resend.com
   - Sign up for free account
   - Get your API key

2. **Add your domain**
   - Add `infinityinteriors.co` to Resend
   - Follow their DNS verification steps (add TXT records to GoDaddy)

3. **Install Resend**
   ```bash
   npm install resend
   ```

4. **Add to .env.local**
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```

5. **Update the email API** (`src/app/api/send-invoice-email/route.ts`)
   - Uncomment the Resend code block
   - Add at top: `import { Resend } from 'resend';`

**Benefits:**
- ✅ Free tier: 100 emails/day
- ✅ Easy setup
- ✅ Great deliverability
- ✅ No SMTP configuration needed

---

## Option 2: Nodemailer with GoDaddy SMTP

Use your existing GoDaddy email with SMTP.

### Steps:

1. **Install Nodemailer**
   ```bash
   npm install nodemailer
   ```

2. **Get GoDaddy SMTP Settings**
   - Server: `smtpout.secureserver.net`
   - Port: `465` (SSL) or `587` (TLS)
   - Username: `info@infinityinteriors.co`
   - Password: Your email password

3. **Add to .env.local**
   ```
   EMAIL_HOST=smtpout.secureserver.net
   EMAIL_PORT=465
   EMAIL_USER=info@infinityinteriors.co
   EMAIL_PASS=your_email_password_here
   ```

4. **Update the email API** (`src/app/api/send-invoice-email/route.ts`)
   
   Replace the current code with:

   ```typescript
   import { NextResponse } from 'next/server';
   import nodemailer from 'nodemailer';

   export async function POST(request: Request) {
       try {
           const { to, subject, invoiceData } = await request.json();

           // Create transporter
           const transporter = nodemailer.createTransporter({
               host: process.env.EMAIL_HOST,
               port: Number(process.env.EMAIL_PORT),
               secure: true,
               auth: {
                   user: process.env.EMAIL_USER,
                   pass: process.env.EMAIL_PASS,
               },
           });

           // Format email body
           const emailBody = `
   Dear ${invoiceData.clientName},

   Please find the details of Invoice ${invoiceData.invoiceNumber}:

   Project: ${invoiceData.projectName}
   ${invoiceData.description ? `Description: ${invoiceData.description}\n` : ''}
   Invoice Date: ${new Date(invoiceData.date).toLocaleDateString('en-IN')}
   Due Date: ${new Date(invoiceData.dueDate).toLocaleDateString('en-IN')}

   AMOUNT BREAKDOWN:
   Total Amount: ₹${invoiceData.totalAmount.toLocaleString('en-IN')}
   ${invoiceData.discount > 0 ? `Discount: ₹${invoiceData.discount.toLocaleString('en-IN')}\n` : ''}Amount Paid: ₹${invoiceData.amountPaid.toLocaleString('en-IN')}
   Balance Due: ₹${invoiceData.balance.toLocaleString('en-IN')}

   ${invoiceData.payments && invoiceData.payments.length > 0 ? `
   PAYMENT HISTORY:
   ${invoiceData.payments.map((p: any) => 
       `- ${new Date(p.date).toLocaleDateString('en-IN')}: ₹${p.amount.toLocaleString('en-IN')} via ${p.method}${p.reference ? ` (Ref: ${p.reference})` : ''}`
   ).join('\n')}
   ` : ''}

   Thank you for your business!

   Best regards,
   Infinity Interiors
   www.infinityinteriors.co
   Email: info@infinityinteriors.co
           `.trim();

           // Send email
           await transporter.sendMail({
               from: '"Infinity Interiors" <info@infinityinteriors.co>',
               to: to,
               subject: subject,
               text: emailBody,
           });

           return NextResponse.json({ success: true });

       } catch (error) {
           console.error('Email send error:', error);
           return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
       }
   }
   ```

**Benefits:**
- ✅ Uses your existing email
- ✅ No additional service needed
- ❌ Requires SMTP credentials
- ❌ May have sending limits

---

## Option 3: SendGrid

Another popular email service.

### Steps:

1. Sign up at https://sendgrid.com
2. Get API key
3. Verify domain
4. Install: `npm install @sendgrid/mail`
5. Add to .env.local: `SENDGRID_API_KEY=your_key`

---

## Recommended: Use Resend

For the best experience, I recommend **Option 1 (Resend)** because:
- Easy setup
- Great for transactional emails
- Free tier is generous
- Better deliverability than SMTP
- No password management

---

## Testing

After setup, test by:
1. Creating an invoice
2. Clicking the Email button
3. Check if email is sent to client
4. Verify it comes from `info@infinityinteriors.co`

---

## Current Behavior (Without Setup)

Right now, the email button:
- Formats a professional email
- Opens the user's default email client (Outlook, Gmail, etc.)
- Pre-fills the "To", "Subject", and "Body"
- User must click "Send" manually

This works but requires the admin to have an email client configured. Setting up one of the options above will send emails automatically from the server.
