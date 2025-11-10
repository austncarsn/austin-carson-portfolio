# API Endpoints

## Contact Form (`/api/contact`)

Serverless function that handles contact form submissions.

### Setup

1. **Install Resend** (when ready to enable email):
   ```bash
   npm install resend
   ```

2. **Add environment variable** to Vercel:
   - Go to Project Settings → Environment Variables
   - Add `RESEND_API_KEY` with your Resend API key
   - Get your API key from: https://resend.com/api-keys

3. **Uncomment Resend code** in `api/contact.ts`:
   - Uncomment the import statement
   - Uncomment the `resend.emails.send()` call
   - Update the `from` email to match your verified domain

### Features

- ✅ Honeypot spam protection (hidden `website` field)
- ✅ Required field validation
- ✅ Email format validation
- ✅ Rate limiting (client-side 60s cooldown)
- ✅ Error handling with proper status codes

### Testing

**Local development:**
```bash
# Install Vercel CLI
npm install -g vercel

# Run dev server with serverless functions
vercel dev
```

**Manual test:**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

### Deployment

Automatically deployed when pushed to Vercel. No additional configuration needed.
