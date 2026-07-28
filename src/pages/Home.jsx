import { TOOLS } from '../data/tools.js';
import ToolCard from '../components/ToolCard.jsx';

export default function Home() {
  return (
    <div className="page-wrap">
      <div className="page-hero">
        <span className="eyebrow">AI Prompt Generator</span>
        <h1>
          Prompt <span>Maker</span>
        </h1>
        <p>
          Pick your AI model, answer a few quick questions, and get a ready-to-paste prompt built
          for exactly what you're trying to make. Free, no signup.
        </p>
      </div>

      <div className="tool-grid">
        {TOOLS.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
