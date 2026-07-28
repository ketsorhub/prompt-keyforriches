const organicFields = {
  type: 'form',
  steps: [
    {
      key: 'platform',
      shortLabel: 'Platform',
      label: 'Which platform is this for?',
      type: 'cards',
      options: ['Instagram', 'Facebook', 'Pinterest', 'TikTok'],
    },
    {
      key: 'subject',
      shortLabel: 'Subject',
      label: 'What should the image show?',
      type: 'textarea',
      placeholder: 'Describe the subject, setting and any props or people...',
    },
    {
      key: 'style',
      shortLabel: 'Visual style',
      label: 'What visual style are you going for?',
      type: 'cards',
      options: ['Photorealistic', 'Illustration', '3D Render', 'Minimalist'],
    },
    {
      key: 'mood',
      shortLabel: 'Mood',
      label: 'What mood or feeling should it have?',
      type: 'text',
      placeholder: 'e.g., warm and inviting, bold and energetic, calm and premium',
    },
    {
      key: 'aspectRatio',
      shortLabel: 'Aspect ratio',
      label: 'What aspect ratio do you need?',
      type: 'cards',
      options: ['Square (1:1)', 'Portrait (4:5)', 'Story/Reel (9:16)'],
    },
  ],
  template: (a) => `Create a single high-quality image with the following specification:

SUBJECT: ${a.subject}

STYLE: ${a.style}, optimized for organic ${a.platform} content — the kind that stops the scroll without looking like an ad.
MOOD / LIGHTING: ${a.mood}
COMPOSITION: Frame for ${a.aspectRatio}, with the main subject clearly readable at thumbnail size.
COLOR PALETTE: Choose colors that reinforce the mood above and stand out in a crowded ${a.platform} feed.

DETAILS TO GET RIGHT
- Keep the focal point uncluttered — one clear subject, not a busy scene.
- Lighting and shadows should feel natural and consistent across the whole image.
- Avoid any text, watermarks, or logos in the image itself.

Generate the image now.`,
  resultMeta: () => ({
    title: 'Organic Content Prompt',
    extraInstruction: 'Generate a few variations and pick the one with the strongest focal point before you post.',
  }),
};

const paidFields = {
  type: 'form',
  steps: [
    {
      key: 'adGoal',
      shortLabel: 'Ad goal',
      label: "What's the goal of this ad?",
      type: 'cards',
      options: ['Click-through', 'Brand awareness', 'Conversion / sales'],
    },
    {
      key: 'product',
      shortLabel: 'Product/offer',
      label: 'What product or offer is this promoting?',
      type: 'textarea',
      placeholder: 'Describe the product/offer and what makes it worth showing...',
    },
    {
      key: 'keyMessage',
      shortLabel: 'Key message',
      label: "What's the one message this image needs to land?",
      type: 'text',
      placeholder: 'e.g., "50% off today only", "the easiest way to track expenses"',
    },
    {
      key: 'style',
      shortLabel: 'Visual style',
      label: 'What visual style fits your brand?',
      type: 'cards',
      options: ['Bold & Vibrant', 'Clean & Minimal', 'Luxury', 'Playful'],
    },
    {
      key: 'platform',
      shortLabel: 'Ad platform',
      label: 'Where will this ad run?',
      type: 'cards',
      options: ['Meta Ads', 'Google Display', 'LinkedIn'],
    },
  ],
  template: (a) => `Create a single high-quality advertising image with the following specification:

PRODUCT / OFFER: ${a.product}
GOAL: ${a.adGoal}, built for a ${a.platform} placement.
KEY MESSAGE TO SUPPORT: "${a.keyMessage}" (leave clear negative space where this headline/CTA text would be overlaid afterward — do not render the text into the image itself).

STYLE: ${a.style}, on-brand and scroll-stopping without feeling like generic stock photography.
COMPOSITION: Strong single focal point, with the product/offer clearly the hero of the frame. Keep the top third or one clear side of the image relatively clean for headline and CTA overlay.
PLATFORM FIT: Composition should stay legible at small ad sizes and thumbnail crops on ${a.platform}.

DETAILS TO GET RIGHT
- No text, logos, or watermarks baked into the image — that gets added separately.
- Lighting should make the product/offer feel premium and trustworthy.

Generate the image now.`,
  resultMeta: () => ({
    title: 'Paid Creative Prompt',
    extraInstruction: 'Keep the headline/CTA text out of the image itself — add it afterward in your ad platform or design tool.',
  }),
};

