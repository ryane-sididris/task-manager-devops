import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { getTasks, createTask, updateTask, deleteTask } from "./api/tasks.js";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("Basse");


  async function refresh() {
    try {
      setError("");
      const data = await getTasks();
      setTasks(data);
    } catch (e) {
      setError(e.message || "Erreur");
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function onAdd(task) {
    try {
      setError("");
      const created = await createTask(task);
      setTasks((prev) => [created, ...prev]);
    } catch (e) {
      setError(e?.message || "Erreur lors de l'ajout");
    }
    
  }

  async function onDone(id) {
    await updateTask(id, { status: "Fini" });
    await refresh();
  }

  async function onProgress(id) {
    try {
      setError("");
      await updateTask(id, { status: "En cours" });
      await refresh();
    } catch (e) {
      setError(e?.message || "Erreur lors de la mise à jour");
    }
  }

  async function onDelete(id) {
    try {
      setError("");
      await deleteTask(id);
      // suppression immédiate (plus rapide)
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError(e?.message || "Erreur lors de la suppression");
    }
  }

  async function saveEdit(id) {
    try {
      setError("");
      const updated = await updateTask(id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        priority: editPriority,
      });

      // update local state
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
      cancelEdit();
    } catch (e) {
      setError(e?.message || "Erreur lors de la modification");
    }
  }

  function formatStatus(status) {
    return status
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  function statusClass(status) {
    if (status === "À faire") return "todo";
    if (status === "En cours") return "in_progress";
    if (status === "Fini") return "done";
    return "todo";
  }
  
  function startEdit(task) {
    setEditingId(task.id);
    setEditTitle(task.title || "");
    setEditDescription(task.description || "");
    setEditPriority(task.priority || "Basse");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditPriority("Basse");
  }

  

  const filteredTasks = tasks.filter((t) => {
    const q = search.toLowerCase().trim();

    const matchesSearch =
      !q ||
      (t.title || "").toLowerCase().includes(q) ||
      (t.description || "").toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "Tous" || t.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container">
      <div className="header">
        <h1 className="main-title">Task Manager</h1>
      </div>
      
      {error ? (
        <div style={{ color: "#dc2626", marginBottom: 12, textAlign: "center" }}>
          {error}
        </div>
      ) : null}
      
      <h2 className="section-title">Mes Tâches</h2>

      <div className="filters">
        {["Tous", "À faire", "En cours", "Fini"].map((s) => (
          <button
            key={s}
            className={statusFilter === s ? "filter active" : "filter"}
            onClick={() => setStatusFilter(s)}
            type="button"
          >
            {s}
          </button>
        ))}
      </div>

      
      <div className="card" style={{ marginBottom: 12 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une tâche..."
        />
      </div>

      <div className="card">
        <TaskForm onAdd={onAdd} />
      </div>

      <div className="tasks">
        
        {tasks.length === 0 ? (
          <div style={{ textAlign: "center", color: "#64748b" }}>
            Aucune tâche pour le moment.
          </div>
        ) : null}

        {filteredTasks.length === 0 ? (
          <div style={{ textAlign: "center", color: "#64748b" }}>
            Aucun résultat.
          </div>
        ) : null}
         
        {filteredTasks.map((t) => {
          const isEditing = editingId === t.id;

          return (
            <div key={t.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  {isEditing ? (
                    <>
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Titre"
                        style={{ marginBottom: 8 }}
                      />

                      <input
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Description"
                        style={{ marginBottom: 8 }}
                      />

                      <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
                        <option value="Basse">Basse</option>
                        <option value="Haute">Haute</option>
                        <option value="Critique">Critique</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <strong>{t.title}</strong>

                      {t.description ? (
                        <div style={{ fontSize: 14, marginTop: 4, color: "#475569" }}>
                          {t.description}
                        </div>
                      ) : null}

                      <div style={{ fontSize: 13, marginTop: 6, color: "#475569" }}>
                        Priorité : <strong>{t.priority || "Basse"}</strong>
                      </div>
                    </>
                  )}
                </div>

                <span className={`badge ${statusClass(t.status)}`}>{t.status}</span>
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                {isEditing ? (
                  <>
                    <button className="primary" onClick={() => saveEdit(t.id)}>
                      Enregistrer
                    </button>
                    <button onClick={cancelEdit}>Annuler</button>
                  </>
                ) : (
                  <>              
                    <button className="warning" onClick={() => onProgress(t.id)} disabled={t.status === "En cours"}>
                      En cours
                    </button>

                    <button className="success" onClick={() => onDone(t.id)} disabled={t.status === "Fini"}>
                      Fini
                    </button>
                    
                    <button onClick={() => startEdit(t)}>Modifier</button>
                    <button className="danger" onClick={() => onDelete(t.id)}>
                      Supprimer
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
