const visualFields = {
  type: 'form',
  steps: [
    {
      key: 'imageContext',
      shortLabel: 'What the image shows',
      label: "What's in the image (or images) you'll upload?",
      type: 'textarea',
      placeholder: 'Describe what you\'re uploading, e.g., a screenshot of a spreadsheet, a photo of a whiteboard, a product photo...',
    },
    {
      key: 'analysisGoal',
      shortLabel: 'Goal',
      label: 'What should Gemini do with it?',
      type: 'cards',
      options: ['Describe & caption', 'Extract data or text (OCR)', 'Compare multiple images', 'Critique or give feedback'],
    },
    {
      key: 'outputFormat',
      shortLabel: 'Output format',
      label: 'How should the result be presented?',
      type: 'cards',
      options: ['Plain paragraph', 'Bullet list', 'Structured table'],
    },
    {
      key: 'detailLevel',
      shortLabel: 'Detail level',
      label: 'How much detail do you need?',
      type: 'cards',
      options: ['Quick summary', 'Detailed analysis'],
    },
  ],
  template: (a) => `You are a meticulous visual analyst with strong attention to detail.
I am attaching one or more images along with this prompt. Your task is to analyze them based entirely on the details below.

IMAGE CONTEXT
${a.imageContext}

TASK
- Goal: ${a.analysisGoal}
- Output format: ${a.outputFormat}
- Detail level: ${a.detailLevel}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. GROUNDING
- Base every observation strictly on what is actually visible in the attached image(s). Do not invent details that aren't there.
- If something is unclear or ambiguous in the image, say so explicitly rather than guessing.

2. STRUCTURE (MANDATORY)
A) A one-line summary of what the image(s) show
B) The main analysis, matching the goal (${a.analysisGoal.toLowerCase()}), presented as: ${a.outputFormat.toLowerCase()}
C) Anything notable, unusual, or worth double-checking
${a.analysisGoal === 'Compare multiple images' ? 'D) A direct side-by-side comparison highlighting the key differences and similarities' : ''}

3. QUALITY REQUIREMENTS
- Match the depth to "${a.detailLevel}" — don't pad a quick summary or shortchange a detailed analysis.
- If extracting text or data, preserve the original formatting and structure as closely as possible.

BEGIN THE VISUAL ANALYSIS NOW.`,
  resultMeta: () => ({
    title: 'Visual Analysis Prompt',
    extraInstruction: 'Attach your image(s) to the chat before sending this prompt — Gemini needs the actual file(s) to analyze.',
  }),
};

const longdocFields = {
  type: 'form',
  steps: [
    {
      key: 'docType',
      shortLabel: 'Document type',
      label: 'What kind of document are you working with?',
      type: 'cards',
      options: ['Contract or legal doc', 'Research paper or report', 'Meeting transcript', 'Codebase or technical docs', 'Book manuscript'],
    },
    {
      key: 'docGoal',
      shortLabel: 'Goal',
      label: 'What do you want out of it?',
      type: 'textarea',
      placeholder: 'e.g., find every clause that mentions termination, summarize the key decisions, spot inconsistencies...',
    },
    {
      key: 'keyQuestions',
      shortLabel: 'Key questions',
      label: 'Any specific questions it should answer?',
      type: 'textarea',
      placeholder: 'List specific questions, one per line, or leave blank for a general pass...',
    },
    {
      key: 'outputFormat',
      shortLabel: 'Output format',
      label: 'How should the findings be presented?',
      type: 'cards',
      options: ['Executive summary', 'Detailed breakdown by section', 'Q&A format'],
    },
  ],
  template: (a) => `You are a meticulous document analyst who reads long, complex material end-to-end without skimming.
I am pasting or attaching the full document along with this prompt. Your task is to analyze it based entirely on the details below.

DOCUMENT DETAILS
- Type: ${a.docType}
- What I need: ${a.docGoal}
- Specific questions to answer: ${a.keyQuestions || 'none — give a general analysis'}
- Preferred output format: ${a.outputFormat}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. COVERAGE
- Read and account for the ENTIRE document, not just the beginning. Use your full context window — this is exactly the kind of task it's built for.
- Reference specific sections, page numbers, or timestamps where relevant so I can find things quickly.

2. STRUCTURE (MANDATORY)
A) A short overview of the document (what it is, its scope)
B) The main analysis, presented as: ${a.outputFormat.toLowerCase()}
C) Direct answers to each specific question listed above, if any were given
D) Anything that seems missing, contradictory, or worth flagging for human review

3. QUALITY REQUIREMENTS
- Be precise and cite the part of the document each claim comes from.
- Don't summarize generically — pull out the details that actually matter for a ${a.docType.toLowerCase()}.

BEGIN THE DOCUMENT ANALYSIS NOW.`,
  resultMeta: () => ({
    title: 'Long-Document Analysis Prompt',
    extraInstruction: 'Paste or attach the full document before sending — Gemini\'s large context window can handle very long files in one go.',
  }),
};

