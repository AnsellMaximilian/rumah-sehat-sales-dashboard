import './globals.css';

import Nav from './nav';
import AnalyticsWrapper from './analytics';
import { Suspense } from 'react';

export const metadata = {
  title: 'Rumah Sehat Dashboard',
  description: "Dashboard of Rumah Sehat's Sales Data"
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
