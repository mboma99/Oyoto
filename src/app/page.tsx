import { CaseBook } from "@/components/CaseBook";
import { ClientRow } from "@/components/ClientRow";
import { PageTransition } from "@/components/PageTransition";
import { Testimonials } from "@/components/Testimonials";
import { WorkStrip } from "@/components/WorkStrip";
import { jsonLdScript, projectListJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <PageTransition>
      <main id="main">
        <script {...jsonLdScript(projectListJsonLd())} />
        <CaseBook />
        <ClientRow />
        <WorkStrip />
        <Testimonials />
      </main>
    </PageTransition>
  );
}
