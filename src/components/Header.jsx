import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="kfr-logo" aria-label="KeyForRiches Home">
          <div className="kfr-logo-wordmark">KEYFORRICHES</div>
          <div className="kfr-logo-rule" />
          <div className="kfr-logo-tagline">Free AI &amp; SEO Tools</div>
        </Link>

        <div className="header-title">
          Free <span>AI Prompt</span> Generator
        </div>

        <nav className="header-nav">
          <Link to="/">Home</Link>
          <a href="https://tools.keyforriches.com/">More Tools</a>
        </nav>
      </div>
    </header>
  );
}
