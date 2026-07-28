export default function FormStep({ step, value, onChange }) {
  return (
    <div className="wizard-panel">
      <h3>{step.label}</h3>
      {step.helpText ? <p className="wizard-subtitle">{step.helpText}</p> : null}

      {step.type === 'text' && (
        <input
          type="text"
          className="field-input"
          placeholder={step.placeholder || ''}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
      )}

      {step.type === 'textarea' && (
        <textarea
          className="field-textarea"
          placeholder={step.placeholder || ''}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
      )}

      {step.type === 'cards' && (
        <div className="field-cards">
          {step.options.map((option) => (
            <button
              key={option}
              type="button"
              className={`field-card${value === option ? ' is-selected' : ''}`}
              onClick={() => onChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
