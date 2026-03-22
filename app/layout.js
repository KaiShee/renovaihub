import "./globals.css";

export const metadata = {
  title: "RenovAIHub | Renovation Planning Platform",
  description:
    "Plan renovations with AI-guided scope, budget estimates, and timeline clarity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}