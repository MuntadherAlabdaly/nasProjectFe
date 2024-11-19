import './globals.css';

export const metadata = {
  title: 'Camera Streams',
  description: 'A page for showing camera streams with viewer counters',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
