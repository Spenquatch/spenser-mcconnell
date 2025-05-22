import { Inter } from 'next/font/google';
import './globals.css';
import Layout from '@/components/layout/Layout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Spenser McConnell',
  description: 'Personal brand hub featuring project portfolio, updates timeline, AI A Day newsletter, and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
