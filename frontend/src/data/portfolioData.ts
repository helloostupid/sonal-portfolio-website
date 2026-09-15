// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH — edit this file to update the site.
// Everything below is realistic PLACEHOLDER content. Search for
// "REPLACE" and swap in real details without touching any UI code.
// ─────────────────────────────────────────────────────────────

export const identity = {
  name: 'Sonal Gholap',
  firstName: 'SONAL',
  lastName: 'GHOLAP',
  role: 'Software Engineer',
  taglineLines: ['Building software with', 'clarity and intent.'],
  location: 'India', 
  email: 'sonalgholap5820@gmail.com', 
  github: 'https://github.com/helloostupid',
  linkedin: 'https://www.linkedin.com/in/sonal-gholap-71437a22a/', 
}

export const hero = {
  kicker: 'PORTFOLIO — VOL. 01',
  availability: 'Open to interesting problems',
  manifesto:
    'I work across software, data, and systems. I enjoy problems with no obvious answer, whether they come from production or a competitive programming contest.',
}

export const about = {
  chapter: '01',
  label: 'ABOUT',

  quote:
    'I enjoy understanding how things work, then figuring out how to make them work better.',

  paragraphs: [
    "I'm Sonal, a software developer working across backend systems, data, and machine learning. I enjoy building things from the ground up and understanding what happens beneath the surface.",

    'Outside work, I enjoy competitive programming and problems that require a bit of patience. I like learning new things, digging into unfamiliar systems, and figuring things out as I go.',
  ],

  image: `${import.meta.env.BASE_URL}sonal-img.webp`,

  imageAlt: 'Sonal Gholap',

  stats: [
    { value: '1400+', label: 'Specialist at Codeforces' },
    { value: '1900+', label: 'LeetCode rating' },
    { value: '1700+', label: 'CodeChef rating' },
  ],

  stack: [
    'Java', 'Linux',
    'Python',
    'C++',
    'Spring Boot',
    'SQL',
    'React',
    'Machine Learning',
    'Docker',
    'AWS',
    'Azure',
  ],
}

export const marqueeWords = [
  'BUILD',
  'BREAK',
  'UNDERSTAND',
  'SOLVE',
  'LEARN',
  'REPEAT',
]

export interface WorkRole {
  id: string
  company: string // REPLACE: real companies
  position: string
  duration: string
  description: string
  impact: string
  tech: string[]
}

export interface WorkRole {
  id: string
  company: string
  position: string
  duration: string
  description: string
  impact: string
  tech: string[]
}

export const work: WorkRole[] = [
  {
    id: 'role-1',
    company: 'Barclays',
    position: 'Software Developer',
    duration: 'Jul 2025 — Present',
    description:
      'Building Spring Boot REST APIs and automation workflows for internal reporting platforms. Working across microservices, data onboarding, testing, and production fixes.',
    impact:
      'Onboarded multiple datasets to Hadoop-based reporting, improved code coverage by 60%, reduced disk utilization from 90%+ to ~80%, and cut manual file-upload effort by 50%.',
    tech: [
      'Java',
      'Spring Boot',
      'Hadoop',
      'AutoSys',
      'JUnit',
      'Mockito',
      'Karate',
    ],
  },
  {
    id: 'role-2',
    company: 'Nouryon',
    position: 'Data Scientist Intern',
    duration: 'Jan 2025 — Jun 2025',
    description:
      'Investigated rising energy costs using statistical analysis, machine learning, and optimization. Built models on six years of hourly boiler sensor data.',
    impact:
      'Achieved 89% R² and 9% MAPE for natural gas consumption prediction, integrating the model into an optimization framework that delivered €390K in cost savings.',
    tech: [
      'Python',
      'Scikit-learn',
      'XGBoost',
      'Gurobi',
      'Azure',
      'CI/CD',
    ],
  },
  {
    id: 'role-3',
    company: 'Barclays',
    position: 'Technology Intern',
    duration: 'Jun 2024 — Aug 2024',
    description:
      'Worked on automation and database tooling for technology operations, from AutoSys job analysis to SQL-based production workflows.',
    impact:
      'Reduced manual AutoSys job analysis by 70%, improved dependency management efficiency by 40%, and built a PL/SQL algorithm that made cashflow deletion 87.5% faster.',
    tech: [
      'Bash',
      'AutoSys',
      'JIL',
      'PL/SQL',
      'Oracle SQL',
    ],
  },
]

