const researchFields = {
  type: 'form',
  steps: [
    {
      key: 'question',
      shortLabel: 'Question',
      label: 'What do you want Perplexity to research?',
      type: 'textarea',
      placeholder: 'e.g., how do heat pumps perform in cold climates compared with gas furnaces, what changed in EU AI regulation this year...',
    },
    {
      key: 'purpose',
      shortLabel: 'Purpose',
      label: 'What will you use the answer for?',
      type: 'textarea',
      placeholder: 'e.g., deciding what to install in my home, a briefing for my team, background for an article...',
    },
    {
      key: 'depth',
      shortLabel: 'Depth',
      label: 'How detailed should the answer be?',
      type: 'cards',
      options: ['Quick summary', 'Structured overview', 'In-depth report'],
    },
    {
      key: 'sourceType',
      shortLabel: 'Sources',
      label: 'Which sources should it favor?',
      type: 'cards',
      options: ['Official and primary sources', 'Academic and peer-reviewed', 'Recent news and reporting', 'Any reputable source'],
    },
  ],
  template: (a) => `Research the following question using current web sources and give me a well-cited answer.

QUESTION
${a.question}

WHY I NEED IT
${a.purpose}

- Level of detail: ${a.depth}
- Preferred sources: ${a.sourceType}

----------------------------
INSTRUCTIONS
----------------------------

1. SOURCES
- Prioritize: ${a.sourceType.toLowerCase()}.
- Cite a source for every factual claim, and note the publication date of anything time-sensitive.
- If sources disagree, show both positions and say which is better supported and why.

2. ANSWER FORMAT
${a.depth === 'Quick summary' ? '- Open with a direct answer in 2-3 sentences, then at most 5 short bullet points of supporting facts.' : ''}${a.depth === 'Structured overview' ? '- Open with a direct answer, then organize the findings under clear headings, with the key facts, numbers and caveats under each.' : ''}${a.depth === 'In-depth report' ? '- Write a full report: executive summary, background, detailed findings under headings, points of disagreement, limitations, and a short list of practical takeaways.' : ''}

3. HONESTY
- Separate established facts from estimates and opinions, and say when information is missing, outdated or uncertain instead of guessing.
- Tailor the takeaways to this goal: ${a.purpose}

4. FOLLOW-UPS
- End with 3 follow-up questions that would deepen the research.

BEGIN RESEARCHING NOW.`,
  resultMeta: () => ({
    title: 'Cited Research Prompt',
    extraInstruction: 'Paste into Perplexity with Search or Pro Search on. For broad topics, switch to Deep Research mode. Use the suggested follow-up questions to dig further in the same thread.',
  }),
};

const compareFields = {
  type: 'form',
  steps: [
    {
      key: 'options',
      shortLabel: 'Options',
      label: 'What are you comparing? List the options, one per line',
      type: 'textarea',
      placeholder: 'e.g.:\nNotion\nObsidian\nEvernote',
    },
    {
      key: 'criteria',
      shortLabel: 'Criteria',
      label: 'What matters most in the decision?',
      type: 'textarea',
      placeholder: 'e.g., price, offline access, privacy, ease of use, integrations, long-term reliability...',
    },
    {
      key: 'situation',
      shortLabel: 'Situation',
      label: 'Describe your situation or use case',
      type: 'textarea',
      placeholder: 'e.g., a solo freelancer with a small budget who works offline on flights...',
    },
    {
      key: 'format',
      shortLabel: 'Format',
      label: 'How should the result be presented?',
      type: 'cards',
      options: ['Comparison table plus recommendation', 'Pros and cons for each option', 'Ranked list with reasoning'],
    },
  ],
  template: (a) => `Compare the following options using current, verifiable information from the web.

OPTIONS
${a.options.split('\n').filter(Boolean).map((o, i) => `${i + 1}. ${o.trim()}`).join('\n')}

WHAT MATTERS MOST
${a.criteria}

MY SITUATION
${a.situation}

- Output format: ${a.format}

----------------------------
INSTRUCTIONS
----------------------------

1. GATHER CURRENT FACTS
- Look up the latest pricing, features and limitations for each option from official pages and independent reviews.
- Cite every source and flag any figure that might be outdated.

2. COMPARE
- Evaluate each option against these criteria: ${a.criteria}
${a.format === 'Comparison table plus recommendation' ? '- Present a table with one row per criterion and one column per option, followed by a clear recommendation.' : ''}${a.format === 'Pros and cons for each option' ? '- For each option give 3-5 pros and 3-5 cons, specific rather than generic.' : ''}${a.format === 'Ranked list with reasoning' ? '- Rank the options from best to worst for my situation and explain each ranking in 2-3 sentences.' : ''}

3. RECOMMEND
- Give a single clear recommendation for my situation (${a.situation}) and name the one condition under which a different option would win.
- Do not favor any option because it is popular; base the verdict on the evidence.

COMPARE THEM NOW.`,
  resultMeta: () => ({
    title: 'Comparison Prompt',
    extraInstruction: 'Paste into Perplexity with Pro Search on so it checks live pricing and reviews. Ask it to re-run the comparison if you change your priorities.',
  }),
};

