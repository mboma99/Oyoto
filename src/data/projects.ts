export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Still: the plate everywhere a film can't play, and the film's poster. */
  image: string;
  /** Optional looping film, muted, that fills the plate in place of the still. */
  video?: string;
  /** Portrait screen recordings, each shown whole in its own phone shell,
      side by side, instead of a film that fills (and crops) the plate. */
  phones?: {
    video: string;
    /** Frame shown while the recording loads. */
    poster: string;
    label: string;
  }[];
  /** The recordings' width / height, so each shell matches exactly. */
  screenRatio?: number;
  category: string;
  tags: string[];
  year: string;
  client: string;
  role: string;
  caseStudy: {
    overview: string;
    challenge: string;
    solution: string;
    outcome: string;
    techStack: string[];
  };
}

export const projects: Project[] = [
  {
    id: "2",
    slug: "trakr",
    title: "TRAKR",
    description: "AI-driven career intelligence and job application tracking, built in-house.",
    image: "/hero-images/trakr-v2.png",
    phones: [
      { video: "/projects/trakr.mp4", poster: "/projects/trakr.jpg", label: "sign-in and onboarding" },
    ],
    screenRatio: 600 / 1304,
    category: "AI / SaaS",
    tags: ["AI/ML", "MOBILE", "AUTOMATION", "SAAS"],
    year: "2026",
    client: "In-House Project",
    role: "Full-stack Engineering Team",
    caseStudy: {
      overview: "Trakr is our most ambitious in-house project to date: an intelligence layer for the job hunt. Built from the ground up, it gives candidates one place to manage a career move and automates the tedious work of tracking applications and their status.",
      challenge: "Processing thousands of unstructured emails and application notifications across disparate platforms while maintaining near-perfect accuracy in status detection. The system had to be fast, secure, and capable of handling complex authentication flows with major email providers.",
      solution: "We developed a multi-model classification engine on Python and FastAPI, which runs live Gmail data through our own ML models to automatically detect and categorize job statuses. The entire ecosystem is delivered via a high-performance native iOS application built with Flutter, utilizing Redis for real-time processing and GCP for secure, scalable infrastructure.",
      outcome: "Trakr is in closed beta, where early testers report a 90% reduction in time spent tracking applications by hand.",
      techStack: ["FastAPI", "Python (ML Models)", "Flutter (iOS)", "Redis", "GCP", "Gmail API", "Google OAuth", "Nginx"],
    },
  },
  {
    id: "3",
    slug: "lloyds-banking-group",
    title: "LLOYDS BANKING GROUP",
    description: "Data pipelines and AI summarisation behind senior leadership reporting.",
    image: "/projects/lloyds.jpg",
    video: "/projects/lloyds.mp4",
    category: "Data & AI",
    tags: ["PYTHON", "SQL", "DATA PIPELINES", "AI"],
    year: "2024",
    client: "Lloyds Banking Group",
    role: "Data Engineering & AI",
    caseStudy: {
      overview: "Lloyds Banking Group brought our team in to support the reporting that its senior leadership relies on for decision-making. We worked inside the data function, building the transformation pipelines behind executive reporting and exploring where AI could take the slowest manual steps off the analysts' desks.",
      challenge: "Leadership reporting took longer to assemble than to interpret. Analysts spent much of their time gathering, cleaning and summarising material, including lengthy client presentations, before any real analysis could begin, and stakeholders needed insight they could act on rather than raw data.",
      solution: "We built repeatable data transformation pipelines to feed executive reporting and analysis, then developed a proof of concept using Copilot to summarise and categorise client presentations automatically. Throughout, we worked closely with stakeholders to turn operational requirements into usable, decision-ready insight.",
      outcome: "The AI summarisation proof of concept cut the delivery time of critical analysis by 30%, and the reporting pipelines gave leadership a faster, more consistent view of the information they depend on.",
      techStack: ["Python", "SQL", "Microsoft Copilot", "Data Pipelines"],
    },
  },
  {
    id: "4",
    slug: "nike",
    title: "NIKE",
    description: "Recommender and classification models driving member engagement across Nike platforms.",
    image: "/projects/nike.jpg",
    video: "/projects/nike.mp4",
    category: "Machine Learning",
    tags: ["MACHINE LEARNING", "DATABRICKS", "PYSPARK", "AWS"],
    year: "2023",
    client: "Nike",
    role: "Machine Learning Engineering",
    caseStudy: {
      overview: "Nike's digital platforms decide what each member sees, and those decisions run on models that have to stay accurate and affordable to retrain. Our team worked embedded with Nike's data science function, building and maintaining the machine learning systems behind personalisation and engagement.",
      challenge: "The models needed to raise member engagement and lifetime value while running on pipelines that had grown expensive and slow to rebuild. Redundant data sources and costly retraining cycles were limiting how quickly improvements could reach members.",
      solution: "We built a recommender system on Databricks, Snowflake and PySpark to raise user lifetime value, alongside a feedforward neural network classifier to drive engagement. We then refactored the ML pipelines behind them, removing redundant data sources and adding automated unit testing to protect reliability and data integrity.",
      outcome: "The classifier doubled user engagement across Nike platforms, while the pipeline refactor reduced cloud cost and shortened model build times. Findings were presented to cross-functional stakeholders, keeping modelling decisions clear outside the data team.",
      techStack: ["Python", "TensorFlow", "PySpark", "Databricks", "Snowflake", "AWS"],
    },
  },
  {
    id: "1",
    slug: "congraduation",
    title: "CONGRADUATION",
    description: "An ecommerce platform for buying and downloading graduation photos.",
    image: "/hero-images/congraduation-new.jpg",
    category: "Ecommerce",
    tags: ["REACT", "FASTAPI", "POSTGRESQL", "ECOMMERCE"],
    year: "2024",
    client: "Development Project",
    role: "Full-stack Development Team",
    caseStudy: {
      overview: "Congraduation is a modern web-based ecommerce platform developed by our team as a modern alternative in the graduation photography market. It focuses on the digital distribution of memories, allowing graduates and guests to easily search, view, and purchase digital copies of their graduation photos.",
      challenge: "The existing market was dominated by legacy providers with outdated platforms that failed to meet modern expectations, such as charging exorbitant fees for physical CDs and lacking support for direct digital downloads, creating significant friction for a social-media-driven generation.",
      solution: "We built a user-centric ecommerce photography platform that prioritizes digital accessibility. By reducing the friction between photo acquisition and device download, we let graduates claim their photos and share them straight away.",
      outcome: "A fast platform that gives graduates a real alternative to legacy providers, with fair pricing for digital photos and a modern, straightforward checkout.",
      techStack: ["React", "FastAPI", "PostgreSQL", "Tailwind CSS", "AWS S3", "SQLAlchemy", "Pydantic", "Uvicorn"],
    },
  },
];
