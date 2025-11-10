# Quick Deploy to Vercel

## 1-Minute Setup

### Prerequisites
- Vercel account (free tier works)
- Resend account (free tier: 100 emails/day)

### Step 1: Get Resend API Key
```bash
# 1. Go to https://resend.com/api-keys
# 2. Click "Create API Key"
# 3. Copy the key (starts with "re_")
```

### Step 2: Deploy to Vercel
```bash
# Option A: Via GitHub (Recommended)
1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add environment variables:
   - RESEND_API_KEY=re_xxxxxxxxxxxxx
   - CONTACT_TO_EMAIL=your-email@example.com
5. Click Deploy

# Option B: Via Vercel CLI
npm install -g vercel
vercel

# Follow prompts, then add env vars:
vercel env add RESEND_API_KEY
vercel env add CONTACT_TO_EMAIL
```

### Step 3: Update Email "From" Address

**In `api/contact.ts`, change line 42:**
```ts
// Before (uses Resend test domain)
from: "Portfolio Contact <onboarding@resend.dev>",

// After (use your verified domain)
from: "Portfolio Contact <contact@yourdomain.com>",
```

**Verify domain in Resend:**
1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Add DNS records (they'll show you exactly what to add)
4. Wait for verification (~5 minutes)

### Step 4: Test the Form

```bash
# 1. Go to your deployed site
# 2. Scroll to contact form
# 3. Fill out form and submit
# 4. Check your email inbox
# 5. Verify reply-to works by clicking reply
```

## Using Test Mode (Skip Domain Verification)

**Keep this line in `api/contact.ts`:**
```ts
from: "Portfolio Contact <onboarding@resend.dev>",
```

**Limitations:**
- Emails only sent to the verified email on your Resend account
- Cannot send to arbitrary addresses
- Perfect for testing before domain verification

**To test:**
1. Verify your email in Resend dashboard
2. Set `CONTACT_TO_EMAIL` to that verified email
3. Submit form - email should arrive immediately

## Troubleshooting

### Email Not Arriving
```bash
# Check Vercel function logs
vercel logs

# Check Resend logs
https://resend.com/emails

# Common issues:
- API key incorrect → Check environment variables
- Domain not verified → Use onboarding@resend.dev
- Email in spam → Check spam folder, whitelist sender
```

### CORS Errors
```bash
# The API route has CORS headers built-in
# If you still see CORS errors:
1. Check you're calling /api/contact (not localhost:3000/api/contact)
2. Redeploy after env var changes
3. Clear browser cache
```

### Form Not Submitting
```bash
# Check browser console for errors
# Common issues:
- Validation errors → Check error messages below fields
- Network error → Check /api/contact route is deployed
- TypeScript error → Run `npm run build` locally first
```

## Environment Variables Reference

```env
# Required
RESEND_API_KEY=re_xxxxxxxxxxxxx        # From resend.com/api-keys
CONTACT_TO_EMAIL=your-email@example.com # Where form emails go

# Optional (for production)
NODE_ENV=production
```

## Vercel Configuration (Automatic)

Vercel automatically detects:
- `/api` directory as serverless functions
- Vite build command (`npm run build`)
- Output directory (`dist`)

**No configuration needed!** Just deploy.

## Cost Breakdown

### Free Tier (Perfect for Portfolio)
- **Vercel:** 100 GB bandwidth, unlimited deployments
- **Resend:** 3,000 emails/month, 100 emails/day
- **Total:** $0/month

### If You Exceed Free Tier
- **Vercel Pro:** $20/month (1 TB bandwidth)
- **Resend Pro:** $20/month (50,000 emails/month)

## Next Steps After Deployment

1. **Add Analytics:**
   ```bash
   npm install @vercel/analytics
   ```

2. **Add Spam Protection:**
   ```bash
   npm install @hcaptcha/react-hcaptcha
   ```

3. **Monitor Email Delivery:**
   - Check Resend dashboard daily
   - Set up Resend webhooks for notifications
   - Add retry logic for failed emails

4. **Improve Email Template:**
   ```bash
   npm install react-email @react-email/components
   ```

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Resend Docs:** https://resend.com/docs
- **Vercel Support:** support@vercel.com
- **Resend Support:** support@resend.com

## Security Checklist

- [ ] API key stored in environment variables (never in code)
- [ ] CORS headers restrict to your domain only (update in production)
- [ ] Server-side validation matches client-side
- [ ] Rate limiting enabled (Resend built-in: 100/day free tier)
- [ ] Email addresses validated with regex
- [ ] No sensitive data logged
- [ ] HTTPS only (Vercel automatic)

---

**That's it!** Your contact form is now live and ready to receive inquiries.
