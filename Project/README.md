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
  - `USE_MOCK=true` : utilisation de données mock, (cela été fait au debut sans backend)
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
```

### Note sur l’historique Git (information)

À un moment du projet, l’historique Git de la branche principale a été supprimé par erreur (ex. force-push / reset), ce qui a pu entraîner la disparition de certains commits dans l’onglet “Commits” de GitHub.
Les contributions réalisées sur le frontend restent toutefois visibles via d’autres éléments de traçabilité (Activity GitHub ou historique local) et le code du frontend présent dans ce dépôt correspond bien au travail réalisé sur cette partie.

---

# Docker & CI/CD – Infrastructure et Automatisation

**Fait par : Ryane**

---

## Présentation

Cette partie assure que l'application peut être lancée sur n'importe quelle machine de manière identique grâce à Docker et que chaque modification du code est automatiquement vérifiée et publiée via une pipeline CI/CD.

---

## Docker & Docker Compose

L'application est entièrement conteneurisée. L'infrastructure se compose de trois services :

- **Frontend** : Serveur Nginx servant l'application React.
- **Backend** : API Node.js / Express.
- **Database** : Base de données PostgreSQL.

### Points clés de l'implémentation

- **Persistance des données** : Utilisation de Docker Volumes afin que les tâches ne soient pas supprimées lors de l'arrêt des conteneurs.
- **Optimisation** : Utilisation de builds multi-étapes pour réduire la taille des images Docker.
- **Réseau** : Isolation des services dans un réseau Docker dédié pour assurer une communication sécurisée entre les conteneurs.

---

## Pipeline CI/CD (GitHub Actions)

Une pipeline a été mise en place pour automatiser le cycle de vie du logiciel :

- **Build** : Compilation du frontend et du backend à chaque "push" sur le dépôt.
- **Tests** : Validation automatique du code afin de garantir sa stabilité.
- **Push Docker Hub** : Publication automatique des images sur Docker Hub uniquement si tous les tests passent avec succès.

---

## Objectif Global

L'objectif de cette infrastructure est de garantir :

- Une reproductibilité complète de l'environnement.
- Une automatisation du déploiement.
- Une réduction des erreurs humaines.
- Une intégration continue fiable et sécurisée.


## Déploiement Kubernetes (Minikube)

### Prérequis
- **kubectl** installé
- **Minikube** installé
- **Docker** démarré (Minikube utilise le driver Docker)

Vérifications rapides :
```bash
kubectl config current-context
minikube status
```

---

## Étapes de lancement (Kubernetes / Minikube)

### 1) Démarrer Minikube
```bash
minikube start --driver=docker
```

## 2) Déployer l’application sur le cluster

Ouvrir un premier terminal et se placer à la racine du projet (là où se trouve le dossier k8s/) :
```bash
kubectl apply -f k8s/
```

## 3) Attendre que les pods soient prêts

Surveiller le démarrage des pods :

```bash
kubectl get pods -w
```
Attendre que tous les pods soient Running et Ready (1/1), puis arrêter l’affichage avec Ctrl + C (cela n’arrête pas les pods, uniquement le watch).

## 4) Accéder au frontend

Toujours dans le premier terminal, récupérer l’URL du service frontend :

```bash
minikube service frontend --url
```

Ouvrir l’URL affichée dans un navigateur (souvent un NodePort du type http://192.168.49.2:30001).

## 5) Exposer le backend en local (port-forward)

Ouvrir un deuxième terminal et lancer :

```bash
kubectl port-forward service/backend 3000:3000
```

Le backend devient accessible sur :

http://localhost:3000


---

### Auteurs

Réalisé par Yanis NOUILI, Yacine OUALIKEN, Ryane SID IDRIS, Sofiane MOUHOUB, Adam NOUARI
