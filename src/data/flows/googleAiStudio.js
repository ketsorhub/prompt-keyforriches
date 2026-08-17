const appBuilderFields = {
  type: 'form',
  steps: [
    {
      key: 'appIdea',
      shortLabel: 'App idea',
      label: 'What app or prototype do you want to build?',
      type: 'textarea',
      placeholder: 'e.g., a habit tracker with streak counters, a recipe generator from a list of ingredients, a flashcard app for studying Spanish...',
    },
    {
      key: 'coreFeatures',
      shortLabel: 'Core features',
      label: 'What are the must-have features?',
      type: 'textarea',
      placeholder: 'List the 3-5 things the app absolutely must do, one per line...',
    },
    {
      key: 'dataSource',
      shortLabel: 'Data',
      label: 'Where should the app get its data from?',
      type: 'cards',
      options: ['Gemini API calls (AI-generated content)', 'Static/sample data I provide', 'User input only, no backend data'],
    },
    {
      key: 'visualStyle',
      shortLabel: 'Style',
      label: 'What visual style are you going for?',
      type: 'cards',
      options: ['Clean and minimal', 'Bold and colorful', 'Professional/dashboard', "Playful, don't overthink it"],
    },
  ],
  template: (a) => `You are an expert full-stack builder working inside Google AI Studio's app builder. Your task is to build a COMPLETE, working app based entirely on the details below.

APP IDEA
${a.appIdea}

MUST-HAVE FEATURES
${a.coreFeatures}

- Data source: ${a.dataSource}
- Visual style: ${a.visualStyle}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. SCOPE
- Build every feature listed above — don't skip any or replace them with a simplified version.
- Keep the app focused on the stated idea; don't bolt on unrelated functionality.

2. DATA HANDLING
${a.dataSource === 'Gemini API calls (AI-generated content)' ? '- Wire up real Gemini API calls for the AI-generated parts. Handle loading and error states gracefully.' : ''}${a.dataSource === 'Static/sample data I provide' ? '- Use clearly-structured static/sample data so it\'s obvious where I would swap in my own.' : ''}${a.dataSource === 'User input only, no backend data' ? '- Keep all state client-side, driven entirely by what the user types or selects. No external calls needed.' : ''}

3. QUALITY REQUIREMENTS
- Match the "${a.visualStyle}" style throughout — consistent spacing, colors, and typography.
- Make it fully functional, not a mockup: every button, form, and interaction should actually work.
- Handle empty states and edge cases (e.g., no data yet, invalid input) instead of leaving them broken.

4. OUTPUT
- Build the complete app now, ready to preview and run immediately in AI Studio.

BEGIN BUILDING THE APP NOW.`,
  resultMeta: () => ({
    title: 'App Builder Prompt',
    extraInstruction: 'Paste this into AI Studio\'s "Build" tab. If your app needs the Gemini API, AI Studio wires up the API key automatically — no separate setup needed.',
  }),
};

const systemInstructionsFields = {
  type: 'form',
  steps: [
    {
      key: 'assistantRole',
      shortLabel: 'Role',
      label: 'What should this assistant be an expert at?',
      type: 'text',
      placeholder: 'e.g., a customer support agent for a SaaS product, a Socratic coding tutor, a recipe assistant',
    },
    {
      key: 'behaviorRules',
      shortLabel: 'Rules',
      label: 'What should it always do, or never do?',
      type: 'textarea',
      placeholder: 'e.g., always ask a clarifying question before giving code, never mention pricing, always respond in under 100 words...',
    },
    {
      key: 'tone',
      shortLabel: 'Tone',
      label: 'What tone should it use?',
      type: 'cards',
      options: ['Friendly and casual', 'Professional and concise', 'Warm and empathetic', 'Direct, no fluff'],
    },
    {
      key: 'outputStyle',
      shortLabel: 'Output style',
      label: 'How should responses typically be formatted?',
      type: 'cards',
      options: ['Short conversational replies', 'Structured with headers/bullets', 'Mix depending on the question'],
    },
  ],
  template: (a) => `You are writing SYSTEM INSTRUCTIONS to configure a Gemini model in Google AI Studio's system instructions field. Produce the complete system instructions text based entirely on the details below — write it as instructions TO the model, not as a description about it.

ROLE
This assistant is: ${a.assistantRole}

BEHAVIOR RULES
${a.behaviorRules}

- Tone: ${a.tone}
- Response format: ${a.outputStyle}

----------------------------
WHAT THE SYSTEM INSTRUCTIONS MUST COVER
----------------------------

1. IDENTITY
- Open by clearly defining the assistant's role as: ${a.assistantRole}.
- State its scope — what it should and shouldn't help with.

2. BEHAVIOR RULES (MANDATORY, INCLUDE ALL)
${a.behaviorRules}
- Write these as explicit, unambiguous directives the model must follow every turn.

3. TONE & FORMAT
- Tone: ${a.tone.toLowerCase()}, applied consistently across every response.
- Default formatting: ${a.outputStyle.toLowerCase()}.

4. GUARDRAILS
- Include an instruction for what to do when a request falls outside its defined role (redirect politely, don't just refuse silently).
- Include an instruction for handling ambiguous requests (ask a clarifying question rather than guessing).

OUTPUT ONLY THE FINAL SYSTEM INSTRUCTIONS TEXT, READY TO PASTE INTO THE "SYSTEM INSTRUCTIONS" FIELD. NO EXPLANATION BEFORE OR AFTER.`,
  resultMeta: () => ({
    title: 'System Instructions Prompt',
    extraInstruction: 'Paste the generated text directly into AI Studio\'s "System instructions" panel (left sidebar in the Chat/Prompt view) — not into the chat box itself.',
  }),
};

