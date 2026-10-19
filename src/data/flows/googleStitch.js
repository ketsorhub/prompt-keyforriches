const newScreenFields = {
  type: 'form',
  steps: [
    {
      key: 'screenPurpose',
      shortLabel: 'Screen',
      label: 'What screen do you want Stitch to design?',
      type: 'textarea',
      placeholder: 'e.g., a mobile home screen for a meal-planning app, a SaaS pricing page, a dashboard showing weekly sales...',
    },
    {
      key: 'audience',
      shortLabel: 'Audience',
      label: 'Who is it for, and what should they be able to do here?',
      type: 'textarea',
      placeholder: 'e.g., busy parents who want to see tonight\'s dinner and add items to a shopping list in two taps...',
    },
    {
      key: 'platform',
      shortLabel: 'Platform',
      label: 'Which platform is this for?',
      type: 'cards',
      options: ['Mobile app', 'Web / desktop', 'Tablet'],
    },
    {
      key: 'visualStyle',
      shortLabel: 'Style',
      label: 'What visual style are you going for?',
      type: 'cards',
      options: ['Clean and minimal', 'Bold and colorful', 'Dark and modern', 'Soft and friendly'],
    },
  ],
  template: (a) => `Design a ${a.platform.toLowerCase()} screen in Google Stitch based on the brief below. Generate a complete, polished layout now — make reasonable decisions instead of asking questions.

SCREEN
${a.screenPurpose}

AUDIENCE AND MAIN GOAL
${a.audience}

- Platform: ${a.platform}
- Visual style: ${a.visualStyle}

----------------------------
DESIGN REQUIREMENTS
----------------------------

1. LAYOUT
- Build a clear visual hierarchy: one primary action that stands out, secondary actions visibly quieter.
- Use realistic placeholder content (real-sounding names, labels, numbers) — no "Lorem ipsum" or "Button 1".
${a.platform === 'Mobile app' ? '- Design for a phone viewport: thumb-reachable primary actions, a bottom navigation bar if the app has multiple sections, comfortable tap targets.' : ''}${a.platform === 'Web / desktop' ? '- Design for a wide desktop viewport with a sensible grid, a top or side navigation, and content that doesn\'t stretch edge to edge.' : ''}${a.platform === 'Tablet' ? '- Design for a tablet viewport and make use of the extra width (e.g., side-by-side panels) rather than just scaling up a phone layout.' : ''}

2. STYLE
- Apply a "${a.visualStyle}" look consistently: colors, typography, corner radius, spacing and icon style should all match.
- Keep text contrast readable and limit the palette to one primary color, one accent and neutrals.

3. CONTENT
- Include everything a user needs to complete this goal: ${a.audience}
- Show realistic states where relevant (e.g., a populated list rather than an empty one).

4. OUTPUT
- Generate the finished screen so I can refine it with follow-up prompts or export it to Figma or code.

DESIGN THE SCREEN NOW.`,
  resultMeta: () => ({
    title: 'New Screen Design Prompt',
    extraInstruction: 'Paste into the Stitch prompt box on a new project. Once the first design appears, use the "Refine an Existing Screen" prompt type here for follow-up changes instead of regenerating from scratch.',
  }),
};

