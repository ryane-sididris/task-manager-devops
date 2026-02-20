// src/api/tasks.js
const API_URL = "http://localhost:3000";
const USE_MOCK = false; // ← passer à false quand le backend prêt

let mockTasks = [
  { id: 2, title: "Tester CI/CD", description: "Pipeline",priority : "Basse", status: "En cours", created_at: new Date().toISOString() },
  {id: 1,title: "Finir le projet DevOps", description: "Frontend",priority: "Haute", status: "À faire", created_at: new Date().toISOString()},

];

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error) msg = data.error;
    } catch {}
    throw new Error(msg);
  }

  // DELETE peut renvoyer 204
  if (res.status === 204) return null;
  return res.json();
}

export async function getTasks() {
  return [...mockTasks];
}

export async function createTask({ title, description, priority }) {
  if (USE_MOCK) {
    const newTask = { id: Date.now(), title, description: description || "", priority: priority || "Basse", status: "À faire", created_at: new Date().toISOString() };
    mockTasks = [newTask, ...mockTasks];
    return newTask;
  }
  return apiFetch("/tasks", { method: "POST", body: JSON.stringify({ title, description }) });
}

export async function updateTask(id, updates) {
  if (USE_MOCK) {
    mockTasks = mockTasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
    return mockTasks.find((t) => t.id === id);
  }
  return apiFetch(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(updates) });
}

export async function deleteTask(id) {
  if (USE_MOCK) {
    mockTasks = mockTasks.filter((t) => t.id !== id);
    return;
  }
  await apiFetch(`/tasks/${id}`, { method: "DELETE" });
}
