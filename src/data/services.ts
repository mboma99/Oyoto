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
    name: "Build web platforms",
    title: "Architect and ship web platforms",
    description: "Fast Next.js websites with a content manager your team updates without a developer.",
    intro:
      "A website should be quick to load, easy to find and easy to keep current. We design and build Next.js sites around your content, then hand over a content manager so your team can publish news, events and pages themselves.",
    offers: [
      {
        title: "Design and build in Next.js",
        body: "A site designed around your audience and your own photography, built in Next.js so pages load fast on any phone.",
      },
      {
        title: "Set up a headless CMS",
        body: "A content manager set up for the people who'll actually use it, so weekly updates never wait on a developer.",
      },
      {
        title: "Optimise for search and sharing",
        body: "Structured data, sitemaps, social cards and clean URLs built in from the start, not bolted on later.",
      },
      {
        title: "Deploy, host and hand over",
        body: "Deployed on modern hosting with previews for every change, plus a walkthrough so your team is confident from day one.",
      },
    ],
    fit: [
      "Your current site is slow, dated or hard to update",
      "Volunteers or non-technical staff need to publish content",
      "You're rebranding and want the website to match",
    ],
    stack: ["Next.js", "React", "TypeScript", "Headless CMS", "Netlify", "Vercel"],
    projects: ["river-life-church", "kontri-market"],
  },
  {
    slug: "ecommerce",
    name: "Run online stores",
    title: "Build stores that sell out your drops",
    description: "Online stores with the payments, marketing and compliance behind them, run by your own team.",
    intro:
      "A store is more than a product grid. We build storefronts on the platform you already use, then set up everything behind them: payments, inventory, email and SMS, analytics and the privacy rules that come with collecting customer data.",
    offers: [
      {
        title: "Set up SMS marketing",
        body: "TCPA-compliant opt-in and opt-out through Klaviyo or Attentive, with abandoned cart and drop alerts.",
      },
      {
        title: "Build your email list",
        body: "Klaviyo or Omnisend set up with SPF, DKIM and DMARC so you land in the inbox, sign-up points across the site and automated flows.",
      },
      {
        title: "Collect customer data properly",
        body: "Cookie consent, a privacy policy, and data storage and retention rules that meet GDPR and CCPA.",
      },
      {
        title: "Measure what sells",
        body: "GA4, Meta and TikTok pixels, UTM tracking and server-side tagging, so you know which posts bring in orders.",
      },
      {
        title: "Give customers accounts",
        body: "Guest checkout for first-timers, and order history, saved addresses and wishlists for regulars.",
      },
      {
        title: "Make it fast on a phone",
        body: "A CDN, WebP images that load as you scroll, and a mobile-first build that stays quick on launch day.",
      },
      {
        title: "Take payments and track stock",
        body: "Klarna and Afterpay at checkout, inventory kept in sync, and restock and waitlist alerts for sold-out pieces.",
      },
      {
        title: "Lock it down",
        body: "SSL, PCI compliance, and rate limiting and bot protection on every form.",
      },
    ],
    fit: [
      "Your store is hard to update or doesn't look like your brand",
      "You sell limited drops and need sign-ups ready before launch",
      "You're collecting customer data and aren't sure you're compliant",
    ],
    stack: ["WooCommerce", "WordPress", "Shopify", "Klaviyo", "GA4", "Klarna", "Cloudflare"],
    projects: ["kontri-market"],
  },
  {
    slug: "mobile-apps",
    name: "Ship mobile apps",
    title: "Design, build and launch mobile apps",
    description: "Cross-platform mobile apps in Flutter, with the backend and infrastructure behind them.",
    intro:
      "We build mobile apps in Flutter from a single codebase, along with the APIs, authentication and cloud infrastructure they depend on. You get one team responsible for the whole product, not just the screens.",
    offers: [
      {
        title: "Prototype the product",
        body: "Onboarding, core flows and the details that make an app feel native, prototyped before we build.",
      },
      {
        title: "Build in Flutter",
        body: "One codebase for iOS and Android, so features ship to both at once and stay in step.",
      },
      {
        title: "Engineer the backend and APIs",
        body: "Python and FastAPI services, sign-in with Google and other providers, and real-time processing where the app needs it.",
      },
      {
        title: "Run the beta and launch",
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
    name: "Integrate AI & ML",
    title: "Put machine learning into production",
    description: "Machine learning models and AI features built into real products, from recommenders to classifiers.",
    intro:
      "We build machine learning into products where it makes a measurable difference: recommenders, classifiers and AI features that handle the slow, repetitive work. Then we make sure the pipelines behind them stay reliable and affordable to run.",
    offers: [
      {
        title: "Train and deploy models",
        body: "Recommendation, classification and language models chosen for the problem, not the hype, and wired into your product.",
      },
      {
        title: "Automate document workflows",
        body: "Summarising, sorting and extracting from documents and inboxes, so your team spends its time on decisions.",
      },
      {
        title: "Harden ML pipelines",
        body: "Training and retraining pipelines with testing built in, refactored to cut cloud cost and build time.",
      },
      {
        title: "Prove it before you commit",
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
    name: "Engineer data pipelines",
    title: "Turn raw data into decisions",
    description: "Data pipelines and reporting that turn raw operational data into decision-ready insight.",
    intro:
      "Good reporting starts long before the dashboard. We build the pipelines that gather, clean and shape your data, then the reporting on top, so the people making decisions get answers instead of spreadsheets.",
    offers: [
      {
        title: "Build transformation pipelines",
        body: "Repeatable transformation pipelines in Python and SQL that replace manual gathering and cleaning.",
      },
      {
        title: "Design reporting and BI",
        body: "Reporting designed with the people who read it, focused on the decisions they actually make.",
      },
      {
        title: "Automate analysis with AI",
        body: "Summarising and categorising long documents and presentations, so analysts start from insight, not raw material.",
      },
      {
        title: "Translate requirements into specs",
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
