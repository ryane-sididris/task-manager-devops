const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Connexion PostgreSQL via variables d'environnement
const pool = new Pool({
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'tasksdb',
});

async function initDB() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            matiere TEXT,
            title TEXT NOT NULL,
            description TEXT,
            priority TEXT DEFAULT 'Basse',
            status TEXT DEFAULT 'À faire'
        )
    `);
    console.log("Base de données PostgreSQL et table prêtes ! ✅");
}

// GET : Lire toutes les tâches
app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST : Créer une tâche
app.post('/tasks', async (req, res) => {
    const { matiere, title, description, priority } = req.body;
    if (!title) return res.status(400).json({ error: "Le titre est obligatoire !" });

    try {
        const result = await pool.query(
            'INSERT INTO tasks (matiere, title, description, priority) VALUES ($1, $2, $3, $4) RETURNING *',
            [matiere || "Général", title, description, priority || 'Basse']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT : Modifier une tâche
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, status, matiere } = req.body;

    try {
        const existing = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (existing.rows.length === 0) return res.status(404).json({ error: "Tâche non trouvée" });

        const task = existing.rows[0];
        await pool.query(
            `UPDATE tasks SET title = $1, description = $2, priority = $3, status = $4, matiere = $5 WHERE id = $6`,
            [
                title || task.title,
                description || task.description,
                priority || task.priority,
                status || task.status,
                matiere || task.matiere,
                id
            ]
        );
        res.json({ message: "Tâche mise à jour ! ✅" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE : Supprimer une tâche
app.delete('/tasks/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
        res.json({ message: "Tâche supprimée !" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET : Health check (utile pour Kubernetes)
app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'ok', db: 'connected' });
    } catch (err) {
        res.status(500).json({ status: 'error', db: err.message });
    }
});

// Permet l'import dans les tests (app.test.js de tes camarades)
if (process.env.NODE_ENV !== 'test') {
    initDB().then(() => {
        app.listen(PORT, () => console.log(`🚀 Serveur sur http://localhost:${PORT}`));
    }).catch(err => {
        console.error("Erreur de connexion à la base de données :", err);
        process.exit(1);
    });
}

module.exports = app;