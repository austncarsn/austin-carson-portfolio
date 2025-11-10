# Contact Form Implementation Guide

## Overview
Professional contact form with React Hook Form validation, Zod schema, accessibility features, and serverless email handling via Resend.

## Features
- ✅ Form validation with inline errors (Zod + React Hook Form)
- ✅ Accessibility: ARIA labels, keyboard navigation, screen reader support
- ✅ Reduced motion support
- ✅ Proper autocomplete for better UX
- ✅ Loading states and error handling
- ✅ Token-aware styling (light/dark mode ready)
- ✅ Serverless email delivery (Resend)

## Setup

### 1. Install Dependencies
```bash
npm install react-hook-form @hookform/resolvers zod resend @vercel/node
```

### 2. Environment Variables
Create a `.env` file (git-ignored):
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=your-email@example.com
```

Get your Resend API key:
1. Sign up at https://resend.com
2. Verify your domain (or use test mode)
3. Generate API key in dashboard

### 3. Deploy to Vercel

**Option A: Via Vercel CLI**
```bash
npm install -g vercel
vercel
```

**Option B: Via GitHub Integration**
1. Push code to GitHub
2. Import repo in Vercel dashboard
3. Add environment variables in project settings
4. Deploy

**Add environment variables in Vercel:**
- Go to Project Settings → Environment Variables
- Add `RESEND_API_KEY` and `CONTACT_TO_EMAIL`
- Redeploy

### 4. Deploy to Netlify

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "api"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

Add environment variables in Netlify dashboard.

## Usage

```tsx
import { Contact2 } from './components/Contact2';

function App() {
  return (
    <Contact2
      directEmail="austin@example.com"
      phone="+1 (555) 123-4567"
      office={{ lines: ["Austin, TX", "United States"] }}
      socials={[
        { label: "LinkedIn", href: "https://linkedin.com/in/..." },
        { label: "GitHub", href: "https://github.com/..." },
        { label: "Instagram", href: "https://instagram.com/..." },
      ]}
    />
  );
}
```

## Token Requirements

Ensure these CSS variables exist in your tokens.css:

```css
:root[data-theme="noir"] {
  --primary: oklch(98% 0.01 95);
  --warm-medium: oklch(95% 0.02 85);  /* Form background */
  --warm-lightest: oklch(20% 0.01 260);
  --warm-stone: oklch(88% 0.02 95);
  --warm-light: oklch(40% 0.02 260);
  --warm-tan: oklch(70% 0.08 75);
  
  /* Form states */
  --danger: #b00020;
  --success: #0a7f52;
}

:root[data-theme="noir"][data-mode="dark"] {
  --warm-medium: oklch(22% 0.02 85);  /* Dark form background */
  --danger: #f28b82;
  --success: #81c995;
}
```

## Local Development

For local testing without deploying:

**Option 1: Mock API (Quick Test)**
Update Contact2.tsx to log to console:
```ts
const onSubmit = async (data: FormValues) => {
  console.log("Form submitted:", data);
  setStatus("ok");
  reset();
};
```

**Option 2: Vite Proxy**
Add to `vite.config.ts`:
```ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Run serverless function separately
        changeOrigin: true,
      },
    },
  },
});
```

**Option 3: Formspree (No Backend)**
Replace `/api/contact` with Formspree endpoint:
```tsx
const onSubmit = async (data: FormValues) => {
  setStatus("sending");
  try {
    const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // ... rest of handler
  }
};
```

## Accessibility Features

- **Labels**: All inputs have proper labels (visually hidden but accessible)
- **ARIA**: `aria-invalid`, `aria-describedby` for errors
- **Live Regions**: `aria-live="polite"` for status messages
- **Keyboard Navigation**: Tab order, focus management
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Focus Rings**: Uses `.focus-ring` utility class
- **Autocomplete**: Proper autocomplete attributes for better UX
- **Error Messages**: Inline validation with clear error text

## Form Validation Schema

```ts
const Schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Tell me a little more"),
});
```

## Email Template

The serverless function sends both plain text and HTML emails with:
- Name, email, company, budget in a summary card
- Full message content
- Reply-to set to sender's email for easy responses

## Testing Checklist

- [ ] Form validates correctly (try submitting empty, invalid email)
- [ ] Error messages appear inline below fields
- [ ] Success/error toast appears after submit
- [ ] Form resets after successful submission
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Focus indicators visible
- [ ] Reduced motion works (disable animations)
- [ ] Email arrives with correct content
- [ ] Reply-to header works
- [ ] Dark mode styling correct
- [ ] Mobile responsive
- [ ] Screen reader announces errors

## Troubleshooting

**Email not sending:**
- Check Resend API key is correct
- Verify domain is verified in Resend
- Check Vercel/Netlify function logs
- Try test mode first (onboarding@resend.dev)

**Form validation not working:**
- Check browser console for errors
- Verify zod and react-hook-form versions
- Ensure zodResolver is imported correctly

**CORS errors:**
- Check API route has proper CORS headers
- Verify deployment environment variables
- Test with deployed version (CORS often local-only issue)

## Production Checklist

- [ ] Update `from` email to your verified domain
- [ ] Update `to` email to your actual email
- [ ] Add RESEND_API_KEY to deployment environment
- [ ] Add CONTACT_TO_EMAIL to deployment environment
- [ ] Test form submission on production
- [ ] Set up email notifications
- [ ] Monitor Resend dashboard for delivery
- [ ] Add rate limiting (Resend built-in)
- [ ] Add honeypot field for spam prevention (optional)

## Next Steps

1. **Spam Protection**: Add reCAPTCHA or Turnstile
2. **Rate Limiting**: Implement client-side debouncing
3. **Analytics**: Track form submissions
4. **Email Templates**: Use React Email for better templates
5. **Confirmation Email**: Send auto-reply to sender