const referenceFields = {
  type: 'form',
  steps: [
    {
      key: 'referenceType',
      shortLabel: 'Reference',
      label: 'What are you uploading to Stitch as a starting point?',
      type: 'cards',
      options: ['A hand-drawn sketch or wireframe', 'A screenshot of an existing app or site', 'A mood board or inspiration image'],
    },
    {
      key: 'goal',
      shortLabel: 'Goal',
      label: 'What should Stitch turn it into?',
      type: 'textarea',
      placeholder: 'e.g., a polished mobile checkout screen, a modern redesign of this landing page, a dashboard that uses this color mood...',
    },
    {
      key: 'keep',
      shortLabel: 'Keep',
      label: 'What from the reference must be preserved?',
      type: 'textarea',
      placeholder: 'e.g., the three-column layout and the order of sections, the logo placement, the overall color mood...',
    },
    {
      key: 'change',
      shortLabel: 'Change',
      label: 'What should be improved or changed?',
      type: 'textarea',
      placeholder: 'e.g., modernize the typography, make buttons larger, add a clearer call to action, simplify the navigation...',
    },
  ],
  template: (a) => `I'm uploading ${a.referenceType.toLowerCase()} as a reference. Use it as the starting point for a new design in Google Stitch.

TARGET RESULT
${a.goal}

PRESERVE FROM THE REFERENCE
${a.keep}

IMPROVE OR CHANGE
${a.change}

----------------------------
INSTRUCTIONS
----------------------------

1. READ THE REFERENCE
${a.referenceType === 'A hand-drawn sketch or wireframe' ? '- Treat boxes, lines and scribbles as layout intent: interpret each block as a real component (header, card, button, image, list) and keep their arrangement.' : ''}${a.referenceType === 'A screenshot of an existing app or site' ? '- Identify the existing structure and components first, then design an improved version rather than copying pixel for pixel.' : ''}${a.referenceType === 'A mood board or inspiration image' ? '- Take the color palette, mood and visual feel from the image; do not try to reproduce its content literally.' : ''}

2. FOLLOW THE BRIEF
- Keep exactly this from the reference: ${a.keep}
- Apply these changes: ${a.change}
- Do not add unrelated sections or features beyond what the target result requires.

3. QUALITY
- Use realistic placeholder text and data, clear hierarchy, readable contrast and consistent spacing.
- If part of the reference is ambiguous, choose the most conventional interpretation and keep going.

GENERATE THE DESIGN NOW.`,
  resultMeta: () => ({
    title: 'Design From a Reference Prompt',
    extraInstruction: 'Upload your sketch, screenshot or image in Stitch first, then paste this prompt alongside it. If the result drifts from your reference, say which element to restore in a follow-up message.',
  }),
};

const refineFields = {
  type: 'form',
  steps: [
    {
      key: 'whichScreen',
      shortLabel: 'Screen',
      label: 'Which screen or section are you changing?',
      type: 'text',
      placeholder: 'e.g., the home screen, the hero section on the landing page, the checkout form...',
    },
    {
      key: 'changes',
      shortLabel: 'Changes',
      label: 'What exactly should change?',
      type: 'textarea',
      placeholder: 'e.g., make the header smaller, swap the card grid for a list, change the primary button to green, add a search bar...',
    },
    {
      key: 'scope',
      shortLabel: 'Scope',
      label: 'How far should the change go?',
      type: 'cards',
      options: ['Only what I listed — leave everything else untouched', 'Apply it, and adjust nearby elements so it still looks balanced', 'Explore a few variations of the change'],
    },
    {
      key: 'keepIntact',
      shortLabel: 'Keep',
      label: 'Anything that must not change?',
      type: 'textarea',
      placeholder: 'e.g., keep the brand colors and the navigation bar exactly as they are...',
    },
  ],
  template: (a) => `Update the existing design in Google Stitch. Modify only ${a.whichScreen} as described below.

REQUESTED CHANGES
${a.changes}

- Scope: ${a.scope}
${a.keepIntact ? `- Must stay unchanged: ${a.keepIntact}` : ''}

----------------------------
INSTRUCTIONS
----------------------------

1. APPLY THE CHANGES
- Make every change listed above, to ${a.whichScreen}.
${a.scope === 'Only what I listed — leave everything else untouched' ? '- Do not alter anything else: same layout, colors, copy and spacing outside the listed changes.' : ''}${a.scope === 'Apply it, and adjust nearby elements so it still looks balanced' ? '- Small spacing or alignment adjustments to neighboring elements are fine so the result looks balanced, but do not redesign them.' : ''}${a.scope === 'Explore a few variations of the change' ? '- Produce 2-3 distinct variations of this change so I can compare them side by side.' : ''}

2. PROTECT WHAT WORKS
${a.keepIntact ? `- Leave this exactly as it is: ${a.keepIntact}.` : '- Keep the existing style system (colors, fonts, corner radius) consistent with the rest of the design.'}

3. CHECK
- Make sure text is still readable and nothing overlaps or gets cut off after the change.

APPLY THE UPDATE NOW.`,
  resultMeta: () => ({
    title: 'Refine a Screen Prompt',
    extraInstruction: 'Paste into the Stitch chat on the design you want to change. Small, specific follow-ups work better than one large rewrite — send one refinement at a time.',
  }),
};

