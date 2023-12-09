import React from 'react';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { navItems } from '../util/nav-items';

export default function DashboardPage() {
  return (
    <div className="md:w-1/2 md:mx-auto">
      <h2 className="font-bold text-4xl mb-4">Features We Offer</h2>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-2 py-4 transition-all hover:ml-4 hover:font-semibold",
            item.color
          )}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
          <ArrowRight size={20} />
        </Link>
      ))}
    </div>
  );
}
