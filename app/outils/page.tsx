import type { Metadata } from "next";
import Link from "next/link";
import ToolExplorer from "./tool-explorer";

const tools = [
  { id: "recherche-web", number: "01", icon: "↗", tone: "coral", name: "Recherche Web", short: "Trouvez des informations récentes et explorez des sources directement avec ChatGPT.", example: "Trouve les dernières tendances SEO en 2026 et cite tes sources.", ideal: "Actualités, recherches, comparatifs, informations récentes.", keyword: "recherche Web ChatGPT", overview: "La recherche Web aide à explorer des sujets qui évoluent et à retrouver des pages sources. Elle complète la conversation en apportant des éléments récents à examiner.", steps: ["Décrivez la question et la période qui vous intéressent.", "Précisez le pays, le public ou les critères à comparer.", "Demandez des liens et vérifiez les sources importantes avant de vous appuyer dessus."], tip: "Une citation permet de retrouver une source, mais ne garantit pas à elle seule que chaque détail est exact ou complet.", availability: "La recherche Web et ses modalités peuvent varier selon la version, le forfait et le déploiement de ChatGPT." },
  { id: "mode-etude", number: "02", icon: "✳", tone: "blue", name: "Mode Étude", short: "Apprenez étape par étape au lieu de simplement demander la réponse.", example: "Aide-moi à comprendre les fractions. Pose-moi une question à la fois et explique mes erreurs.", ideal: "Étudiants, apprentissage, révisions, formation.", keyword: "mode étude ChatGPT", overview: "Le mode Étude transforme une question en séance guidée. ChatGPT peut décomposer une notion, poser des questions et adapter les explications à vos réponses pour vous aider à raisonner.", steps: ["Indiquez le sujet, votre niveau et ce que vous savez déjà.", "Demandez une explication courte suivie d’une question à la fois.", "Répondez vous-même, puis demandez un indice ou une explication de vos erreurs."], tip: "Essayez de résoudre l’exercice avant de demander la solution complète : l’effort de rappel aide à repérer ce qui reste à comprendre.", availability: "Le mode Étude peut être proposé différemment selon la version de ChatGPT et le déploiement." },
  { id: "images", number: "03", icon: "▧", tone: "violet", name: "Génération d’images", short: "Transformez une idée ou une description en image.", example: "Crée une illustration moderne pour un site consacré à l’intelligence artificielle.", ideal: "Illustrations, réseaux sociaux, concepts visuels, créations.", keyword: "génération d’images ChatGPT", overview: "Décrivez l’image que vous souhaitez obtenir : sujet, ambiance, cadrage, couleurs et éléments à éviter. Vous pouvez ensuite demander des ajustements à partir du résultat.", steps: ["Commencez par préciser le sujet et l’usage de l’image.", "Ajoutez le style visuel, le cadrage, les couleurs et le format souhaités.", "Examinez le résultat et demandez une modification ciblée à la fois."], tip: "Pour obtenir un rendu plus contrôlable, décrivez les éléments visibles et leur position plutôt que de vous limiter à un nom de style.", availability: "La génération d’images et ses limites peuvent varier selon le forfait, la version et le déploiement de ChatGPT." },
  { id: "canvas", number: "04", icon: "⌘", tone: "green", name: "Canvas", short: "Travaillez directement sur un texte ou du code avec un espace de travail adapté.", example: "Améliore cette lettre de motivation et rends le texte plus professionnel.", ideal: "Rédaction, correction, programmation, documents.", keyword: "Canvas ChatGPT", overview: "Canvas offre un espace pour retravailler un document ou du code avec ChatGPT. Il est utile quand vous voulez faire évoluer une partie précise tout en gardant le reste sous les yeux.", steps: ["Demandez un espace de travail pour votre texte ou votre code.", "Collez ou rédigez le contenu, puis nommez le changement souhaité.", "Comparez les versions et demandez une révision ciblée si nécessaire."], tip: "Indiquez ce qui doit rester inchangé — par exemple le ton, la structure ou le comportement du code — pour guider les révisions.", availability: "Canvas peut ne pas être proposé dans toutes les versions, tous les forfaits ou tous les environnements." },
  { id: "projets", number: "05", icon: "◫", tone: "amber", name: "Projets", short: "Regroupez conversations, fichiers et instructions autour d’un même sujet.", example: "Utilise les informations de mon projet pour rédiger cette nouvelle page.", ideal: "Travail, projets personnels, entreprise, développement.", keyword: "projets ChatGPT", overview: "Un projet rassemble au même endroit des conversations, des fichiers de référence et des consignes associées à un travail suivi. Cela évite de réexpliquer le contexte à chaque échange.", steps: ["Créez un projet avec un nom qui décrit votre objectif.", "Ajoutez les documents utiles et des instructions stables pour ChatGPT.", "Ouvrez une conversation dans le projet et précisez la tâche du jour."], tip: "Ne déposez que les documents nécessaires et vérifiez les paramètres de partage et de confidentialité avant d’ajouter des informations sensibles.", availability: "Les capacités et limites des projets peuvent varier selon le forfait et la version de ChatGPT." },
  { id: "fichiers", number: "06", icon: "▤", tone: "teal", name: "Analyse de fichiers", short: "Faites analyser vos PDF, documents, tableaux ou autres fichiers.", example: "Analyse ce PDF et donne-moi les 10 informations les plus importantes.", ideal: "Documents, rapports, tableaux, données.", keyword: "analyse de fichiers ChatGPT", overview: "Vous pouvez joindre un document et poser des questions à son sujet : en obtenir une synthèse, extraire des chiffres ou organiser les constats. Le résultat dépend de la lisibilité et du contenu du fichier.", steps: ["Joignez le document ou le tableau à analyser.", "Demandez une sortie précise : synthèse, liste de chiffres, comparaison ou tableau.", "Demandez les pages ou passages utiles pour contrôler les points importants."], tip: "Relisez les valeurs, unités et citations dans le document d’origine, en particulier pour les tableaux complexes ou les décisions importantes.", availability: "Les types de fichiers acceptés, les tailles et les outils d’analyse disponibles dépendent de la version et du forfait." },
  { id: "mode-vocal", number: "07", icon: "◖", tone: "rose", name: "Mode vocal", short: "Discutez avec ChatGPT naturellement grâce à la conversation vocale.", example: "Fais-moi pratiquer l’anglais comme lors d’une conversation réelle.", ideal: "Langues, entraînement oral, brainstorming, conversation.", keyword: "mode vocal ChatGPT", overview: "Le mode vocal permet d’échanger à l’oral, utile quand parler est plus naturel que taper ou quand vous voulez pratiquer une conversation. Vous pouvez préciser le rôle de ChatGPT et le rythme souhaité.", steps: ["Lancez la conversation vocale si elle est disponible sur votre appareil.", "Donnez le contexte : langue, niveau et type de conversation.", "Demandez des corrections ou un résumé à la fin si cela vous aide."], tip: "Dans un lieu partagé, tenez compte des personnes autour de vous et évitez de prononcer des informations confidentielles.", availability: "Le mode vocal et ses options varient selon l’appareil, le forfait et la version de ChatGPT." },
];

