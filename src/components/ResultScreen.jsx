import { useState } from 'react';
import { Link } from 'react-router-dom';
import { copyToClipboard, downloadTxt, slugify } from '../engine/promptUtils.js';

export default function ResultScreen({ tool, resultMeta, promptText, answers, fieldLabels, onRestart }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    downloadTxt(`${slugify(resultMeta.title)}-prompt.txt`, promptText);
  };

  return (
    <div className="result-wrap">
      <div className="result-header">
        <div className="result-icon">{tool.icon}</div>
        <h2>
          {tool.name} <span>{resultMeta.title}</span>
        </h2>
        <p>We&apos;ve put together your custom prompt &mdash; ready to paste in.</p>
      </div>

      <div className="result-panel">
        <h3>Instructions</h3>
        <ol className="result-instructions">
          <li>Click &ldquo;Copy Full Prompt&rdquo;.</li>
          <li>Open a new chat in {tool.name}.</li>
          <li>Paste it in and send.</li>
          {resultMeta.extraInstruction ? <li>{resultMeta.extraInstruction}</li> : null}
        </ol>
        <div className="result-actions">
          <button type="button" className="btn btn-primary" onClick={handleCopy}>
            Copy Full Prompt
          </button>
          <button type="button" className="btn btn-ghost" onClick={handleSave}>
            Save as .txt
          </button>
          {copied ? <span className="copy-toast">Copied!</span> : null}
        </div>
      </div>

      <details className="result-collapsible">
        <summary>Your Answers</summary>
        <pre>
          {Object.entries(answers)
            .map(([key, value]) => `${fieldLabels[key] || key}: ${value}`)
            .join('\n')}
        </pre>
      </details>

      <details className="result-collapsible" open>
        <summary>Generated Prompt</summary>
        <pre>{promptText}</pre>
      </details>

      <div className="wizard-actions">
        <button type="button" className="btn btn-ghost" onClick={onRestart}>
          &larr; Start Over
        </button>
        <Link to="/" className="btn btn-primary">
          Back to All Tools
        </Link>
      </div>
    </div>
  );
}