const flowFields = {
  type: 'form',
  steps: [
    {
      key: 'productName',
      shortLabel: 'Product',
      label: 'What product or app is this flow part of?',
      type: 'textarea',
      placeholder: 'e.g., a fitness tracking app, an online course platform, a food delivery service...',
    },
    {
      key: 'screens',
      shortLabel: 'Screens',
      label: 'List the screens in the flow, in order, one per line',
      type: 'textarea',
      placeholder: 'e.g.:\nWelcome screen\nSign up\nChoose your goals\nHome dashboard',
    },
    {
      key: 'platform',
      shortLabel: 'Platform',
      label: 'Which platform is this for?',
      type: 'cards',
      options: ['Mobile app', 'Web / desktop'],
    },
    {
      key: 'exportTarget',
      shortLabel: 'Export',
      label: 'What will you do with the designs afterward?',
      type: 'cards',
      options: ['Export to Figma for further design work', 'Export the code (HTML/CSS) to build from', 'Just use them as a prototype to review'],
    },
  ],
  template: (a) => `Design a connected multi-screen flow in Google Stitch for ${a.productName}. All screens must look like they belong to the same product.

SCREENS, IN ORDER
${a.screens.split('\n').filter(Boolean).map((s, i) => `${i + 1}. ${s.trim()}`).join('\n')}

- Platform: ${a.platform}
- Planned next step: ${a.exportTarget}

----------------------------
INSTRUCTIONS
----------------------------

1. CONSISTENCY
- Define one visual system up front (primary color, accent, font pairing, corner radius, icon style, button styles) and reuse it on every screen.
- Reuse the same navigation, header and component patterns so the screens feel like one product.

2. THE FLOW
- Design each screen listed above, in that order, with a clear primary action that leads to the next screen.
- Use realistic placeholder content that carries across screens (the same user name, the same items) so the flow tells a coherent story.
${a.platform === 'Mobile app' ? '- Design every screen for a phone viewport with thumb-reachable actions.' : '- Design every screen for a desktop viewport with a consistent grid and navigation.'}

3. HANDOFF
${a.exportTarget === 'Export to Figma for further design work' ? '- Keep layers and components cleanly organized and consistently named, because this will be exported to Figma.' : ''}${a.exportTarget === 'Export the code (HTML/CSS) to build from' ? '- Prefer simple, standard layout patterns that translate cleanly to HTML/CSS, and avoid overly complex overlapping effects.' : ''}${a.exportTarget === 'Just use them as a prototype to review' ? '- Focus on how the screens connect and read as a flow; make the buttons that lead to the next screen obvious.' : ''}

GENERATE ALL SCREENS NOW.`,
  resultMeta: () => ({
    title: 'Multi-Screen Flow Prompt',
    extraInstruction: 'Paste into Stitch as the first prompt of a new project. If it only generates some of the screens, ask it to continue with the remaining ones by name, keeping the same style.',
  }),
};

export const googleStitchFlow = {
  start: 'goal',
  nodes: {
    goal: {
      type: 'choice',
      title: 'What do you want to do in Google Stitch?',
      subtitle: 'Select the type of task you want a prompt for.',
      options: [
        {
          id: 'newscreen',
          label: 'Design a New Screen',
          description: 'Turn an idea into a polished app or web screen from a text brief.',
          icon: '\u{1F4F1}',
          next: 'newScreenFields',
        },
        {
          id: 'reference',
          label: 'Design From a Sketch or Screenshot',
          description: 'Upload a wireframe, screenshot or mood board and turn it into a finished design.',
          icon: '\u{270F}\u{FE0F}',
          next: 'referenceFields',
        },
        {
          id: 'refine',
          label: 'Refine an Existing Screen',
          description: 'Make specific changes to a design without breaking what already works.',
          icon: '\u{1F527}',
          next: 'refineFields',
        },
        {
          id: 'flow',
          label: 'Design a Multi-Screen Flow',
          description: 'Create a consistent set of connected screens ready to export or prototype.',
          icon: '\u{1F9ED}',
          next: 'flowFields',
        },
      ],
    },
    newScreenFields,
    referenceFields,
    refineFields,
    flowFields,
  },
};
