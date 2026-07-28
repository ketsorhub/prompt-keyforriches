function joinList(items) {
  return items
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `- ${s}`)
    .join('\n');
}

const blueprintFields = {
  type: 'form',
  steps: [
    {
      key: 'businessIdea',
      shortLabel: 'Business idea',
      label: "What's your business idea?",
      type: 'textarea',
      placeholder: 'Describe the product or service in a sentence or two...',
    },
    {
      key: 'targetAudience',
      shortLabel: 'Target audience',
      label: 'Who is your target audience?',
      type: 'text',
      placeholder: 'e.g., busy parents, freelance designers, small gyms',
    },
    {
      key: 'industry',
      shortLabel: 'Industry',
      label: 'What industry or niche is this in?',
      type: 'text',
      placeholder: 'e.g., e-commerce, health & wellness, SaaS',
    },
    {
      key: 'budget',
      shortLabel: 'Starting budget',
      label: "What's your starting budget level?",
      type: 'cards',
      options: ['Bootstrapped (under $500)', 'Low budget ($500–$5,000)', 'Well-funded ($5,000+)'],
    },
    {
      key: 'timeframe',
      shortLabel: 'Target timeframe',
      label: "What's your target timeframe to launch?",
      type: 'cards',
      options: ['1 month', '3 months', '6 months', '1 year+'],
    },
    {
      key: 'focusArea',
      shortLabel: 'Plan focus',
      label: 'Which area should the plan focus on most?',
      type: 'cards',
      options: ['Marketing & Growth', 'Operations', 'Product Development', 'Finance & Funding'],
    },
  ],
  template: (a) => `You are a senior startup strategist and business consultant with 15+ years of experience taking early-stage ideas to market.
Your task is to write a COMPLETE, ACTIONABLE business blueprint based entirely on the details below.

BUSINESS IDEA
${a.businessIdea}

KEY DETAILS
- Target audience: ${a.targetAudience}
- Industry / niche: ${a.industry}
- Starting budget: ${a.budget}
- Target timeframe to launch: ${a.timeframe}
- Primary focus for this plan: ${a.focusArea}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. STRUCTURE (MANDATORY)
The blueprint MUST include the following sections in this exact order:
A) Executive Summary
B) Market & Competitor Snapshot
C) Target Customer Profile
D) Business Model & Revenue Streams
E) ${a.focusArea} Deep-Dive (this is the priority section — go deeper here than anywhere else)
F) 90-Day Action Plan (week-by-week)
G) Key Risks & How to Mitigate Them
H) Budget Breakdown (realistic for a "${a.budget}" starting point)

2. QUALITY REQUIREMENTS
- Be specific and practical, not generic. Every recommendation should be something I could act on this week.
- Use headings, bullet points and numbered steps so it's easy to scan.
- Call out the single biggest risk to this business succeeding, and how to de-risk it early.
- Assume I have no existing team or infrastructure unless the details above say otherwise.

BEGIN THE BUSINESS BLUEPRINT NOW.`,
  resultMeta: () => ({
    title: 'Business Blueprint',
    extraInstruction: 'If ChatGPT asks a clarifying question first, answer it — then let it write the full blueprint.',
  }),
};

const ebookFields = {
  type: 'form',
  steps: [
    {
      key: 'ebookTitle',
      shortLabel: 'Title',
      label: 'What is the title of your e-book?',
      type: 'text',
      placeholder: 'Enter the title of your e-book...',
    },
    {
      key: 'ebookTopic',
      shortLabel: 'Topic',
      label: 'What do you want your e-book to be about?',
      type: 'textarea',
      placeholder: 'Describe the main topic or theme...',
    },
    {
      key: 'audience',
      shortLabel: 'Audience',
      label: 'Who is this e-book for?',
      type: 'text',
      placeholder: 'e.g., beginner investors, new dog owners, small business owners',
    },
    {
      key: 'chapterCount',
      shortLabel: 'Chapters',
      label: 'How many chapters will be in your e-book?',
      type: 'cards',
      options: ['5–10 chapters', '10–20 chapters', '20–30 chapters', '30+ chapters'],
    },
    {
      key: 'authorName',
      shortLabel: 'Author name',
      label: 'Author name',
      type: 'text',
      placeholder: 'Enter the author name...',
    },
    {
      key: 'writingStyle',
      shortLabel: 'Writing style',
      label: 'Writing style',
      type: 'cards',
      options: ['Professional', 'Casual', 'Academic', 'Creative', 'Technical'],
    },
  ],
  template: (a) => `You are a professional non-fiction author, editor and publishing expert.
Your task is to write a COMPLETE, HIGH-QUALITY, SELLABLE e-book based entirely on the details below.
The e-book must be detailed, well-structured, practical, and written to professional publishing standards.

E-BOOK DETAILS
- Title: ${a.ebookTitle}
- Topic: ${a.ebookTopic}
- Audience: ${a.audience}
- Chapter count: ${a.chapterCount}
- Author: ${a.authorName}
- Writing style: ${a.writingStyle}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. FORMAT
- Write the e-book so it's ready to export directly to PDF.
- Use clear headings, sub-headings, bullet points and numbered steps.
- Keep spacing and structure clean and readable.
- Avoid emojis unless the writing style explicitly calls for them.

2. STRUCTURE (MANDATORY)
The e-book MUST include the following sections in this exact order:
A) Title Page
B) Copyright Page
C) Table of Contents
D) Introduction
E) Chapters (${a.chapterCount}, matching the topic above)
F) Conclusion
G) Optional Bonus Section (checklist, template or resource list relevant to the topic)

3. QUALITY REQUIREMENTS
- Write with authority and clarity, in a ${a.writingStyle.toLowerCase()} tone throughout.
- Avoid fluff and generic filler — every chapter should teach something concrete.
- Assume the reader paid for this e-book and expects real value.

BEGIN WRITING THE FULL E-BOOK NOW.`,
  resultMeta: () => ({
    title: 'E-book Builder',
    extraInstruction: 'Select Canvas mode (if available) before you submit, so it’s easy to edit and export afterward.',
  }),
};

