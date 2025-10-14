export const metadata = {
  title: 'People Flow',
  description: 'Create an unmatched flow of people to your product',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}