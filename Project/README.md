# Task Manager — Projet DevOps

## Introduction
Ce dépôt contient une application de gestion de tâches (Task Manager) développée dans le cadre du projet DevOps.
L’application est composée d’un **frontend React (Vite)** et d’un **backend Node.js/Express** (dans le déploiement Kubernetes/Docker du projet).
L’objectif est de fournir une application simple avec un déploiement reproductible (Docker/Kubernetes) et une documentation permettant de lancer le projet facilement.

---

## Frontend — Task Manager (React + Vite)

### Fait par
- **Frontend : Yanis Nouili**

### Présentation
Cette partie du projet correspond à l’interface web **Task Manager** développée en **React (Vite)**. 
Le frontend permet de gérer des tâches (CRUD) et consomme l’API REST exposée par le backend.

---

### Fonctionnalités implémentées
- **CRUD complet**
  - Ajouter une tâche
  - Modifier une tâche
  - Supprimer une tâche
  - Changer le statut d’une tâche
- **Statuts en français** : **À faire**, **En cours**, **Fini**
- **Priorité** : **Basse / Haute / Critique**
- **Recherche** (barre de recherche)
- **Filtre par statut** (Tous / À faire / En cours / Fini)
- **Gestion d’erreurs** (réseau / backend + affichage côté UI)
- **Mode Mock / Mode API**
  - `USE_MOCK=true` : utilisation de données mock (sans backend)
  - `USE_MOCK=false` : connexion au backend via API

---

### API consommée (contrat attendu)
Le frontend appelle les endpoints suivants :

- `GET /tasks` — récupérer toutes les tâches
- `POST /tasks` — créer une tâche
- `PUT /tasks/:id` — modifier une tâche / changer son statut *(selon l’implémentation backend)*
- `DELETE /tasks/:id` — supprimer une tâche

Le frontend est conçu pour s’aligner sur le contrat API de l’équipe.

---

### Lancer le frontend en local (Vite)
Prérequis : Node.js (>= 18 recommandé)

```bash
cd Project/frontend
npm install
npm run dev


### Note sur l’historique Git (information)

À un moment du projet, l’historique Git de la branche principale a été supprimé par erreur (ex. force-push / reset), ce qui a pu entraîner la disparition de certains commits dans l’onglet “Commits” de GitHub.
Les contributions réalisées sur le frontend restent toutefois visibles via d’autres éléments de traçabilité (Activity GitHub ou historique local) et le code du frontend présent dans ce dépôt correspond bien au travail réalisé sur cette partie.


---

### Auteurs

Réalisé par Yanis NOUILI, Yacine OUALIKEN, Ryane SID IDRIS, Sofiane MOUHOUB, Adam NOUARI