const webToolFields = {
  type: 'form',
  steps: [
    {
      key: 'toolName',
      shortLabel: 'Tool name',
      label: 'What is the name of your web tool?',
      type: 'text',
      placeholder: 'e.g., Loan Payoff Calculator',
    },
    {
      key: 'toolPurpose',
      shortLabel: 'Purpose',
      label: 'What should this tool actually do?',
      type: 'textarea',
      placeholder: 'Describe the problem it solves and what it calculates or generates...',
    },
    {
      key: 'toolInputs',
      shortLabel: 'Inputs',
      label: 'What information should users enter?',
      type: 'textarea',
      placeholder: 'List the inputs/fields, one per line...',
    },
    {
      key: 'outputStyle',
      shortLabel: 'Output style',
      label: 'How should the result be shown?',
      type: 'cards',
      options: ['Simple instant result', 'Detailed report', 'Visual chart or graph'],
    },
    {
      key: 'techPreference',
      shortLabel: 'Tech preference',
      label: 'Any tech preference for how it’s built?',
      type: 'cards',
      options: ['Plain HTML/CSS/JS', 'React', 'No preference — you choose'],
    },
  ],
  template: (a) => `You are a senior front-end engineer who builds clean, single-file interactive web tools.
Your task is to build a COMPLETE, WORKING web tool based entirely on the details below.

WEB TOOL DETAILS
- Name: ${a.toolName}
- What it should do: ${a.toolPurpose}
- Required inputs:
${joinList(a.toolInputs)}
- Output style: ${a.outputStyle}
- Tech preference: ${a.techPreference}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. DELIVERABLE
- Produce fully working code (${a.techPreference === 'No preference — you choose' ? 'pick the simplest stack that fits' : a.techPreference}) that runs as-is, with no missing pieces.
- If it's HTML/CSS/JS, keep it to a single self-contained file unless asked otherwise.

2. STRUCTURE (MANDATORY)
A) Brief explanation of how the tool works
B) The input form, matching the required inputs above, with sensible validation
C) The calculation / generation logic, clearly commented
D) The output display, in this style: ${a.outputStyle}
E) Basic responsive styling so it looks good on mobile and desktop
F) A short note on edge cases you handled (empty fields, invalid values, etc.)

3. QUALITY REQUIREMENTS
- No placeholder logic — the tool must actually work when pasted in.
- Keep the UI simple, clean and easy to use on the first try.

BUILD THE FULL WEB TOOL NOW.`,
  resultMeta: () => ({
    title: 'Web Tool Builder',
    extraInstruction: 'Select Canvas mode (if available) so you get a live preview you can test immediately.',
  }),
};

const spreadsheetFields = {
  type: 'form',
  steps: [
    {
      key: 'sheetName',
      shortLabel: 'Spreadsheet name',
      label: 'What is this spreadsheet called?',
      type: 'text',
      placeholder: 'e.g., Monthly Budget Tracker',
    },
    {
      key: 'sheetPurpose',
      shortLabel: 'Purpose',
      label: 'What is this spreadsheet for?',
      type: 'textarea',
      placeholder: 'Describe what it should help you track, plan or calculate...',
    },
    {
      key: 'keyMetrics',
      shortLabel: 'Key metrics',
      label: 'What key numbers or metrics should it track?',
      type: 'textarea',
      placeholder: 'List the metrics/columns, one per line...',
    },
    {
      key: 'complexity',
      shortLabel: 'Formula complexity',
      label: 'How advanced should the formulas be?',
      type: 'cards',
      options: ['Basic formulas only', 'Intermediate — with charts', 'Advanced — with automation'],
    },
  ],
  template: (a) => `You are a spreadsheet and financial-modeling expert who builds clean, practical templates.
Your task is to design a COMPLETE spreadsheet template based entirely on the details below, described precisely enough that I can build it directly in Google Sheets or Excel.

SPREADSHEET DETAILS
- Name: ${a.sheetName}
- Purpose: ${a.sheetPurpose}
- Key metrics to track:
${joinList(a.keyMetrics)}
- Formula complexity: ${a.complexity}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. STRUCTURE (MANDATORY)
A) Sheet/tab layout — list every tab needed and what lives on each
B) Column headers for each tab, in order, with a one-line description of each
C) The exact formulas to use for each calculated column (write them as real Sheets/Excel formulas)
D) Conditional formatting rules that would make this easier to read at a glance
${a.complexity === 'Advanced — with automation' ? 'E) Any automation (Apps Script / macro) that would save time, described step-by-step' : 'E) A chart or two worth adding, and what data they should plot'}

2. QUALITY REQUIREMENTS
- Formulas must be copy-paste ready, not pseudocode.
- Keep the layout simple enough to use immediately, not over-engineered.

DESIGN THE FULL SPREADSHEET TEMPLATE NOW.`,
  resultMeta: () => ({
    title: 'Spreadsheet Builder',
    extraInstruction: 'Ask it to output the formulas in a table so they’re easy to copy into your sheet.',
  }),
};

