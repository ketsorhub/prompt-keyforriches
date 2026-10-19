const buildAppFields = {
  type: 'form',
  steps: [
    {
      key: 'appIdea',
      shortLabel: 'App idea',
      label: 'What website or app do you want Horizons to build?',
      type: 'textarea',
      placeholder: 'e.g., a booking site for a dog grooming business, a personal portfolio with a blog, an internal tool to track team tasks...',
    },
    {
      key: 'corePages',
      shortLabel: 'Pages/screens',
      label: 'What pages or screens does it need?',
      type: 'textarea',
      placeholder: 'List each page/screen and what it does, one per line, e.g.:\nHome — hero, services overview, CTA to book\nBooking — form to pick a service and time slot\nAbout — bio and photos',
    },
    {
      key: 'dataNeeds',
      shortLabel: 'Data',
      label: 'Does it need to store or manage data?',
      type: 'cards',
      options: ['Yes — user submissions or records that persist', 'No — static content only, no data storage', "Not sure — let Horizons decide"],
    },
    {
      key: 'visualStyle',
      shortLabel: 'Style',
      label: 'What visual style are you going for?',
      type: 'cards',
      options: ['Clean and minimal', 'Bold and colorful', 'Professional/corporate', "Playful, don't overthink it"],
    },
  ],
  template: (a) => `You are building a complete website/app inside Hostinger Horizons based on the details below. Generate the full first version now — don't ask clarifying questions first, make reasonable choices and note them briefly at the end.

APP IDEA
${a.appIdea}

PAGES / SCREENS NEEDED
${a.corePages}

- Data storage needed: ${a.dataNeeds}
- Visual style: ${a.visualStyle}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. SCOPE
- Build every page/screen listed above, each doing what's described — don't merge them into one simplified page or skip any.
- Keep the build focused on the stated idea; don't add unrelated pages or features.

2. DATA HANDLING
${a.dataNeeds === 'Yes — user submissions or records that persist' ? '- Set up whatever backend/database structure is needed so submitted data actually persists between visits, not just in local component state.' : ''}${a.dataNeeds === 'No — static content only, no data storage' ? '- Keep this fully static — no database or backend needed, just working pages and navigation.' : ''}${a.dataNeeds === "Not sure — let Horizons decide" ? '- Decide whether persistent storage makes sense given the idea above, and briefly explain your call at the end.' : ''}

3. QUALITY REQUIREMENTS
- Match the "${a.visualStyle}" style consistently across every page — spacing, colors, fonts, and button styles should all match.
- Make navigation between the pages above actually work, not just look right in one screenshot.
- Design mobile-responsive from the start, not as an afterthought.
- Handle obvious edge cases (empty states, form validation) instead of leaving them broken.

4. OUTPUT
- Build the complete site/app now in the live preview, ready for me to click through immediately.

BEGIN BUILDING NOW.`,
  resultMeta: () => ({
    title: 'Build From Scratch Prompt',
    extraInstruction: 'Paste this as your first message in the Horizons chat panel to kick off a new project. Review the live preview as it builds, then use the "Add a Feature or Page" prompt type here for any follow-up changes.',
  }),
};