const factCheckFields = {
  type: 'form',
  steps: [
    {
      key: 'claim',
      shortLabel: 'Claim',
      label: 'What claim, statistic or statement do you want verified?',
      type: 'textarea',
      placeholder: 'e.g., "Humans only use 10% of their brain", a statistic from an article, a quote someone shared...',
    },
    {
      key: 'origin',
      shortLabel: 'Origin',
      label: 'Where did you see it? (optional)',
      type: 'text',
      placeholder: 'e.g., a news article, a social media post, a colleague\'s presentation...',
    },
    {
      key: 'rigor',
      shortLabel: 'Rigor',
      label: 'How thorough should the check be?',
      type: 'cards',
      options: ['Quick true/false verdict', 'Verdict with evidence', 'Full investigation of origin and context'],
    },
  ],
  template: (a) => `Fact-check the following claim using reliable, current sources.

CLAIM
${a.claim}
${a.origin ? `\nWHERE I SAW IT\n${a.origin}\n` : ''}
- Thoroughness: ${a.rigor}

----------------------------
INSTRUCTIONS
----------------------------

1. VERDICT
- Start with one verdict: True, Mostly true, Mixed, Mostly false, False, or Unverifiable.
- Explain in one or two sentences why.

2. EVIDENCE
${a.rigor === 'Quick true/false verdict' ? '- Give the 2 strongest sources that support the verdict, with links.' : ''}${a.rigor === 'Verdict with evidence' ? '- List the key evidence for and against the claim, each point with a cited source and its date.' : ''}${a.rigor === 'Full investigation of origin and context' ? '- Trace where the claim first appeared, how it spread, what the original data or study actually said, and what context is missing or distorted. Cite every step.' : ''}

3. STANDARDS
- Prefer primary sources (original studies, official data, direct statements) over secondary commentary.
- Do not rely on a single source, and say so when only one exists.
- Distinguish what is wrong from what is merely misleading or missing context.

CHECK THE CLAIM NOW.`,
  resultMeta: () => ({
    title: 'Fact-Check Prompt',
    extraInstruction: 'Paste into Perplexity. Always open the cited links yourself for anything important - the verdict is only as good as the sources it points to.',
  }),
};

const learnFields = {
  type: 'form',
  steps: [
    {
      key: 'topic',
      shortLabel: 'Topic',
      label: 'What topic do you want to understand?',
      type: 'text',
      placeholder: 'e.g., how interest rates affect mortgages, how mRNA vaccines work, the basics of options trading...',
    },
    {
      key: 'level',
      shortLabel: 'Level',
      label: 'What is your current level?',
      type: 'cards',
      options: ['Complete beginner', 'Some knowledge', 'Advanced, need the nuances'],
    },
    {
      key: 'goal',
      shortLabel: 'Goal',
      label: 'What do you want to be able to do afterward?',
      type: 'textarea',
      placeholder: 'e.g., explain it to a friend, make a good decision about my savings, pass an exam, follow industry news...',
    },
    {
      key: 'style',
      shortLabel: 'Style',
      label: 'How do you like to learn?',
      type: 'cards',
      options: ['Plain-language explanation with analogies', 'Step-by-step breakdown', 'Learning roadmap with resources'],
    },
  ],
  template: (a) => `Help me learn about ${a.topic} using accurate, up-to-date web sources.

MY LEVEL
${a.level}

MY GOAL
${a.goal}

- Preferred learning style: ${a.style}

----------------------------
INSTRUCTIONS
----------------------------

1. PITCH IT RIGHT
${a.level === 'Complete beginner' ? '- Assume no background. Define every technical term the first time it appears.' : ''}${a.level === 'Some knowledge' ? '- Skip the absolute basics, but briefly clarify terms that are commonly confused.' : ''}${a.level === 'Advanced, need the nuances' ? '- Skip introductions. Focus on nuance, edge cases, current debates and where experts disagree.' : ''}

2. TEACH IT
${a.style === 'Plain-language explanation with analogies' ? '- Explain in plain language with 2-3 concrete analogies or real-world examples.' : ''}${a.style === 'Step-by-step breakdown' ? '- Break the topic into numbered steps or stages, each building on the previous one.' : ''}${a.style === 'Learning roadmap with resources' ? '- Give a staged roadmap (what to learn first, next, and last) with 2-3 high-quality, cited resources per stage.' : ''}

3. MAKE IT USEFUL
- Tie the explanation to this goal: ${a.goal}
- Cite sources for key facts and flag anything that is still debated.
- End with 3 questions I can use to test my own understanding.

TEACH ME NOW.`,
  resultMeta: () => ({
    title: 'Learn a Topic Prompt',
    extraInstruction: 'Paste into Perplexity and keep asking follow-ups in the same thread - each answer builds on the earlier context. Try Pages or Spaces to save what you learn.',
  }),
};

export const perplexityFlow = {
  start: 'goal',
  nodes: {
    goal: {
      type: 'choice',
      title: 'What do you want to do in Perplexity?',
      subtitle: 'Select the type of task you want a prompt for.',
      options: [
        {
          id: 'research',
          label: 'Research a Question',
          description: 'Get a well-cited answer from current web sources at the depth you choose.',
          icon: '\u{1F50D}',
          next: 'researchFields',
        },
        {
          id: 'compare',
          label: 'Compare Options',
          description: 'Weigh products, tools or choices against your own criteria and get a recommendation.',
          icon: '\u{2696}\u{FE0F}',
          next: 'compareFields',
        },
        {
          id: 'factcheck',
          label: 'Fact-Check a Claim',
          description: 'Verify a statistic or statement with primary sources and a clear verdict.',
          icon: '\u{2705}',
          next: 'factCheckFields',
        },
        {
          id: 'learn',
          label: 'Learn a Topic',
          description: 'Get an explanation matched to your level, with sources and a way to test yourself.',
          icon: '\u{1F393}',
          next: 'learnFields',
        },
      ],
    },
    researchFields,
    compareFields,
    factCheckFields,
    learnFields,
  },
};