export const metadata: Metadata = {
  title: { absolute: "Outils ChatGPT : guide des fonctionnalités | Promptothèque" },
  description: "Découvrez les principaux outils et fonctionnalités de ChatGPT : recherche Web, mode Étude, génération d’images, Canvas, projets, fichiers et mode vocal.",
  alternates: { canonical: "/outils" },
  openGraph: {
    type: "website", locale: "fr_FR", url: "/outils", siteName: "Promptothèque",
    title: "Outils ChatGPT : guide des fonctionnalités | Promptothèque",
    description: "Un guide pratique pour découvrir et utiliser les fonctionnalités de ChatGPT.",
    images: [{ url: "/opengraph-image.svg", width: 1200, height: 630, alt: "Promptothèque, guide pratique des outils ChatGPT" }],
  },
  twitter: { card: "summary_large_image", title: "Outils ChatGPT : guide des fonctionnalités | Promptothèque", description: "Recherche Web, mode Étude, images, Canvas, projets, fichiers et mode vocal." },
};

export default function OutilsPage() {
  return (
    <main className="tools-page">
      <div className="announcement"><span className="announcement-dot" /> Le guide pratique pour ChatGPT <span className="announcement-arrow">↗</span></div>
      <header className="site-header">
        <Link className="brand" href="/"><span className="brand-mark">✳</span> promptothèque<span className="brand-period">.</span></Link>
        <nav aria-label="Navigation principale"><Link href="/#raccourcis">Les raccourcis</Link><Link href="/outils" aria-current="page">Les outils</Link><Link href="/#mode-emploi">Comment ça marche</Link></nav>
        <Link className="header-cta" href="#outils">Explorer les outils <span>↘</span></Link>
      </header>

      <section className="tools-hero" id="accueil">
        <div className="tools-hero-copy">
          <div className="eyebrow"><span>✳</span> LE GUIDE PRATIQUE POUR CHATGPT <span className="eyebrow-line" /></div>
          <h1>ChatGPT peut faire bien plus que <em>répondre à vos questions.</em></h1>
          <p className="hero-description">Découvrez les fonctionnalités qui peuvent vous faire gagner du temps, apprendre plus facilement et travailler plus efficacement.</p>
          <div className="hero-actions"><a className="button-primary" href="#outils">Explorer les outils <span>↘</span></a><a className="text-link" href="#besoin">Choisir selon mon besoin <span>↓</span></a></div>
          <p className="availability-note">Les fonctionnalités disponibles peuvent varier selon votre version de ChatGPT.</p>
        </div>
        <div className="tools-hero-art" role="img" aria-label="Illustration des outils ChatGPT, autour d’une fenêtre de conversation">
          <div className="tools-art-ring" />
          <div className="tools-art-window"><div className="tools-window-top"><span><i /><i /><i /></span> votre espace de travail <b>•••</b></div><div className="tools-window-body"><span className="art-label">UNE IDÉE, PLUSIEURS FAÇONS D’AVANCER</span><div className="art-prompt">Que voulez-vous<br />faire aujourd’hui ?</div><div className="art-pills"><span>⌕ Rechercher</span><span>✳ Apprendre</span><span>▧ Créer</span></div><div className="art-response"><b>✳</b><span>Choisissons l’outil<br />qui vous correspond.</span><span className="art-response-dot" /></div></div></div>
          <div className="tools-art-sticker">UN BON<br /><strong>OUTIL</strong><br />CHANGE<br />LA DONNE <b>✳</b></div><span className="tools-art-spark">✳</span><span className="tools-art-note">UN GUIDE POUR PASSER À L’ACTION</span>
        </div>
      </section>

      <section className="need-section" id="besoin" aria-labelledby="need-title">
        <div className="tools-section-heading"><div><div className="eyebrow"><span>✳</span> PARTIR DE VOTRE BESOIN <span className="eyebrow-line" /></div><h2 id="need-title">Que voulez-vous <em>faire ?</em></h2></div><p>Choisissez une situation pour découvrir l’outil qui peut vous aider.</p></div>
        <ToolExplorer tools={tools} />
      </section>

      <section className="examples-section" aria-labelledby="examples-title">
        <div className="tools-section-heading"><div><div className="eyebrow"><span>✳</span> DU BESOIN AU BON RÉSULTAT <span className="eyebrow-line" /></div><h2 id="examples-title">Une fonctionnalité.<br /><em>Une idée. Un résultat.</em></h2></div><p>Un peu plus de contexte suffit souvent à transformer une question vague en demande exploitable.</p></div>
        <div className="example-grid">
          <article className="before-after"><span className="example-number">01 / APPRENDRE</span><div className="before-block"><span>AVANT</span><p>« Explique-moi JavaScript. »</p></div><div className="after-block"><span>APRÈS <i>↗</i></span><p>« Agis comme un professeur de programmation. Explique-moi JavaScript progressivement, avec des exemples simples, puis donne-moi un petit exercice. »</p></div><p className="example-result"><b>↳</b> Une demande beaucoup plus précise.</p></article>
          <article className="before-after"><span className="example-number">02 / ANALYSER</span><div className="before-block"><span>AVANT</span><p>« Analyse ce PDF. »</p></div><div className="after-block"><span>APRÈS <i>↗</i></span><p>« Analyse ce PDF et donne-moi les 5 informations essentielles, les chiffres importants, les points à retenir et les éventuels problèmes. Présente le résultat sous forme de tableau. »</p></div><p className="example-result"><b>↳</b> Un résultat structuré, plus facile à utiliser.</p></article>
          <article className="before-after"><span className="example-number">03 / PRATIQUER</span><div className="before-block"><span>AVANT</span><p>« Apprends-moi l’anglais. »</p></div><div className="after-block"><span>APRÈS <i>↗</i></span><p>« J’ai un niveau intermédiaire. Fais-moi pratiquer l’anglais pendant 10 minutes. Pose-moi une question à la fois et corrige mes erreurs après chaque réponse. »</p></div><p className="example-result"><b>↳</b> Une séance adaptée à votre niveau et à votre rythme.</p></article>
        </div>
      </section>

      <section className="decision-section" aria-labelledby="decision-title">
        <div className="decision-intro"><div className="eyebrow"><span>✳</span> LE PETIT GUIDE <span className="eyebrow-line" /></div><h2 id="decision-title">Quel outil<br />utiliser <em>?</em></h2><p>Commencez par votre objectif. L’outil vient ensuite.</p></div>
        <div className="decision-list">{[
          ["Trouver une information récente", "Recherche Web", "recherche-web"], ["Apprendre quelque chose", "Mode Étude", "mode-etude"], ["Créer une image", "Génération d’images", "images"], ["Travailler sur un texte", "Canvas", "canvas"], ["Travailler sur un projet dans la durée", "Projets", "projets"], ["Analyser un document", "Analyse de fichiers", "fichiers"], ["Discuter oralement", "Mode vocal", "mode-vocal"],
        ].map(([need, name, id], index) => <a href={`#${id}`} className="decision-row" key={id}><span className="decision-number">0{index + 1}</span><span className="decision-need">Je veux {need.charAt(0).toLowerCase() + need.slice(1)}</span><span className="decision-arrow">→</span><strong>{name}</strong><span className="decision-link">↗</span></a>)}</div>
      </section>

      <section className="tools-closing"><div className="closing-mark">✳</div><div className="closing-eyebrow">À RETENIR</div><h2>Le meilleur outil n’est pas toujours celui qui répond le plus vite.<br /><em>C’est celui qui correspond à ce que vous voulez réellement faire.</em></h2><p>Et si vous voulez améliorer vos demandes, découvrez aussi nos raccourcis.</p><Link href="/#raccourcis" className="button-primary">Explorer les raccourcis <span>→</span></Link></section>
      <footer><Link className="brand" href="/"><span className="brand-mark">✳</span> promptothèque<span className="brand-period">.</span></Link><span>Des idées pour mieux utiliser ChatGPT.</span><div className="footer-links"><Link href="/#raccourcis">Les raccourcis</Link><Link href="/outils" aria-current="page">Les outils ChatGPT</Link><a href="#accueil" className="text-link" aria-label="Retour en haut"><span className="arrow">↑</span></a></div></footer>
    </main>
  );
}
