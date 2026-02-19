const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let db;

async function startServer() {
    try {
        db = await open({
            filename: './database.db',
            driver: sqlite3.Database
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                matiere TEXT,
                title TEXT NOT NULL,
                description TEXT,
                priority TEXT,
                status TEXT DEFAULT 'À faire'
            )
        `);
        console.log("Base de données et table prêtes ! ✅");

        app.listen(PORT, () => console.log(`🚀 Serveur sur http://localhost:${PORT}`));
    } catch (err) { console.error(err); }
}

// GET : Lire toutes les tâches
app.get('/tasks', async (req, res) => {
    const tasks = await db.all('SELECT * FROM tasks');
    res.json(tasks);
});

// POST : Créer une tâche (matiere devient optionnelle pour pas faire bugger le front)
app.post('/tasks', async (req, res) => {
    const { matiere, title, description, priority } = req.body;
    if (!title) return res.status(400).json({ error: "Le titre est obligatoire !" });

    const result = await db.run(
        'INSERT INTO tasks (matiere, title, description, priority) VALUES (?, ?, ?, ?)',
        [matiere || "Général", title, description, priority || 'Basse']
    );
    const newTask = await db.get('SELECT * FROM tasks WHERE id = ?', result.lastID);
    res.status(201).json(newTask);
});

// PUT : Modifier une tâche (Statut, Titre, etc.) - INDISPENSABLE POUR LE FRONT
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, status, matiere } = req.body;

    const task = await db.get('SELECT * FROM tasks WHERE id = ?', id);
    if (!task) return res.status(404).json({ error: "Tâche non trouvée" });

    await db.run(
        `UPDATE tasks SET title = ?, description = ?, priority = ?, status = ?, matiere = ? WHERE id = ?`,
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
});

// DELETE : Supprimer une tâche
app.delete('/tasks/:id', async (req, res) => {
    await db.run('DELETE FROM tasks WHERE id = ?', req.params.id);
    res.json({ message: "Tâche supprimée !" });
});

startServer();
