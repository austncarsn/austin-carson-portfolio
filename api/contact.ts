/**
 * Serverless Contact Form Handler
 *
 * Deployment options:
 * 1. Vercel: Deploy as-is (Vercel automatically detects /api routes)
 * 2. Netlify: Add to netlify.toml functions configuration
 * 3. Local dev: Use `vite-plugin-api` or proxy configuration
 *
 * Environment Variables Required:
 * - RESEND_API_KEY: Your Resend API key (https://resend.com/api-keys)
 * - CONTACT_TO_EMAIL: Destination email address
 *
 * Usage:
 * POST /api/contact
 * Body: { name, email, company?, budget?, message }
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// CORS headers for production
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, budget, message, website } = req.body;

    // Honeypot check - if website field is filled, it's a bot
    if (website) {
      return res.status(200).json({ ok: true }); // Return success to fool bot
    }

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Send email via Resend
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Use your verified domain
      to: [process.env.CONTACT_TO_EMAIL || 'your-email@example.com'],
      replyTo: email,
      subject: `New Portfolio Inquiry from ${name}`,
      text: [
        `New contact form submission:`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || 'N/A'}`,
        `Budget: ${budget || 'N/A'}`,
        ``,
        `Message:`,
        message,
        ``,
        `---`,
        `Sent from Austin Carson Portfolio`,
      ].join('\n'),
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; margin-bottom: 24px;">New Portfolio Inquiry</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Company:</strong> ${company || 'N/A'}</p>
            <p style="margin: 8px 0;"><strong>Budget:</strong> ${budget || 'N/A'}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">
            <p style="margin: 0 0 12px;"><strong>Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 24px;">
            Sent from Austin Carson Portfolio
          </p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
