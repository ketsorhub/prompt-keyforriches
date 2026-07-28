import { useParams, Link } from 'react-router-dom';
import { getToolMeta } from '../data/tools.js';
import { FLOWS } from '../data/flows/index.js';
import WizardEngine from '../engine/WizardEngine.jsx';

export default function ToolPage() {
  const { toolId } = useParams();
  const meta = getToolMeta(toolId);
  const flow = FLOWS[toolId];

  if (!meta || !meta.enabled || !flow) {
    return (
      <div className="page-wrap">
        <div className="page-hero">
          <h1>Tool not available yet</h1>
          <p>
            This one's on the way. <Link to="/">Head back to all tools</Link>.
          </p>
        </div>
      </div>
    );
  }

  const tool = { ...meta, flow };
  return <WizardEngine tool={tool} />;
}
