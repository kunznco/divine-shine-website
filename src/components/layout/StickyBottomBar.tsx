"use client";

import Link from "next/link";
import { PHONE_HREF, EMAIL, SMS_HREF } from "@techforthetrades/shared/constants";
import { PhoneIcon, CalendarIcon, ChatIcon, EnvelopeIcon } from "@techforthetrades/ui/Icons";

export function StickyBottomBar() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex bg-navy rounded-2xl shadow-2xl overflow-hidden">
      <Link
        href={PHONE_HREF}
        className="flex flex-col items-center justify-center px-5 py-3 text-white hover:bg-navy-light transition-colors"
        aria-label="Call us"
      >
        <PhoneIcon className="w-5 h-5 mb-1" />
        <span className="text-xs font-medium">Call</span>
      </Link>
      <Link
        href="/contact-us"
        className="flex flex-col items-center justify-center px-5 py-3 text-white hover:bg-navy-light transition-colors"
        aria-label="Book appointment"
      >
        <CalendarIcon className="w-5 h-5 mb-1" />
        <span className="text-xs font-medium">Book</span>
      </Link>
      <Link
        href={SMS_HREF}
        className="flex flex-col items-center justify-center px-5 py-3 text-white hover:bg-navy-light transition-colors"
        aria-label="Text us"
      >
        <ChatIcon className="w-5 h-5 mb-1" />
        <span className="text-xs font-medium">Text</span>
      </Link>
      <Link
        href={`mailto:${EMAIL}`}
        className="flex flex-col items-center justify-center px-5 py-3 text-white hover:bg-navy-light transition-colors"
        aria-label="Email us"
      >
        <EnvelopeIcon className="w-5 h-5 mb-1" />
        <span className="text-xs font-medium">Email</span>
      </Link>
    </div>
  );
}
