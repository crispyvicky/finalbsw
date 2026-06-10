import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { to, subject, invoiceData } = await request.json();

        // Create transporter with GoDaddy SMTP settings
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtpout.secureserver.net',
            port: Number(process.env.EMAIL_PORT) || 587,
            secure: process.env.EMAIL_PORT === '465',
            auth: {
                user: process.env.EMAIL_USER || 'info@bswinteriors.com',
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Premium HTML Email Template
        const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice ${invoiceData.invoiceNumber}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    
                    <!-- Header with Gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0F2557 0%, #2a3f31 100%); padding: 40px 30px; text-align: center;">
                            <img src="https://bswinteriors.com/logo.png" alt="BSW Interiors" style="height: 60px; margin-bottom: 15px;" />
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px;">BSW INTERIORS</h1>
                            <p style="color: #d4af37; margin: 8px 0 0 0; font-size: 14px; font-style: italic; letter-spacing: 0.5px;">Where Dreams Meet Design</p>
                        </td>
                    </tr>

                    <!-- Invoice Header -->
                    <tr>
                        <td style="padding: 30px 40px 20px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <h2 style="color: #0F2557; margin: 0 0 5px 0; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Invoice</h2>
                                        <p style="color: #666; margin: 0; font-size: 24px; font-weight: 700;">${invoiceData.invoiceNumber}</p>
                                    </td>
                                    <td align="right">
                                        <p style="color: #666; margin: 0; font-size: 13px;">Date: ${new Date(invoiceData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                        <p style="color: #666; margin: 5px 0 0 0; font-size: 13px;">Due: ${new Date(invoiceData.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Client Info -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px;">
                            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 20px; border-radius: 12px; border-left: 4px solid #A0A0A0;">
                                <p style="color: #0F2557; margin: 0 0 8px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Bill To</p>
                                <p style="color: #2d3748; margin: 0; font-size: 18px; font-weight: 600;">${invoiceData.clientName}</p>
                                ${invoiceData.clientPhone ? `<p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">📞 ${invoiceData.clientPhone}</p>` : ''}
                                ${invoiceData.clientEmail ? `<p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">📧 ${invoiceData.clientEmail}</p>` : ''}
                            </div>
                        </td>
                    </tr>

                    <!-- Project Details -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px;">
                            <h3 style="color: #0F2557; margin: 0 0 15px 0; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Project Details</h3>
                            <p style="color: #2d3748; margin: 0; font-size: 18px; font-weight: 600;">${invoiceData.projectName}</p>
                            ${invoiceData.description ? `<p style="color: #666; margin: 10px 0 0 0; font-size: 14px; line-height: 1.6;">${invoiceData.description}</p>` : ''}
                        </td>
                    </tr>

                    <!-- Amount Breakdown -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="border-top: 2px solid #e2e8f0;">
                                <tr>
                                    <td style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                        <span style="color: #666; font-size: 14px;">Total Amount</span>
                                    </td>
                                    <td align="right" style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                        <span style="color: #2d3748; font-size: 16px; font-weight: 600;">₹ ${invoiceData.totalAmount.toLocaleString('en-IN')}</span>
                                    </td>
                                </tr>
                                ${invoiceData.discount > 0 ? `
                                <tr>
                                    <td style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                        <span style="color: #666; font-size: 14px;">Discount</span>
                                    </td>
                                    <td align="right" style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                        <span style="color: #10b981; font-size: 16px; font-weight: 600;">- ₹ ${invoiceData.discount.toLocaleString('en-IN')}</span>
                                    </td>
                                </tr>
                                ` : ''}
                                <tr>
                                    <td style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                        <span style="color: #666; font-size: 14px;">Amount Paid</span>
                                    </td>
                                    <td align="right" style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                        <span style="color: #3b82f6; font-size: 16px; font-weight: 600;">- ₹ ${invoiceData.amountPaid.toLocaleString('en-IN')}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 0 0 0;">
                                        <span style="color: #2d3748; font-size: 18px; font-weight: 700;">Balance Due</span>
                                    </td>
                                    <td align="right" style="padding: 20px 0 0 0;">
                                        <span style="color: #ef4444; font-size: 24px; font-weight: 700;">₹ ${invoiceData.balance.toLocaleString('en-IN')}</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    ${invoiceData.payments && invoiceData.payments.length > 0 ? `
                    <!-- Payment History -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px;">
                            <h3 style="color: #0F2557; margin: 0 0 15px 0; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Payment History</h3>
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f9fa; border-radius: 8px; overflow: hidden;">
                                ${invoiceData.payments.map((p: any, idx: number) => `
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 12px 15px;">
                                        <span style="color: #2d3748; font-size: 13px; font-weight: 600;">${new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        <br/>
                                        <span style="color: #666; font-size: 12px;">${p.method}${p.reference ? ` • ${p.reference}` : ''}</span>
                                    </td>
                                    <td align="right" style="padding: 12px 15px;">
                                        <span style="color: #10b981; font-size: 15px; font-weight: 700;">₹ ${p.amount.toLocaleString('en-IN')}</span>
                                    </td>
                                </tr>
                                `).join('')}
                            </table>
                        </td>
                    </tr>
                    ` : ''}

                    <!-- Footer Message -->
                    <tr>
                        <td style="padding: 30px 40px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-top: 1px solid #e2e8f0;">
                            <p style="color: #2d3748; margin: 0 0 10px 0; font-size: 15px; line-height: 1.6;">Thank you for choosing <strong>BSW Interiors</strong> for your interior design needs!</p>
                            <p style="color: #666; margin: 0; font-size: 13px; line-height: 1.6;">For any queries, please feel free to contact us. We're here to bring your vision to life.</p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0F2557 0%, #2a3f31 100%); padding: 30px 40px; text-align: center;">
                            <p style="color: #d4af37; margin: 0 0 15px 0; font-size: 13px; font-weight: 600; letter-spacing: 1px;">BSW INTERIORS</p>
                            <p style="color: #ffffff; margin: 0 0 5px 0; font-size: 13px;">📧 info@bswinteriors.com</p>
                            <p style="color: #ffffff; margin: 0 0 15px 0; font-size: 13px;">🌐 www.bswinteriors.com</p>
                            <p style="color: #a0aec0; margin: 0; font-size: 11px; font-style: italic;">"Crafting Spaces, Creating Memories"</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `;

        // Send email with HTML
        const info = await transporter.sendMail({
            from: '"BSW Interiors" <info@bswinteriors.com>',
            to: to,
            subject: subject,
            html: htmlBody,
        });

        console.log('Email sent:', info.messageId);

        return NextResponse.json({
            success: true,
            messageId: info.messageId
        });

    } catch (error) {
        console.error('Email send error:', error);
        return NextResponse.json({
            error: 'Failed to send email',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
