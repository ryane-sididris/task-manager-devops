# Task Manager : Projet DevOps

## Introduction
Ce dépôt contient une application de gestion de tâches (Task Manager) développée dans le cadre du projet DevOps.
L’application est composée d’un **frontend React (Vite)** et d’un **backend Node.js/Express** (dans le déploiement Kubernetes/Docker du projet).
L’objectif est de fournir une application simple avec un déploiement reproductible (Docker/Kubernetes) et une documentation permettant de lancer le projet facilement.

---

## Frontend (React + Vite)

**Fait par : Yanis Nouili**

### Présentation
Cette partie du projet correspond à l’interface web **Task Manager** développée en **React (Vite)**. 
Le frontend permet de gérer des tâches (CRUD) et consomme l’API REST exposée par le backend.

---

### Fonctionnalités implémentées
Le frontend propose un CRUD complet permettant d’**ajouter** une tâche, de la **modifier**, de la **supprimer** et de **changer**.

- On peut gérer les statuts : **À faire**, **En cours** et **Fini**.
- Chaque tâche peut être associée à une priorité : **Basse**, **Haute** ou **Critique**.
- Une barre de recherche permet de retrouver rapidement une tâche.
- Un filtre par statut (**Tous** / **À faire** / **En cours** / **Fini**) permet d’organiser l’affichage.

Une gestion d’erreurs est en place : les erreurs réseau ou backend sont détectées et affichées côté UI.  
Le mode Mock / API est contrôlé par la variable `USE_MOCK`.

- Lorsque `USE_MOCK=true`, le frontend utilise des données mock (utile au début du développement lorsque le backend n’était pas >
- Lorsque `USE_MOCK=false`, le frontend se connecte au backend via l’API REST.

---

### API consommée 
Le frontend appelle les endpoints suivants :

- `GET /tasks` — récupérer toutes les tâches
- `POST /tasks` — créer une tâche
- `PUT /tasks/:id` — modifier une tâche / changer son statut *(selon l’implémentation backend)*
- `DELETE /tasks/:id` — supprimer une tâche

Le frontend est conçu pour s’aligner sur le contrat API de l’équipe.

---

### Lancer le frontend en local (Vite)
Prérequis : Node.js

```bash
cd devops_base/Project/frontend
npm install
npm run dev
```

### Note sur l’historique Git (information)

À un moment du projet, l’historique Git de la branche principale a été supprimé par erreur (ex. force-push / reset), ce qui a pu entraîner la disparition de certains commits dont ceux pour le frontend dans l’onglet “Commits” de GitHub.
Les contributions réalisées sur le frontend restent toutefois visibles via d’autres éléments de traçabilité (Activity ou historique local) et le code du frontend présent dans ce dépôt correspond bien au travail réalisé sur cette partie.

---

## Backend — Task Manager API (Node.js + Express)

### Fait par
- **Backend : Sofiane MOUHOUB**

### Présentation
Cette partie du projet correspond à l'API REST du **Task Manager** développée en **Node.js (Express)**.  
Le serveur gère la logique métier, la persistance des données dans PostgreSQL et expose les points d'entrée nécessaires au bon fonctionnement du frontend.

---

### Fonctionnalités implémentées
- **CRUD complet**
  - Récupérer la liste des tâches
  - Créer une nouvelle tâche
  - Modifier une tâche (titre, description, priorité, statut)
  - Supprimer une tâche
- **Statuts supportés** : **À faire**, **En cours**, **Fini**
- **Priorité** : **Basse / Haute / Critique**
- **Santé du système** : Endpoint `/health` pour monitoring (Base de données + Serveur)
- **CORS & JSON** : Entièrement configuré pour accepter les requêtes du frontend React

---

### API Exposée (contrat fourni)
Le backend expose les endpoints suivants :

- `GET /tasks` — récupérer toutes les tâches
- `POST /tasks` — créer une tâche
- `PUT /tasks/:id` — modifier une tâche / changer son statut
- `DELETE /tasks/:id` — supprimer une tâche
- `GET /health` — vérification de l'état de la base de données

Le backend est conçu pour s'aligner sur le contrat API attendu par le frontend.


### Lancer le backend en local
Prérequis : Node.js (>= 18 recommandé)

```bash
cd devops_base/backend
npm install
node server.js
```

### Dockerisation (DevOps)
Le projet inclut une configuration Docker pour simplifier le déploiement et l'isolation du service.
Prérequis : Docker installé sur la machine.

## Se placer dans le dossier backend
```bash
cd devops_base/backend
```
## Construire l'image Docker
```bash
docker build -t task-manager-backend.
```

## Lancer le conteneur sur le port 3000
```bash
docker run -p 3000:3000 task-manager-backend
```

---

# Docker & CI/CD – Infrastructure et Automatisation

**Fait par : Ryane SID IDRIS**

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


# Déploiement Kubernetes avec Minikube

**Fait par : Yacine OUALIKEN**

## Prérequis

Avant de commencer, assurez-vous que :

-  **Minikube** est installé  
-  **kubectl** est installé  
-  **Docker est lancé**

Vous pouvez vérifier les installations avec :

```bash
kubectl version --client
minikube version
```

---


## Ouvrir un premier terminal

Assurez-vous d’être à la racine du projet puis démarrez minikube avec :

```bash
minikube start
```
---

### Déployer les ressources Kubernetes

```bash
kubectl apply -f k8s/
```

Cette commande crée tous les objets Kubernetes définis dans le dossier `k8s/` (Deployments, Services, etc.).

---

### Vérifier le démarrage des pods

```bash
kubectl get pods -w
```

- Attendre que **tous les pods soient en `Running`**
- Vérifier qu’ils soient **Ready (1/1)**
- Une fois que tout est prêt → faire `Ctrl + C`

Cela arrête uniquement l’affichage, **pas les pods**.

---

### Accéder au frontend

Toujours dans le premier terminal :

```bash
minikube service frontend
```

Cette commande ouvre automatiquement votre navigateur.  
Si la page ne s'ouvre pas, cliquez sur le deuxieme lien.

---

## Ouvrir un deuxième terminal pour Exposer le backend en local 

Placez vous de nouveau à la racine du projet et faites :

```bash
kubectl port-forward service/backend 3000:3000
```

Le backend devient alors accessible


Retournez sur votre navigateur et **rafraîchissez la page**, l'application est maintenant fonctionnelle

---

### Auteurs

Réalisé par Yanis NOUILI, Yacine OUALIKEN, Ryane SID IDRIS, Sofiane MOUHOUB, Adam NOUARI


