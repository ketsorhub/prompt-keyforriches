export default function ChoiceStep({ title, subtitle, options, onSelect }) {
  return (
    <div className="wizard-panel">
      <h3>{title}</h3>
      {subtitle ? <p className="wizard-subtitle">{subtitle}</p> : null}
      <div className="choice-grid">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="choice-card"
            onClick={() => onSelect(option)}
          >
            {option.icon ? <div className="choice-card-icon">{option.icon}</div> : null}
            <h4>{option.label}</h4>
            <p>{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
