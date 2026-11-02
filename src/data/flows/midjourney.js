const imageFields = {
  type: 'form',
  steps: [
    {
      key: 'subject',
      shortLabel: 'Subject',
      label: 'What is the main subject of the image?',
      type: 'textarea',
      placeholder: 'e.g., an elderly fisherman mending nets at dawn, a futuristic glass greenhouse city, a corgi astronaut...',
    },
    {
      key: 'style',
      shortLabel: 'Style',
      label: 'Which visual style do you want?',
      type: 'cards',
      options: ['Photorealistic photography', 'Cinematic film still', 'Digital illustration', 'Oil painting', '3D render', 'Anime / manga'],
    },
    {
      key: 'mood',
      shortLabel: 'Mood & Light',
      label: 'Describe the mood, lighting and colors',
      type: 'textarea',
      placeholder: 'e.g., warm golden-hour light, calm and nostalgic, muted teal and orange palette...',
    },
    {
      key: 'ratio',
      shortLabel: 'Aspect Ratio',
      label: 'What shape should the image be?',
      type: 'cards',
      options: ['Square (1:1)', 'Landscape (16:9)', 'Portrait (2:3)', 'Vertical story (9:16)'],
    },
  ],
  template: (a) => {
    const ar = { 'Square (1:1)': '1:1', 'Landscape (16:9)': '16:9', 'Portrait (2:3)': '2:3', 'Vertical story (9:16)': '9:16' }[a.ratio] || '1:1';
    const styleText = {
      'Photorealistic photography': 'photorealistic photograph, shot on a 35mm lens, shallow depth of field, natural skin and material textures',
      'Cinematic film still': 'cinematic film still, anamorphic lens, dramatic composition, subtle film grain',
      'Digital illustration': 'detailed digital illustration, clean linework, rich painterly shading',
      'Oil painting': 'traditional oil painting, visible brushstrokes, textured canvas, gallery quality',
      '3D render': 'high-quality 3D render, physically based materials, soft global illumination',
      'Anime / manga': 'anime style illustration, expressive characters, crisp cel shading',
    }[a.style] || a.style.toLowerCase();
    return `/imagine prompt: ${a.subject.trim()}, ${styleText}, ${a.mood.trim()}, highly detailed, balanced composition --ar ${ar} --v 7 --style raw --no text, watermark, extra fingers, blurry

----------------------------
HOW TO USE THIS
----------------------------
- Paste the line above into Midjourney (Discord or the web app Imagine bar).
- --ar ${ar} sets the shape, --v 7 uses the latest model, --style raw reduces Midjourney's own stylization so your words matter more, and --no removes unwanted elements.
- If the result is too plain, raise --stylize (e.g. --s 250). If it drifts from your idea, lower it (e.g. --s 50).

VARIATIONS TO TRY
- Swap the style words for: ${a.style === 'Photorealistic photography' ? 'cinematic film still' : 'photorealistic photograph'}.
- Add --chaos 20 for more varied results across the four options.
- Use Vary (Subtle) on your favorite result to refine details without losing the composition.`;
  },
  resultMeta: () => ({
    title: 'Midjourney Image Prompt',
    extraInstruction: 'Paste the whole /imagine line into Midjourney. Parameters (the -- parts) must stay at the end of the prompt.',
  }),
};

