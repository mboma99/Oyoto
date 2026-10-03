import { CaseBook } from "@/components/CaseBook";
import { PageTransition } from "@/components/PageTransition";
import { jsonLdScript, projectListJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <PageTransition>
      <main id="main">
        <script {...jsonLdScript(projectListJsonLd())} />
        <CaseBook />
      </main>
    </PageTransition>
  );
}
