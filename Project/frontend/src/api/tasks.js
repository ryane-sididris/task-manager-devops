const API_URL = "http://localhost:3000";

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

  if (res.status === 204) return null;
  return res.json();
}

export async function getTasks() {
  return apiFetch("/tasks");
}

export async function createTask({ title, description, priority }) {
  return apiFetch("/tasks", {
    method: "POST",
    body: JSON.stringify({ title, description, priority }),
  });
}

export async function updateTask(id, updates) {
  return apiFetch(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export async function deleteTask(id) {
  await apiFetch(`/tasks/${id}`, { method: "DELETE" });
}