const podcastFields = {
  type: 'form',
  steps: [
    {
      key: 'playerName',
      shortLabel: 'Player name',
      label: 'What should the podcast player be called?',
      type: 'text',
      placeholder: 'e.g., The Growth Show Player',
    },
    {
      key: 'brandColors',
      shortLabel: 'Brand colors',
      label: 'What colors or style should it match?',
      type: 'text',
      placeholder: 'e.g., dark navy and gold, matching my brand',
    },
    {
      key: 'episodeSource',
      shortLabel: 'Episode source',
      label: 'How will episodes be loaded in?',
      type: 'cards',
      options: ['RSS feed', 'Manual episode list'],
    },
    {
      key: 'features',
      shortLabel: 'Features',
      label: 'Which features do you need?',
      type: 'textarea',
      placeholder: 'e.g., playlist, transcripts, download button, playback speed control...',
    },
  ],
  template: (a) => `You are a front-end web developer who specializes in custom audio/media players.
Your task is to build a COMPLETE, WORKING embeddable podcast media player based entirely on the details below.

PLAYER DETAILS
- Name: ${a.playerName}
- Visual style: ${a.brandColors}
- Episode source: ${a.episodeSource}
- Required features:
${joinList(a.features)}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. DELIVERABLE
- Produce a fully working, self-contained HTML/CSS/JS embed for the player.
- If the episode source is "RSS feed", include the fetch/parsing logic with a clearly marked placeholder for the feed URL.
- If it's "Manual episode list", include a sample array of 3 episodes to demonstrate the structure.

2. STRUCTURE (MANDATORY)
A) Player UI layout, styled to match: ${a.brandColors}
B) Playback controls (play/pause, seek, volume, speed if requested)
C) Episode list / switcher behavior
D) Accessibility basics (keyboard controls, ARIA labels)
E) A short note on how to embed this on any page

3. QUALITY REQUIREMENTS
- No placeholder logic for the features listed above — they must actually work.
- Keep it lightweight, with no unnecessary external dependencies.

BUILD THE FULL PODCAST PLAYER NOW.`,
  resultMeta: () => ({
    title: 'Podcast Player Builder',
    extraInstruction: 'Select Canvas mode (if available) so you can preview and tweak the player before exporting.',
  }),
};

export const chatgptFlow = {
  start: 'projectType',
  nodes: {
    projectType: {
      type: 'choice',
      title: 'What would you like to build with ChatGPT?',
      subtitle: 'Select the type of project you want to create.',
      options: [
        {
          id: 'blueprint',
          label: 'Business Blueprint',
          description: 'Generate a comprehensive business plan and strategy.',
          icon: '\u{1F4BC}',
          next: 'blueprintFields',
        },
        {
          id: 'digitalProduct',
          label: 'Digital Product',
          description: 'Create an e-book, spreadsheet, web tool, or podcast player.',
          icon: '\u{1F4E6}',
          next: 'productType',
        },
      ],
    },
    productType: {
      type: 'choice',
      title: 'Select your Digital Product',
      subtitle: 'Choose the specific type of product you want to create.',
      options: [
        {
          id: 'ebook',
          label: 'E-book',
          description: 'Write and structure a comprehensive digital book.',
          icon: '\u{1F4D6}',
          next: 'ebookFields',
        },
        {
          id: 'webtool',
          label: 'Web Tool',
          description: 'Build a simple web-based utility or calculator.',
          icon: '\u{1F5A5}️',
          next: 'webToolFields',
        },
        {
          id: 'spreadsheet',
          label: 'Spreadsheet',
          description: 'Create advanced templates with formulas and charts.',
          icon: '\u{1F4CA}',
          next: 'spreadsheetFields',
        },
        {
          id: 'podcast',
          label: 'Podcast Media Player',
          description: 'Design a custom audio player for your episodes.',
          icon: '\u{1F3A7}',
          next: 'podcastFields',
        },
      ],
    },
    blueprintFields,
    ebookFields,
    webToolFields,
    spreadsheetFields,
    podcastFields,
  },
};
