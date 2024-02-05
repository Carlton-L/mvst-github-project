import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Github User Browser',
  description: 'Frontend Portfolio project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap'
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
