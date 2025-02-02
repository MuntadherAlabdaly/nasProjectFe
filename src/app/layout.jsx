import './globals.css';

export const metadata = {
  title: 'Bu-Taama - Live Kitchen Streams',
  description: 'Watch our chefs prepare your favorite meals in real-time at Bu-Taama!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