const structuredOutputFields = {
  type: 'form',
  steps: [
    {
      key: 'extractionGoal',
      shortLabel: 'Goal',
      label: 'What data do you want extracted or generated?',
      type: 'textarea',
      placeholder: 'e.g., pull product name, price, and availability from a listing; generate a list of tasks with priority and due date...',
    },
    {
      key: 'schemaFields',
      shortLabel: 'Fields',
      label: 'What fields should each result have?',
      type: 'textarea',
      placeholder: 'List field name and type, one per line, e.g.:\nname (string)\nprice (number)\nin_stock (boolean)',
    },
    {
      key: 'inputSource',
      shortLabel: 'Input',
      label: 'What will the input be?',
      type: 'cards',
      options: ['Unstructured text I paste in', 'An image or document I upload', 'A list of multiple items at once'],
    },
    {
      key: 'strictness',
      shortLabel: 'Strictness',
      label: 'How strict should the output be?',
      type: 'cards',
      options: ['Strict — fail loudly if a field is missing', 'Lenient — use null for missing fields'],
    },
  ],
  template: (a) => `You are configuring a Gemini prompt in Google AI Studio for STRUCTURED OUTPUT (JSON mode / response schema). Produce the complete prompt text based entirely on the details below.

EXTRACTION / GENERATION GOAL
${a.extractionGoal}

REQUIRED FIELDS
${a.schemaFields}

- Input type: ${a.inputSource}
- Missing-field handling: ${a.strictness}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. OUTPUT CONTRACT (MANDATORY)
- Respond with ONLY valid JSON matching this shape, one object per result:
${a.schemaFields.split('\n').filter(Boolean).map((f) => `  - ${f.trim()}`).join('\n')}
- No prose, no markdown code fences, no explanation — JSON only.
${a.inputSource === 'A list of multiple items at once' ? '- Return a JSON array, one object per item found in the input.' : '- Return a single JSON object.'}

2. FIELD HANDLING
${a.strictness === 'Strict — fail loudly if a field is missing' ? '- If a required field genuinely cannot be determined from the input, set it to the string "MISSING" so it\'s obvious at a glance rather than silently guessing.' : '- If a field cannot be determined from the input, set it to null rather than guessing or omitting the key.'}
- Never invent values that aren't supported by the input.

3. TASK
${a.extractionGoal}
${a.inputSource === 'Unstructured text I paste in' ? '- The input text will follow this prompt — process it exactly as given.' : ''}${a.inputSource === 'An image or document I upload' ? '- The input will be an attached image or document — extract only from what\'s actually visible/legible.' : ''}${a.inputSource === 'A list of multiple items at once' ? '- The input may contain multiple items — process every one, don\'t stop after the first.' : ''}

BEGIN. RETURN JSON ONLY.`,
  resultMeta: () => ({
    title: 'Structured Output Prompt',
    extraInstruction: 'For guaranteed valid JSON, also set a matching Response Schema in AI Studio\'s "Structured output" panel (right sidebar) — the prompt and the schema should describe the same fields.',
  }),
};