export interface Project {
  id: string
  index: string
  title: string
  subtitle: string
  blurb: string // 1-2 lines shown on the gallery card itself
  year: string
  image: string
  tags: string[]
  overview: string
  role: string
  highlights: string[]
  link?: string // REPLACE: live URL
  repo?: string // REPLACE: repo URL
}

export interface Project {
  id: string
  index: string
  title: string
  subtitle: string
  blurb: string
  year: string
  image: string
  tags: string[]
  overview: string
  role: string
  highlights: string[]
  label?: string
  link?: string
  repo?: string
}

export const projects: Project[] = [
  {
    id: 'proj-1',
    index: 'P.01',
    title: 'SQLchemy',
    subtitle: 'A relational database built from scratch',
    blurb:
      'A C++ relational database engine covering storage, indexing, query execution, transactions, and crash recovery.',
    year: '2026',
    image: `${import.meta.env.BASE_URL}/sqlchemy.png`,
    tags: ['C++', 'Database Systems', 'B+ Trees', 'WAL'],
    overview:
      'A relational database engine built from scratch in C++, with a focus on understanding how database systems work beneath the query interface. The project covers page-based storage, buffer management, indexing, SQL execution, transactions, and recovery.',
    role: 'Solo build — database architecture and implementation',
    highlights: [
      'Page-based storage engine with disk persistence and buffer pool',
      'B+ Tree indexing and SQL query execution',
      'Write-ahead logging, crash recovery, and concurrency control',
    ],
    repo: 'https://github.com/helloostupid',
  },

  {
    id: 'proj-2',
    index: 'P.02',
    title: 'RAG for Tax Law Assistance',
    subtitle: 'Retrieval-augmented generation for Indian tax law',
    blurb:
      'A research project combining retrieval, language models, and multilingual NLP to answer tax-law queries and support personalized financial decisions.',
    year: '2025',
    image: `${import.meta.env.BASE_URL}/rag.png`,
    tags: ['Python', 'RAG', 'FAISS', 'Llama 3', 'T5'],
    label: 'PUBLISHED RESEARCH · ICSIAIML 2025',
    overview:
      'An integrated retrieval-augmented generation system for Indian tax law, combining FAISS-based semantic search, language models, multilingual translation, and personalized recommendations. The system retrieves relevant sections of the Income Tax Act and uses them to generate context-aware responses and tax-saving recommendations.',
    role: 'Research, machine learning and NLP',
    highlights: [
      '76.4% overall accuracy on tax-law queries',
      'Personalized tax-efficient investment recommendations based on user profiles',
      'Fine-tuned T5 translation model achieving a BLEU score of 76',
      'Published in the Proceedings of ICSIAIML 2025',
    ],
    link:
      'https://www.atlantis-press.com/proceedings/icsiaiml-25/126021177',
    repo: 'https://github.com/helloostupid',
  },

  {
    id: 'proj-3',
    index: 'P.03',
    title: 'Indian Sign Language Recognition',
    subtitle: 'Recognizing signs across Indian languages',
    blurb:
      'A computer vision project for recognizing Indian Sign Language gestures and translating them into accessible language outputs.',
    year: '2024',
    image: `${import.meta.env.BASE_URL}/sign-language.png`,
    tags: ['Python', 'Computer Vision', 'OpenCV', 'Machine Learning'],
    overview:
      'A sign language recognition project focused on using computer vision and machine learning to recognize Indian Sign Language gestures and make communication more accessible.',
    role: 'Machine learning and computer vision',
    highlights: [
      'Real-time hand gesture recognition',
      'Computer vision pipeline for sign detection',
      'Designed around accessibility and language translation',
    ],
    repo: 'https://github.com/helloostupid',
  },
]

