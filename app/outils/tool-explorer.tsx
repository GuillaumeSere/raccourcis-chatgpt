"use client";

import { useEffect, useRef, useState } from "react";

type Tool = {
  id: string;
  number: string;
  icon: string;
  tone: string;
  name: string;
  short: string;
  example: string;
  ideal: string;
  keyword: string;
  overview: string;
  steps: string[];
  tip: string;
  availability: string;
};

export default function ToolExplorer({ tools }: { tools: Tool[] }) {
  const [selected, setSelected] = useState<Tool | null>(null);
  const [copied, setCopied] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selected) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>(".tool-dialog");
        const focusable = dialog?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");
    closeButton.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
      previouslyFocused?.focus();
    };
  }, [selected]);

  const openTool = (tool: Tool) => {
    setCopied(false);
    setSelected(tool);
  };

  const copyExample = async () => {
    if (!selected) return;
    try {
      await navigator.clipboard.writeText(selected.example);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const selectedById = (id: string) => tools.find((tool) => tool.id === id);

  return (
    <>
      <div className="need-grid">
        {[
          ["mode-etude", "Apprendre", "Comprendre un sujet et progresser étape par étape", "Mode Étude", "blue", "✳"],
          ["projets", "Travailler", "Organiser un projet et conserver son contexte", "Projets", "amber", "◫"],
          ["recherche-web", "Rechercher", "Trouver des informations récentes et des sources", "Recherche Web", "coral", "⌕"],
          ["images", "Créer", "Transformer une idée en image", "Génération d’images", "violet", "▧"],
          ["fichiers", "Analyser", "Comprendre un PDF, un document ou un fichier", "Analyse de fichiers", "teal", "▤"],
          ["canvas", "Coder", "Écrire, corriger et améliorer du code", "Canvas / Code", "green", "⌘"],
          ["mode-vocal", "Discuter", "Utiliser ChatGPT comme interlocuteur", "Mode vocal", "rose", "◖"],
        ].map(([id, title, description, toolName, tone, icon]) => {
          const tool = selectedById(id);
          return <button className="need-card" type="button" key={id} onClick={() => tool && openTool(tool)} aria-label={`${title} : en savoir plus sur ${toolName}`}><span className={`need-icon ${tone}`}>{icon}</span><span className="need-name">{title}</span><span className="need-description">{description}</span><span className="need-tool">{toolName}<b>↗</b></span></button>;
        })}
      </div>

      <div className="tool-grid">
        {tools.map((tool) => <article className={`tool-card tone-${tool.tone}`} id={tool.id} key={tool.id}>
          <div className="tool-card-top"><span className="tool-number">{tool.number} <i>—</i></span><span className="tool-icon" aria-hidden="true">{tool.icon}</span></div>
          <h3>{tool.name}</h3><p className="tool-description">{tool.short}</p>
          <div className="tool-example"><span>À ESSAYER</span><p>« {tool.example} »</p></div>
          <div className="tool-ideal"><span>IDÉAL POUR</span><p>{tool.ideal}</p></div>
          <button className="tool-more" type="button" onClick={() => openTool(tool)} aria-haspopup="dialog">Découvrir cet outil <span>→</span></button>
        </article>)}
      </div>

      {selected && <div className="tool-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
        <section className={`tool-dialog tone-${selected.tone}`} role="dialog" aria-modal="true" aria-labelledby="tool-dialog-title" aria-describedby="tool-dialog-description">
          <div className="tool-dialog-top"><span className="tool-dialog-label"><span className="tool-icon">{selected.icon}</span> GUIDE PRATIQUE · {selected.number}</span><button ref={closeButton} className="tool-dialog-close" type="button" onClick={() => setSelected(null)} aria-label="Fermer la fenêtre">×</button></div>
          <h2 id="tool-dialog-title">{selected.name}</h2><p className="tool-dialog-lead" id="tool-dialog-description">{selected.overview}</p>
          <div className="tool-dialog-columns"><div><span className="dialog-section-label">COMMENT COMMENCER</span><ol>{selected.steps.map((step) => <li key={step}>{step}</li>)}</ol></div><aside><span className="dialog-section-label">IDÉAL POUR</span><p>{selected.ideal}</p><span className="dialog-section-label">À GARDER EN TÊTE</span><p>{selected.tip}</p></aside></div>
          <div className="tool-dialog-example"><div><span className="dialog-section-label">UN EXEMPLE À ESSAYER</span><p>« {selected.example} »</p></div><button type="button" onClick={copyExample}>{copied ? "Copié ! ✓" : "Copier l’exemple ⧉"}</button></div>
          <p className="tool-dialog-availability">{selected.availability}</p>
        </section>
      </div>}
    </>
  );
}
