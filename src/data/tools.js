export const TOOLS = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    tagline: 'Business plans, e-books, web tools & more.',
    icon: '💬',
    enabled: true,
  },
  {
    id: 'claude',
    name: 'Claude',
    tagline: 'Writing, code and deep research prompts.',
    icon: '✦',
    enabled: true,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    tagline: "Google's multimodal AI.",
    icon: '♊',
    enabled: true,
  },
  {
    id: 'notebooklm',
    name: 'NotebookLM',
    tagline: 'AI-powered research assistant.',
    icon: '📓',
    enabled: true,
  },
  {
    id: 'google-ai-studio',
    name: 'Google AI Studio',
    tagline: 'App and website builder by Google.',
    icon: '🧪',
    enabled: true,
  },
  {
    id: 'google-antigravity',
    name: 'Google Antigravity',
    tagline: 'Agentic AI coding IDE by Google.',
    icon: '🚀',
    enabled: true,
  },
  {
    id: 'nano-banana',
    name: 'Nano Banana',
    tagline: 'AI-powered image prompt generator.',
    icon: '🍌',
    enabled: true,
  },
  {
    id: 'horizons',
    name: 'Horizons',
    tagline: "Hostinger's AI app builder.",
    icon: '🌅',
    enabled: true,
  },
  {
    id: 'google-stitch',
    name: 'Google Stitch',
    tagline: 'AI-powered app design tool.',
    icon: '🧵',
    enabled: true,
  },
];

export function getToolMeta(id) {
  return TOOLS.find((t) => t.id === id);
}