const redesignFields = {
  type: 'form',
  steps: [
    {
      key: 'currentIssue',
      shortLabel: 'What to change',
      label: "What's wrong with the current design, or what should change?",
      type: 'textarea',
      placeholder: 'e.g., it feels dated and cramped, the colors clash, the homepage hero is boring, mobile view is broken on the pricing page...',
    },
    {
      key: 'targetPages',
      shortLabel: 'Where',
      label: 'Which pages or sections should this apply to?',
      type: 'cards',
      options: ['The whole site — a full visual refresh', 'Just the homepage', 'A specific page or section I\'ll describe', 'Just the mobile/responsive layout'],
    },
    {
      key: 'styleDirection',
      shortLabel: 'New direction',
      label: 'What direction should the new look take?',
      type: 'cards',
      options: ['Cleaner and more minimal', 'More bold and modern', 'Warmer and more approachable', 'More professional/corporate'],
    },
    {
      key: 'keepIntact',
      shortLabel: 'Keep as-is',
      label: 'Anything that should stay exactly as it is?',
      type: 'textarea',
      placeholder: 'e.g., keep the logo and the booking form logic untouched, just restyle around them...',
    },
  ],
  template: (a) => `You are restyling an existing project in Hostinger Horizons. Update ONLY the visual design as described below — do not change page structure, content meaning, or functionality unless it's explicitly part of the redesign.

WHAT TO CHANGE
${a.currentIssue}

- Scope: ${a.targetPages}
- New style direction: ${a.styleDirection}
${a.keepIntact ? `- Keep unchanged: ${a.keepIntact}` : ''}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. SCOPE OF THE REDESIGN
${a.targetPages === 'The whole site — a full visual refresh' ? '- Apply the new direction consistently across every page so the site feels like one cohesive redesign, not a patchwork.' : ''}${a.targetPages === 'Just the homepage' ? '- Restyle only the homepage. Leave other pages as they are for now.' : ''}${a.targetPages === "A specific page or section I'll describe" ? '- Apply this to the specific page/section described in "What to change" above — don\'t spread changes to unrelated pages.' : ''}${a.targetPages === 'Just the mobile/responsive layout' ? '- Fix only the responsive/mobile breakpoints. Desktop layout should stay as it currently is unless it\'s the direct cause of the mobile issue.' : ''}

2. DIRECTION
- Move the design toward "${a.styleDirection.toLowerCase()}" — update colors, spacing, typography, and component styling to match this direction consistently.

3. WHAT NOT TO TOUCH
${a.keepIntact ? `- Leave the following exactly as-is: ${a.keepIntact}. Only restyle around it.` : "- Don't change any working functionality, form logic, or database structure — this is a visual pass only."}

4. VERIFY
- After applying the redesign, check the live preview yourself for obvious layout breaks (overlapping text, broken spacing, unreadable contrast) before considering it done.

APPLY THE REDESIGN NOW.`,
  resultMeta: () => ({
    title: 'Redesign / Restyle Prompt',
    extraInstruction: 'Paste into the Horizons chat panel on your existing project (not a new one). Check the live preview after each response — if a change goes too far, just describe what to dial back in your next message.',
  }),
};

const addFeatureFields = {
  type: 'form',
  steps: [
    {
      key: 'featureDescription',
      shortLabel: 'The feature',
      label: 'What feature or page do you want to add?',
      type: 'textarea',
      placeholder: 'e.g., a contact form that emails me submissions, a testimonials carousel on the homepage, a FAQ accordion, a new "Pricing" page...',
    },
    {
      key: 'placement',
      shortLabel: 'Placement',
      label: 'Where should this live in the site?',
      type: 'text',
      placeholder: 'e.g., new section at the bottom of the homepage, its own page linked from the nav bar, inside the existing dashboard...',
    },
    {
      key: 'behaviorNotes',
      shortLabel: 'Behavior',
      label: 'Any specific behavior it needs to have?',
      type: 'textarea',
      placeholder: 'e.g., form should validate email format and show a success message, carousel should auto-rotate every 5 seconds...',
    },
    {
      key: 'riskLevel',
      shortLabel: 'Caution',
      label: 'How careful should this change be around existing functionality?',
      type: 'cards',
      options: ['Very careful — nothing else on the site should change', "It's fine if related things need small adjustments too"],
    },
  ],
  template: (a) => `You are adding a new feature to an existing project in Hostinger Horizons. Implement exactly what's described below without disrupting what's already working.

FEATURE TO ADD
${a.featureDescription}

PLACEMENT
${a.placement}

${a.behaviorNotes ? `BEHAVIOR NOTES\n${a.behaviorNotes}\n\n` : ''}- Caution level: ${a.riskLevel}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. IMPLEMENT
- Build exactly what's described: ${a.featureDescription}
- Place it here: ${a.placement}
${a.behaviorNotes ? `- Make sure it behaves like this: ${a.behaviorNotes}` : '- Use sensible default behavior for a feature like this if no specific behavior was given.'}

2. SCOPE DISCIPLINE
${a.riskLevel === 'Very careful — nothing else on the site should change' ? '- Do not modify any existing page, component, or styling outside what\'s strictly needed to add this feature. If something else needs to change to make this work, stop and flag it instead of just doing it.' : '- Small, directly-related adjustments to existing components are fine if they\'re needed to fit this feature in cleanly, but don\'t make unrelated changes elsewhere.'}

3. INTEGRATION
- Make sure the new feature is actually reachable/visible (e.g. linked from navigation, rendered in the right place) — don't build it in isolation and leave it disconnected from the rest of the site.
- If this feature needs data to persist (e.g. form submissions), wire it to the site's existing database/backend rather than only holding it in local state.

4. VERIFY
- After building, check the live preview to confirm the new feature works end-to-end and the rest of the site still looks and functions the same as before.

BUILD THIS FEATURE NOW.`,
  resultMeta: () => ({
    title: 'Add a Feature or Page Prompt',
    extraInstruction: 'Paste into the Horizons chat panel on your existing project. This works best as a focused, single-feature message — for multiple unrelated features, send them as separate follow-up prompts rather than combining them.',
  }),
};

