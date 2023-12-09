import React from 'react';

import { HasChildren } from '@/models/ui/layout.model';

export default function layout({ children }: HasChildren) {
  return (
    <main className="flex justify-center items-center h-screen">
      {children}
    </main>
  );
}
