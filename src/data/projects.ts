/** A screenshot shown on the case study, below the write-up. */
export interface Shot {
  src: string;
  alt: string;
  caption: string;
}

/** A portrait screen recording, shown whole in a phone shell. */
export interface Phone {
  video: string;
  /** Frame shown while the recording loads. */
  poster: string;
  label: string;
}

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
  phones?: Phone[];
  /** Phone recordings for a project whose plate is already a desktop film,
      shown in phone shells in their own section of the case study. */
  mobile?: Phone[];
  /** The client's site as we found it, set beside ours, pair by pair. */
  comparisons?: { before: Shot; after: Shot }[];
  /** More screens from the build. */
  gallery?: Shot[];
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
  {
    id: "5",
    slug: "kontri-market",
    title: "KONTRI MARKET",
    description: "A storefront for a Togolese clothing label, rebuilt so the team can run drops themselves.",
    image: "/work/kontri/home.jpg",
    video: "/work/kontri/landing.mp4",
    mobile: [
      { video: "/work/kontri/mobile-home.mp4", poster: "/work/kontri/mobile-home.jpg", label: "homepage and lookbooks" },
      { video: "/work/kontri/mobile-shop.mp4", poster: "/work/kontri/mobile-shop.jpg", label: "shop, product and bag" },
    ],
    comparisons: [
      {
        before: {
          src: "/work/kontri/before-home.jpg",
          alt: "The original Kontri Market homepage, covered by a sign-up popup and a currency banner",
          caption: "Before: a sign-up popup and a currency banner on arrival, with nothing behind them but a welcome line.",
        },
        after: {
          src: "/work/kontri/home.jpg",
          alt: "The new Kontri Market homepage, a full-bleed broadcast-style hero with an Enter the Market button",
          caption: "After: a broadcast-style hero from the latest lookbook, with one clear way into the shop.",
        },
      },
      {
        before: {
          src: "/work/kontri/before-shop.jpg",
          alt: "The original Kontri Market shop page, blank apart from the footer",
          caption: "Before: the shop page loaded blank.",
        },
        after: {
          src: "/work/kontri/shop.jpg",
          alt: "The new Kontri Market shop, with category filters, grid density controls and product cards",
          caption: "After: a full catalogue with categories, filters and a model/product photo toggle.",
        },
      },
    ],
    gallery: [
      {
        src: "/work/kontri/lookbooks.jpg",
        alt: "The lookbook archive on the Kontri Market homepage, with numbered drops",
        caption: "Every drop lives on in a numbered lookbook archive.",
      },
      {
        src: "/work/kontri/lookbook.jpg",
        alt: "The Made in Lomé lookbook page with campaign photography and a Shop the Drop button",
        caption: "Lookbooks link straight to the pieces in them.",
      },
      {
        src: "/work/kontri/product.jpg",
        alt: "A Kontri Market product page with size selection, PayPal, Clearpay and Klarna",
        caption: "Product pages with live size stock, PayPal and pay-later options.",
      },
      {
        src: "/work/kontri/consent.jpg",
        alt: "The Kontri Market cookie banner offering Accept all, Essential only and Preferences",
        caption: "Cookie consent that asks before any tracking runs.",
      },
    ],
    category: "E-commerce",
    tags: ["WOOCOMMERCE", "WORDPRESS", "E-COMMERCE", "FASHION"],
    year: "2026",
    client: "Kontri Market",
    role: "Design & Development",
    caseStudy: {
      overview: "Kontri Market is a clothing label and activist project from Togo, selling small runs of hoodies, tees and accessories that carry the country's story. They were already on WordPress, and wanted a platform that matched the strength of the brand and that their own team could run.",
      challenge: "The original site was a single welcome screen behind a sign-up popup, and the shop page itself loaded blank. Drops sell out in small runs, customers buy from around the world, and the people running the label are designers and organisers, not developers, so launching a drop had to be something they could do themselves.",
      solution: "We kept them on WordPress and WooCommerce, so nothing they knew was thrown away, and built a custom theme on top. A broadcast-style homepage leads into a lookbook archive where each drop links straight to its pieces, and the shop has category filters, size-level stock and pre-sale and sold-out states. Checkout offers PayPal, Klarna and Clearpay with a currency switcher for overseas buyers, and a consent banner, privacy and cookie policies and a mailing list for drop alerts are built in from the start.",
      outcome: "Kontri Market now has a storefront that looks like the label and that the team runs themselves, from publishing a lookbook to opening a pre-sale. The new site is in final testing ahead of launch.",
      techStack: ["WordPress", "WooCommerce", "Custom theme", "PHP", "PayPal", "Klarna", "Clearpay"],
    },
  },
];
