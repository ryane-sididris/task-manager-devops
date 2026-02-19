import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Basse");

  function submit(e) {
    // robuste : même si e est undefined
    if (e?.preventDefault) e.preventDefault();

    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
    });

    setTitle("");
    setDescription("");
    setPriority("Basse");
  }

  return (
    <form onSubmit={submit} className="form-row">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre de la tâche"
      />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optionnel)"
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Basse">Basse</option>
        <option value="Haute">Haute</option>
        <option value="Critique">Critique</option>
      </select>

      {/* IMPORTANT: type="submit" et PAS de onClick */}
      <button className="primary" type="submit">
        + Ajouter
      </button>
    </form>
  );
}