const workspaceFields = {
  type: 'form',
  steps: [
    {
      key: 'workspaceApp',
      shortLabel: 'App',
      label: 'Which Google Workspace app is this for?',
      type: 'cards',
      options: ['Gmail', 'Google Docs', 'Google Sheets', 'Google Slides'],
    },
    {
      key: 'task',
      shortLabel: 'Task',
      label: 'What do you need written or built?',
      type: 'textarea',
      placeholder: 'Describe the task, e.g., a follow-up email to a client, a project status doc, a budget tracker...',
    },
    {
      key: 'context',
      shortLabel: 'Background',
      label: 'Any background info or data Gemini should use?',
      type: 'textarea',
      placeholder: 'Paste relevant details, past messages, numbers, or context here...',
    },
    {
      key: 'tone',
      shortLabel: 'Tone',
      label: 'What tone should it have?',
      type: 'cards',
      options: ['Professional', 'Friendly', 'Concise', 'Persuasive'],
    },
  ],
  template: (a) => `You are a skilled ${a.workspaceApp} power user who writes fast, polished, workplace-ready content.
Your task is to produce COMPLETE, ready-to-use ${a.workspaceApp} content based entirely on the details below.

TASK DETAILS
- App: ${a.workspaceApp}
- What's needed: ${a.task}
- Background / data to use: ${a.context || 'none provided — use reasonable assumptions and flag them'}
- Tone: ${a.tone}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. FORMAT FOR ${a.workspaceApp.toUpperCase()}
${a.workspaceApp === 'Gmail' ? '- Write a complete email: subject line, greeting, body, and sign-off, ready to paste directly into a compose window.' : ''}
${a.workspaceApp === 'Google Docs' ? '- Structure with clear headings and sections, ready to paste directly into a Doc.' : ''}
${a.workspaceApp === 'Google Sheets' ? '- Lay out exact column headers and any formulas needed, written as real Sheets formulas ready to paste into cells.' : ''}
${a.workspaceApp === 'Google Slides' ? '- Break the content into a slide-by-slide outline: slide title plus 3-5 bullet points per slide.' : ''}

2. QUALITY REQUIREMENTS
- Write in a ${a.tone.toLowerCase()} tone throughout.
- Use the background/data provided directly — don't ignore it or make up conflicting details.
- Keep it ready to use as-is, with no placeholders like "[insert here]" unless information is genuinely missing.

PRODUCE THE FULL ${a.workspaceApp.toUpperCase()} CONTENT NOW.`,
  resultMeta: () => ({
    title: 'Workspace Content Prompt',
    extraInstruction: 'If using this inside Gmail or Docs directly, Gemini can already see the surrounding thread or document — mention that context by name if it should use it.',
  }),
};

const researchFields = {
  type: 'form',
  steps: [
    {
      key: 'researchTopic',
      shortLabel: 'Topic',
      label: 'What do you want researched?',
      type: 'text',
      placeholder: 'e.g., current EV tax credit rules, recent competitor pricing changes',
    },
    {
      key: 'researchGoal',
      shortLabel: 'Goal',
      label: 'What decision or outcome should this inform?',
      type: 'textarea',
      placeholder: 'What will you do differently once you have this information?',
    },
    {
      key: 'depth',
      shortLabel: 'Depth',
      label: 'How deep should the analysis go?',
      type: 'cards',
      options: ['Quick overview', 'Moderate deep-dive', 'Comprehensive report'],
    },
    {
      key: 'citationsNeeded',
      shortLabel: 'Citations',
      label: 'Do you need sources cited?',
      type: 'cards',
      options: ['Yes, cite real sources', 'No citations needed'],
    },
  ],
  template: (a) => `You are a sharp research analyst who separates signal from noise and grounds every claim in real, current information.
Your task is to produce a COMPLETE analysis based entirely on the details below.

RESEARCH BRIEF
- Topic: ${a.researchTopic}
- This should inform: ${a.researchGoal}
- Depth required: ${a.depth}
- Citations: ${a.citationsNeeded}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. GROUNDING
- Use Google Search grounding to check current facts before answering — don't rely on memory alone for anything time-sensitive (prices, regulations, recent events).
${a.citationsNeeded === 'Yes, cite real sources' ? '- Cite the actual sources you used for each key claim, with links where possible.' : '- You don\'t need to cite sources, but still verify facts before stating them as current.'}

2. STRUCTURE (MANDATORY)
A) Executive Summary (2-3 sentences — the headline takeaway)
B) Key Findings, matched to "${a.depth}"
C) Analysis — what the findings actually mean for the decision described above
D) Clear Recommendation — what you would do in my position, and why
E) Caveats — anything uncertain, outdated, or worth verifying independently

3. QUALITY REQUIREMENTS
- Be direct about uncertainty. If information is unclear or conflicting, say so rather than guessing.
- Keep the recommendation section actionable, not just descriptive.

BEGIN THE RESEARCH ANALYSIS NOW.`,
  resultMeta: () => ({
    title: 'Grounded Research Prompt',
    extraInstruction: 'Turn on Gemini\'s search grounding / "Deep Research" mode if available before sending, so facts are checked against live results.',
  }),
};

export const geminiFlow = {
  start: 'goal',
  nodes: {
    goal: {
      type: 'choice',
      title: 'What do you want Gemini to help with?',
      subtitle: 'Select the type of task you want a prompt for.',
      options: [
        {
          id: 'visual',
          label: 'Image & Visual Analysis',
          description: 'Describe, extract, or compare content from images you upload.',
          icon: '\u{1F5BC}\u{FE0F}',
          next: 'visualFields',
        },
        {
          id: 'longdoc',
          label: 'Long-Document Analysis',
          description: 'Summarize or interrogate long contracts, transcripts, or reports.',
          icon: '\u{1F4C4}',
          next: 'longdocFields',
        },
        {
          id: 'workspace',
          label: 'Google Workspace Writing',
          description: 'Draft emails, docs, sheets, or slides ready to paste in.',
          icon: '\u{1F4E7}',
          next: 'workspaceFields',
        },
        {
          id: 'research',
          label: 'Grounded Research',
          description: 'Search-backed research with current, citable facts.',
          icon: '\u{1F50E}',
          next: 'researchFields',
        },
      ],
    },
    visualFields,
    longdocFields,
    workspaceFields,
    researchFields,
  },
};
