// src/pages/teacher/MesEpreuves.jsx
import { useState } from "react";

const C = {
  violet: "#AD56C4",
  violetLight: "rgba(173,86,196,0.15)",
  bg: "#EFF7F6",
};

const navItems = [
  { label: "Tableau de bord", href: "/teacher", icon: "🏠" },
  { label: "Mes classes", href: "/teacher/classes", icon: "🏫" },
  { label: "Mes élèves", href: "/teacher/students", icon: "👥" },
  { label: "Mes épreuves", href: "/teacher/exams", icon: "📄", active: true },
  { label: "Saisie des notes", href: "/teacher/exams/grades", icon: "✏️" },
  { label: "Emploi du temps", href: "/teacher/schedule", icon: "📅" },
  { label: "Discipline", href: "/teacher/discipline", icon: "⚠️" },
  { label: "Messages", href: "/messages", icon: "💬" },
];

const typeColor = (t) => {
  if (t === "CC") return { bg: "rgba(3,105,161,0.1)", color: "#0369A1" };
  if (t === "Examen") return { bg: "rgba(185,28,28,0.1)", color: "#B91C1C" };
  if (t === "Devoir mercredi") return { bg: C.violetLight, color: C.violet };
  return { bg: "rgba(180,83,9,0.1)", color: "#B45309" };
};

const epreuves = [
  { id: 1, titre: "CC1 — Mathématiques", classe: "CE2 A", type: "CC", date: "2026-04-10", statut: "Notes saisies", fichier: "cc1_maths_ce2a.pdf" },
  { id: 2, titre: "Devoir mercredi — Fractions", classe: "CM1 B", type: "Devoir mercredi", date: "2026-04-16", statut: "En attente", fichier: "devoir_fractions_cm1b.pdf" },
  { id: 3, titre: "CC1 — Mathématiques", classe: "CM2 A", type: "CC", date: "2026-04-12", statut: "Notes saisies", fichier: "cc1_maths_cm2a.pdf" },
  { id: 4, titre: "Examen T1 — Mathématiques", classe: "CE2 A", type: "Examen", date: "2026-05-05", statut: "Planifié", fichier: null },
];

