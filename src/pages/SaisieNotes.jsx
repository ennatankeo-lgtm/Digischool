// src/pages/teacher/SaisieNotes.jsx
import { useState } from "react";

const C = { violet: "#AD56C4", violetLight: "rgba(173,86,196,0.15)", bg: "#EFF7F6" };

const navItems = [
  { label: "Tableau de bord", href: "/teacher", icon: "🏠" },
  { label: "Mes classes", href: "/teacher/classes", icon: "🏫" },
  { label: "Mes élèves", href: "/teacher/students", icon: "👥" },
  { label: "Mes épreuves", href: "/teacher/exams", icon: "📄" },
  { label: "Saisie des notes", href: "/teacher/exams/grades", icon: "✏️", active: true },
  { label: "Emploi du temps", href: "/teacher/schedule", icon: "📅" },
  { label: "Discipline", href: "/teacher/discipline", icon: "⚠️" },
  { label: "Messages", href: "/messages", icon: "💬" },
];

const elevesInitiaux = [
  { matricule: "CE2A001", nom: "Tankeo Emma", note: "", appreciation: "" },
  { matricule: "CE2A002", nom: "Mbarga Paul", note: "", appreciation: "" },
  { matricule: "CE2A003", nom: "Fouda Claire", note: "", appreciation: "" },
  { matricule: "CE2A004", nom: "Ndi Jules", note: "", appreciation: "" },
  { matricule: "CE2A005", nom: "Ateba Steph", note: "", appreciation: "" },
  { matricule: "CE2A006", nom: "Lobe Patricia", note: "", appreciation: "" },
];

const getAppreciation = (n) => {
  const v = parseFloat(n);
  if (isNaN(v)) return "";
  if (v >= 16) return "Très Bien";
  if (v >= 14) return "Bien";
  if (v >= 12) return "Assez Bien";
  if (v >= 10) return "Passable";
  return "Insuffisant";
};

const mentionColor = (m) => {
  if (m === "Très Bien") return "#065F46";
  if (m === "Bien") return "#0369A1";
  if (m === "Assez Bien") return C.violet;
  if (m === "Passable") return "#B45309";
  return "#B91C1C";
};

