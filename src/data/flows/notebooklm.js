const digestFields = {
  type: 'form',
  steps: [
    {
      key: 'sourceTypes',
      shortLabel: 'Sources',
      label: 'What sources have you added to this notebook?',
      type: 'textarea',
      placeholder: 'e.g., 3 PDFs of research papers, a folder of meeting transcripts, 2 websites, a podcast transcript...',
    },
    {
      key: 'questions',
      shortLabel: 'Questions',
      label: 'What do you want answered?',
      type: 'textarea',
      placeholder: 'List your questions, one per line, or describe what you need to know...',
    },
    {
      key: 'answerDepth',
      shortLabel: 'Depth',
      label: 'How much detail do you want in the answers?',
      type: 'cards',
      options: ['Short, direct answers', 'Detailed explanations with reasoning'],
    },
    {
      key: 'citationStyle',
      shortLabel: 'Citations',
      label: 'How should sources be cited?',
      type: 'cards',
      options: ['Inline citation markers', 'List sources at the end', "Don't need citations"],
    },
  ],
  template: (a) => `You are a careful research assistant who only draws conclusions from the material actually provided.
I have added sources to this NotebookLM notebook. Your task is to answer my questions based entirely on those sources and the details below.

SOURCES IN THIS NOTEBOOK
${a.sourceTypes}

QUESTIONS TO ANSWER
${a.questions}

- Answer depth: ${a.answerDepth}
- Citations: ${a.citationStyle}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. GROUNDING
- Answer strictly from the sources in this notebook. Do not pull in outside knowledge or assumptions.
- If a question can't be answered from the sources, say so explicitly instead of guessing.

2. STRUCTURE (MANDATORY)
A) A direct answer to each question, in order
B) Depth matching "${a.answerDepth}"
${a.citationStyle === 'Inline citation markers' ? 'C) Inline citation markers pointing to the specific source passage for every claim' : ''}
${a.citationStyle === 'List sources at the end' ? 'C) A "Sources Used" list at the end, mapping each answer back to the source(s) it came from' : ''}
D) A short note on anything the sources leave unclear or contradict each other on

3. QUALITY REQUIREMENTS
- Don't pad short answers or shortchange detailed ones — match "${a.answerDepth.toLowerCase()}" throughout.
- Flag any question the notebook's sources simply don't cover.

BEGIN THE SOURCE Q&A NOW.`,
  resultMeta: () => ({
    title: 'Source Q&A Prompt',
    extraInstruction: 'Add your source(s) to the notebook before asking — NotebookLM only answers from what you\'ve uploaded, so it won\'t see anything you haven\'t added.',
  }),
};

