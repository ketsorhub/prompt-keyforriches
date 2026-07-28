import { Link } from 'react-router-dom';

export default function ToolCard({ tool }) {
  const className = `tool-card ${tool.enabled ? 'is-enabled' : 'is-disabled'}`;

  const content = (
    <>
      {!tool.enabled && <span className="tool-card-badge">Coming Soon</span>}
      <div className="tool-card-icon">{tool.icon}</div>
      <h3>{tool.name}</h3>
      <p>{tool.tagline}</p>
      <span className="tool-card-cta">{tool.enabled ? 'Select Tool →' : 'Coming Soon'}</span>
    </>
  );

  if (!tool.enabled) {
    return (
      <div className={className} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <Link to={`/${tool.id}`} className={className}>
      {content}
    </Link>
  );
}