const characterFields = {
  type: 'form',
  steps: [
    {
      key: 'character',
      shortLabel: 'Character',
      label: 'Describe your character (look, age, clothing, personality)',
      type: 'textarea',
      placeholder: 'e.g., a young female botanist with short silver hair, round glasses, mustard raincoat, curious expression...',
    },
    {
      key: 'setting',
      shortLabel: 'Setting',
      label: 'Where is the character, and what are they doing?',
      type: 'textarea',
      placeholder: 'e.g., kneeling in a misty cloud forest examining a glowing fern...',
    },
    {
      key: 'artStyle',
      shortLabel: 'Art Style',
      label: 'Which art style should it follow?',
      type: 'cards',
      options: ['Storybook illustration', 'Anime / manga', 'Pixar-like 3D', 'Comic book', 'Realistic concept art'],
    },
    {
      key: 'shot',
      shortLabel: 'Shot',
      label: 'How should the character be framed?',
      type: 'cards',
      options: ['Close-up portrait', 'Half body', 'Full body', 'Character turnaround sheet'],
    },
  ],
  template: (a) => {
    const shotText = {
      'Close-up portrait': 'close-up portrait, face and shoulders',
      'Half body': 'medium shot, waist-up',
      'Full body': 'full body shot, head to toe visible',
      'Character turnaround sheet': 'character design sheet, front view, side view and back view of the same character, plain neutral background',
    }[a.shot] || a.shot.toLowerCase();
    return `/imagine prompt: ${a.character.trim()}, ${a.setting.trim()}, ${shotText}, ${a.artStyle.toLowerCase()}, consistent design, detailed face, soft lighting --ar ${a.shot === 'Character turnaround sheet' ? '16:9' : '2:3'} --v 7 --no extra limbs, distorted hands, text

----------------------------
KEEPING THE CHARACTER CONSISTENT
----------------------------
1. When you get a result you like, copy its image link (or upload it) and add it to future prompts with --cref [image URL] so the same character appears in new scenes.
2. Control how strictly the face and outfit are copied with --cw 100 (face, hair and clothing) or --cw 0 (face only).
3. Keep the same wording for the character description in every prompt; only change the setting and action.
4. For a new pose, change only the action part, for example: "${a.character.trim().split(',')[0]}, waving at the camera".`;
  },
  resultMeta: () => ({
    title: 'Midjourney Character Prompt',
    extraInstruction: 'Paste into Midjourney. After your first good result, reuse it with --cref to keep the same character across scenes.',
  }),
};

const productFields = {
  type: 'form',
  steps: [
    {
      key: 'product',
      shortLabel: 'Product',
      label: 'What product or object do you want to show?',
      type: 'text',
      placeholder: 'e.g., a matte black ceramic coffee mug, a minimalist running shoe, a glass perfume bottle...',
    },
    {
      key: 'scene',
      shortLabel: 'Scene',
      label: 'What scene or background should surround it?',
      type: 'textarea',
      placeholder: 'e.g., on a rustic wooden table beside morning window light, floating over a soft pastel gradient...',
    },
    {
      key: 'purpose',
      shortLabel: 'Purpose',
      label: 'What will the image be used for?',
      type: 'cards',
      options: ['E-commerce listing', 'Social media ad', 'Website hero banner', 'Packaging mockup'],
    },
  ],
  template: (a) => {
    const ar = { 'E-commerce listing': '1:1', 'Social media ad': '4:5', 'Website hero banner': '16:9', 'Packaging mockup': '3:2' }[a.purpose] || '1:1';
    return `/imagine prompt: professional product photography of ${a.product.trim()}, ${a.scene.trim()}, studio quality lighting, crisp focus, realistic materials and reflections, commercial advertising look, clean composition with negative space for text --ar ${ar} --v 7 --style raw --no people, text, logo, watermark, clutter

----------------------------
NOTES FOR ${a.purpose.toUpperCase()}
----------------------------
- Aspect ratio ${ar} was chosen to suit this use.
- Midjourney may invent labels or logos. Add your real branding afterwards in an editor rather than prompting for it.
- Use Vary (Region) to fix one detail, or Upscale (Subtle) before exporting.
- To explore options quickly, rerun the prompt with different scene words such as "marble countertop", "outdoor garden light" or "dark moody backdrop".`;
  },
  resultMeta: () => ({
    title: 'Midjourney Product Prompt',
    extraInstruction: 'Paste into Midjourney. Generate several variations, then upscale the best one for final use.',
  }),
};

export const midjourneyFlow = {
  start: 'goal',
  nodes: {
    goal: {
      type: 'choice',
      title: 'What do you want to create in Midjourney?',
      subtitle: 'Select the type of image you want a prompt for.',
      options: [
        {
          id: 'image',
          label: 'Image From an Idea',
          description: 'Turn a scene or concept into a styled /imagine prompt with the right parameters.',
          icon: '\u{1F5BC}\u{FE0F}',
          next: 'imageFields',
        },
        {
          id: 'character',
          label: 'Consistent Character',
          description: 'Design a character and learn how to keep them the same across scenes.',
          icon: '\u{1F9D1}\u{200D}\u{1F3A8}',
          next: 'characterFields',
        },
        {
          id: 'product',
          label: 'Product Shot',
          description: 'Create clean commercial product images for stores, ads and websites.',
          icon: '\u{1F4E6}',
          next: 'productFields',
        },
      ],
    },
    imageFields,
    characterFields,
    productFields,
  },
};