const studyguideFields = {
  type: 'form',
  steps: [
    {
      key: 'sourceTypes',
      shortLabel: 'Sources',
      label: 'What sources are in this notebook?',
      type: 'textarea',
      placeholder: "e.g., a semester's worth of lecture notes, a textbook chapter, an onboarding manual, a set of technical docs...",
    },
    {
      key: 'studyGoal',
      shortLabel: 'Goal',
      label: 'What are you studying for or trying to learn?',
      type: 'textarea',
      placeholder: 'e.g., an exam on cellular biology, ramping up on a new codebase, prepping for a certification...',
    },
    {
      key: 'outputType',
      shortLabel: 'Output type',
      label: 'What format do you want?',
      type: 'cards',
      options: ['Study guide with key concepts', 'FAQ (question & answer pairs)', 'Timeline of events', 'Glossary of key terms'],
    },
    {
      key: 'difficulty',
      shortLabel: 'Level',
      label: 'What level should it be pitched at?',
      type: 'cards',
      options: ['Beginner — explain from scratch', 'Intermediate — assume some background', 'Advanced — go deep, skip basics'],
    },
  ],
  template: (a) => `You are an experienced tutor who turns dense source material into material that's actually easy to study from.
I have added sources to this NotebookLM notebook. Your task is to build a ${a.outputType.toLowerCase()} based entirely on those sources and the details below.

SOURCES IN THIS NOTEBOOK
${a.sourceTypes}

WHAT I'M STUDYING FOR
${a.studyGoal}

- Output format: ${a.outputType}
- Level: ${a.difficulty}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. GROUNDING
- Build this entirely from the sources in the notebook — don't introduce outside facts or examples that aren't traceable back to them.
- Pull out what actually matters for "${a.studyGoal}", not just a generic recap of every source.

2. STRUCTURE (MANDATORY)
${a.outputType === 'Study guide with key concepts' ? 'A) Key concepts grouped by topic, each with a plain-language explanation\nB) Why each concept matters for the stated goal\nC) A short self-test (5-10 questions) at the end' : ''}${a.outputType === 'FAQ (question & answer pairs)' ? 'A) The most important questions someone studying this material would ask\nB) A clear, direct answer to each, pulled from the sources\nC) Grouped by topic if there are more than ~10 questions' : ''}${a.outputType === 'Timeline of events' ? 'A) Events in chronological order, each with date/sequence marker\nB) A one-line note on why each event matters\nC) Callouts for any cause-and-effect relationships between events' : ''}${a.outputType === 'Glossary of key terms' ? 'A) Every important term from the sources, alphabetized\nB) A plain-language definition for each, in the context the sources use it\nC) Related terms cross-referenced where useful' : ''}

3. QUALITY REQUIREMENTS
- Pitch the explanation at "${a.difficulty}" — don't over-explain to an advanced reader or skip basics for a beginner.
- Use headings and short chunks so it's easy to scan while studying.

BEGIN BUILDING THE ${a.outputType.toUpperCase()} NOW.`,
  resultMeta: () => ({
    title: 'Study Guide Prompt',
    extraInstruction: 'Add all the source material you want covered before running this — NotebookLM builds only from what\'s in the notebook.',
  }),
};

const briefingFields = {
  type: 'form',
  steps: [
    {
      key: 'sourceCount',
      shortLabel: 'Sources',
      label: 'How many sources are you synthesizing, and what are they?',
      type: 'textarea',
      placeholder: 'e.g., 5 competitor reports, 3 customer interview transcripts, 2 market research PDFs...',
    },
    {
      key: 'audience',
      shortLabel: 'Audience',
      label: 'Who is this briefing for?',
      type: 'text',
      placeholder: 'e.g., my exec team, a client, myself for a decision I need to make',
    },
    {
      key: 'focusAreas',
      shortLabel: 'Focus',
      label: 'What should the summary focus on?',
      type: 'textarea',
      placeholder: 'e.g., points of agreement and disagreement across sources, key risks, actionable takeaways...',
    },
    {
      key: 'length',
      shortLabel: 'Length',
      label: 'How long should the briefing be?',
      type: 'cards',
      options: ['One-page summary', 'Detailed multi-section report'],
    },
  ],
  template: (a) => `You are a sharp analyst who synthesizes multiple documents into one clear, decision-ready briefing.
I have added multiple sources to this NotebookLM notebook. Your task is to produce a briefing doc based entirely on those sources and the details below.

SOURCES TO SYNTHESIZE
${a.sourceCount}

AUDIENCE
${a.audience}

WHAT TO FOCUS ON
${a.focusAreas}

- Length: ${a.length}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. GROUNDING
- Synthesize only what's actually in the notebook's sources — don't fill gaps with outside knowledge.
- Explicitly call out where sources agree, where they conflict, and where only one source covers something.

2. STRUCTURE (MANDATORY)
A) Executive Summary (2-4 sentences the audience could read alone and get the headline)
B) Cross-Source Synthesis — where the sources agree, disagree, or complement each other
C) Key Findings, organized around: ${a.focusAreas}
D) Open Questions / Gaps — anything the sources don't resolve
E) Recommendation or Next Step, written for ${a.audience}

3. QUALITY REQUIREMENTS
- Match "${a.length}" — don't pad a one-pager or shortchange a detailed report.
- Write for ${a.audience} specifically: adjust jargon and detail level accordingly.
- Every claim should be traceable back to a specific source.

BEGIN THE BRIEFING DOC NOW.`,
  resultMeta: () => ({
    title: 'Briefing Doc Prompt',
    extraInstruction: 'Add every source you want synthesized before running this — NotebookLM only cross-references what\'s already in the notebook.',
  }),
};

