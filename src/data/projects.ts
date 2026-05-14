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
    image: "/hero-images/congraduation.png",
    tags: ["WEB APP", "UI/UX", "REAL-TIME"],
    year: "2024",
    client: "University Network",
    role: "Lead Full-stack Developer",
    caseStudy: {
      overview: "Congraduation was designed to bridge the gap between physical ceremonies and digital accessibility, providing a seamless experience for students, faculty, and families worldwide.",
      challenge: "The primary challenge was handling high-concurrency traffic during live ceremonies while maintaining a low-latency interactive experience for remote participants.",
      solution: "We implemented a distributed architecture using WebSockets for real-time updates and a globally distributed CDN for low-latency video streaming and asset delivery.",
      outcome: "Successfully hosted 50+ graduation ceremonies with over 200,000 concurrent users, achieving 99.9% uptime during peak loads.",
      techStack: ["Next.js", "TypeScript", "Socket.io", "AWS Cloudfront", "Tailwind CSS"],
    },
  },
  {
    id: "2",
    slug: "vengcity",
    title: "VENGCITY",
    description: "Smart city infrastructure management and visualization portal.",
    image: "/hero-images/vengcity.png",
    tags: ["IOT", "DASHBOARD", "DATA VIZ"],
    year: "2023",
    client: "City Council",
    role: "Lead Frontend Engineer",
    caseStudy: {
      overview: "VengCity is a cutting-edge platform that centralizes IoT data from across the city to provide real-time insights into traffic, energy usage, and waste management.",
      challenge: "Processing and visualizing massive streams of data from thousands of sensors in a way that is intuitive for city officials.",
      solution: "Developed a custom 3D visualization engine using Three.js and integrated it with a high-performance time-series database.",
      outcome: "Reduced city response times for infrastructure issues by 30% and helped optimize energy consumption by 15% in the first quarter.",
      techStack: ["React", "Three.js", "D3.js", "InfluxDB", "PostgreSQL"],
    },
  },
  {
    id: "3",
    slug: "unibud",
    title: "UNIBUD",
    description: "Peer-to-peer student support and orientation network.",
    image: "/hero-images/unibud.png",
    tags: ["MOBILE", "COMMUNITY", "EDUCATION"],
    year: "2023",
    client: "Student Union",
    role: "Product Designer & Developer",
    caseStudy: {
      overview: "UniBud was created to help first-year students integrate into university life by connecting them with senior mentors and fellow students in their departments.",
      challenge: "Creating a safe and engaging environment that encourages students to interact and share knowledge without the noise of traditional social media.",
      solution: "Built a mobile-first application with verified student profiles, interest-based matching algorithms, and moderated discussion forums.",
      outcome: "Adopted by 5 major universities within the first year, with a 4.8-star rating on the App Store and over 50,000 active users.",
      techStack: ["React Native", "Firebase", "Node.js", "Redux Toolkit"],
    },
  },
  {
    id: "4",
    slug: "trakr",
    title: "TRAKR",
    description: "Asset tracking and inventory management for logistics.",
    image: "/hero-images/trakr.png",
    tags: ["LOGISTICS", "ENTERPRISE", "SAAS"],
    year: "2022",
    client: "Global Logistics Corp",
    role: "Senior Software Engineer",
    caseStudy: {
      overview: "Trakr provides enterprise-level logistics firms with real-time visibility into their supply chain, from warehouse inventory to last-mile delivery.",
      challenge: "Synchronizing inventory data across multiple warehouses with varying levels of internet connectivity and technical infrastructure.",
      solution: "Implemented an offline-first architecture with background synchronization and automated conflict resolution.",
      outcome: "Decreased inventory discrepancies by 45% and improved warehouse operational efficiency by 20% across 12 global locations.",
      techStack: ["React", "Go", "Redis", "Docker", "Kubernetes"],
    },
  },
];
