export default function TaskList({ tasks, onDone, onDelete, onProgress }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {tasks.map((t) => (
        <div
          key={t.id}
          style={{
            border: "1px solid #ddd",
            padding: 12,
            borderRadius: 8,
            display: "grid",
            gap: 6,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{t.title}</strong>
            <span>{t.status}</span>
          </div>

          {t.description ? <div>{t.description}</div> : null}

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => onProgress(t.id)} disabled={t.status === "in_progress"}>
              In progress
            </button>
            <button onClick={() => onDone(t.id)} disabled={t.status === "done"}>
              Done
            </button>
            <button onClick={() => onDelete(t.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
