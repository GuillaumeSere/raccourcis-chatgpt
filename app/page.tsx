"use client";

import { useEffect, useMemo, useState } from "react";

type Shortcut = { id: number; command: string; description: string; example: string; category: string };

const shortcuts: Shortcut[] = [
  { id: 1, command: "/corrige", description: "Corrige les fautes sans modifier le sens.", example: "Je vous remercie pour votre retour.", category: "Écrire & réécrire" },
  { id: 2, command: "/reformule", description: "Réécris le texte autrement, en gardant l’idée principale.", example: "Ce projet est intéressant.", category: "Écrire & réécrire" },
  { id: 3, command: "/pro", description: "Adopte un ton professionnel et adapté au contexte.", example: "Écris ce message à mon client.", category: "Écrire & réécrire" },
  { id: 4, command: "/simple", description: "Simplifie un texte complexe avec des mots faciles à comprendre.", example: "explique ce contrat", category: "Écrire & réécrire" },
  { id: 5, command: "/court", description: "Va à l’essentiel et réduis la longueur de la réponse.", example: "résume cet article", category: "Écrire & réécrire" },
  { id: 6, command: "/explique", description: "Explique clairement un sujet, en partant des bases.", example: "comment fonctionne une API ?", category: "Comprendre" },
  { id: 7, command: "/eli5", description: "Explique comme si tu avais cinq ans : simple et sans jargon.", example: "qu’est-ce que l’intelligence artificielle ?", category: "Comprendre" },
  { id: 8, command: "/exemple", description: "Ajoute des exemples concrets pour rendre l’idée plus claire.", example: "explique le SEO", category: "Comprendre" },
  { id: 9, command: "/analogie", description: "Utilise une comparaison familière pour faciliter la compréhension.", example: "explique le cloud", category: "Comprendre" },
  { id: 10, command: "/approfondis", description: "Développe le sujet et explore les détails utiles.", example: "explique React", category: "Comprendre" },
  { id: 11, command: "/liste", description: "Présente les informations sous forme de liste facile à parcourir.", example: "donne-moi les avantages de React", category: "Organiser" },
  { id: 12, command: "/tableau", description: "Organise les informations dans un tableau comparatif.", example: "compare React, Vue et Angular", category: "Organiser" },
  { id: 13, command: "/etapes", description: "Découpe la tâche en étapes logiques et successives.", example: "créer un site avec Next.js", category: "Organiser" },
  { id: 14, command: "/checklist", description: "Crée une liste à cocher pour suivre ce qu’il reste à faire.", example: "lancer un site web", category: "Organiser" },
  { id: 15, command: "/resume", description: "Résume et fais ressortir les informations essentielles.", example: "[colle ton texte ici]", category: "Organiser" },
  { id: 16, command: "/objectif", description: "Concentre la réponse sur le résultat que tu souhaites atteindre.", example: "obtenir plus de visiteurs sur mon site", category: "Décider & analyser" },
  { id: 17, command: "/priorites", description: "Classe les actions par ordre d’importance et d’impact.", example: "que dois-je améliorer sur mon site ?", category: "Décider & analyser" },
  { id: 18, command: "/avantages", description: "Liste les principaux bénéfices d’une option ou d’une décision.", example: "utiliser Next.js", category: "Décider & analyser" },
  { id: 19, command: "/inconvenients", description: "Identifie les limites, les coûts et les points faibles.", example: "travailler avec WordPress", category: "Décider & analyser" },
  { id: 20, command: "/risques", description: "Repère les problèmes potentiels et comment les anticiper.", example: "lancer cette application", category: "Décider & analyser" },
  { id: 21, command: "/code", description: "Génère du code qui répond à ton besoin et à ton environnement.", example: "crée un bouton React", category: "Programmer" },
  { id: 22, command: "/debug", description: "Cherche la cause d’une erreur et propose une correction expliquée.", example: "[colle ton code et le message d’erreur]", category: "Programmer" },
  { id: 23, command: "/optimise", description: "Améliore la performance, la lisibilité ou la qualité du code.", example: "améliore ce code JavaScript", category: "Programmer" },
  { id: 24, command: "/commente", description: "Ajoute des commentaires utiles pour expliquer le code.", example: "[colle ton code ici]", category: "Programmer" },
  { id: 25, command: "/documente", description: "Rédige une documentation claire pour le code ou une API.", example: "explique cette API", category: "Programmer" },
  { id: 26, command: "/seo", description: "Améliore un contenu pour le référencement naturel sans sacrifier la clarté.", example: "optimise cet article sur Beauvais", category: "SEO & contenu" },
  { id: 27, command: "/titre", description: "Propose des titres accrocheurs, précis et pertinents.", example: "article sur l’IA", category: "SEO & contenu" },
  { id: 28, command: "/meta", description: "Rédige un meta title et une meta description pour une page.", example: "page sur mes services informatiques", category: "SEO & contenu" },
  { id: 29, command: "/motscles", description: "Identifie les mots-clés et expressions recherchés par ton public.", example: "site de dépannage informatique", category: "SEO & contenu" },
  { id: 30, command: "/cta", description: "Crée un appel à l’action clair qui invite à passer à l’étape suivante.", example: "inciter les visiteurs à me contacter", category: "SEO & contenu" },
  { id: 31, command: "/linkedin", description: "Transforme une idée en publication LinkedIn adaptée à ton audience.", example: "l’IA fait gagner du temps", category: "Réseaux sociaux" },
  { id: 32, command: "/instagram", description: "Écris une légende Instagram avec le ton et le format adaptés.", example: "nouveau projet web", category: "Réseaux sociaux" },
  { id: 33, command: "/facebook", description: "Adapte ton contenu à une publication Facebook conviviale.", example: "présentation de mon entreprise", category: "Réseaux sociaux" },
  { id: 34, command: "/x", description: "Crée une publication courte et claire pour X.", example: "lancement de mon nouveau site", category: "Réseaux sociaux" },
  { id: 35, command: "/hashtags", description: "Suggère des hashtags pertinents pour le sujet et la plateforme.", example: "développeur web freelance", category: "Réseaux sociaux" },
  { id: 36, command: "/email", description: "Rédige un courriel adapté à la situation, au destinataire et au ton souhaité.", example: "répondre à un client mécontent", category: "Travail & productivité" },
  { id: 37, command: "/cv", description: "Améliore une partie de ton CV en mettant en valeur tes résultats.", example: "améliore cette expérience professionnelle", category: "Travail & productivité" },
  { id: 38, command: "/lettre", description: "Rédige une lettre de motivation personnalisée pour le poste visé.", example: "candidature développeur React", category: "Travail & productivité" },
  { id: 39, command: "/entretien", description: "Simule un entretien et aide-toi à préparer des réponses solides.", example: "recruteur pour un poste de développeur", category: "Travail & productivité" },
  { id: 40, command: "/plan", description: "Transforme un objectif en plan d’action concret et réaliste.", example: "lancer mon activité freelance", category: "Travail & productivité" },
  { id: 41, command: "/expert", description: "Demande une analyse avec le point de vue d’un spécialiste du domaine.", example: "analyse mon site web", category: "Explorer & progresser" },
  { id: 42, command: "/critique", description: "Analyse ton contenu avec précision et suggère des améliorations.", example: "analyse cette page", category: "Explorer & progresser" },
  { id: 43, command: "/alternatives", description: "Propose plusieurs façons d’aborder le problème.", example: "comment améliorer mon SEO ?", category: "Explorer & progresser" },
  { id: 44, command: "/pourcontre", description: "Présente les arguments pour et contre afin d’éclairer ta décision.", example: "travailler en freelance", category: "Explorer & progresser" },
  { id: 45, command: "/questions", description: "Commence par poser les questions utiles avant de proposer une réponse.", example: "aide-moi à créer mon site", category: "Explorer & progresser" },
  { id: 46, command: "/source", description: "Indique les sources à consulter et les affirmations à vérifier.", example: "donne-moi des sources sur ce sujet", category: "Explorer & progresser" },
  { id: 47, command: "/actualise", description: "Demande des informations récentes, datées et vérifiables.", example: "quelles sont les tendances SEO en 2026 ?", category: "Explorer & progresser" },
  { id: 48, command: "/compare", description: "Compare les options selon des critères que tu précises.", example: "Vercel vs Netlify", category: "Explorer & progresser" },
  { id: 49, command: "/idee", description: "Fais émerger plusieurs idées différentes à partir de ton sujet.", example: "donne-moi 10 idées de contenus", category: "Explorer & progresser" },
  { id: 50, command: "/tout", description: "Combine plusieurs consignes dans une seule demande structurée.", example: "explique simplement, donne des exemples, puis fais un tableau", category: "Explorer & progresser" },
  { id: 51, command: "/verifie", description: "Vérifie la cohérence d’une réponse et distingue les faits des suppositions.", example: "vérifie cette réponse et signale les points incertains", category: "Explorer & progresser" },
  { id: 52, command: "/contreexemple", description: "Cherche un contre-exemple ou une situation où le raisonnement ne fonctionne plus.", example: "trouve un contre-exemple à cette règle", category: "Explorer & progresser" },
  { id: 53, command: "/niveau", description: "Adapte la profondeur et le vocabulaire à ton niveau de connaissance.", example: "explique les bases de Python à un débutant", category: "Comprendre" },
  { id: 54, command: "/format", description: "Précise la forme attendue pour obtenir une réponse directement exploitable.", example: "réponds en 5 puces, avec un exemple par point", category: "Organiser" },
  { id: 55, command: "/ton", description: "Définis précisément le ton à employer dans la réponse.", example: "réécris ce message avec un ton chaleureux et direct", category: "Écrire & réécrire" },
  { id: 56, command: "/audience", description: "Adapte le vocabulaire et les explications aux personnes qui vont lire le texte.", example: "présente ce projet à des clients qui ne connaissent pas la technique", category: "Écrire & réécrire" },
  { id: 57, command: "/hypotheses", description: "Énonce les hypothèses utilisées et demande des précisions si elles changent la réponse.", example: "prépare un budget et indique tes hypothèses", category: "Décider & analyser" },
  { id: 58, command: "/planb", description: "Propose une solution de repli si le plan principal échoue.", example: "prépare un plan B si le lancement est retardé", category: "Travail & productivité" },
  { id: 59, command: "/traduis", description: "Traduis un texte en préservant son sens, son ton et ses expressions naturelles.", example: "traduis ce message en anglais professionnel", category: "Écrire & réécrire" },
  { id: 60, command: "/quiz", description: "Crée des questions pour réviser un sujet et vérifie tes réponses une par une.", example: "fais-moi réviser la photosynthèse avec 5 questions", category: "Comprendre" },
];