const audioFields = {
  type: 'form',
  steps: [
    {
      key: 'sourceTypes',
      shortLabel: 'Sources',
      label: 'What sources should the Audio Overview cover?',
      type: 'textarea',
      placeholder: "e.g., this quarter's board deck and the meeting transcript, a research paper, a chapter of my book draft...",
    },
    {
      key: 'audienceLevel',
      shortLabel: 'Audience',
      label: 'Who is listening?',
      type: 'cards',
      options: ['Total beginners to the topic', 'People who already know the basics', 'Subject-matter experts'],
    },
    {
      key: 'focusInstruction',
      shortLabel: 'Focus',
      label: 'What should the hosts focus on or emphasize?',
      type: 'textarea',
      placeholder: 'e.g., spend more time on the financial risks, skip the background section, debate the two competing proposals...',
    },
    {
      key: 'tone',
      shortLabel: 'Tone',
      label: 'What tone should the conversation have?',
      type: 'cards',
      options: ['Casual and conversational', 'Professional and focused', 'Energetic and enthusiastic'],
    },
  ],
  template: (a) => `You are producing custom instructions for NotebookLM's Audio Overview (the AI podcast-style discussion of my sources).
The two hosts should discuss the sources in this notebook, following the direction below.

SOURCES TO COVER
${a.sourceTypes}

- Audience: ${a.audienceLevel}
- Tone: ${a.tone}

FOCUS INSTRUCTIONS
${a.focusInstruction}

----------------------------
CRITICAL INSTRUCTIONS FOR THE HOSTS
----------------------------

1. AUDIENCE CALIBRATION
- Pitch every explanation for "${a.audienceLevel.toLowerCase()}" — ${a.audienceLevel === 'Total beginners to the topic' ? 'define terms as you go, don\'t assume prior knowledge' : a.audienceLevel === 'People who already know the basics' ? 'skip the 101-level setup, get to what\'s actually interesting' : 'go deep fast, use precise terminology, skip basic definitions entirely'}.

2. FOCUS (MANDATORY)
- Prioritize time on: ${a.focusInstruction}
- Don't spend equal time on every part of the sources by default — weight the discussion toward what's listed above.

3. TONE
- Keep the conversation ${a.tone.toLowerCase()} throughout.
- Stay grounded in the actual sources — flag clearly if either host is speculating beyond what's written.

4. FORMAT
- Keep it a natural back-and-forth dialogue, not a monologue with one host just narrating.
- End with a short, clear takeaway a listener could repeat to someone else.

BEGIN THE AUDIO OVERVIEW WITH THESE INSTRUCTIONS.`,
  resultMeta: () => ({
    title: 'Audio Overview Brief',
    extraInstruction: 'Paste this into the "Customize" box before generating — Studio panel → Audio Overview → Customize (sliders/instructions icon) — then generate the Deep Dive.',
  }),
};

export const notebooklmFlow = {
  start: 'goal',
  nodes: {
    goal: {
      type: 'choice',
      title: 'What do you want NotebookLM to help with?',
      subtitle: 'Select the type of task you want a prompt for.',
      options: [
        {
          id: 'digest',
          label: 'Source Q&A / Research Digest',
          description: 'Ask focused questions, answered only from your uploaded sources.',
          icon: '\u{1F50D}',
          next: 'digestFields',
        },
        {
          id: 'studyguide',
          label: 'Study Guide & FAQ',
          description: 'Turn your sources into a study guide, FAQ, timeline, or glossary.',
          icon: '\u{1F4D6}',
          next: 'studyguideFields',
        },
        {
          id: 'briefing',
          label: 'Briefing Doc / Executive Summary',
          description: 'Synthesize multiple sources into one clear, decision-ready doc.',
          icon: '\u{1F4DD}',
          next: 'briefingFields',
        },
        {
          id: 'audio',
          label: 'Audio Overview Brief',
          description: 'Custom instructions to steer NotebookLM\'s Deep Dive podcast.',
          icon: '\u{1F3A7}',
          next: 'audioFields',
        },
      ],
    },
    digestFields,
    studyguideFields,
    briefingFields,
    audioFields,
  },
};

