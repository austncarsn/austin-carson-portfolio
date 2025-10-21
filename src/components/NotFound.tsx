/* ==========================================================================
   404 Not Found — Elegant Error State
   ========================================================================== */

import { Link } from 'react-router-dom';
import { Home, Mail } from 'lucide-react';
import React from 'react';

export default function NotFound(): React.JSX.Element {
  return (
  <div className="flex min-h-screen items-center justify-center bg-paper px-6 py-16 sm:px-10">
      <div className="text-center space-y-8 max-w-2xl">
        {/* Error Code */}
        <div className="space-y-4">
          <div className="text-brand text-8xl md:text-9xl tracking-tighter opacity-20">
            404
          </div>
          
          {/* Title */}
          <div className="space-y-2">
            <span className="font-satoshi text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] text-text-primary block">
              Page Not Found
            </span>
          </div>
          <div className="w-24 h-0.5 bg-brand mx-auto" />
        </div>

        {/* Description */}
        <p className="font-plex text-[18px] leading-[1.7] text-text-muted max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          {/* Primary Action */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-plex font-medium text-[15px] hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Secondary Action */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-structure text-text-primary font-plex font-medium text-[15px] hover:border-brand transition-colors"
          >
            Get in Touch
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Decorative Element */}
          <div className="pt-16 opacity-50">
          <div className="w-16 h-16 mx-auto bg-brand opacity-10 rounded-full blur-2xl" />
        </div>
      </div>
    </div>
  );
}