const databaseFields = {
  type: 'form',
  steps: [
    {
      key: 'dataPurpose',
      shortLabel: 'Purpose',
      label: 'What data does your app need to store?',
      type: 'textarea',
      placeholder: 'e.g., customer bookings with name, service, and time slot; blog posts with title, content, and publish date; user-submitted reviews...',
    },
    {
      key: 'fields',
      shortLabel: 'Fields',
      label: 'List the fields each record needs, one per line',
      type: 'textarea',
      placeholder: 'e.g.:\nname (text)\nemail (text)\nservice (text)\nbooking_date (date)\nstatus (text, default "pending")',
    },
    {
      key: 'relations',
      shortLabel: 'Relationships',
      label: 'Does this data connect to anything else?',
      type: 'cards',
      options: ['No — this is a standalone table', 'Yes — it relates to another table I already have', "Not sure — let Horizons figure it out"],
    },
    {
      key: 'accessPattern',
      shortLabel: 'Access',
      label: 'Who should be able to read or edit this data?',
      type: 'cards',
      options: ['Only me/admin — not visible to site visitors', 'Visitors can submit but not view others\' entries', 'Publicly readable, admin-only editing'],
    },
  ],
  template: (a) => `You are setting up data storage for a project in Hostinger Horizons. Create the database structure and wire up the logic described below.

WHAT THIS DATA IS FOR
${a.dataPurpose}

FIELDS NEEDED
${a.fields}

- Relationships: ${a.relations}
- Access pattern: ${a.accessPattern}

----------------------------
CRITICAL INSTRUCTIONS
----------------------------

1. STRUCTURE
- Create a table/collection sized to hold: ${a.dataPurpose}
- Fields, exactly as listed:
${a.fields.split('\n').filter(Boolean).map((f) => `  - ${f.trim()}`).join('\n')}
${a.relations === 'Yes — it relates to another table I already have' ? '- Set up the relationship (foreign key or equivalent) to the existing related table rather than duplicating its data here.' : ''}${a.relations === "Not sure — let Horizons figure it out" ? '- Decide whether this needs to relate to any existing table in the project, and explain your reasoning briefly at the end.' : ''}

2. ACCESS RULES
${a.accessPattern === 'Only me/admin — not visible to site visitors' ? '- Lock this data down so only the site admin/owner can read or write it — no public-facing page should expose it.' : ''}${a.accessPattern === "Visitors can submit but not view others' entries" ? '- Allow visitors to create new entries (e.g. via a form), but they should never be able to read, list, or edit entries other than possibly their own submission confirmation.' : ''}${a.accessPattern === 'Publicly readable, admin-only editing' ? '- Anyone should be able to view this data on the site, but only the admin/owner should be able to create, edit, or delete entries.' : ''}

3. WIRE IT UP
- Connect any relevant forms or pages already in the project to this data structure so submissions actually save and any listing views actually pull real data, not placeholders.
- Validate input before saving (required fields, correct types) rather than accepting anything blindly.

4. VERIFY
- After setting this up, test by creating a sample entry through the live preview and confirming it actually persists and displays correctly wherever it should show up.

SET UP THIS DATABASE STRUCTURE NOW.`,
  resultMeta: () => ({
    title: 'Database Setup Prompt',
    extraInstruction: 'Paste into the Horizons chat panel on your project. After it responds, check the Database section of your project to confirm the table and fields were created as described before building forms/pages on top of it.',
  }),
};

export const horizonsFlow = {
  start: 'goal',
  nodes: {
    goal: {
      type: 'choice',
      title: 'What do you want to do in Horizons?',
      subtitle: 'Select the type of task you want a prompt for.',
      options: [
        {
          id: 'buildapp',
          label: 'Build a Website or App From Scratch',
          description: 'Turn an idea into a complete first version with pages and (optionally) data storage.',
          icon: '\u{1F30C}',
          next: 'buildAppFields',
        },
        {
          id: 'redesign',
          label: 'Redesign or Restyle the UI',
          description: 'Give an existing project a new look without breaking what works.',
          icon: '\u{1F3A8}',
          next: 'redesignFields',
        },
        {
          id: 'addfeature',
          label: 'Add a Feature or Page',
          description: 'Extend an existing project with a new, focused piece of functionality.',
          icon: '\u{2795}',
          next: 'addFeatureFields',
        },
        {
          id: 'database',
          label: 'Set Up a Database',
          description: 'Define a data structure and access rules, then wire it to your pages.',
          icon: '\u{1F5C4}\u{FE0F}',
          next: 'databaseFields',
        },
      ],
    },
    buildAppFields,
    redesignFields,
    addFeatureFields,
    databaseFields,
  },
};
