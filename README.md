# SASHA — Site vitrine

Site professionnel de SASHA (Sasha Libszia) — business consulting et financement pour
entrepreneuses. React + Vite + Tailwind, thème sombre violet/orange, animations Framer Motion.

## Stack

- **React 19** + **Vite 8** + **Tailwind CSS 3**
- **Framer Motion** (scroll storytelling, transitions de page)
- **React Router** (3 pages : Accueil, À propos, Contact)
- **Express + Nodemailer** pour l'envoi d'emails du formulaire de contact

## Démarrage

```bash
npm install
cp .env.example .env   # puis renseigner les identifiants Gmail
npm run dev:all        # serveur d'envoi (3001) + site Vite en parallèle
```

Ou séparément :

```bash
npm run server   # API d'envoi d'email sur http://localhost:3001
npm run dev      # site Vite (proxy /api -> :3001)
```

## Variables d'environnement

| Variable                  | Description                                                |
| ------------------------- | ---------------------------------------------------------- |
| `GOOGLE_USERMAIL`         | Compte Gmail expéditeur                                     |
| `GOOGLE_PASSWORD`         | Mot de passe d'application Google (pas le mot de passe réel) |
| `GOOGLE_USER_DESTINATION` | Adresse qui reçoit les messages du formulaire               |
| `PORT`                    | Port du serveur autonome (défaut `3001`)                    |

> Le mot de passe d'application se génère sur
> https://myaccount.google.com/apppasswords (validation en deux étapes requise).

## Scripts

| Script              | Rôle                                              |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Site en développement                             |
| `npm run server`    | API d'envoi d'email (mode autonome)               |
| `npm run dev:all`   | Les deux en parallèle                             |
| `npm run build`     | Build de production dans `dist/`                  |
| `npm run preview`   | Prévisualisation du build                         |
| `npm run lint`      | Analyse statique (Oxlint)                         |

## Déploiement

### Vercel

Le backend est exposé en fonction serverless via `api/contact.js`, détectée automatiquement
par Vercel. `vercel.json` gère le build et le rewrite SPA.

1. Pousser le dépôt sur GitHub.
2. Sur Vercel : **New Project** → importer le dépôt (framework détecté : Vite).
3. Ajouter les variables d'environnement `GOOGLE_USERMAIL`, `GOOGLE_PASSWORD`,
   `GOOGLE_USER_DESTINATION` dans **Settings → Environment Variables**.
4. Déployer.

### Docker

```bash
docker compose up --build -d
```

Le conteneur compile le site, sert `dist/` et expose l'API d'envoi sur le port `3001`.
Les identifiants sont lus depuis `.env` (`env_file` dans `docker-compose.yml`).

```bash
docker build -t sasha-site .
docker run -p 3001:3001 --env-file .env sasha-site
```