const groups = [
  { name: "Écrire & réécrire", icon: "✍", color: "rose" },
  { name: "Comprendre", icon: "✳", color: "blue" },
  { name: "Organiser", icon: "▤", color: "amber" },
  { name: "Décider & analyser", icon: "◎", color: "violet" },
  { name: "Programmer", icon: "⌘", color: "green" },
  { name: "SEO & contenu", icon: "↗", color: "orange" },
  { name: "Réseaux sociaux", icon: "◉", color: "pink" },
  { name: "Travail & productivité", icon: "◷", color: "teal" },
  { name: "Explorer & progresser", icon: "✦", color: "indigo" },
];

export default function Home() {
  const [active, setActive] = useState("Tout voir");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<number | null>(null);
  const [selected, setSelected] = useState<Shortcut | null>(null);
  const filtered = useMemo(() => shortcuts.filter((item) =>
    (active === "Tout voir" || item.category === active) &&
    `${item.command} ${item.description} ${item.example} ${item.category}`.toLowerCase().includes(query.toLowerCase())
  ), [active, query]);
  const copy = async (item: Shortcut) => {
    await navigator.clipboard.writeText(`${item.command} : ${item.example}`);
    setCopied(item.id);
    window.setTimeout(() => setCopied(null), 1600);
  };

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [selected]);

  return (
    <main>
      <div className="announcement"><span className="announcement-dot" /> Le guide pratique pour mieux prompter <span className="announcement-arrow">↗</span></div>
      <header className="site-header">
        <a className="brand" href="#accueil"><span className="brand-mark">✳</span> promptothèque<span className="brand-period">.</span></a>
        <nav aria-label="Navigation principale"><a href="#raccourcis">Les raccourcis</a><a href="#mode-emploi">Comment ça marche</a></nav>
        <a className="header-cta" href="#raccourcis">Explorer le guide <span>↘</span></a>
      </header>

      <section className="hero" id="accueil">
        <div className="hero-copy">
          <div className="eyebrow"><span>✳</span> TON GUIDE POUR CHATGPT <span className="eyebrow-line" /></div>
          <h1><span className="sr-only">60 exemples de prompts ChatGPT pour obtenir de meilleures réponses. </span>Moins de prompts<br />au hasard. <span>Plus de<br /><em>bonnes réponses.</em></span></h1>
          <p className="hero-description">60 commandes simples pour guider ChatGPT, gagner du temps et obtenir des réponses qui te ressemblent.</p>
          <div className="hero-actions"><a className="button-primary" href="#raccourcis">Trouver mon raccourci <span>↘</span></a><a className="text-link" href="#mode-emploi">Comprendre le principe <span>↓</span></a></div>
          <div className="hero-proof"><div className="proof-avatars"><span>✳</span><span>✦</span><span>◉</span></div><span>Des idées prêtes à copier,<br /><strong>à adapter à ta façon.</strong></span><span className="proof-divider" /><span className="proof-count">60<span>+</span></span><span className="proof-label">façons de<br />mieux demander</span></div>
        </div>
        <div className="hero-art" aria-label="Illustration de commandes de prompt" role="img">
          <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
          <div className="prompt-window"><div className="window-top"><span className="window-dots"><i /><i /><i /></span><span>nouveau prompt</span><span>•••</span></div><div className="window-body"><div className="window-label">TA DEMANDE, EN MIEUX</div><div className="window-prompt"><b>/explique</b> : comment fonctionne une API ?</div><div className="window-response"><span className="response-icon">✳</span><span>Imagine un serveur<br />dans un restaurant…</span></div><div className="window-caption">Une bonne consigne change tout.</div></div></div>
          <div className="float-card float-card-top"><span className="float-icon">✍</span><span><b>/reformule</b><small>Dire les choses autrement</small></span><span className="float-plus">＋</span></div>
          <div className="float-card float-card-bottom"><span className="float-icon green-icon">▤</span><span><b>/tableau</b><small>Comparer en un clin d’œil</small></span><span className="float-plus">＋</span></div>
          <div className="art-sticker">LES BONS<br />MOTS, ÇA<br /><span>CHANGE<br />TOUT.</span><b>✳</b></div><span className="art-spark spark-one">✳</span><span className="art-spark spark-two">✦</span>
          <div className="art-bottom-note"><span className="note-line" /> PENSE-BÊTE N° 01 <span className="note-line" /></div>
        </div>
        <a className="scroll-cue" href="#raccourcis"><span>↓</span> FAIS DÉFILER POUR EXPLORER</a>
      </section>

      <section className="intro-strip" id="mode-emploi"><div className="strip-index">01 <span>—</span> LE PRINCIPE</div><div className="strip-copy"><h2>Des raccourcis à comprendre,<br /><em>pas à mémoriser.</em></h2><p>ChatGPT ne connaît pas ces commandes comme des boutons secrets. Ce sont des façons pratiques de formuler ta demande. Écris-les au début d’un message, puis précise ce que tu veux.</p></div><div className="strip-example"><span className="example-label">ÇA DONNE ÇA</span><div className="example-bubble"><code>/simple :</code> explique-moi ce contrat</div><div className="example-caption">La commande donne le cap.<br />Ton contexte fait la différence. <span>↗</span></div></div></section>

      <section className="catalog" id="raccourcis" aria-labelledby="catalog-title">
        <div className="catalog-heading"><div><div className="eyebrow"><span>✳</span> LA BOÎTE À OUTILS <span className="eyebrow-line" /></div><h2 id="catalog-title">60 prompts ChatGPT pour chaque <em>besoin</em></h2><p>Choisis un thème ou cherche directement une commande.</p></div><div className="catalog-count"><span>60</span> commandes<br />à découvrir</div></div>
        <div className="toolbar"><div className="filters" aria-label="Filtrer par catégorie"><button className={active === "Tout voir" ? "filter active" : "filter"} onClick={() => setActive("Tout voir")}>Tout voir <span>60</span></button>{groups.map((group) => <button key={group.name} className={active === group.name ? "filter active" : "filter"} onClick={() => setActive(group.name)}>{group.name}</button>)}</div><label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une commande…" aria-label="Rechercher une commande" /><kbd>⌘ K</kbd></label></div>
        <div className="results-line"><span>{filtered.length} commande{filtered.length > 1 ? "s" : ""}</span><span>COMMANDES DE PROMPT · CLIQUE POUR EN SAVOIR PLUS ↗</span></div>
        <div className="shortcut-grid">{filtered.map((item) => <article className="shortcut-card" key={item.id} role="button" tabIndex={0} onClick={() => setSelected(item)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected(item); } }} aria-label={`Voir les détails de ${item.command}`}><div className="card-top"><span className="card-number">{String(item.id).padStart(2, "0")}</span><span className="card-category">{item.category}</span><button className={copied === item.id ? "copy-button copied" : "copy-button"} onClick={(event) => { event.stopPropagation(); copy(item); }} aria-label={`Copier ${item.command}`}>{copied === item.id ? "✓" : "↗"}</button></div><h3>{item.command}</h3><p>{item.description}</p><div className="card-example"><span>ESSAIE COMME ÇA</span><button onClick={(event) => { event.stopPropagation(); copy(item); }}><code>{item.command}</code> : {item.example}<span className="copy-hint">{copied === item.id ? "Copié !" : "⧉"}</span></button></div></article>)}</div>
        {filtered.length === 0 && <div className="empty-state"><span>⌕</span><h3>Aucune commande trouvée</h3><p>Essaie un autre mot ou choisis une autre catégorie.</p><button onClick={() => { setQuery(""); setActive("Tout voir"); }}>Tout afficher ↗</button></div>}
      </section>

      {selected && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><section className="shortcut-modal" role="dialog" aria-modal="true" aria-labelledby="modal-command"><div className="modal-top"><span className="modal-category">{selected.category}</span><button className="modal-close" onClick={() => setSelected(null)} aria-label="Fermer la fenêtre">×</button></div><span className="modal-number">RACCOURCI {String(selected.id).padStart(2, "0")} / 60</span><h2 id="modal-command">{selected.command}</h2><p className="modal-description">{selected.description}</p><div className="modal-example"><span>À COPIER DANS TON PROMPT</span><div><code>{selected.command}</code> : {selected.example}</div><button className="button-primary" onClick={() => copy(selected)}>{copied === selected.id ? "Copié !" : "Copier l’exemple"} <span>{copied === selected.id ? "✓" : "⧉"}</span></button></div><div className="modal-tip"><span>✳</span><p><strong>Petit conseil</strong><br />Ajoute le contexte utile — pour qui, dans quel but et avec quel ton — afin d’obtenir une réponse encore plus adaptée.</p></div></section></div>}

      <section className="recipe"><div className="recipe-left"><div className="eyebrow"><span>✳</span> LE PETIT PLUS <span className="eyebrow-line" /></div><h2>Crée ton propre<br /><em>raccourci.</em></h2><p>Tu peux combiner plusieurs consignes pour créer une formule qui te ressemble. Donne-lui un nom et réutilise-la quand tu veux.</p><a href="#raccourcis" className="text-link">Piocher dans les commandes <span>↗</span></a></div><div className="recipe-right"><div className="recipe-head"><span>TA RECETTE PERSONNELLE</span><span className="recipe-spark">✳</span></div><div className="recipe-line"><span className="recipe-num">01</span><code>/client</code><span>Nom de ton raccourci</span></div><div className="recipe-line"><span className="recipe-num">02</span><code>+ /pro</code><span>Un ton professionnel</span></div><div className="recipe-line"><span className="recipe-num">03</span><code>+ /court</code><span>Une réponse concise</span></div><div className="recipe-line"><span className="recipe-num">04</span><code>+ /cta</code><span>Une prochaine étape claire</span></div><div className="recipe-result"><span>TA FORMULE</span><p><b>/client</b> : ton professionnel, réponse courte et appel à l’action.</p><span className="result-star">✦</span></div></div></section>

      <section className="closing"><div className="closing-mark">✳</div><div className="closing-eyebrow">LE MEILLEUR RACCOURCI ?</div><h2>Être précis sur<br />ce que tu <em>veux.</em></h2><p>Un bon exemple, un peu de contexte et un objectif clair : c’est souvent tout ce qu’il faut pour transformer ta demande.</p><a href="#raccourcis" className="button-primary">Trouver une idée <span>↗</span></a><span className="closing-note">FAIT POUR ÊTRE UTILISÉ, PAS JUSTE LU ✳</span></section>
      <footer><a className="brand" href="#accueil"><span className="brand-mark">✳</span> promptothèque<span className="brand-period">.</span></a><span>60 idées pour mieux parler à ChatGPT.</span><a href="#accueil" className="text-link"><span className="arrow">↑</span> </a></footer>
    </main>
  );
}
