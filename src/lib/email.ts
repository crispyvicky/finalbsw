import nodemailer from 'nodemailer';

// Create transporter with GoDaddy SMTP settings
export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtpout.secureserver.net',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_PORT === '465',
    auth: {
        user: process.env.EMAIL_USER || 'info@bswinteriors.com',
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false // Often required for GoDaddy SMTP
    }
});

export const sendEmail = async (to: string, subject: string, html: string, attachments?: any[]) => {
    try {
        const info = await transporter.sendMail({
            from: '"BSW Interiors" <info@bswinteriors.com>',
            to,
            subject,
            html,
            attachments
        });
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

/**
 * Sends a premium "Thank You / Welcome" email to new leads
 */
export async function sendWelcomeEmail(to: string, name: string): Promise<boolean> {
    try {
        const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to BSW Interiors</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    
                    <!-- Header with Gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%); padding: 40px 30px; text-align: center;">
                            <img src="https://bswinteriors.com/logo.png" alt="BSW Interiors" style="height: 60px; margin-bottom: 20px;" />
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Welcome to the Family</h1>
                            <div style="width: 50px; height: 2px; background-color: #d4af37; margin: 20px auto;"></div>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 40px 40px;">
                            <p style="color: #333333; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
                                Dear <strong>${name}</strong>,
                            </p>
                            <p style="color: #555555; font-size: 16px; line-height: 1.8; margin-bottom: 25px;">
                                Thank you for reaching out to <strong>BSW Interiors</strong>. We have successfully received your enquiry regarding your space.
                            </p>
                            <p style="color: #555555; font-size: 16px; line-height: 1.8; margin-bottom: 30px;">
                                Our team of expert designers is already reviewing your details. You can expect a call or message from us shortly to discuss your vision and how we can bring it to life.
                            </p>
                            
                            <!-- Call to Action / Highlight -->
                            <div style="background-color: #f9f9f9; border-left: 4px solid #d4af37; padding: 20px; border-radius: 4px;">
                                <p style="margin: 0; color: #333; font-style: italic; font-size: 15px;">
                                    "Design is not just what it looks like and feels like. Design is how it works."
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Gallery / Portfolio Preview (Optional Visuals) -->
                    <tr>
                        <td style="padding: 0 40px 40px 40px;">
                            <p style="color: #333; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">In the meantime:</p>
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="50%" style="padding-right: 10px;">
                                        <a href="https://bswinteriors.com/portfolio" style="text-decoration: none; display: block; background: #1a1a1a; padding: 15px; text-align: center; border-radius: 8px; color: #fff; font-size: 14px;">
                                            Browse Portfolio
                                        </a>
                                    </td>
                                    <td width="50%" style="padding-left: 10px;">
                                        <a href="https://bswinteriors.com/cost-estimator" style="text-decoration: none; display: block; background: #d4af37; padding: 15px; text-align: center; border-radius: 8px; color: #000; font-size: 14px; font-weight: bold;">
                                            Estimate Cost
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #1a1a1a; padding: 30px 40px; text-align: center;">
                            <p style="color: #d4af37; margin: 0 0 10px 0; font-size: 12px; letter-spacing: 1px; font-weight: bold;">BSW INTERIORS</p>
                            <p style="color: #888888; margin: 0 0 5px 0; font-size: 12px;">Hyderabad, Telangana</p>
                            <p style="color: #888888; margin: 0; font-size: 12px;">
                                <a href="mailto:info@bswinteriors.com" style="color: #d4af37; text-decoration: none;">info@bswinteriors.com</a> | 
                                <a href="https://bswinteriors.com" style="color: #d4af37; text-decoration: none;">www.bswinteriors.com</a>
                            </p>
                        </td>
                    </tr>
                </table>
                <p style="color: #999; font-size: 11px; margin-top: 20px;">
                    &copy; ${new Date().getFullYear()} BSW Interiors. All rights reserved.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
        `;

        const info = await transporter.sendMail({
            from: '"BSW Interiors" <info@bswinteriors.com>',
            to: to,
            subject: 'Thank You for Choosing BSW Interiors',
            html: htmlBody,
        });

        console.log('Welcome email sent:', info.messageId);
        return true;

    } catch (error) {
        console.error('Failed to send welcome email:', error);
        return false;
    }
}
