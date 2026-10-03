import { ArrowUpRight, FilePdf } from "@phosphor-icons/react/ssr";
import styles from "./page.module.css";
import { PageTransition } from "@/components/PageTransition";
import { contactEmail, contactMailto } from "@/lib/seo";

const experience = [
  {
    company: "Worldpay",
    location: "London",
    period: "Sep 2024 - Present",
    title: "Software Engineer",
    points: [
      "Maintain security of critical authentication edge services, fixing service vulnerabilities and updating service dependencies.",
      "Designed and built a production-grade performance testing environment for a client-facing mTLS platform used by a major UK supermarket chain ahead of peak trading period, ensuring scalability, resilience, and production readiness.",
      "Expanded Java-based onboarding services, reducing SMB merchant onboarding time from two weeks to under one hour.",
      "Automated end-to-end testing by integrating Postman CLI into an AWS EC2 environment and Jenkins CI/CD pipelines, reducing QA execution time by 80%.",
      "Led disaster recovery and resilience testing across distributed microservices, validating failover mechanisms and ensuring compliance with 99.999% SLA targets.",
    ],
  },
  {
    company: "Lloyds Banking Group",
    location: "Birmingham",
    period: "Jun 2024 - Aug 2024",
    title: "Data Analyst",
    points: [
      "Built data transformation pipelines to support senior leadership with improved reporting and analysis.",
      "Developed a proof of concept using Copilot to summarise and categorise client presentations, reducing delivery time of critical analysis by 30%.",
      "Collaborated with stakeholders to translate operational requirements into actionable data insights.",
    ],
  },
  {
    company: "Nike",
    location: "Hilversum",
    period: "Sep 2022 - Aug 2023",
    title: "Machine Learning Engineer",
    points: [
      "Developed a recommender system using Databricks, Snowflake, and PySpark to increase user lifetime value.",
      "Built a classification model using a feedforward neural network, doubling user engagement across Nike platforms.",
      "Refactored ML pipelines and removed redundant data sources, reducing cloud costs and improving model build times.",
      "Implemented automated unit testing to ensure reliability and data integrity.",
      "Presented findings to cross-functional stakeholders, promoting transparency and data-driven decision-making.",
    ],
  },
];

const skills = [
  { group: "Backend", items: "Java (Spring Boot), Python (FastAPI), Fastly" },
  { group: "Cloud", items: "AWS (EC2, S3, IAM, ECS, ECR), Docker, Redis, Vault" },
  { group: "CI/CD", items: "Jenkins, Concourse, GitHub Actions" },
  { group: "Databases", items: "PostgreSQL, Snowflake, Cassandra, DynamoDB, SQLAlchemy/SQLModel" },
  { group: "Testing", items: "JUnit, Postman, TDD, JaCoCo, Pytest" },
];

export default function Resume() {
  return (
    <PageTransition>
      <main id="main" className={styles.page}>
        <article className={styles.sheet}>
          <header className={styles.head}>
            <div>
              <h1 className={styles.name}>
                James <em>Mboma</em>
              </h1>
              <p className={styles.role}>Software Engineer</p>
            </div>
            <ul className={styles.contact}>
              <li>
                <a href={contactMailto}>{contactEmail}</a>
              </li>
              <li>
                <a href="https://linkedin.com/in/james-mboma" target="_blank" rel="noopener noreferrer">
                  LinkedIn <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="https://github.com/mboma99" target="_blank" rel="noopener noreferrer">
                  GitHub <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </header>

          <section className={styles.section} aria-labelledby="profile">
            <h2 id="profile" className={styles.sectionTitle}>Profile</h2>
            <p className={styles.profile}>
              Backend-focused Software Engineer specialising in authentication, security, and
              highly available microservices within fintech and enterprise environments.
              Experienced in building scalable systems using Java, Spring Boot, and AWS, with a
              proven record of improving system resilience, onboarding efficiency, and test
              automation.
            </p>
          </section>

          <section className={styles.section} aria-labelledby="experience">
            <h2 id="experience" className={styles.sectionTitle}>Experience</h2>
            <div className={styles.jobs}>
              {experience.map((job) => (
                <div key={job.company} className={styles.job}>
                  <div className={styles.jobHead}>
                    <h3 className={styles.company}>{job.company}</h3>
                    <span className={styles.period}>{job.period}</span>
                  </div>
                  <p className={styles.jobMeta}>
                    {job.title}, {job.location}
                  </p>
                  <ul className={styles.points}>
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="skills">
            <h2 id="skills" className={styles.sectionTitle}>Skills</h2>
            <dl className={styles.skills}>
              {skills.map((s) => (
                <div key={s.group}>
                  <dt>{s.group}</dt>
                  <dd>{s.items}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={styles.section} aria-labelledby="education">
            <h2 id="education" className={styles.sectionTitle}>Education</h2>
            <div className={styles.jobHead}>
              <h3 className={styles.company}>De Montfort University</h3>
              <span className={styles.period}>2020 - 2024</span>
            </div>
            <p className={styles.jobMeta}>
              BSc Software Engineering with Year in Industry, First Class
            </p>
          </section>

          <footer className={styles.actions}>
            <a href="/James Mboma.pdf" target="_blank" rel="noopener noreferrer" className={styles.pdf}>
              <FilePdf size={18} aria-hidden="true" />
              Open PDF resume
            </a>
          </footer>
        </article>
      </main>
    </PageTransition>
  );
}
