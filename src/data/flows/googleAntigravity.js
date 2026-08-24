const buildFeatureFields = {
  type: 'form',
  steps: [
    {
      key: 'buildGoal',
      shortLabel: 'What to build',
      label: 'What app or feature should the agent build end-to-end?',
      type: 'textarea',
      placeholder: 'e.g., a habit tracker with streak counters and reminders, a Stripe checkout flow for an existing Next.js app, a CLI tool that dedupes CSV rows...',
    },
    {
      key: 'existingCodebase',
      shortLabel: 'Codebase',
      label: 'Is this a new project or an existing codebase?',
      type: 'cards',
      options: ['Brand new project, start from scratch', 'Existing codebase, add this feature', "Existing codebase, I'm not sure how it fits yet"],
    },
    {
      key: 'verification',
      shortLabel: 'Verification',
      label: 'How should the agent verify its own work before finishing?',
      type: 'cards',
      options: ['Click through the UI in the browser subagent and confirm it works', 'Write and run automated tests', 'Both — tests plus a manual browser pass'],
    },
    {
      key: 'constraints',
      shortLabel: 'Constraints',
      label: 'Any constraints — stack, style, things to avoid?',
      type: 'textarea',
      placeholder: 'e.g., stick to Tailwind for styling, do not touch the auth module, keep bundle size small...',
    },
  ],
  template: (a) => `You are an autonomous coding agent working in Google Antigravity. Plan, implement, verify, and report back on the following task. Work end-to-end without stopping to ask basic clarifying questions — make reasonable decisions and document them in your final summary.

TASK
${a.buildGoal}

CONTEXT
- Codebase state: ${a.existingCodebase}
${a.constraints ? `- Constraints: ${a.constraints}` : ''}

----------------------------
HOW TO WORK
----------------------------

1. PLAN FIRST
- Before writing code, produce a short implementation plan as an Artifact: the files you'll touch or create, the approach, and any assumptions you're making given the context above.

2. IMPLEMENT
- Build the complete feature — don't stub out pieces or leave TODOs for functionality that was explicitly requested.
${a.existingCodebase === 'Existing codebase, add this feature' ? '- Match the existing codebase\'s conventions (naming, file structure, styling approach) rather than introducing a new pattern.' : ''}${a.existingCodebase === "Existing codebase, I'm not sure how it fits yet" ? '- Index and read the relevant parts of the existing codebase first, and note in your plan Artifact where this feature fits before writing new code.' : ''}${a.existingCodebase === 'Brand new project, start from scratch' ? '- Set up a clean, sensible project structure before adding feature code.' : ''}

3. VERIFY YOUR OWN WORK
${a.verification === 'Click through the UI in the browser subagent and confirm it works' ? '- Use the Browser Subagent to actually open the app, click through the feature end-to-end, and capture screenshots as Artifacts proving it works.' : ''}${a.verification === 'Write and run automated tests' ? '- Write automated tests covering the feature\'s core behavior and edge cases, then run them and fix any failures before finishing.' : ''}${a.verification === 'Both — tests plus a manual browser pass' ? '- Write and run automated tests, AND use the Browser Subagent to manually click through the feature in a real browser, capturing screenshots as Artifacts.' : ''}
- If verification uncovers a bug, fix it and re-verify before declaring the task done — don't report success on unverified code.

4. REPORT
- Finish with a summary Artifact: what was built, which files changed, how it was verified, and any follow-up items you deliberately left out of scope.

BEGIN BY PRODUCING THE PLAN ARTIFACT, THEN IMPLEMENT.`,
  resultMeta: () => ({
    title: 'Build a Feature or App Prompt',
    extraInstruction: 'Paste into the Antigravity Editor view\'s agent chat (not the inline autocomplete). Review the plan Artifact it produces before letting it proceed if the task touches sensitive code.',
  }),
};