export const education = {
  chapter: '04',

  degrees: [
    {
      fig: 'FIG. 01',
      degree: 'B.Tech — Computer Science',
      school: 'Sardar Patel Institute of Technology',
      period: '2021 — 2025',
      notes:
        'Built a strong foundation in computer science, with a focus on software engineering, algorithms, databases, and machine learning. Graduated with a CGPA of 8.39/10.0.',
      modules: [
        'Algorithms',
        'Database Systems',
        'Operating Systems',
        'Machine Learning',
      ],
    },

    {
      fig: 'FIG. 02',
      degree: 'Higher Secondary Certificate',
      school: 'Ramniranjan Jhunjhunwala College',
      period: '2018 — 2020',
      notes:
        'Scored 90.46%. Ranked 4th in college, with Mathematics as a standout subject, scoring 98/100.',
      modules: [
        'Mathematics — 98/100',
        'Computer Science',
        'Physics',
        'Chemistry',
      ],
    },

    {
      fig: 'FIG. 03',
      degree: 'Secondary School Certificate',
      school: 'Pune Vidyarthi Griha\'s Vidya Bhavan',
      period: '2008 — 2018',
      notes:
        'Scored 94.2%. Topped the school in Mathematics with 99/100 and also scored 99/100 in Sanskrit.',
      modules: [
        'Mathematics — 99/100',
        'Sanskrit — 99/100',
        '94.2% Overall',
      ],
    },
  ],
}

export interface Achievement {
  id: string
  serial: string
  icon: 'trophy' | 'code' | 'award' | 'sparkle'
  title: string 
  detail: string
}

export interface Achievement {
  id: string
  serial: string
  icon: 'trophy' | 'code' | 'award' | 'sparkle'
  title: string
  detail: string
}

export const achievements: Achievement[] = [
  {
    id: 'ach-1',
    serial: 'ART.01',
    icon: 'code',
    title: 'Competitive Programming',
    detail:
      'LeetCode Knight (1900+), CodeChef 3★ (1700+), and Codeforces Specialist (1400+). Competitive programming is where I keep my algorithms and problem-solving sharp.',
  },
  {
    id: 'ach-2',
    serial: 'ART.02',
    icon: 'trophy',
    title: 'Code Like Her — 1st Place',
    detail:
      'Won 1st place among 60+ teams in Code Like Her, a competitive programming and problem-solving competition organized by DJS Compute.',
  },
  {
    id: 'ach-3',
    serial: 'ART.03',
    icon: 'award',
    title: 'Capture The Flag — 2nd Place',
    detail:
      'Secured 2nd place among 100+ teams in the Capture The Flag competition at VJTI, competing across cybersecurity and problem-solving challenges.',
  },
  {
    id: 'ach-4',
    serial: 'ART.04',
    icon: 'award',
    title: 'Recognized for Ownership & Impact',
    detail:
      'Recognized at Nouryon and Barclays for taking ownership of complex work, solving problems independently, learning new technologies quickly, and making a meaningful impact on the team.',
  },
]

export const contact = {
  chapter: '06',
  heading: ['LET’S TALK', 'TECH & IDEAS.'],
  note: 'I’m always open to interesting problems, thoughtful collaborations, and good conversations.',
}

export interface ExploreNode {
  id: string
  title: string
  section: 'about' | 'work' | 'projects' | 'education' | 'achievements' | 'contact'
  glyph: string
  color: string
  x: number
  y: number
}

export const exploreNodes: ExploreNode[] = [
  { id: 'origin', title: 'About', section: 'about', glyph: '✦', color: '#E8D5B5', x: 0, y: 0 },
  { id: 'atelier', title: 'Projects', section: 'projects', glyph: '✧', color: '#8FB4E8', x: 0, y: 0 },
  { id: 'archive', title: 'Education', section: 'education', glyph: '△', color: '#9CCFB8', x: 0, y: 0 },
  { id: 'chapters', title: 'Work Experience', section: 'work', glyph: '◈', color: '#C9A7E8', x: 0, y: 0 },
  { id: 'beacon', title: 'Contact', section: 'contact', glyph: '◉', color: '#F0B8C6', x: 0, y: 0 },
  { id: 'sanctum', title: 'Achievements', section: 'achievements', glyph: '★', color: '#F0C987', x: 0, y: 0 },
]

export const world = { width: 2000, height: 1500 }
