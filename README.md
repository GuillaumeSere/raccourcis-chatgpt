# Promptothèque

Un guide interactif en français pour mieux formuler ses demandes à ChatGPT. Il rassemble 60 idées de commandes de prompt, classées par thème, avec des exemples copiables et une fiche détaillée pour chaque commande.

> Les commandes présentées ici sont des formulations à écrire dans un prompt. Ce ne sont pas des raccourcis clavier ni des commandes spéciales intégrées à ChatGPT.

## Fonctionnalités

- 60 commandes regroupées par thèmes : rédaction, compréhension, organisation, programmation, SEO, réseaux sociaux et productivité.
- Recherche instantanée et filtres par catégorie.
- Exemples copiables en un clic.
- Modale détaillée pour lire une commande et son conseil d’utilisation.
- Mise en page responsive, avec prise en charge de la préférence système de réduction des animations.

## Prérequis

- Node.js (version compatible avec Next.js 16)
- npm

## Installation

Clone le dépôt, puis installe les dépendances :

```bash
npm install
```

## Lancer en développement

```bash
npm run dev
```

Ouvre ensuite [http://localhost:3000](http://localhost:3000).

## Vérification et production

Créer une compilation de production :

```bash
npm run build
```

Lancer le serveur de production après compilation :

```bash
npm run start
```

Lancer ESLint :

```bash
npm run lint
```

## Structure du projet

```text
app/
├── globals.css   # Styles, responsive et animations
├── layout.tsx    # Layout global et métadonnées
└── page.tsx      # Page d’accueil, catalogue et interactions
```

Les commandes et leurs exemples sont définis dans `app/page.tsx`. Les styles du site se trouvent dans `app/globals.css`.

## Technologies

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
