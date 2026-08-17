import { chatgptFlow } from './chatgpt.js';
import { claudeFlow } from './claude.js';
import { nanoBananaFlow } from './nanoBanana.js';
import { geminiFlow } from './gemini.js';
import { notebooklmFlow } from './notebooklm.js';
import { googleAiStudioFlow } from './googleAiStudio.js';

export const FLOWS = {
  chatgpt: chatgptFlow,
  claude: claudeFlow,
  'nano-banana': nanoBananaFlow,
  gemini: geminiFlow,
  notebooklm: notebooklmFlow,
  'google-ai-studio': googleAiStudioFlow,
};
