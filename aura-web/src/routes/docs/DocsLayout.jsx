import { Routes, Route, Navigate } from "react-router-dom";
import DocsSidebar from "./DocsSidebar";
import DocsContent from "./DocsContent";
import PageContainer from "../../components/layout/PageContainer";
import { vectors } from "../../assets";

export default function DocsLayout() {
  const clipPathPolygon = vectors.blobClipPath();

  return (
    <div className="relative min-h-screen bg-base-100">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{ clipPath: clipPathPolygon }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-12 bg-linear-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"
        />
      </div>

      <div className="mx-auto flex max-w-5xl lg:max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <aside className="hidden w-72 shrink-0 lg:block">
          <DocsSidebar />
        </aside>
        <main className="min-w-0 flex-1">
          <div className="mb-6 rounded-2xl border border-base-300/70 bg-base-200/60 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
              Documentation
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-base-content sm:text-4xl">
              Build adaptive experiences with AURA.
            </h1>
            <p className="mt-3 text-sm text-base-content/70">
              Learn the platform, compose components, and ship personalized UI
              safely.
            </p>
          </div>

          <PageContainer size="full">
            <Routes>
              <Route path="" element={<Navigate to="getting-started" replace />} />
              <Route path=":slug" element={<DocsContent />} />
            </Routes>
          </PageContainer>
        </main>
      </div>
    </div>
  );
}
