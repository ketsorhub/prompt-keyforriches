const writingFields = {
  type: 'form',
  steps: [
    {
      key: 'contentType',
      shortLabel: 'Content type',
      label: 'What are you writing?',
      type: 'cards',
      options: ['Blog Post', 'Email', 'Script', 'Story or Narrative'],
    },
    {
      key: 'topic',
      shortLabel: 'Topic',
      label: 'What should it be about?',
      type: 'textarea',
      placeholder: 'Describe the topic, angle, or key points to cover...',
    },
    {
      key: 'audience',
      shortLabel: 'Audience',
      label: 'Who is the audience?',
      type: 'text',
      placeholder: 'e.g., first-time home buyers, existing customers, casual readers',
    },
    {
      key: 'tone',
      shortLabel: 'Tone',
      label: 'What tone should it have?',
      type: 'cards',
      options: ['Professional', 'Conversational', 'Persuasive', 'Playful'],
    },
    {
      key: 'length',
      shortLabel: 'Length',
      label: 'Roughly how long should it be?',
      type: 'cards',
      options: ['Short (under 500 words)', 'Medium (500–1,500 words)', 'Long (1,500+ words)'],
    },
  ],
  template: (a) => `You are an expert editor and content strategist with a sharp, engaging writing voice.
Your task is to write a COMPLETE, PUBLISH-READY piece based entirely on the details below.

CONTENT DETAILS
- Format: ${a.contentType}
- Topic / angle: ${a.topic}
- Audience: ${a.audience}
- Tone: ${a.tone}
- Target length: ${a.length}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. STRUCTURE
- Open with a hook that earns the reader's attention in the first sentence.
- Organize the body so each section builds on the last — no rambling or repeated points.
- Close with a clear takeaway or call to action appropriate for a ${a.contentType.toLowerCase()}.

2. VOICE
- Write in a ${a.tone.toLowerCase()} tone throughout, consistently.
- Write for this exact audience: ${a.audience}. Avoid jargon they wouldn't use themselves.
- Match the target length (${a.length}) — don't pad it out or cut it short.

3. QUALITY REQUIREMENTS
- Every paragraph should earn its place. Cut anything generic or filler.
- Use specific, concrete language over vague claims.

WRITE THE FULL ${a.contentType.toUpperCase()} NOW.`,
  resultMeta: () => ({
    title: 'Writing Prompt',
    extraInstruction: 'If Claude asks about specific facts or examples to include, add them before it writes the final draft.',
  }),
};

const codeFields = {
  type: 'form',
  steps: [
    {
      key: 'projectType',
      shortLabel: 'Project type',
      label: 'What are you building?',
      type: 'cards',
      options: ['Script', 'Web App', 'API', 'Automation'],
    },
    {
      key: 'language',
      shortLabel: 'Language/stack',
      label: 'What language or stack should it use?',
      type: 'text',
      placeholder: 'e.g., Python, JavaScript/React, Node.js',
    },
    {
      key: 'whatItShouldDo',
      shortLabel: 'What it should do',
      label: 'What should it actually do?',
      type: 'textarea',
      placeholder: 'Describe the functionality in as much detail as you can...',
    },
    {
      key: 'constraints',
      shortLabel: 'Constraints',
      label: 'Any constraints Claude should follow?',
      type: 'textarea',
      placeholder: 'e.g., must run in the browser, no external dependencies, keep it under 200 lines...',
    },
    {
      key: 'experienceLevel',
      shortLabel: 'Your experience level',
      label: 'How comfortable are you with code?',
      type: 'cards',
      options: ["I'm a beginner — explain as you go", 'Intermediate', "I'm experienced — just build it"],
    },
  ],
  template: (a) => `You are a senior software engineer who writes clean, production-quality code and explains it clearly.
Your task is to build a COMPLETE, WORKING solution based entirely on the details below.

PROJECT DETAILS
- Type: ${a.projectType}
- Language / stack: ${a.language}
- What it should do: ${a.whatItShouldDo}
- Constraints: ${a.constraints}
- My experience level: ${a.experienceLevel}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. STRUCTURE (MANDATORY)
A) A short plan — what you're going to build and why, in 3-5 bullet points
B) The complete, working code (${a.language}), with no missing pieces or "add your logic here" placeholders
C) A brief explanation of how it works
D) Edge cases you handled, and any you deliberately did not
${a.experienceLevel.startsWith("I'm a beginner") ? 'E) Extra: explain any non-obvious lines or concepts as if I\'m new to this' : ''}

2. QUALITY REQUIREMENTS
- Respect these constraints exactly: ${a.constraints || 'none specified'}.
- Code must run as-is when copied into the right file/environment.
- Prefer clarity over cleverness.

BUILD THE FULL SOLUTION NOW.`,
  resultMeta: () => ({
    title: 'Code Prompt',
    extraInstruction: 'Paste any existing code or error messages into the same chat before sending, if this builds on something you already have.',
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
      placeholder: 'e.g., competitor pricing in the meal-kit industry',
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
      key: 'outputFormat',
      shortLabel: 'Output format',
      label: 'How should the findings be presented?',
      type: 'cards',
      options: ['Bullet summary', 'Structured report', 'Comparison table'],
    },
  ],
  template: (a) => `You are a sharp research analyst who separates signal from noise and gives honest, well-reasoned conclusions.
Your task is to produce a COMPLETE analysis based entirely on the details below.

RESEARCH BRIEF
- Topic: ${a.researchTopic}
- This should inform: ${a.researchGoal}
- Depth required: ${a.depth}
- Preferred output format: ${a.outputFormat}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. STRUCTURE (MANDATORY)
A) Executive Summary (2-3 sentences — the headline takeaway)
B) Key Findings, presented as a ${a.outputFormat.toLowerCase()}
C) Analysis — what the findings actually mean for the decision described above
D) Clear Recommendation — what you would do in my position, and why
E) Caveats — what you're uncertain about or where I should verify independently

2. QUALITY REQUIREMENTS
- Match the depth to "${a.depth}" — don't over- or under-deliver.
- Be direct about uncertainty. If you don't have reliable information on something, say so rather than guessing.
- Keep the recommendation section actionable, not just descriptive.

BEGIN THE RESEARCH ANALYSIS NOW.`,
  resultMeta: () => ({
    title: 'Research Prompt',
    extraInstruction: 'For anything time-sensitive, ask Claude to flag findings that may be outdated and worth double-checking.',
  }),
};

export const claudeFlow = {
  start: 'goal',
  nodes: {
    goal: {
      type: 'choice',
      title: 'What do you want Claude to help with?',
      subtitle: 'Select the type of task you want a prompt for.',
      options: [
        {
          id: 'writing',
          label: 'Writing & Content',
          description: 'Blog posts, emails, scripts, and long-form content.',
          icon: '✍️',
          next: 'writingFields',
        },
        {
          id: 'code',
          label: 'Code & Technical Build',
          description: 'Scripts, web apps, APIs, and automations.',
          icon: '\u{1F4BB}',
          next: 'codeFields',
        },
        {
          id: 'research',
          label: 'Research & Analysis',
          description: 'Deep-dive research to support a decision.',
          icon: '\u{1F50D}',
          next: 'researchFields',
        },
      ],
    },
    writingFields,
    codeFields,
    researchFields,
  },
};
