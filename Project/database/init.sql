-- Initialisation de la base de données PostgreSQL pour le gestionnaire de tâches
-- Ce fichier est exécuté automatiquement au premier démarrage du conteneur PostgreSQL

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    matiere TEXT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'Basse',
    status TEXT DEFAULT 'À faire'
);

-- Données de test pour vérifier que tout fonctionne
INSERT INTO tasks (matiere, title, description, priority, status) VALUES
    ('DevOps', 'Configurer Kubernetes', 'Mettre en place Minikube et déployer les services', 'Haute', 'En cours'),
    ('DevOps', 'Pipeline CI/CD', 'Configurer GitHub Actions pour build et deploy', 'Haute', 'À faire'),
    ('Général', 'Rédiger le README', 'Documenter l architecture et les étapes de déploiement', 'Moyenne', 'À faire');