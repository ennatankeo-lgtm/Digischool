// src/pages/teacher/MesClasses.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const C = {
  violet: "#AD56C4",
  violetLight: "rgba(173,86,196,0.15)",
  violetBorder: "rgba(173,86,196,0.2)",
  navActive: "#D0A9D0",
  bg: "#EFF7F6",
  white: "#ffffff",
  text: "#0B0B0B",
  textMuted: "#6B7280",
  border: "#E5E7EB",
};

const navItems = [
  { label: "Tableau de bord", href: "/teacher", icon: "🏠" },
  { label: "Mes classes", href: "/teacher/classes", icon: "🏫", active: true },
  { label: "Mes élèves", href: "/teacher/students", icon: "👥" },
  { label: "Mes épreuves", href: "/teacher/exams", icon: "📄" },
  { label: "Saisie des notes", href: "/teacher/exams/grades", icon: "✏️" },
  { label: "Emploi du temps", href: "/teacher/schedule", icon: "📅" },
  { label: "Discipline", href: "/teacher/discipline", icon: "⚠️" },
  { label: "Messages", href: "/messages", icon: "💬" },
];

const classes = [
  {
    id: 1, nom: "CE2 A", salle: "Salle A1", effectif: 32, matiere: "Mathématiques",
    moyenne: 13.4, tauxReussite: 78,
    eleves: [
      { matricule: "CE2A001", nom: "Tankeo Emma", sexe: "F", moyenne: 15.2, mention: "Bien" },
      { matricule: "CE2A002", nom: "Mbarga Paul", sexe: "M", moyenne: 12.0, mention: "Assez Bien" },
      { matricule: "CE2A003", nom: "Fouda Claire", sexe: "F", moyenne: 9.5, mention: "Passable" },
      { matricule: "CE2A004", nom: "Ndi Jules", sexe: "M", moyenne: 17.0, mention: "Très Bien" },
    ],
  },
  {
    id: 2, nom: "CM1 B", salle: "Salle B2", effectif: 28, matiere: "Mathématiques",
    moyenne: 12.1, tauxReussite: 64,
    eleves: [
      { matricule: "CM1B001", nom: "Bello Aïcha", sexe: "F", moyenne: 14.5, mention: "Bien" },
      { matricule: "CM1B002", nom: "Kamga René", sexe: "M", moyenne: 10.0, mention: "Passable" },
      { matricule: "CM1B003", nom: "Eyong Marie", sexe: "F", moyenne: 8.0, mention: "Insuffisant" },
    ],
  },
  {
    id: 3, nom: "CM2 A", salle: "Salle C3", effectif: 30, matiere: "Mathématiques",
    moyenne: 14.7, tauxReussite: 87,
    eleves: [
      { matricule: "CM2A001", nom: "Essama Luc", sexe: "M", moyenne: 16.0, mention: "Très Bien" },
      { matricule: "CM2A002", nom: "Ngo Hélène", sexe: "F", moyenne: 13.5, mention: "Assez Bien" },
    ],
  },
];

const mentionColor = (m) => {
  if (m === "Très Bien") return { bg: "rgba(6,95,70,0.1)", color: "#065F46" };
  if (m === "Bien") return { bg: "rgba(3,105,161,0.1)", color: "#0369A1" };
  if (m === "Assez Bien") return { bg: "rgba(173,86,196,0.15)", color: "#AD56C4" };
  if (m === "Passable") return { bg: "rgba(180,83,9,0.1)", color: "#B45309" };
  return { bg: "rgba(185,28,28,0.1)", color: "#B91C1C" };
};

