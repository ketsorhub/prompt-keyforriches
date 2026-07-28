import { useMemo, useReducer } from 'react';
import { Link } from 'react-router-dom';
import ChoiceStep from '../components/ChoiceStep.jsx';
import FormStep from '../components/FormStep.jsx';
import ResultScreen from '../components/ResultScreen.jsx';

const initialState = {
  currentNodeId: null,
  fieldIndex: 0,
  showResult: false,
  history: [],
  answers: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHOOSE': {
      const snapshot = {
        currentNodeId: state.currentNodeId,
        fieldIndex: state.fieldIndex,
        showResult: state.showResult,
      };
      return {
        ...state,
        history: [...state.history, snapshot],
        currentNodeId: action.nextNodeId,
        fieldIndex: 0,
        showResult: false,
      };
    }
    case 'SET_ANSWER': {
      return {
        ...state,
        answers: { ...state.answers, [action.key]: action.value },
      };
    }
    case 'GO_NEXT': {
      const snapshot = {
        currentNodeId: state.currentNodeId,
        fieldIndex: state.fieldIndex,
        showResult: state.showResult,
      };
      const isLastField = state.fieldIndex + 1 >= action.totalFields;
      return {
        ...state,
        history: [...state.history, snapshot],
        fieldIndex: isLastField ? state.fieldIndex : state.fieldIndex + 1,
        showResult: isLastField,
      };
    }
    case 'GO_BACK': {
      if (state.history.length === 0) return state;
      const prev = state.history[state.history.length - 1];
      return {
        ...state,
        history: state.history.slice(0, -1),
        currentNodeId: prev.currentNodeId,
        fieldIndex: prev.fieldIndex,
        showResult: prev.showResult,
      };
    }
    case 'RESET':
      return { ...initialState, currentNodeId: action.startNodeId };
    default:
      return state;
  }
}

export default function WizardEngine({ tool }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    currentNodeId: tool.flow.start,
  });

  const fieldLabels = useMemo(() => {
    const labels = {};
    Object.values(tool.flow.nodes).forEach((node) => {
      if (node.type === 'form') {
        node.steps.forEach((step) => {
          labels[step.key] = step.shortLabel || step.label;
        });
      }
    });
    return labels;
  }, [tool]);

  const node = tool.flow.nodes[state.currentNodeId];

  if (state.showResult && node?.type === 'form') {
    const promptText = node.template(state.answers);
    const resultMeta = node.resultMeta(state.answers);
    return (
      <div className="page-wrap">
        <ResultScreen
          tool={tool}
          resultMeta={resultMeta}
          promptText={promptText}
          answers={state.answers}
          fieldLabels={fieldLabels}
          onRestart={() => dispatch({ type: 'RESET', startNodeId: tool.flow.start })}
        />
      </div>
    );
  }

  const handleBack = () => {
    if (state.history.length === 0) return;
    dispatch({ type: 'GO_BACK' });
  };

  return (
    <div className="page-wrap">
      <div className="wizard-wrap">
        {state.history.length === 0 ? (
          <Link to="/" className="wizard-back">
            &larr; Back to Tools
          </Link>
        ) : (
          <button type="button" className="wizard-back" onClick={handleBack}>
            &larr; Back
          </button>
        )}

        {node.type === 'choice' && (
          <ChoiceStep
            title={node.title}
            subtitle={node.subtitle}
            options={node.options}
            onSelect={(option) => dispatch({ type: 'CHOOSE', nextNodeId: option.next })}
          />
        )}

        {node.type === 'form' && (
          <>
            <div className="wizard-heading">
              <h2>
                Building with <span>{tool.name}</span>
              </h2>
              <span className="wizard-step-count">
                {state.fieldIndex + 1} of {node.steps.length}
              </span>
            </div>
            <div className="wizard-progress">
              <div
                className="wizard-progress-bar"
                style={{ width: `${((state.fieldIndex + 1) / node.steps.length) * 100}%` }}
              />
            </div>

            <FormStep
              step={node.steps[state.fieldIndex]}
              value={state.answers[node.steps[state.fieldIndex].key]}
              onChange={(value) =>
                dispatch({ type: 'SET_ANSWER', key: node.steps[state.fieldIndex].key, value })
              }
            />

            <div className="wizard-actions">
              <button type="button" className="btn btn-ghost" onClick={handleBack}>
                &larr; Previous
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!state.answers[node.steps[state.fieldIndex].key]}
                onClick={() => dispatch({ type: 'GO_NEXT', totalFields: node.steps.length })}
              >
                {state.fieldIndex + 1 === node.steps.length ? 'Generate Prompt' : 'Next'} &rarr;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
