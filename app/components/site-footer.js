export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-container footer-wrap">
        <p>RenovAIHub</p>
        <p>AI-guided renovation planning and delivery support.</p>
        <p>{year} RenovAIHub. All rights reserved.</p>
      </div>
    </footer>
  );
}