const parallelAgentsFields = {
  type: 'form',
  steps: [
    {
      key: 'overallGoal',
      shortLabel: 'Overall goal',
      label: 'What\'s the larger piece of work you want split across agents?',
      type: 'textarea',
      placeholder: 'e.g., ship a new dashboard: rebuild the API layer, redesign the frontend, and update the docs — all at once...',
    },
    {
      key: 'workstreams',
      shortLabel: 'Workstreams',
      label: 'List the separate workstreams, one per line (2-5 agents recommended)',
      type: 'textarea',
      placeholder: 'e.g.:\nRefactor the /api/users endpoints to use the new schema\nRebuild the settings page UI in React\nUpdate README and API docs to match',
    },
    {
      key: 'dependency',
      shortLabel: 'Dependencies',
      label: 'Do any of these workstreams depend on each other?',
      type: 'cards',
      options: ['No — fully independent, run all in parallel', 'Some depend on others finishing first', "Not sure — let the agents flag conflicts"],
    },
    {
      key: 'conflictHandling',
      shortLabel: 'Conflicts',
      label: 'If two agents touch the same file, what should happen?',
      type: 'cards',
      options: ['Stop and ask me before merging', 'Try to auto-merge, then flag anything it could not resolve'],
    },
  ],
  template: (a) => `You are coordinating multiple agents in Google Antigravity's Agent Manager (Manager View) to complete a larger goal in parallel. Set this up and supervise it end-to-end.

OVERALL GOAL
${a.overallGoal}

WORKSTREAMS TO SPLIT ACROSS AGENTS
${a.workstreams}

- Dependency structure: ${a.dependency}
- File-conflict handling: ${a.conflictHandling}

----------------------------
HOW TO ORCHESTRATE THIS
----------------------------

1. SPAWN
- Spin up one agent per workstream listed above in the Manager View, each with a clear, scoped task description derived from its line item — don't let scopes bleed into each other.
${a.dependency === 'Some depend on others finishing first' ? '- Sequence the dependent workstreams: hold back any agent whose task depends on another until the prerequisite agent reports done.' : ''}${a.dependency === 'No — fully independent, run all in parallel' ? '- Launch all agents simultaneously since none depend on each other.' : ''}${a.dependency === 'Not sure — let the agents flag conflicts' ? '- Launch all agents, but instruct each to check for overlap with the others\' stated scope before editing shared files, and flag it if found.' : ''}

2. SUPERVISE
- Monitor each agent's Artifacts (plans, diffs, screenshots) as they land rather than waiting for all to finish before checking in.
- ${a.conflictHandling === 'Stop and ask me before merging' ? 'If two agents modify the same file, pause both and surface the conflict for a decision before merging either.' : 'Attempt to auto-merge overlapping changes where the intent is clearly compatible; only surface a conflict if the changes genuinely contradict each other.'}

3. CONSOLIDATE
- Once all workstreams report done, review the combined diff as a whole for consistency (naming, style, no duplicated logic across workstreams).
- Produce one consolidated summary Artifact covering all workstreams: what each agent did, verification status, and anything that needs manual follow-up.

BEGIN BY SPAWNING THE AGENTS FOR EACH WORKSTREAM LISTED ABOVE.`,
  resultMeta: () => ({
    title: 'Multi-Agent Orchestration Prompt',
    extraInstruction: 'Paste into the Manager View\'s task input to kick off the coordinating agent, or split each workstream line into its own agent manually if you\'d rather assign them yourself.',
  }),
};

const bugFixFields = {
  type: 'form',
  steps: [
    {
      key: 'bugDescription',
      shortLabel: 'The bug',
      label: 'What\'s broken, and how do you reproduce it?',
      type: 'textarea',
      placeholder: 'e.g., clicking "Add to cart" on the product page does nothing on mobile; steps: open /products/1 on a narrow viewport, tap Add to cart, nothing happens...',
    },
    {
      key: 'expectedBehavior',
      shortLabel: 'Expected',
      label: 'What should happen instead?',
      type: 'textarea',
      placeholder: 'e.g., the item should be added to the cart and the cart icon badge should increment',
    },
    {
      key: 'suspectedArea',
      shortLabel: 'Suspected area',
      label: 'Do you know roughly where the bug lives?',
      type: 'cards',
      options: ["Frontend/UI", "Backend/API", "Not sure — the agent should investigate"],
    },
    {
      key: 'regressionRisk',
      shortLabel: 'Regression risk',
      label: 'How cautious should the fix be?',
      type: 'cards',
      options: ['Minimal, surgical fix only', "Fix it properly even if it touches more code"],
    },
  ],
  template: (a) => `You are debugging in Google Antigravity. Use the Browser Subagent to reproduce this bug visually before touching any code, then fix it and verify the fix the same way.

BUG REPORT
${a.bugDescription}

EXPECTED BEHAVIOR
${a.expectedBehavior}

- Suspected area: ${a.suspectedArea}
- Fix scope: ${a.regressionRisk}

----------------------------
HOW TO WORK
----------------------------

1. REPRODUCE FIRST
- Use the Browser Subagent to follow the reproduction steps above exactly and confirm the bug actually occurs. Capture a screenshot Artifact of the broken state before changing anything.
- Do not skip straight to a code fix based on the description alone — confirm it visually first.

2. INVESTIGATE
${a.suspectedArea === 'Not sure — the agent should investigate' ? '- Trace the issue from the reproduction steps back through the relevant code — don\'t guess at the cause, confirm it (e.g. via logs, breakpoints, or reading the actual execution path).' : `- Start your investigation in the ${a.suspectedArea.toLowerCase()}, but follow the evidence if it leads elsewhere.`}
- Identify the root cause, not just a symptom — explain it in your plan Artifact before fixing.

3. FIX
- ${a.regressionRisk === 'Minimal, surgical fix only' ? 'Make the smallest change that correctly fixes the root cause. Avoid refactoring unrelated code, even if you notice other issues nearby — note them separately instead.' : 'Fix the root cause properly, even if that means touching adjacent code, as long as the change stays scoped to this bug\'s underlying issue.'}

4. VERIFY THE FIX
- Use the Browser Subagent again to repeat the exact same reproduction steps and confirm the expected behavior now occurs. Capture a screenshot Artifact of the fixed state.
- Report the fix as done only after this visual re-verification passes.

BEGIN BY REPRODUCING THE BUG IN THE BROWSER SUBAGENT.`,
  resultMeta: () => ({
    title: 'Browser-Verified Bug Fix Prompt',
    extraInstruction: 'Paste into the Editor view\'s agent chat. Check the before/after screenshot Artifacts it produces to confirm the fix visually yourself, not just from the summary text.',
  }),
};

