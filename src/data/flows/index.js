import { chatgptFlow } from './chatgpt.js';
import { claudeFlow } from './claude.js';
import { nanoBananaFlow } from './nanoBanana.js';

export const FLOWS = {
  chatgpt: chatgptFlow,
  claude: claudeFlow,
  'nano-banana': nanoBananaFlow,
};