export default function MesEpreuves() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ titre: "", classe: "CE2 A", type: "CC", date: "" });

  return (
    <div style={s.page}>
      <header style={s.topbar}>
        <span style={s.logo}>DIGISCHOOL</span>
        <nav style={s.topNav}>
          <a href="/teacher/exams" style={s.topNavLink}>Banque de sujets</a>
          <a href="/teacher/exams/grades" style={s.topNavLink}>Saisie des notes</a>
          <a href="/teacher/schedule" style={s.topNavLink}>Emploi du temps</a>
          <a href="/messages" style={s.topNavLink}>Messages</a>
        </nav>
        <div style={s.topRight}>
          <select style={s.select}><option>Français</option><option>English</option></select>
          <select style={s.select}><option>2025-2026</option></select>
          <button style={s.btnDeco}>Déconnexion</button>
        </div>
      </header>

      <div style={s.body}>
        <aside style={s.sidebar}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} style={{ ...s.sidebarItem, ...(item.active ? s.sidebarItemActive : {}) }}>
              <span>{item.icon}</span>{item.label}
            </a>
          ))}
        </aside>

        <main style={s.main}>
          <div style={s.pageHeader}>
            <div>
              <h1 style={s.pageTitle}>📄 Banque de sujets</h1>
              <p style={s.pageSubtitle}>Gérez et téléversez vos épreuves</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} style={s.btnViolet}>
              {showForm ? "✕ Annuler" : "+ Nouvelle épreuve"}
            </button>
          </div>

          {/* Formulaire d'ajout */}
          {showForm && (
            <div style={s.formCard}>
              <h3 style={s.formTitle}>Téléverser une nouvelle épreuve</h3>
              <div style={s.formGrid}>
                <div style={s.formGroup}>
                  <label style={s.label}>Titre de l'épreuve</label>
                  <input style={s.input} placeholder="Ex: CC1 — Mathématiques" value={form.titre} onChange={(e) => setForm({ ...form, titre: e.target.value })} />
                </div>
                <div style={s.formGroup}>
                  <label style={s.label}>Classe</label>
                  <select style={s.input} value={form.classe} onChange={(e) => setForm({ ...form, classe: e.target.value })}>
                    <option>CE2 A</option><option>CM1 B</option><option>CM2 A</option>
                  </select>
                </div>
                <div style={s.formGroup}>
                  <label style={s.label}>Type d'épreuve</label>
                  <select style={s.input} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    <option>CC</option><option>Examen</option><option>Devoir mercredi</option><option>Devoir week-end</option>
                  </select>
                </div>
                <div style={s.formGroup}>
                  <label style={s.label}>Date</label>
                  <input type="date" style={s.input} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
              </div>
              <div style={s.uploadZone}>
                <span style={{ fontSize: "2rem" }}>📎</span>
                <span style={{ fontSize: "0.875rem", color: "#6B7280" }}>Glissez votre fichier ici ou <strong style={{ color: C.violet }}>parcourir</strong></span>
                <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>PDF, DOCX — max 10 Mo</span>
              </div>
              <button style={s.btnViolet}>Téléverser l'épreuve</button>
            </div>
          )}

          {/* Liste des épreuves */}
          <div style={s.card}>
            <h2 style={s.cardTitle}>Mes épreuves ({epreuves.length})</h2>
            <div style={s.tableWrapper}>
              <table style={s.table}>
                <thead>
                  <tr>
                    {["Titre", "Classe", "Type", "Date", "Statut", "Fichier", "Actions"].map((h) => (
                      <th key={h} style={s.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {epreuves.map((e) => {
                    const tc = typeColor(e.type);
                    return (
                      <tr key={e.id} style={s.tr}>
                        <td style={{ ...s.td, fontWeight: "600" }}>{e.titre}</td>
                        <td style={s.td}>{e.classe}</td>
                        <td style={s.td}>
                          <span style={{ ...s.badge, backgroundColor: tc.bg, color: tc.color }}>{e.type}</span>
                        </td>
                        <td style={s.td}>{e.date}</td>
                        <td style={s.td}>
                          <span style={{
                            ...s.badge,
                            backgroundColor: e.statut === "Notes saisies" ? "rgba(6,95,70,0.1)" : e.statut === "En attente" ? "rgba(180,83,9,0.1)" : "rgba(173,86,196,0.15)",
                            color: e.statut === "Notes saisies" ? "#065F46" : e.statut === "En attente" ? "#B45309" : C.violet,
                          }}>{e.statut}</span>
                        </td>
                        <td style={s.td}>
                          {e.fichier ? (
                            <a href="#" style={s.linkViolet}>📥 {e.fichier}</a>
                          ) : (
                            <span style={{ color: "#9CA3AF", fontSize: "0.8rem" }}>—</span>
                          )}
                        </td>
                        <td style={s.td}>
                          <a href="/teacher/exams/grades" style={s.btnSm}>Saisir notes</a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", backgroundColor: "#EFF7F6", fontFamily: "'Segoe UI', sans-serif", display: "flex", flexDirection: "column" },
  topbar: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", height: "56px", backgroundColor: "#EFF7F6", borderBottom: "1px solid rgba(173,86,196,0.2)", position: "sticky", top: 0, zIndex: 10, gap: "1rem" },
  logo: { fontWeight: "700", fontSize: "1.1rem", color: "#AD56C4" },
  topNav: { display: "flex", gap: "1.5rem", flex: 1, justifyContent: "center" },
  topNavLink: { textDecoration: "none", color: "#0B0B0B", fontSize: "0.875rem" },
  topRight: { display: "flex", alignItems: "center", gap: "0.75rem" },
  select: { border: "1px solid rgba(173,86,196,0.4)", borderRadius: "6px", padding: "4px 8px", fontSize: "0.8rem", backgroundColor: "rgba(173,86,196,0.08)", cursor: "pointer" },
  btnDeco: { backgroundColor: "#AD56C4", color: "#fff", border: "none", borderRadius: "20px", padding: "6px 16px", fontSize: "0.8rem", fontWeight: "600", cursor: "pointer" },
  body: { display: "flex", flex: 1 },
  sidebar: { width: "220px", minWidth: "220px", backgroundColor: "#fff", borderRight: "1px solid rgba(173,86,196,0.15)", padding: "1rem 0", display: "flex", flexDirection: "column", gap: "2px" },
  sidebarItem: { display: "flex", alignItems: "center", gap: "10px", padding: "10px 1.25rem", textDecoration: "none", color: "#0B0B0B", fontSize: "0.875rem", borderLeft: "3px solid transparent" },
  sidebarItemActive: { backgroundColor: "#D0A9D0", color: "#fff", fontWeight: "600", borderLeftColor: "#AD56C4" },
  main: { flex: 1, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem", overflowY: "auto" },
  pageHeader: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  pageTitle: { fontSize: "1.5rem", fontWeight: "700", color: "#0B0B0B", margin: 0 },
  pageSubtitle: { fontSize: "0.875rem", color: "#6B7280", margin: "4px 0 0" },
  btnViolet: { backgroundColor: "#AD56C4", color: "#fff", border: "none", borderRadius: "20px", padding: "8px 20px", fontSize: "0.875rem", fontWeight: "600", cursor: "pointer", textDecoration: "none" },
  formCard: { backgroundColor: "#fff", borderRadius: "12px", padding: "1.5rem", border: "1px solid rgba(173,86,196,0.2)", display: "flex", flexDirection: "column", gap: "1rem" },
  formTitle: { fontSize: "1rem", fontWeight: "600", color: "#0B0B0B", margin: 0 },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" },
  formGroup: { display: "flex", flexDirection: "column", gap: "4px" },
  label: { fontSize: "0.8rem", fontWeight: "600", color: "#6B7280" },
  input: { padding: "8px 12px", border: "1px solid rgba(173,86,196,0.3)", borderRadius: "8px", fontSize: "0.875rem", outline: "none", backgroundColor: "#EFF7F6" },
  uploadZone: { border: "2px dashed rgba(173,86,196,0.35)", borderRadius: "10px", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", cursor: "pointer", backgroundColor: "rgba(173,86,196,0.04)" },
  card: { backgroundColor: "#fff", borderRadius: "12px", padding: "1.25rem", border: "1px solid rgba(173,86,196,0.15)", display: "flex", flexDirection: "column", gap: "0.75rem" },
  cardTitle: { fontSize: "1rem", fontWeight: "600", color: "#0B0B0B", margin: 0 },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" },
  th: { textAlign: "left", padding: "8px 10px", backgroundColor: "rgba(173,86,196,0.08)", color: "#6B7280", fontWeight: "600", fontSize: "0.75rem", borderBottom: "1px solid rgba(173,86,196,0.15)" },
  tr: { borderBottom: "1px solid #F3F4F6" },
  td: { padding: "10px", color: "#0B0B0B", verticalAlign: "middle" },
  badge: { padding: "3px 10px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: "600" },
  linkViolet: { color: "#AD56C4", fontSize: "0.8rem", textDecoration: "none" },
  btnSm: { textDecoration: "none", backgroundColor: "rgba(173,86,196,0.12)", color: "#AD56C4", padding: "4px 12px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "600" },
};
