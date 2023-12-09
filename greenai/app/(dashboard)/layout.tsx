"use client";

import React from 'react';

import { Palmtree } from 'lucide-react';
import Link from 'next/link';
import {
  usePathname,
  useRouter,
} from 'next/navigation';

import { Card } from '@/components/ui/card';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { HasChildren } from '@/models/ui/layout.model';
import { UserButton } from '@clerk/nextjs';

import { navItems } from './util/nav-items';

export default function DashboardLayout({ children }: HasChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const selectedRoute = navItems.find((item) => item.href === pathname);

  return (
    <>
      <nav className="flex justify-between items-center py-2 px-4 fixed w-full top-0 bg-white">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-green-600 px-2 md:px-4"
        >
          <Palmtree />
          <span className="font-semibold hidden md:inline-block">Greenai</span>
        </Link>
        <Tabs defaultValue={pathname} onValueChange={(url) => router.push(url)}>
          <TabsList>
            {navItems.map((item) => (
              <TabsTrigger
                key={item.href}
                value={item.href}
                className={item.color}
              >
                <item.icon size={20} />
                <span className="ml-1 hidden lg:inline-block">
                  {item.label}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>

      <section className="min-h-screen p-4 pt-14">
        <Card className="p-4 h-full">
          {selectedRoute && (
            <h2 className={cn("flex gap-2 mb-4", selectedRoute.color)}>
              <selectedRoute.icon />{" "}
              <span className="font-semibold underline underline-offset-2">
                {selectedRoute.label}
              </span>
            </h2>
          )}
          {children}
        </Card>
      </section>
    </>
  );
}
