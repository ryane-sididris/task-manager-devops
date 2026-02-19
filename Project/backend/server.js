const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const app = express();

app.use(cors());
app.use(express.json());

let db;

async function initDB() {
    if (!db) {
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
    }
    return db;
}

app.get('/tasks', async (req, res) => {
    const database = await initDB();
    const tasks = await database.all('SELECT * FROM tasks');
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const { matiere, title, description, priority } = req.body;
    if (!title) return res.status(400).json({ error: "Le titre est obligatoire !" });

    const database = await initDB();
    const result = await database.run(
        'INSERT INTO tasks (matiere, title, description, priority) VALUES (?, ?, ?, ?)',
        [matiere || "Général", title, description, priority || 'Basse']
    );
    const newTask = await database.get('SELECT * FROM tasks WHERE id = ?', result.lastID);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, status, matiere } = req.body;

    const database = await initDB();
    const task = await database.get('SELECT * FROM tasks WHERE id = ?', id);
    if (!task) return res.status(404).json({ error: "Tâche non trouvée" });

    await database.run(
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
    res.json({ message: "Tâche mise à jour !" });
});

app.delete('/tasks/:id', async (req, res) => {
    const database = await initDB();
    await database.run('DELETE FROM tasks WHERE id = ?', req.params.id);
    res.json({ message: "Tâche supprimée !" });
});

if (process.env.NODE_ENV !== 'test') {
    const PORT = 3000;
    initDB().then(() => {
        app.listen(PORT, () => console.log(`🚀 Serveur sur http://localhost:${PORT}`));
    });
}

module.exports = app;