const liveApiFields = {
  type: 'form',
  steps: [
    {
      key: 'appPurpose',
      shortLabel: 'Purpose',
      label: 'What should this real-time voice/vision app do?',
      type: 'textarea',
      placeholder: 'e.g., a live tutor that watches me solve math problems and gives hints, a voice assistant that walks me through a recipe hands-free...',
    },
    {
      key: 'inputModes',
      shortLabel: 'Input',
      label: 'What input should it use?',
      type: 'cards',
      options: ['Voice only', 'Voice + camera/screen', 'Voice + screen share'],
    },
    {
      key: 'interruptionStyle',
      shortLabel: 'Interruptions',
      label: 'How should it handle being interrupted mid-response?',
      type: 'cards',
      options: ['Stop immediately and listen', "Finish the current sentence, then listen"],
    },
    {
      key: 'voicePersona',
      shortLabel: 'Persona',
      label: 'What personality should the voice have?',
      type: 'text',
      placeholder: 'e.g., calm and patient, upbeat and energetic, no-nonsense and efficient',
    },
  ],
  template: (a) => `You are writing SYSTEM INSTRUCTIONS for a Google AI Studio "Stream" (Live API) real-time voice app. Produce the complete instructions based entirely on the details below.

APP PURPOSE
${a.appPurpose}

- Input modes: ${a.inputModes}
- Interruption handling: ${a.interruptionStyle}
- Voice persona: ${a.voicePersona}

----------------------------
WHAT THE INSTRUCTIONS MUST COVER
----------------------------

1. ROLE & PURPOSE
- Define the assistant's job clearly: ${a.appPurpose}
- State what it should proactively notice or comment on given its input modes (${a.inputModes.toLowerCase()}), versus what it should wait to be asked about.

2. CONVERSATION STYLE
- Persona: ${a.voicePersona}. Keep this consistent across the entire session.
- Responses should be short and spoken-language natural — this is a live voice conversation, not a text chat. Avoid long monologues; favor back-and-forth exchanges.
- Interruption behavior: ${a.interruptionStyle === 'Stop immediately and listen' ? 'if the user starts talking, stop mid-sentence and give them full attention immediately.' : 'finish the current thought concisely, then yield the floor.'}

3. MULTIMODAL GROUNDING
${a.inputModes === 'Voice only' ? '- There is no visual input — never reference seeing anything, rely only on what\'s said.' : '- Base any visual observations strictly on what\'s actually visible in the live camera/screen feed at that moment; say so if something is unclear or out of view.'}

4. EDGE CASES
- If audio is unclear or cuts out, ask the user to repeat rather than guessing at what was said.
- If the conversation goes silent, don't fill the silence unnecessarily — wait for the user.

OUTPUT ONLY THE FINAL SYSTEM INSTRUCTIONS TEXT, READY TO PASTE INTO THE STREAM/LIVE API SETUP. NO EXPLANATION BEFORE OR AFTER.`,
  resultMeta: () => ({
    title: 'Live API Voice App Prompt',
    extraInstruction: 'Paste into AI Studio\'s "Stream" tab system instructions field, then pick a matching input mode (camera/screen) to match what you selected here before starting the session.',
  }),
};

export const googleAiStudioFlow = {
  start: 'goal',
  nodes: {
    goal: {
      type: 'choice',
      title: 'What do you want to build in AI Studio?',
      subtitle: 'Select the type of task you want a prompt for.',
      options: [
        {
          id: 'appbuilder',
          label: 'Build an App or Prototype',
          description: 'Turn an idea into a working app using the Build tab.',
          icon: '\u{1F6E0}\u{FE0F}',
          next: 'appBuilderFields',
        },
        {
          id: 'systeminstructions',
          label: 'System Instructions',
          description: 'Configure a custom Gemini assistant\'s role, tone, and rules.',
          icon: '\u{1F9ED}',
          next: 'systemInstructionsFields',
        },
        {
          id: 'structuredoutput',
          label: 'Structured Output / JSON',
          description: 'Extract or generate clean, schema-matched JSON data.',
          icon: '\u{1F5C3}\u{FE0F}',
          next: 'structuredOutputFields',
        },
        {
          id: 'liveapi',
          label: 'Live API Voice App',
          description: 'Real-time voice + camera/screen assistant instructions.',
          icon: '\u{1F3A4}',
          next: 'liveApiFields',
        },
      ],
    },
    appBuilderFields,
    systemInstructionsFields,
    structuredOutputFields,
    liveApiFields,
  },
};