export default function MesClasses() {
  const navigate = useNavigate();
  const [classeActive, setClasseActive] = useState(classes[0]);
  const [recherche, setRecherche] = useState("");

  const elevesAffiches = classeActive.eleves.filter((e) =>
    e.nom.toLowerCase().includes(recherche.toLowerCase()) ||
    e.matricule.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div style={s.page}>
      {/* Topbar */}
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
          <button style={s.btnDeco} onClick={() => navigate("/login")}>Déconnexion</button>
        </div>
      </header>

      <div style={s.body}>
        {/* Sidebar */}
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
              <h1 style={s.pageTitle}>🏫 Mes classes</h1>
              <p style={s.pageSubtitle}>Année 2025-2026 — Mathématiques</p>
            </div>
          </div>

          {/* KPI */}
          <div style={s.kpiGrid}>
            {[
              { label: "Classes", value: classes.length, color: C.violet, bg: C.violetLight },
              { label: "Total élèves", value: classes.reduce((a, c) => a + c.effectif, 0), color: "#0369A1", bg: "rgba(3,105,161,0.12)" },
              { label: "Moy. générale", value: (classes.reduce((a, c) => a + c.moyenne, 0) / classes.length).toFixed(1) + "/20", color: "#065F46", bg: "rgba(6,95,70,0.12)" },
              { label: "Taux réussite", value: Math.round(classes.reduce((a, c) => a + c.tauxReussite, 0) / classes.length) + "%", color: "#B45309", bg: "rgba(180,83,9,0.12)" },
            ].map((k) => (
              <div key={k.label} style={{ ...s.kpiCard, backgroundColor: k.bg }}>
                <span style={{ ...s.kpiValue, color: k.color }}>{k.value}</span>
                <span style={{ ...s.kpiLabel, color: k.color }}>{k.label}</span>
              </div>
            ))}
          </div>

          <div style={s.grid2}>
            {/* Liste des classes */}
            <div style={s.card}>
              <h2 style={s.cardTitle}>Sélectionner une classe</h2>
              {classes.map((c) => (
                <div
                  key={c.id}
                  onClick={() => { setClasseActive(c); setRecherche(""); }}
                  style={{
                    ...s.classeCard,
                    ...(classeActive.id === c.id ? s.classeCardActive : {}),
                  }}
                >
                  <div style={{ ...s.classeAvatar, ...(classeActive.id === c.id ? { backgroundColor: C.violet, color: "#fff" } : {}) }}>
                    {c.nom.slice(0, 2)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={s.classeNom}>{c.nom}</div>
                    <div style={s.classeSub}>{c.salle} · {c.effectif} élèves</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ ...s.classeMoy, color: C.violet }}>{c.moyenne}/20</div>
                    <div style={s.classeSub}>{c.tauxReussite}% réussite</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Détail classe */}
            <div style={s.card}>
              <div style={s.cardHeader}>
                <h2 style={s.cardTitle}>👥 {classeActive.nom} — {classeActive.effectif} élèves</h2>
                <a href="/teacher/exams/grades" style={s.btnViolet}>Saisir notes</a>
              </div>

              <input
                style={s.searchInput}
                placeholder="Rechercher un élève..."
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
              />

              <div style={s.tableWrapper}>
                <table style={s.table}>
                  <thead>
                    <tr>
                      {["Matricule", "Nom & Prénom", "Sexe", "Moyenne", "Mention"].map((h) => (
                        <th key={h} style={s.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {elevesAffiches.map((e, i) => {
                      const mc = mentionColor(e.mention);
                      return (
                        <tr key={i} style={s.tr}>
                          <td style={s.td}><code style={s.code}>{e.matricule}</code></td>
                          <td style={s.td}>{e.nom}</td>
                          <td style={s.td}>{e.sexe}</td>
                          <td style={{ ...s.td, fontWeight: "700", color: C.violet }}>{e.moyenne}/20</td>
                          <td style={s.td}>
                            <span style={{ ...s.badge, backgroundColor: mc.bg, color: mc.color }}>{e.mention}</span>
                          </td>
                        </tr>
                      );
                    })}
                    {elevesAffiches.length === 0 && (
                      <tr><td colSpan={5} style={{ ...s.td, textAlign: "center", color: C.textMuted }}>Aucun résultat</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
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
  logo: { fontWeight: "700", fontSize: "1.1rem", color: "#AD56C4", whiteSpace: "nowrap" },
  topNav: { display: "flex", gap: "1.5rem", flex: 1, justifyContent: "center" },
  topNavLink: { textDecoration: "none", color: "#0B0B0B", fontSize: "0.875rem", whiteSpace: "nowrap" },
  topRight: { display: "flex", alignItems: "center", gap: "0.75rem" },
  select: { border: "1px solid rgba(173,86,196,0.4)", borderRadius: "6px", padding: "4px 8px", fontSize: "0.8rem", color: "#0B0B0B", backgroundColor: "rgba(173,86,196,0.08)", cursor: "pointer" },
  btnDeco: { backgroundColor: "#AD56C4", color: "#fff", border: "none", borderRadius: "20px", padding: "6px 16px", fontSize: "0.8rem", fontWeight: "600", cursor: "pointer" },
  body: { display: "flex", flex: 1 },
  sidebar: { width: "220px", minWidth: "220px", backgroundColor: "#ffffff", borderRight: "1px solid rgba(173,86,196,0.15)", padding: "1rem 0", display: "flex", flexDirection: "column", gap: "2px" },
  sidebarItem: { display: "flex", alignItems: "center", gap: "10px", padding: "10px 1.25rem", textDecoration: "none", color: "#0B0B0B", fontSize: "0.875rem", borderLeft: "3px solid transparent" },
  sidebarItemActive: { backgroundColor: "#D0A9D0", color: "#ffffff", fontWeight: "600", borderLeftColor: "#AD56C4" },
  main: { flex: 1, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem", overflowY: "auto" },
  pageHeader: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  pageTitle: { fontSize: "1.5rem", fontWeight: "700", color: "#0B0B0B", margin: 0 },
  pageSubtitle: { fontSize: "0.875rem", color: "#6B7280", margin: "4px 0 0" },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" },
  kpiCard: { borderRadius: "12px", padding: "1.25rem 1rem", display: "flex", flexDirection: "column", gap: "4px" },
  kpiValue: { fontSize: "2rem", fontWeight: "700", lineHeight: 1 },
  kpiLabel: { fontSize: "0.8rem", fontWeight: "500" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "1.25rem" },
  card: { backgroundColor: "#ffffff", borderRadius: "12px", padding: "1.25rem", border: "1px solid rgba(173,86,196,0.15)", display: "flex", flexDirection: "column", gap: "0.75rem" },
  cardHeader: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  cardTitle: { fontSize: "1rem", fontWeight: "600", color: "#0B0B0B", margin: 0 },
  classeCard: { display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "10px", cursor: "pointer", border: "1px solid transparent", transition: "all 0.15s" },
  classeCardActive: { backgroundColor: "rgba(173,86,196,0.08)", border: "1px solid rgba(173,86,196,0.3)" },
  classeAvatar: { width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "rgba(173,86,196,0.15)", color: "#AD56C4", fontWeight: "700", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center" },
  classeNom: { fontSize: "0.9rem", fontWeight: "600", color: "#0B0B0B" },
  classeSub: { fontSize: "0.75rem", color: "#6B7280" },
  classeMoy: { fontSize: "0.9rem", fontWeight: "700" },
  searchInput: { padding: "8px 12px", border: "1px solid rgba(173,86,196,0.3)", borderRadius: "8px", fontSize: "0.875rem", outline: "none", width: "100%", boxSizing: "border-box", backgroundColor: "#EFF7F6" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" },
  th: { textAlign: "left", padding: "8px 10px", backgroundColor: "rgba(173,86,196,0.08)", color: "#6B7280", fontWeight: "600", fontSize: "0.75rem", borderBottom: "1px solid rgba(173,86,196,0.15)" },
  tr: { borderBottom: "1px solid #F3F4F6" },
  td: { padding: "10px 10px", color: "#0B0B0B", verticalAlign: "middle" },
  code: { backgroundColor: "rgba(173,86,196,0.1)", color: "#AD56C4", padding: "2px 6px", borderRadius: "4px", fontSize: "0.75rem" },
  badge: { padding: "3px 10px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: "600" },
  btnViolet: { textDecoration: "none", backgroundColor: "#AD56C4", color: "#fff", fontSize: "0.75rem", fontWeight: "600", padding: "6px 14px", borderRadius: "20px" },
};
