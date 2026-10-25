export type Project = {
  year: string;
  title: string;
  category: string;
  problem: string;
  why: string;
  focus: string;
  stack: string[];
  github?: string;
  live?: string;
  image: string;
  imageAlt: string;
};
export const projects: Project[] = [
  {
    year: '2026',
    title: 'LandWatch',
    category: 'Decision Support Prototype',
    problem:
      'Officers could see the current status of a highway land acquisition, but nothing warned them which projects were drifting toward a serious delay until it had already happened.',
    why: 'It started as a Smart India Hackathon problem, and I wanted to see whether a delay warning could be made explainable enough to act on.',
    focus:
      'I built the FastAPI service, the XGBoost risk model, and the Leaflet map, with SHAP behind each flag so it gives reasons instead of a bare score.',
    stack: ['Next.js', 'FastAPI', 'XGBoost', 'PostgreSQL'],
    github: 'https://github.com/ekkerihasan/Landwatch',
    image: '/landwatch.png',
    imageAlt: 'LandWatch land acquisition monitoring dashboard',
  },
  {
    year: '2026',
    title: 'VidyutMitra',
    category: 'Vernacular AI Advisor',
    problem:
      'A MESCOM electricity bill arrives in English and in jargon, so the people paying it often cannot tell which charge went up, or which Karnataka scheme they already qualify for.',
    why: 'It was our first hackathon build. The fix could not be another dashboard — it had to reach people where they already are, in the language they read, without holding on to their bill.',
    focus:
      'I handled the Twilio WhatsApp integration and the frontend design: getting bill photos and replies moving reliably through WhatsApp, and building the face of it.',
    stack: ['Flask', 'Gemini', 'Twilio', 'Supabase'],
    github: 'https://github.com/hackfest-dev/HF26-13',
    live: 'https://vidyut-mitra.wasih.tech/',
    image: '/vidyutmitra.png',
    imageAlt:
      'VidyutMitra landing page showing a WhatsApp bill explanation in Kannada',
  },
  {
    year: '2025',
    title: 'Hospital Management System',
    category: 'Healthcare Operations',
    problem:
      'The team needed one place to handle patient records, scheduling, and billing without bouncing between tools.',
    why: 'I wanted the workflow to read in a single pass for staff who use it every day.',
    focus:
      'I built the patient flow, scheduling screens, and the data layer around them.',
    stack: ['Node.js', 'Express', 'PostgreSQL'],
    image: '/healthcare.png',
    imageAlt: 'Healthcare management dashboard preview',
  },
  {
    year: '2026',
    title: 'Secure Vault',
    category: 'Security-first Utility',
    problem:
      'I wanted a credential tool that felt easier to trust than a notes app or a loose spreadsheet.',
    why: 'It was a practical way to work through encryption, access control, and storage rules.',
    focus:
      'I handled the encryption flow, auth boundaries, and persistence logic.',
    stack: ['Python', 'Django', 'AES-256'],
    image: '/passmanager.png',
    imageAlt: 'Password manager interface preview',
  },
  {
    year: '2025',
    title: 'Authenticated Quiz Platform',
    category: 'Internal Tooling',
    problem:
      'Students needed a quiz flow with role-based access instead of scattered logic across pages.',
    why: 'I wanted one system to handle both the participant flow and the admin side.',
    focus: 'I built the auth flow, scoring logic, and the management screens.',
    stack: ['TypeScript', 'JWT', 'MySQL'],
    github: 'https://github.com/ekkerihasan/quiz-game',
    image: '/quiz.png',
    imageAlt: 'Quiz platform interface preview',
  },
  {
    year: '2025',
    title: 'Flappy AI',
    category: 'Exploratory ML',
    problem:
      'I wanted a small environment to test learning loops without setting up a full product.',
    why: 'It was a clean way to see how a model reacts to a simple feedback loop.',
    focus: 'I built the simulation, the experiment loop, and the tuning logic.',
    stack: ['Python', 'NumPy', 'Pygame'],
    github: 'https://github.com/ekkerihasan/flappy_ai',
    image: '/flappy.png',
    imageAlt: 'Flappy AI game preview',
  },
];

