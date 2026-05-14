export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
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
    id: "1",
    slug: "congraduation",
    title: "CONGRADUATION",
    description: "A comprehensive digital platform for modern graduation ceremonies.",
    image: "/hero-images/congraduation-new.jpg",
    tags: ["REACT", "FASTAPI", "POSTGRESQL", "ECOMMERCE"],
    year: "2024",
    client: "Development Project",
    role: "Full-stack Development Team",
    caseStudy: {
      overview: "Congraduation is a modern web-based ecommerce platform developed by our team to disrupt the traditional graduation photography market. It focuses on the digital distribution of memories, allowing graduates and guests to easily search, view, and purchase digital copies of their graduation photos.",
      challenge: "The existing market was dominated by legacy providers with outdated platforms that failed to meet modern expectations—such as charging exorbitant fees for physical CDs and lacking support for direct digital downloads, creating significant friction for a social-media-driven generation.",
      solution: "We built a user-centric ecommerce photography platform that prioritizes digital accessibility. By reducing the friction between photo acquisition and device download, we created a seamless flow for graduates to claim and share their academic achievements instantly.",
      outcome: "Successfully developed a high-performance platform that provides a viable alternative to legacy monopolies, significantly improving customer satisfaction by offering fair pricing for digital assets and a modern, intuitive user experience.",
      techStack: ["React", "FastAPI", "PostgreSQL", "Tailwind CSS", "AWS S3", "SQLAlchemy", "Pydantic", "Uvicorn"],
    },
  },
  {
    id: "2",
    slug: "vengcity",
    title: "VENGCITY",
    description: "Custom E-Commerce platform for a high-profile streetwear brand launch.",
    image: "/hero-images/vengcity.png",
    tags: ["WORDPRESS", "PHP", "ECOMMERCE", "SEO"],
    year: "2021",
    client: "BanterPlug",
    role: "Web Development Team",
    caseStudy: {
      overview: "VengCity was a collaboration between our studio and a high-profile social-media creator to launch their new clothing brand, BanterPlug. The goal was to create a robust, easy-to-manage E-Commerce destination that could handle the surge of traffic from a massive social media following.",
      challenge: "Converting a conceptual UI design into a pixel-perfect, responsive reality while ensuring the platform could scale during high-pressure launch windows. The client specifically required a CMS that was intuitive enough for them to manage inventory and monitor performance independently.",
      solution: "We developed a custom, modular WordPress theme using PHP and SASS, built from the ground up to match the designer's vision. We integrated WooCommerce for its powerful inventory management and analytics, and prioritized SEO to ensure the brand dominated search queries for their niche.",
      outcome: "The launch was a massive success; the site appeared on the first page of Google search results within weeks, and the initial product line sold out completely within just 21 days of going live.",
      techStack: ["WordPress", "PHP", "WooCommerce", "SASS", "JavaScript", "SEO Optimization"],
    },
  },
  {
    id: "3",
    slug: "trakr",
    title: "TRAKR",
    description: "Proprietary AI-driven career intelligence and application tracking ecosystem.",
    image: "/hero-images/trakr-v2.png",
    tags: ["AI/ML", "MOBILE", "AUTOMATION", "SAAS"],
    year: "2026",
    client: "In-House Project",
    role: "Full-stack Engineering Team",
    caseStudy: {
      overview: "Trakr is our most ambitious in-house project to date: a high-tech intelligence layer designed to revolutionize the job hunting process. Built from the ground up, it serves as a central command center for career transitions, automating the tedious work of tracking and status monitoring.",
      challenge: "Processing thousands of unstructured emails and application notifications across disparate platforms while maintaining near-perfect accuracy in status detection. The system had to be fast, secure, and capable of handling complex authentication flows with major email providers.",
      solution: "We developed a multi-model classification engine powered by Python and FastAPI, which funnels live Gmail data through our proprietary ML models to automatically detect and categorize job statuses. The entire ecosystem is delivered via a high-performance native iOS application built with Flutter, utilizing Redis for real-time processing and GCP for secure, scalable infrastructure.",
      outcome: "Currently in [ CLOSED BETA ]. Trakr is already demonstrating a 90% reduction in manual tracking time for our early testers, effectively changing the game for high-stakes job hunting through intelligent automation.",
      techStack: ["FastAPI", "Python (ML Models)", "Flutter (iOS)", "Redis", "GCP", "Gmail API", "Google OAuth", "Nginx"],
    },
  },
  {
    id: "4",
    slug: "the-well-church",
    title: "THE WELL CHURCH",
    description: "Digital presence and high-availability streaming ecosystem for a community organization.",
    image: "/hero-images/well-church.png",
    tags: ["SQUARESPACE", "AV ENGINEERING", "BROADCAST", "WEB"],
    year: "2023",
    client: "The Well Church",
    role: "Digital Strategy & AV Engineering",
    caseStudy: {
      overview: "The Well Church, a community organization, partnered with our studio to establish a modern digital presence and modernize their physical-to-digital broadcasting capabilities. The goal was to create a reliable bridge between their physical services and their global digital audience.",
      challenge: "Developing a robust web platform that was high-performance yet easy for non-technical staff to manage, while simultaneously overhauling legacy AV systems to support professional-grade live streaming.",
      solution: "We deployed a highly available, custom-architected Squarespace platform optimized for ease of use and content management. In parallel, we re-engineered their AV infrastructure, organizing their streaming pipeline and implementing a professional broadcast platform to ensure seamless, low-latency live delivery.",
      outcome: "The digital transformation led to a measurable increase in global engagement and physical attendance. By lowering the barrier to entry for digital seekers, the church saw a significant surge in new congregation members finding the organization through their online platforms.",
      techStack: ["Squarespace", "AV Integration", "OBS Studio", "Facebook Live", "Digital Strategy"],
    },
  },
];