const refactorFields = {
  type: 'form',
  steps: [
    {
      key: 'refactorGoal',
      shortLabel: 'Goal',
      label: 'What are you refactoring or migrating?',
      type: 'textarea',
      placeholder: 'e.g., migrate all class components to function components with hooks, move from REST calls scattered in components to a central API client, upgrade from Webpack to Vite...',
    },
    {
      key: 'scope',
      shortLabel: 'Scope',
      label: 'How much of the codebase does this touch?',
      type: 'cards',
      options: ['One module or folder', 'Multiple modules, but not the whole app', 'Whole codebase'],
    },
    {
      key: 'behaviorChange',
      shortLabel: 'Behavior',
      label: 'Should external behavior change at all?',
      type: 'cards',
      options: ['No — pure refactor, behavior must stay identical', 'Small, intentional improvements are fine along the way'],
    },
    {
      key: 'rolloutStyle',
      shortLabel: 'Rollout',
      label: 'How should the change land?',
      type: 'cards',
      options: ['One complete pass, all at once', 'Incrementally, in reviewable chunks'],
    },
  ],
  template: (a) => `You are performing a large-scale refactor/migration in Google Antigravity. Use your full codebase context to do this consistently everywhere it applies, not just in the first few files you touch.

REFACTOR / MIGRATION GOAL
${a.refactorGoal}

- Scope: ${a.scope}
- Behavior change allowed: ${a.behaviorChange}
- Rollout style: ${a.rolloutStyle}

----------------------------
HOW TO WORK
----------------------------

1. SURVEY THE FULL SCOPE FIRST
- Before changing anything, index and search the codebase for every location this refactor touches${a.scope === 'Whole codebase' ? ' across the entire project' : a.scope === 'Multiple modules, but not the whole app' ? ' across the relevant modules' : ' within the specified module/folder'}. Produce a plan Artifact listing every file affected — don't discover stragglers halfway through and leave them inconsistent.

2. APPLY THE CHANGE CONSISTENTLY
${a.behaviorChange === 'No — pure refactor, behavior must stay identical' ? '- This is a pure refactor: the external behavior, API surface, and output must be byte-for-byte equivalent afterward. Do not sneak in unrelated improvements.' : '- Apply the refactor, and where you spot a small, clearly-safe improvement directly related to the goal, make it — but stay focused on the stated goal, don\'t scope-creep into unrelated cleanup.'}
- Use the same pattern/convention across every file you touch — inconsistent half-migrated code is worse than not starting.

3. ROLL OUT
${a.rolloutStyle === 'One complete pass, all at once' ? '- Complete the full migration in one pass across all files identified in your plan, then verify the whole thing together.' : '- Break the migration into reviewable chunks (e.g. by module or by file group), completing and verifying one chunk before moving to the next, so each step is independently reviewable.'}

4. VERIFY
- Run the existing test suite (or write coverage for critical paths if none exists) and confirm nothing broke.
- If behavior must stay identical, explicitly confirm this — run before/after comparisons where feasible rather than assuming the refactor is safe.
- Finish with a summary Artifact: files changed, anything intentionally left out of scope, and test results.

BEGIN BY SURVEYING THE FULL SCOPE, THEN PRODUCE THE PLAN ARTIFACT.`,
  resultMeta: () => ({
    title: 'Codebase Refactor / Migration Prompt',
    extraInstruction: 'Paste into the Editor view\'s agent chat. For large scopes, review the plan Artifact\'s file list before approving — that\'s the cheapest point to catch a missed area.',
  }),
};

export const googleAntigravityFlow = {
  start: 'goal',
  nodes: {
    goal: {
      type: 'choice',
      title: 'What do you want to do in Antigravity?',
      subtitle: 'Select the type of task you want an agent prompt for.',
      options: [
        {
          id: 'buildfeature',
          label: 'Build a Feature or App End-to-End',
          description: 'Agent plans, codes, and verifies a complete build from a prompt.',
          icon: '\u{1F680}',
          next: 'buildFeatureFields',
        },
        {
          id: 'parallelagents',
          label: 'Orchestrate Parallel Agents',
          description: 'Split a bigger goal across multiple agents in the Manager View.',
          icon: '\u{1F465}',
          next: 'parallelAgentsFields',
        },
        {
          id: 'bugfix',
          label: 'Browser-Verified Bug Fix',
          description: 'Reproduce, fix, and re-verify a bug using the Browser Subagent.',
          icon: '\u{1F41B}',
          next: 'bugFixFields',
        },
        {
          id: 'refactor',
          label: 'Codebase Refactor / Migration',
          description: 'Consistent, full-context refactor across many files.',
          icon: '\u{1F9F0}',
          next: 'refactorFields',
        },
      ],
    },
    buildFeatureFields,
    parallelAgentsFields,
    bugFixFields,
    refactorFields,
  },
};
