import { CaseBook } from "@/components/CaseBook";
import { PageTransition } from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main id="main">
        <CaseBook />
      </main>
    </PageTransition>
  );
}
