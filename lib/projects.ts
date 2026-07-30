/* ─── Project Data ───────────────────────────────────────────────────── */

export interface ProjectFact {
  label: string
  value: string
}

export interface Project {
  slug: string
  title: string
  tagline: string
  description: string
  stack: string[]
  category: string
  year: string
  /* Accent + card visuals */
  ink: string
  gradientFrom: string
  gradientTo: string
  terminalLines: string[]
  problem: string
  solution: string
  architecture: string
  impact: string
  facts: ProjectFact[]
}

export const projects: Project[] = [
  {
    slug: 'stratum-wealth',
    title: 'Stratum Wealth',
    tagline:
      'An AI platform that turns overnight financial news into a pre-market brief. I co-founded it and handle the security side.',
    description:
      'A co-founded fintech platform that compresses the overnight flood of financial news into a single readable brief. The system ingests news and sentiment data, summarizes what moved and why, and delivers trading insights to users before market open.',
    stack: ['AI summarization', 'Authentication', 'API security', 'Access control', 'Cloud deployment'],
    category: 'AI / FinTech',
    year: '2026',
    ink: '#22d3ee',
    gradientFrom: '#083344',
    gradientTo: '#0b1120',
    terminalLines: [
      '$ init pre-market pipeline',
      '✓ news + sentiment ingested',
      '✓ auth flows verified',
      '✓ api endpoints protected',
      '→ brief ready before open',
    ],
    problem:
      'Retail investors start the day behind. Market-moving news, earnings, and sentiment shifts happen overnight across dozens of sources, and there is no realistic way to read all of it before the opening bell. The information exists. The synthesis does not. On top of that, any platform handling financial data and user accounts is a target from day one, and security cannot be retrofitted later.',
    solution:
      'Co-founded Stratum Wealth, an AI-powered financial intelligence platform that generates automated pre-market reports summarizing financial news, sentiment, and trading insights before market open. My role centres on security and infrastructure: implementing secure authentication flows, protecting API endpoints, managing secrets through environment configuration, and building access control across the platform.',
    architecture:
      'Report generation runs as a scheduled pipeline. Financial news and sentiment sources are ingested, an AI layer summarizes them into per-asset insights, and the result is published as a pre-market brief ahead of the opening bell. Security is layered across it. Authenticated sessions gate access to reports, API endpoints are protected against unauthorized and abusive use, secrets live in environment configuration rather than committed code, and access control separates what different users can reach. Backend services and deployment pipelines run on cloud-hosted infrastructure with ongoing vulnerability monitoring.',
    impact:
      'Compresses an overnight flood of financial news into one brief users can read before the bell. The security work covers authenticated access, protected APIs, managed secrets, and monitored deployment pipelines. That is the groundwork a platform handling financial data needs before it can responsibly take real users.',
    facts: [
      { label: 'Role', value: 'Co-founder, security' },
      { label: 'Cadence', value: 'Daily, pre-market' },
      { label: 'My focus', value: 'Auth, API security, access control' },
      { label: 'Hosting', value: 'Cloud-hosted services' },
    ],
  },
  {
    slug: 'study-buddy',
    title: 'Study Buddy',
    tagline:
      'A course advisor that runs entirely on your own machine, so university records never leave it.',
    description:
      'An academic advisor built on retrieval-augmented generation. It processes university course data and a student\'s own history locally, then recommends courses with a citation for every suggestion.',
    stack: ['Python', 'SQLite', 'Embeddings', 'RAG', 'LLM'],
    category: 'AI / Full-stack',
    year: '2026',
    ink: '#6366f1',
    gradientFrom: '#1e1b4b',
    gradientTo: '#0b1120',
    terminalLines: [
      '$ python study_buddy.py',
      '✓ sqlite database connected',
      '✓ rag pipeline initialized',
      '✓ prerequisite validator armed',
      '→ 4 recommendations w/ citations',
    ],
    problem:
      'Students pick courses every semester with little to go on. Advising systems are generic, ignore individual history, and never explain why a course is being suggested. The fix seems to be handing academic records to a cloud service, which is a poor trade for advice about electives.',
    solution:
      'Built a local-first RAG pipeline that ingests course catalogs and user history entirely on-device. Embeddings match a student query semantically against course descriptions and prerequisite trees. A SQLite layer keeps conversation state and preferences across sessions, with automated summarization to keep the context window manageable. A separate validation layer cross-references generated advice against hard-coded prerequisite logic so the model cannot invent a course path that does not exist.',
    architecture:
      'Four layers. Ingestion parses, chunks, and embeds course catalogs and user history locally. Retrieval runs semantic search over those embeddings for a given query. Generation synthesizes recommendations from the retrieved context, attaching source citations. Validation checks the result against the real prerequisite graph and rejects anything that violates it. SQLite persists session state, preferences, and history between runs.',
    impact:
      'Recommendations arrive with the catalog entries that produced them, so a student can check the reasoning instead of trusting it. Course dependencies are visualized for multi-semester planning, and no academic data leaves the machine.',
    facts: [
      { label: 'Data', value: 'Processed on-device' },
      { label: 'Retrieval', value: 'Embedding search over catalog' },
      { label: 'Safeguard', value: 'Prerequisite validation layer' },
      { label: 'Memory', value: 'SQLite session state' },
    ],
  },
  {
    slug: 'microservices-task-manager',
    title: 'Microservices Task Manager',
    tagline:
      'A task manager split into independent User and Task services behind an API gateway.',
    description:
      'A task management platform built with Java and Spring Boot. Separate User and Task services communicate over HTTP REST, each backed by its own relational database, with routing centralized in an API gateway.',
    stack: ['Java', 'Spring Boot', 'REST APIs', 'Spring Data JPA', 'API Gateway'],
    category: 'Backend / Architecture',
    year: '2025',
    ink: '#a855f7',
    gradientFrom: '#3b0764',
    gradientTo: '#0b1120',
    terminalLines: [
      '$ mvn spring-boot:run',
      '✓ user-service on :8081',
      '✓ task-service on :8082',
      '✓ api-gateway on :8080',
      '→ all services healthy',
    ],
    problem:
      'Monolithic task applications tie user logic to task logic. As features accumulate, one codebase becomes the bottleneck for testing and deployment, and neither half can scale or ship on its own.',
    solution:
      'Decomposed the application into two independent services, a User Service and a Task Service, each with its own database and REST API. An API Gateway sits in front to centralize routing and give clients a single entry point. Spring Data JPA handles persistence, with normalized schemas maintaining integrity across services.',
    architecture:
      'The gateway receives all client requests and routes them to the right service. User Service owns registration, authentication, and profiles against its own relational database. Task Service owns task CRUD, assignment, and status tracking against a separate one. The two communicate over HTTP REST; Spring Data JPA provides the ORM layer, and normalized schemas enforce referential integrity.',
    impact:
      'Each service can be developed, tested, and deployed on its own. The gateway keeps client integration simple despite the split, and the normalized schemas keep the data honest as the services evolve independently.',
    facts: [
      { label: 'Services', value: 'User, Task, Gateway' },
      { label: 'Style', value: 'REST over HTTP' },
      { label: 'Persistence', value: 'Spring Data JPA' },
      { label: 'Schema', value: 'Normalized relational' },
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug)
}
