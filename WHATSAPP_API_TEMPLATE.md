# WhatsApp Business API Template
## Premium Interactive Message for Quotations

Once you have your WhatsApp Business API access token and Phone Number ID, use this JSON payload to send the premium message style you requested.

### Features
- **Header Image**: Shows a visual banner (like your logo or a project render)
- **Rich Text**: Bold, emojis, and clean formatting
- **Interactive Button**: A "View Quotation" button that hides the messy URL

### The API Request

**POST** `https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

**Body (JSON Payload):**
```json
{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "CLIENT_PHONE_NUMBER", 
  "type": "template",
  "template": {
    "name": "quotation_ready_v1",
    "language": {
      "code": "en"
    },
    "components": [
      {
        "type": "header",
        "parameters": [
          {
            "type": "image",
            "image": {
              "link": "https://bswinteriors.com/images/quotation-banner.jpg"
            }
          }
        ]
      },
      {
        "type": "body",
        "parameters": [
          {
            "type": "text",
            "text": "VIGNESH"  // Variable {{1}}: Client Name
          },
          {
            "type": "text",
            "text": "HYDERABAD" // Variable {{2}}: Project Name
          },
          {
            "type": "text",
            "text": "74,550"    // Variable {{3}}: Total Amount
          }
        ]
      },
      {
        "type": "button",
        "sub_type": "url",
        "index": 0,
        "parameters": [
          {
            "type": "text",
            "text": "695ab42579941a323db9d369" // Variable for URL suffix
          }
        ]
      }
    ]
  }
}
```

### Setup Instructions for Meta Business Manager

1. Go to **WhatsApp Manager** > **Message Templates**.
2. Create a new template named `quotation_ready_v1`.
3. **Category**: UTILITY or MARKETING.
4. **Header**: Select "Media" -> "Image".
5. **Body Text**:
   ```
   ✨ *BSW INTERIORS*
   _Where Dreams Meet Design_

   Hi *{{1}}*,

   Your quotation for *{{2}}* is ready for review.

   💰 *Total Amount:* ₹{{3}}

   ━━━━━━━━━━━━━━━━━━━━
   
   ✨ *What to expect:*
   ✅ Premium Quality Materials
   ✅ Expert Craftsmanship
   ✅ 2 Years Warranty
   ✅ On-Time Delivery

   _Crafting Spaces, Creating Memories_ 🏡
   ```
6. **Footer**: (Optional) "BSW Interiors Support"
7. **Buttons**: 
   - Type: **Visit Website**
   - Button Text: `View Full Quotation`
   - URL Type: **Dynamic**
   - Base URL: `https://bswinteriors.com/quote/`
   - Example suffix: `12345`

### Why this works
This template exactly mimics the "Bare Anatomy" example:
- The **Image** grabs attention immediately.
- The **Checklist** (✅) reinforces value.
- The **Button** is the only CTA, making it super clean and clickable.
