import { useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { docsMap } from "../../docs";
import "../../styles/docs.css";

export default function DocsContent() {
  const { "*": slug } = useParams();

  const content = docsMap[slug || "getting-started"];

  if (!content) {
    return <Navigate to="/docs/getting-started" replace />;
  }

  return (
    <article className="rounded-2xl border border-base-300/70 bg-base-100/80 p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-base-content/60">
        <span className="badge badge-outline">Docs</span>
        <span>Updated as we build the library</span>
      </div>
      <div className="docs-prose prose prose-lg max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-p:leading-relaxed prose-p:text-base-content/80 prose-a:font-semibold prose-a:text-primary prose-li:marker:text-primary/60">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </article>
  );
}
