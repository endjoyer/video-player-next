import type { Metadata } from 'next';
import './globals.css';
import './styles/custom-ant-styles.css';

export const metadata: Metadata = {
  title: 'Video player',
  description: 'Video player next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