const facelessFields = {
  type: 'form',
  steps: [
    {
      key: 'videoTopic',
      shortLabel: 'Video topic',
      label: 'What is the video about?',
      type: 'text',
      placeholder: 'e.g., 5 mistakes new investors make',
    },
    {
      key: 'characterDescription',
      shortLabel: 'Narrator/character',
      label: 'Describe the narrator or main character, in detail.',
      type: 'textarea',
      placeholder: 'Be specific — face, hair, clothing, age — so it stays consistent across every scene...',
    },
    {
      key: 'numberOfScenes',
      shortLabel: 'Scene count',
      label: 'Roughly how many scenes will this video need?',
      type: 'cards',
      options: ['3–5 scenes', '5–10 scenes', '10–15 scenes', '15+ scenes'],
    },
    {
      key: 'visualStyle',
      shortLabel: 'Visual style',
      label: 'What visual style should it use?',
      type: 'cards',
      options: ['Cinematic realism', 'Anime', 'Cartoon', '3D animated'],
    },
    {
      key: 'settingMood',
      shortLabel: 'Setting & mood',
      label: 'What setting and mood ties the scenes together?',
      type: 'text',
      placeholder: 'e.g., cozy home office, high-energy city backdrop, calm nature setting',
    },
  ],
  template: (a) => `You are generating a continuous, scene-by-scene image prompt set for a faceless-style video about: "${a.videoTopic}".

CHARACTER CONSISTENCY (use this exact description in every single scene, unchanged)
${a.characterDescription}

GLOBAL STYLE (apply to every scene)
- Visual style: ${a.visualStyle}
- Setting / mood: ${a.settingMood}
- Keep lighting, color grading and character proportions identical across all scenes.

INSTRUCTIONS
Generate ${a.numberOfScenes} as a numbered list of individual image prompts, one per scene, in the order they'd appear in the video. For each scene:
1. Restate the character consistency block above, unchanged.
2. Describe only what's different in that scene — action, camera angle, background detail.
3. Keep each scene prompt self-contained, so it can be generated on its own and still match the others.

Do not skip the character consistency block on any scene — that's what keeps the narrator looking identical throughout the video.

Generate the full scene-by-scene prompt list now, starting with Scene 1.`,
  resultMeta: () => ({
    title: 'Faceless Video Prompt Set',
    extraInstruction: 'Generate scenes in order and keep each output image for reference so later scenes stay visually consistent.',
  }),
};

export const nanoBananaFlow = {
  start: 'contentType',
  nodes: {
    contentType: {
      type: 'choice',
      title: 'What are you creating today?',
      subtitle: 'Select the type of content you want to generate prompts for.',
      options: [
        {
          id: 'organic',
          label: 'Organic Content',
          description: 'For Instagram, Facebook, Pinterest, etc. — built to engage your followers.',
          icon: '\u{1F4F1}',
          next: 'organicFields',
        },
        {
          id: 'paid',
          label: 'Paid Creatives',
          description: 'For Meta Ads, Google Display and other conversion-focused visuals.',
          icon: '\u{1F4E3}',
          next: 'paidFields',
        },
        {
          id: 'faceless',
          label: 'Faceless YouTube Video',
          description: 'One continuous, consistent-character prompt set, scene by scene.',
          icon: '\u{1F3AC}',
          next: 'facelessFields',
        },
      ],
    },
    organicFields,
    paidFields,
    facelessFields,
  },
};
