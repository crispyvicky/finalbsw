import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { to, subject, quotationData } = await request.json();

        // Create transporter with GoDaddy SMTP settings
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtpout.secureserver.net',
            port: Number(process.env.EMAIL_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER || 'info@infinityinteriors.co',
                pass: process.env.EMAIL_PASS,
            },
        });

        // Calculate totals
        const subTotal = quotationData.totalAmount;
        const discountAmount = (subTotal * (quotationData.discount || 0)) / 100;
        const afterDiscount = subTotal - discountAmount;
        const gstAmount = (afterDiscount * (quotationData.gstRate || 0)) / 100;
        const finalTotal = quotationData.finalAmount;

        // Format sections for email
        const sectionsHTML = quotationData.sections.map((section: any) => `
            <tr>
                <td colspan="4" style="padding: 15px; background: #f8f9fa; border-bottom: 2px solid #3d5a45;">
                    <strong style="color: #3d5a45; font-size: 16px;">${section.name}</strong>
                </td>
            </tr>
            ${section.items.map((item: any) => `
            <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 15px; color: #2d3748;">${item.description}</td>
                <td style="padding: 12px 15px; text-align: center; color: #666;">${item.sft} sft</td>
                <td style="padding: 12px 15px; text-align: right; color: #666;">₹${item.unitPrice.toLocaleString('en-IN')}</td>
                <td style="padding: 12px 15px; text-align: right; color: #2d3748; font-weight: 600;">₹${item.amount.toLocaleString('en-IN')}</td>
            </tr>
            `).join('')}
        `).join('');

        // Premium HTML Email Template
        const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quotation ${quotationData.quoteNumber}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="650" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    
                    <!-- Header with Gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #3d5a45 0%, #2a3f31 100%); padding: 40px 30px; text-align: center;">
                            <img src="https://infinityinteriors.co/logo.png" alt="Infinity Interiors" style="height: 60px; margin-bottom: 15px;" />
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px;">INFINITY INTERIORS</h1>
                            <p style="color: #d4af37; margin: 8px 0 0 0; font-size: 14px; font-style: italic; letter-spacing: 0.5px;">Where Dreams Meet Design</p>
                        </td>
                    </tr>

                    <!-- Quotation Header -->
                    <tr>
                        <td style="padding: 30px 40px 20px 40px;">
                            <h2 style="color: #3d5a45; margin: 0 0 5px 0; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Quotation</h2>
                            <p style="color: #666; margin: 0; font-size: 24px; font-weight: 700;">${quotationData.quoteNumber}</p>
                        </td>
                    </tr>

                    <!-- Client Info -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px;">
                            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 20px; border-radius: 12px; border-left: 4px solid #ce7e48;">
                                <p style="color: #3d5a45; margin: 0 0 8px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Prepared For</p>
                                <p style="color: #2d3748; margin: 0; font-size: 18px; font-weight: 600; text-transform: uppercase;">${quotationData.clientName}</p>
                                <p style="color: #666; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase;">Project: ${quotationData.projectName}</p>
                            </div>
                        </td>
                    </tr>

                    <!-- Items Table -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                                <thead>
                                    <tr style="background: #3d5a45; color: white;">
                                        <th style="padding: 12px 15px; text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Description</th>
                                        <th style="padding: 12px 15px; text-align: center; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Area</th>
                                        <th style="padding: 12px 15px; text-align: right; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Rate</th>
                                        <th style="padding: 12px 15px; text-align: right; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${sectionsHTML}
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <!-- Amount Breakdown -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="border-top: 2px solid #e2e8f0;">
                                <tr>
                                    <td style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                        <span style="color: #666; font-size: 14px;">Sub Total</span>
                                    </td>
                                    <td align="right" style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                        <span style="color: #2d3748; font-size: 16px; font-weight: 600;">₹ ${subTotal.toLocaleString('en-IN')}</span>
                                    </td>
                                </tr>
                                ${quotationData.discount > 0 ? `
                                <tr>
                                    <td style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                        <span style="color: #666; font-size: 14px;">Discount (${quotationData.discount}%)</span>
                                    </td>
                                    <td align="right" style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                        <span style="color: #10b981; font-size: 16px; font-weight: 600;">- ₹ ${discountAmount.toLocaleString('en-IN')}</span>
                                    </td>
                                </tr>
                                ` : ''}
                                ${quotationData.gstRate > 0 ? `
                                <tr>
                                    <td style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                        <span style="color: #666; font-size: 14px;">GST (${quotationData.gstRate}%)</span>
                                    </td>
                                    <td align="right" style="padding: 15px 0; border-bottom: 1px solid #e2e8f0;">
                                        <span style="color: #3b82f6; font-size: 16px; font-weight: 600;">+ ₹ ${gstAmount.toLocaleString('en-IN')}</span>
                                    </td>
                                </tr>
                                ` : ''}
                                <tr>
                                    <td style="padding: 20px 0 0 0;">
                                        <span style="color: #2d3748; font-size: 18px; font-weight: 700;">Grand Total</span>
                                    </td>
                                    <td align="right" style="padding: 20px 0 0 0;">
                                        <span style="color: #3d5a45; font-size: 24px; font-weight: 700;">₹ ${finalTotal.toLocaleString('en-IN')}</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    ${quotationData.notes ? `
                    <!-- Notes -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px;">
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 3px solid #d4af37;">
                                <p style="color: #3d5a45; margin: 0 0 10px 0; font-size: 14px; font-weight: 600; text-transform: uppercase;">Terms & Conditions</p>
                                <p style="color: #666; margin: 0; font-size: 13px; line-height: 1.8; white-space: pre-line;">${quotationData.notes}</p>
                            </div>
                        </td>
                    </tr>
                    ` : ''}

                    <!-- View Link -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px; text-align: center;">
                            <a href="${quotationData.quotationLink}" style="display: inline-block; background: #3d5a45; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">View Full Quotation</a>
                        </td>
                    </tr>

                    <!-- Footer Message -->
                    <tr>
                        <td style="padding: 30px 40px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-top: 1px solid #e2e8f0;">
                            <p style="color: #2d3748; margin: 0 0 10px 0; font-size: 15px; line-height: 1.6;">Thank you for choosing <strong>Infinity Interiors</strong> for your interior design needs!</p>
                            <p style="color: #666; margin: 0; font-size: 13px; line-height: 1.6;">For any queries, please feel free to contact us. We're here to bring your vision to life.</p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #3d5a45 0%, #2a3f31 100%); padding: 30px 40px; text-align: center;">
                            <p style="color: #d4af37; margin: 0 0 15px 0; font-size: 13px; font-weight: 600; letter-spacing: 1px;">INFINITY INTERIORS</p>
                            <p style="color: #ffffff; margin: 0 0 5px 0; font-size: 13px;">📧 info@infinityinteriors.co</p>
                            <p style="color: #ffffff; margin: 0 0 15px 0; font-size: 13px;">🌐 www.infinityinteriors.co</p>
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
            from: '"Infinity Interiors" <info@infinityinteriors.co>',
            to: to,
            subject: subject,
            html: htmlBody,
        });

        console.log('Quotation email sent:', info.messageId);

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
