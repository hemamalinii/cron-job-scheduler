import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Cron Job Scheduler</h1>
      <p>Welcome to your cron job scheduler app!</p>
      <Link href="/jobs"><a>Manage Your Jobs</a></Link>
      <br />
      <Link href="/auth"><a>Login/Signup</a></Link>
    </div>
  );
}
