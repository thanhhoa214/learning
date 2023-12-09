import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen gap-4">
      <Link href="/sign-in">
        <Button variant="secondary" size="lg">
          Sign In
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button size="lg">Sign Up</Button>
      </Link>
    </div>
  );
}
