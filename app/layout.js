import "./globals.css";
import SiteFooter from "./components/site-footer.js";
import SiteHeader from "./components/site-header.js";

export const metadata = {
  title: "RenovAIHub | Renovation Planning Platform",
  description:
    "Plan renovations with AI-guided scope, budget estimates, and timeline clarity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <div className="site-container page-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}