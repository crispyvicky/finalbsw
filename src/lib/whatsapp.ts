// WhatsApp notification utility
// Supports multiple WhatsApp API providers

interface WhatsAppMessage {
    to: string;
    message: string;
}

export async function sendWhatsAppNotification(data: {
    name: string;
    phone: string;
    email?: string;
    source: string;
    notes?: string;
    budget?: string;
}): Promise<boolean> {
    try {
        const recipientNumber = process.env.WHATSAPP_NOTIFICATION_NUMBER || '919885851127';

        // Format the message
        const message = formatLeadMessage(data);

        // Choose provider based on env variable
        const provider = process.env.WHATSAPP_PROVIDER || 'twilio';

        switch (provider.toLowerCase()) {
            case 'twilio':
                return await sendViaTwilio(recipientNumber, message);
            case 'wati':
                return await sendViaWATI(recipientNumber, message);
            case 'interakt':
                return await sendViaInterakt(recipientNumber, message);
            default:
                console.warn(`Unknown WhatsApp provider: ${provider}`);
                return false;
        }
    } catch (error) {
        console.error('WhatsApp notification failed:', error);
        return false;
    }
}

function formatLeadMessage(data: {
    name: string;
    phone: string;
    email?: string;
    source: string;
    notes?: string;
    budget?: string;
}): string {
    let message = `🔔 *New Lead from ${data.source}*\n\n`;
    message += `👤 *Name:* ${data.name}\n`;
    message += `📱 *Phone:* ${data.phone}\n`;

    if (data.email) {
        message += `📧 *Email:* ${data.email}\n`;
    }

    if (data.budget) {
        message += `💰 *Budget:* ${data.budget}\n`;
    }

    if (data.notes) {
        message += `\n📝 *Message:*\n${data.notes}`;
    }

    return message;
}

// Twilio WhatsApp API
async function sendViaTwilio(to: string, message: string): Promise<boolean> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER; // Format: whatsapp:+14155238886

    if (!accountSid || !authToken || !fromNumber) {
        // Soft fail if no credentials are present (user might only want Emails)
        console.warn('WhatsApp Notification Skipped: Twilio credentials not configured in environment variables.');
        return false;
    }

    try {
        const response = await fetch(
            `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    From: fromNumber,
                    To: `whatsapp:+${to}`,
                    Body: message,
                }),
            }
        );

        return response.ok;
    } catch (error) {
        console.error('Twilio API error:', error);
        return false;
    }
}

// WATI API
async function sendViaWATI(to: string, message: string): Promise<boolean> {
    const apiKey = process.env.WATI_API_KEY;
    const apiUrl = process.env.WATI_API_URL;

    if (!apiKey || !apiUrl) {
        console.error('WATI credentials not configured');
        return false;
    }

    try {
        const response = await fetch(`${apiUrl}/api/v1/sendSessionMessage/${to}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messageText: message,
            }),
        });

        return response.ok;
    } catch (error) {
        console.error('WATI API error:', error);
        return false;
    }
}

// Interakt API
async function sendViaInterakt(to: string, message: string): Promise<boolean> {
    const apiKey = process.env.INTERAKT_API_KEY;

    if (!apiKey) {
        console.error('Interakt credentials not configured');
        return false;
    }

    try {
        const response = await fetch('https://api.interakt.ai/v1/public/message/', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                countryCode: '+91',
                phoneNumber: to.replace(/^\+?91/, ''),
                type: 'Text',
                data: {
                    message: message,
                },
            }),
        });

        return response.ok;
    } catch (error) {
        console.error('Interakt API error:', error);
        return false;
    }
}
