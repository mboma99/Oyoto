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
  /** Public URL of the shipped product, when there is one to visit. */
  liveUrl?: string;
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
      { video: "/work/trakr.mp4", poster: "/work/trakr.jpg", label: "sign-in and onboarding" },
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
    image: "/work/lloyds.jpg",
    video: "/work/lloyds.mp4",
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
    image: "/work/nike.jpg",
    video: "/work/nike.mp4",
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
    slug: "river-life-church",
    title: "RIVER LIFE CHURCH",
    description: "A new home online for a church family in Bulwell, Nottingham.",
    image: "/work/riverlife.jpg",
    liveUrl: "https://riverlifechurch.netlify.app/",
    category: "Web",
    tags: ["NEXT.JS", "CMS", "NETLIFY", "COMMUNITY"],
    year: "2026",
    client: "River Life Church",
    role: "Design & Development",
    caseStudy: {
      overview: "River Life Church, formerly The Well Church, is a Spirit-filled church family in Bulwell, Nottingham. The new name marked a new season for the church, and it needed a website to match: somewhere newcomers could find out when and where to come, and the congregation could keep up with church life through the week.",
      challenge: "The site had to welcome first-time visitors and serve regular members at once. Notices change every week, services are streamed online, and the people keeping it current are pastors and volunteers rather than developers, so every update had to be possible without touching code.",
      solution: "We designed and built a fast Next.js site around the church's own photography, with the essentials (service time, address and directions) up front. A content manager lets the team publish weekly notices and events themselves, a live-stream countdown switches to a 'we're live' banner during Sunday services, and recent videos come straight from the church's YouTube channel.",
      outcome: "River Life now has a warm, modern front door that tells newcomers exactly where to be on a Sunday, and a site the church team keeps up to date themselves each week.",
      techStack: ["Next.js", "React", "TypeScript", "Netlify", "Netlify CMS", "YouTube", "Google Analytics"],
    },
  },
];
