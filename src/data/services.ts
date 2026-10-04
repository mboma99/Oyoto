export interface Service {
  slug: string;
  /** Short name for nav, cards and breadcrumbs. */
  name: string;
  /** Page headline; the last word is set in italics. */
  title: string;
  /** One line for cards and meta descriptions. */
  description: string;
  intro: string;
  /** What the engagement covers, each with a line on why it matters. */
  offers: { title: string; body: string }[];
  /** Who it's for: the situations where clients usually come to us. */
  fit: string[];
  stack: string[];
  /** Slugs of the case studies that show this work. */
  projects: string[];
}

export const services: Service[] = [
  {
    slug: "websites",
    name: "Websites & CMS",
    title: "Websites your team can run",
    description: "Fast Next.js websites with a content manager your team updates without a developer.",
    intro:
      "A website should be quick to load, easy to find and easy to keep current. We design and build Next.js sites around your content, then hand over a content manager so your team can publish news, events and pages themselves.",
    offers: [
      {
        title: "Design and build",
        body: "A site designed around your audience and your own photography, built in Next.js so pages load fast on any phone.",
      },
      {
        title: "Content you control",
        body: "A content manager set up for the people who'll actually use it, so weekly updates never wait on a developer.",
      },
      {
        title: "Search and sharing",
        body: "Structured data, sitemaps, social cards and clean URLs built in from the start, not bolted on later.",
      },
      {
        title: "Hosting and handover",
        body: "Deployed on modern hosting with previews for every change, plus a walkthrough so your team is confident from day one.",
      },
    ],
    fit: [
      "Your current site is slow, dated or hard to update",
      "Volunteers or non-technical staff need to publish content",
      "You're rebranding and want the website to match",
    ],
    stack: ["Next.js", "React", "TypeScript", "Headless CMS", "Netlify", "Vercel"],
    projects: ["river-life-church"],
  },
  {
    slug: "mobile-apps",
    name: "Mobile apps",
    title: "Mobile apps, idea to App Store",
    description: "Cross-platform mobile apps in Flutter, with the backend and infrastructure behind them.",
    intro:
      "We build mobile apps in Flutter from a single codebase, along with the APIs, authentication and cloud infrastructure they depend on. You get one team responsible for the whole product, not just the screens.",
    offers: [
      {
        title: "Product design",
        body: "Onboarding, core flows and the details that make an app feel native, prototyped before we build.",
      },
      {
        title: "Flutter development",
        body: "One codebase for iOS and Android, so features ship to both at once and stay in step.",
      },
      {
        title: "Backend and APIs",
        body: "Python and FastAPI services, sign-in with Google and other providers, and real-time processing where the app needs it.",
      },
      {
        title: "Launch and beta",
        body: "TestFlight betas, App Store submission and the monitoring you need once real users arrive.",
      },
    ],
    fit: [
      "You're a founder taking an app from idea to first release",
      "Your product needs a backend, not just a front end",
      "You want iOS and Android without paying for two builds",
    ],
    stack: ["Flutter", "Dart", "FastAPI", "Python", "Redis", "GCP", "OAuth"],
    projects: ["trakr"],
  },
  {
    slug: "ai-machine-learning",
    name: "AI & machine learning",
    title: "AI that earns its place",
    description: "Machine learning models and AI features built into real products, from recommenders to classifiers.",
    intro:
      "We build machine learning into products where it makes a measurable difference: recommenders, classifiers and AI features that handle the slow, repetitive work. Then we make sure the pipelines behind them stay reliable and affordable to run.",
    offers: [
      {
        title: "Models and features",
        body: "Recommendation, classification and language models chosen for the problem, not the hype, and wired into your product.",
      },
      {
        title: "AI in your workflows",
        body: "Summarising, sorting and extracting from documents and inboxes, so your team spends its time on decisions.",
      },
      {
        title: "ML pipelines",
        body: "Training and retraining pipelines with testing built in, refactored to cut cloud cost and build time.",
      },
      {
        title: "Proofs of concept",
        body: "A small, quick build to test whether AI can do the job before you commit to it.",
      },
    ],
    fit: [
      "You have data and a hunch it could do more",
      "A manual process is eating your team's week",
      "Your existing models are slow or expensive to retrain",
    ],
    stack: ["Python", "TensorFlow", "PySpark", "Databricks", "Snowflake", "AWS", "LLM APIs"],
    projects: ["nike", "trakr"],
  },
  {
    slug: "data-engineering",
    name: "Data & reporting",
    title: "Data your leaders can act on",
    description: "Data pipelines and reporting that turn raw operational data into decision-ready insight.",
    intro:
      "Good reporting starts long before the dashboard. We build the pipelines that gather, clean and shape your data, then the reporting on top, so the people making decisions get answers instead of spreadsheets.",
    offers: [
      {
        title: "Data pipelines",
        body: "Repeatable transformation pipelines in Python and SQL that replace manual gathering and cleaning.",
      },
      {
        title: "Reporting and BI",
        body: "Reporting designed with the people who read it, focused on the decisions they actually make.",
      },
      {
        title: "AI-assisted analysis",
        body: "Summarising and categorising long documents and presentations, so analysts start from insight, not raw material.",
      },
      {
        title: "Working with stakeholders",
        body: "Turning operational requirements into clear specifications, and findings into language non-technical teams can use.",
      },
    ],
    fit: [
      "Reports take longer to assemble than to read",
      "Analysts spend their time cleaning data instead of analysing it",
      "Leadership needs a consistent view across teams",
    ],
    stack: ["Python", "SQL", "Microsoft Copilot", "Databricks", "Snowflake"],
    projects: ["lloyds-banking-group"],
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/** The services that point at a case study, for linking back from it. */
export const servicesForProject = (projectSlug: string) =>
  services.filter((s) => s.projects.includes(projectSlug));
