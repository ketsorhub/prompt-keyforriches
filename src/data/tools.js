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
    enabled: false,
  },
  {
    id: 'google-ai-studio',
    name: 'Google AI Studio',
    tagline: 'App and website builder by Google.',
    icon: '🧪',
    enabled: false,
  },
  {
    id: 'google-antigravity',
    name: 'Google Antigravity',
    tagline: "Google's app builder.",
    icon: '🚀',
    enabled: false,
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
    enabled: false,
  },
  {
    id: 'google-stitch',
    name: 'Google Stitch',
    tagline: 'AI-powered app design tool.',
    icon: '🧵',
    enabled: false,
  },
];

export function getToolMeta(id) {
  return TOOLS.find((t) => t.id === id);
}