export default function SaisieNotes() {
  const [classe, setClasse] = useState("CE2 A");
  const [matiere, setMatiere] = useState("Mathématiques");
  const [typeDevoir, setTypeDevoir] = useState("CC");
  const [periode, setPeriode] = useState("Trimestre 1");
  const [eleves, setEleves] = useState(elevesInitiaux);
  const [valide, setValide] = useState(false);

  const updateNote = (i, val) => {
    const copy = [...eleves];
    const n = val === "" ? "" : Math.min(20, Math.max(0, parseFloat(val) || 0)).toString();
    copy[i] = { ...copy[i], note: val, appreciation: getAppreciation(n) };
    setEleves(copy);
  };

  const notesSaisies = eleves.filter((e) => e.note !== "").length;
  const moyenne = eleves.filter((e) => e.note !== "").length > 0
    ? (eleves.filter((e) => e.note !== "").reduce((a, e) => a + parseFloat(e.note), 0) / eleves.filter((e) => e.note !== "").length).toFixed(2)
    : "—";

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
              <h1 style={s.pageTitle}>✏️ Saisie des notes</h1>
              <p style={s.pageSubtitle}>Renseignez les notes par épreuve</p>
            </div>
          </div>

          {/* Filtres */}
          <div style={s.filtresBar}>
            {[
              { label: "Classe", val: classe, set: setClasse, opts: ["CE2 A", "CM1 B", "CM2 A"] },
              { label: "Matière", val: matiere, set: setMatiere, opts: ["Mathématiques"] },
              { label: "Type devoir", val: typeDevoir, set: setTypeDevoir, opts: ["CC", "Examen", "Devoir mercredi", "Devoir week-end"] },
              { label: "Période", val: periode, set: setPeriode, opts: ["Trimestre 1", "Trimestre 2", "Trimestre 3"] },
            ].map((f) => (
              <div key={f.label} style={s.filtreGroup}>
                <label style={s.filtreLabel}>{f.label}</label>
                <select style={s.selectFilter} value={f.val} onChange={(e) => f.set(e.target.value)}>
                  {f.opts.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <button style={s.btnUpload}>📎 Importer CSV</button>
          </div>

          {/* Stats rapides */}
          <div style={s.statsBar}>
            <div style={s.statItem}>
              <span style={s.statVal}>{notesSaisies}/{eleves.length}</span>
              <span style={s.statLabel}>Notes saisies</span>
            </div>
            <div style={s.statItem}>
              <span style={{ ...s.statVal, color: C.violet }}>{moyenne}</span>
              <span style={s.statLabel}>Moyenne classe</span>
            </div>
            <div style={s.statItem}>
              <span style={s.statVal}>{eleves.filter((e) => parseFloat(e.note) >= 10).length}</span>
              <span style={s.statLabel}>Au-dessus de 10</span>
            </div>
            <div style={s.statItem}>
              <span style={{ ...s.statVal, color: "#B91C1C" }}>{eleves.filter((e) => e.note !== "" && parseFloat(e.note) < 10).length}</span>
              <span style={s.statLabel}>En dessous de 10</span>
            </div>
          </div>

          {/* Tableau de saisie */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <h2 style={s.cardTitle}>
                Saisie des notes — {matiere} / {classe}
              </h2>
              {valide && (
                <span style={{ ...s.badge, backgroundColor: "rgba(6,95,70,0.1)", color: "#065F46" }}>✓ Validé</span>
              )}
            </div>

            <div style={s.tableWrapper}>
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>Matricule</th>
                    <th style={s.th}>Nom & Prénom</th>
                    <th style={s.th}>Note /20</th>
                    <th style={s.th}>Appréciation</th>
                  </tr>
                </thead>
                <tbody>
                  {eleves.map((e, i) => (
                    <tr key={i} style={s.tr}>
                      <td style={s.td}><code style={s.code}>{e.matricule}</code></td>
                      <td style={{ ...s.td, fontWeight: "600" }}>{e.nom}</td>
                      <td style={s.td}>
                        <input
                          type="number"
                          min="0"
                          max="20"
                          step="0.25"
                          disabled={valide}
                          placeholder="—"
                          value={e.note}
                          onChange={(ev) => updateNote(i, ev.target.value)}
                          style={{
                            ...s.noteInput,
                            borderColor: e.note !== "" && parseFloat(e.note) < 10 ? "#B91C1C" : "rgba(173,86,196,0.3)",
                            color: e.note !== "" && parseFloat(e.note) < 10 ? "#B91C1C" : "#0B0B0B",
                          }}
                        />
                      </td>
                      <td style={s.td}>
                        {e.appreciation ? (
                          <span style={{ fontSize: "0.8rem", fontWeight: "600", color: mentionColor(e.appreciation) }}>
                            {e.appreciation}
                          </span>
                        ) : (
                          <span style={{ color: "#9CA3AF", fontSize: "0.8rem" }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!valide ? (
              <div style={s.actions}>
                <button style={s.btnOutline} onClick={() => setEleves(elevesInitiaux)}>Réinitialiser</button>
                <button
                  style={{ ...s.btnViolet, opacity: notesSaisies < eleves.length ? 0.6 : 1 }}
                  onClick={() => notesSaisies === eleves.length && setValide(true)}
                >
                  ✓ Valider les notes
                </button>
              </div>
            ) : (
              <div style={s.successBanner}>
                ✅ Notes validées avec succès pour {classe} — {matiere}
              </div>
            )}
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
  filtresBar: { display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end", backgroundColor: "#fff", padding: "1rem 1.25rem", borderRadius: "12px", border: "1px solid rgba(173,86,196,0.15)" },
  filtreGroup: { display: "flex", flexDirection: "column", gap: "4px" },
  filtreLabel: { fontSize: "0.75rem", fontWeight: "600", color: "#6B7280" },
  selectFilter: { padding: "7px 12px", border: "1px solid rgba(173,86,196,0.3)", borderRadius: "8px", fontSize: "0.875rem", backgroundColor: "#EFF7F6", cursor: "pointer" },
  btnUpload: { alignSelf: "flex-end", padding: "7px 14px", border: "1px solid rgba(173,86,196,0.4)", borderRadius: "8px", backgroundColor: "transparent", color: "#AD56C4", fontSize: "0.875rem", fontWeight: "600", cursor: "pointer" },
  statsBar: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" },
  statItem: { backgroundColor: "#fff", borderRadius: "10px", padding: "1rem", border: "1px solid rgba(173,86,196,0.15)", display: "flex", flexDirection: "column", gap: "2px" },
  statVal: { fontSize: "1.75rem", fontWeight: "700", color: "#0B0B0B", lineHeight: 1 },
  statLabel: { fontSize: "0.78rem", color: "#6B7280", fontWeight: "500" },
  card: { backgroundColor: "#fff", borderRadius: "12px", padding: "1.25rem", border: "1px solid rgba(173,86,196,0.15)", display: "flex", flexDirection: "column", gap: "0.75rem" },
  cardHeader: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  cardTitle: { fontSize: "1rem", fontWeight: "600", color: "#0B0B0B", margin: 0 },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" },
  th: { textAlign: "left", padding: "8px 10px", backgroundColor: "rgba(173,86,196,0.08)", color: "#6B7280", fontWeight: "600", fontSize: "0.75rem", borderBottom: "1px solid rgba(173,86,196,0.15)" },
  tr: { borderBottom: "1px solid #F3F4F6" },
  td: { padding: "10px", color: "#0B0B0B", verticalAlign: "middle" },
  code: { backgroundColor: "rgba(173,86,196,0.1)", color: "#AD56C4", padding: "2px 6px", borderRadius: "4px", fontSize: "0.75rem" },
  badge: { padding: "3px 10px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: "600" },
  noteInput: { width: "80px", padding: "6px 10px", border: "1px solid rgba(173,86,196,0.3)", borderRadius: "6px", fontSize: "0.875rem", textAlign: "center", outline: "none", backgroundColor: "#EFF7F6" },
  actions: { display: "flex", justifyContent: "flex-end", gap: "0.75rem" },
  btnViolet: { backgroundColor: "#AD56C4", color: "#fff", border: "none", borderRadius: "20px", padding: "8px 24px", fontSize: "0.875rem", fontWeight: "600", cursor: "pointer" },
  btnOutline: { backgroundColor: "transparent", color: "#6B7280", border: "1px solid #E5E7EB", borderRadius: "20px", padding: "8px 24px", fontSize: "0.875rem", cursor: "pointer" },
  successBanner: { backgroundColor: "rgba(6,95,70,0.1)", color: "#065F46", padding: "12px 16px", borderRadius: "8px", fontSize: "0.875rem", fontWeight: "600", textAlign: "center" },
};
