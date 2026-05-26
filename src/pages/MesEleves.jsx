// src/pages/teacher/MesEleves.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const C = {
  violet: "#AD56C4",
  violetLight: "rgba(173,86,196,0.15)",
  bg: "#EFF7F6",
  white: "#ffffff",
  text: "#0B0B0B",
  textMuted: "#6B7280",
};

const navItems = [
  { label: "Tableau de bord", href: "/teacher", icon: "🏠" },
  { label: "Mes classes", href: "/teacher/classes", icon: "🏫" },
  { label: "Mes élèves", href: "/teacher/students", icon: "👥", active: true },
  { label: "Mes épreuves", href: "/teacher/exams", icon: "📄" },
  { label: "Saisie des notes", href: "/teacher/exams/grades", icon: "✏️" },
  { label: "Emploi du temps", href: "/teacher/schedule", icon: "📅" },
  { label: "Discipline", href: "/teacher/discipline", icon: "⚠️" },
  { label: "Messages", href: "/messages", icon: "💬" },
];

const tousLesEleves = [
  { matricule: "CE2A001", nom: "Tankeo Emma", classe: "CE2 A", sexe: "F", moyenne: 15.2, mention: "Bien", paiement: "À jour" },
  { matricule: "CE2A002", nom: "Mbarga Paul", classe: "CE2 A", sexe: "M", moyenne: 12.0, mention: "Assez Bien", paiement: "À jour" },
  { matricule: "CE2A003", nom: "Fouda Claire", classe: "CE2 A", sexe: "F", moyenne: 9.5, mention: "Passable", paiement: "Retard" },
  { matricule: "CE2A004", nom: "Ndi Jules", classe: "CE2 A", sexe: "M", moyenne: 17.0, mention: "Très Bien", paiement: "À jour" },
  { matricule: "CM1B001", nom: "Bello Aïcha", classe: "CM1 B", sexe: "F", moyenne: 14.5, mention: "Bien", paiement: "À jour" },
  { matricule: "CM1B002", nom: "Kamga René", classe: "CM1 B", sexe: "M", moyenne: 10.0, mention: "Passable", paiement: "À jour" },
  { matricule: "CM1B003", nom: "Eyong Marie", classe: "CM1 B", sexe: "F", moyenne: 8.0, mention: "Insuffisant", paiement: "Retard" },
  { matricule: "CM2A001", nom: "Essama Luc", classe: "CM2 A", sexe: "M", moyenne: 16.0, mention: "Très Bien", paiement: "À jour" },
  { matricule: "CM2A002", nom: "Ngo Hélène", classe: "CM2 A", sexe: "F", moyenne: 13.5, mention: "Assez Bien", paiement: "À jour" },
];

const mentionColor = (m) => {
  if (m === "Très Bien") return { bg: "rgba(6,95,70,0.1)", color: "#065F46" };
  if (m === "Bien") return { bg: "rgba(3,105,161,0.1)", color: "#0369A1" };
  if (m === "Assez Bien") return { bg: C.violetLight, color: C.violet };
  if (m === "Passable") return { bg: "rgba(180,83,9,0.1)", color: "#B45309" };
  return { bg: "rgba(185,28,28,0.1)", color: "#B91C1C" };
};

export default function MesEleves() {
  const navigate = useNavigate();
  const [recherche, setRecherche] = useState("");
  const [filtreClasse, setFiltreClasse] = useState("Toutes");
  const [filtreSexe, setFiltreSexe] = useState("Tous");
  const [eleveSelectionne, setEleveSelectionne] = useState(null);

  const classes = ["Toutes", ...new Set(tousLesEleves.map((e) => e.classe))];

  const eleves = tousLesEleves.filter((e) => {
    const matchRecherche = e.nom.toLowerCase().includes(recherche.toLowerCase()) || e.matricule.toLowerCase().includes(recherche.toLowerCase());
    const matchClasse = filtreClasse === "Toutes" || e.classe === filtreClasse;
    const matchSexe = filtreSexe === "Tous" || e.sexe === filtreSexe;
    return matchRecherche && matchClasse && matchSexe;
  });

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
          <button style={s.btnDeco} onClick={() => navigate("/login")}>Déconnexion</button>
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
              <h1 style={s.pageTitle}>👥 Mes élèves</h1>
              <p style={s.pageSubtitle}>{tousLesEleves.length} élèves au total — 3 classes</p>
            </div>
          </div>

          {/* Filtres */}
          <div style={s.filtresBar}>
            <input
              style={s.searchInput}
              placeholder="🔍 Rechercher par nom ou matricule..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
            <select style={s.selectFilter} value={filtreClasse} onChange={(e) => setFiltreClasse(e.target.value)}>
              {classes.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select style={s.selectFilter} value={filtreSexe} onChange={(e) => setFiltreSexe(e.target.value)}>
              <option>Tous</option>
              <option value="F">Filles</option>
              <option value="M">Garçons</option>
            </select>
          </div>

          <div style={eleveSelectionne ? s.grid2 : {}}>
            {/* Tableau */}
            <div style={s.card}>
              <div style={s.cardHeader}>
                <span style={s.cardTitle}>Liste ({eleves.length})</span>
              </div>
              <div style={s.tableWrapper}>
                <table style={s.table}>
                  <thead>
                    <tr>
                      {["Matricule", "Nom & Prénom", "Classe", "Sexe", "Moyenne", "Mention", ""].map((h) => (
                        <th key={h} style={s.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {eleves.map((e, i) => {
                      const mc = mentionColor(e.mention);
                      return (
                        <tr key={i} style={{ ...s.tr, ...(eleveSelectionne?.matricule === e.matricule ? { backgroundColor: "rgba(173,86,196,0.06)" } : {}) }}>
                          <td style={s.td}><code style={s.code}>{e.matricule}</code></td>
                          <td style={{ ...s.td, fontWeight: "600" }}>{e.nom}</td>
                          <td style={s.td}>{e.classe}</td>
                          <td style={s.td}>{e.sexe === "F" ? "👧 F" : "👦 M"}</td>
                          <td style={{ ...s.td, fontWeight: "700", color: C.violet }}>{e.moyenne}/20</td>
                          <td style={s.td}>
                            <span style={{ ...s.badge, backgroundColor: mc.bg, color: mc.color }}>{e.mention}</span>
                          </td>
                          <td style={s.td}>
                            <button onClick={() => setEleveSelectionne(eleveSelectionne?.matricule === e.matricule ? null : e)} style={s.btnVoir}>
                              {eleveSelectionne?.matricule === e.matricule ? "Fermer" : "Voir"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fiche élève */}
            {eleveSelectionne && (
              <div style={s.ficheCard}>
                <div style={s.ficheHeader}>
                  <div style={s.ficheAvatar}>{eleveSelectionne.nom.slice(0, 2).toUpperCase()}</div>
                  <div>
                    <div style={s.ficheNom}>{eleveSelectionne.nom}</div>
                    <code style={s.code}>{eleveSelectionne.matricule}</code>
                  </div>
                </div>
                <div style={s.ficheRow}><span style={s.ficheLabel}>Classe</span><span>{eleveSelectionne.classe}</span></div>
                <div style={s.ficheRow}><span style={s.ficheLabel}>Sexe</span><span>{eleveSelectionne.sexe === "F" ? "Fille" : "Garçon"}</span></div>
                <div style={s.ficheRow}><span style={s.ficheLabel}>Moyenne</span><span style={{ fontWeight: "700", color: C.violet }}>{eleveSelectionne.moyenne}/20</span></div>
                <div style={s.ficheRow}>
                  <span style={s.ficheLabel}>Mention</span>
                  <span style={{ ...s.badge, ...mentionColor(eleveSelectionne.mention) }}>{eleveSelectionne.mention}</span>
                </div>
                <div style={s.ficheRow}>
                  <span style={s.ficheLabel}>Scolarité</span>
                  <span style={{ color: eleveSelectionne.paiement === "À jour" ? "#065F46" : "#B91C1C", fontWeight: "600" }}>{eleveSelectionne.paiement}</span>
                </div>
                <a href="/teacher/exams/grades" style={{ ...s.btnVioletFull, marginTop: "0.5rem" }}>✏️ Saisir ses notes</a>
                <a href="/teacher/discipline/new" style={s.btnOutline}>⚠️ Rapport disciplinaire</a>
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
  filtresBar: { display: "flex", gap: "0.75rem", flexWrap: "wrap" },
  searchInput: { flex: 2, minWidth: "200px", padding: "8px 12px", border: "1px solid rgba(173,86,196,0.3)", borderRadius: "8px", fontSize: "0.875rem", outline: "none", backgroundColor: "#EFF7F6" },
  selectFilter: { padding: "8px 12px", border: "1px solid rgba(173,86,196,0.3)", borderRadius: "8px", fontSize: "0.875rem", backgroundColor: "#EFF7F6", cursor: "pointer" },
  grid2: { display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "1.25rem", alignItems: "start" },
  card: { backgroundColor: "#fff", borderRadius: "12px", padding: "1.25rem", border: "1px solid rgba(173,86,196,0.15)", display: "flex", flexDirection: "column", gap: "0.75rem" },
  cardHeader: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  cardTitle: { fontSize: "1rem", fontWeight: "600", color: "#0B0B0B" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" },
  th: { textAlign: "left", padding: "8px 10px", backgroundColor: "rgba(173,86,196,0.08)", color: "#6B7280", fontWeight: "600", fontSize: "0.75rem", borderBottom: "1px solid rgba(173,86,196,0.15)" },
  tr: { borderBottom: "1px solid #F3F4F6" },
  td: { padding: "10px", color: "#0B0B0B", verticalAlign: "middle" },
  code: { backgroundColor: "rgba(173,86,196,0.1)", color: "#AD56C4", padding: "2px 6px", borderRadius: "4px", fontSize: "0.75rem" },
  badge: { padding: "3px 10px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: "600" },
  btnVoir: { backgroundColor: "transparent", border: "1px solid rgba(173,86,196,0.4)", color: "#AD56C4", padding: "4px 10px", borderRadius: "6px", fontSize: "0.75rem", cursor: "pointer", fontWeight: "600" },
  ficheCard: { backgroundColor: "#fff", borderRadius: "12px", padding: "1.5rem", border: "1px solid rgba(173,86,196,0.2)", display: "flex", flexDirection: "column", gap: "0.75rem", alignSelf: "start" },
  ficheHeader: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "0.5rem" },
  ficheAvatar: { width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "rgba(173,86,196,0.15)", color: "#AD56C4", fontWeight: "700", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" },
  ficheNom: { fontSize: "1rem", fontWeight: "700", color: "#0B0B0B" },
  ficheRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #F3F4F6", fontSize: "0.875rem" },
  ficheLabel: { color: "#6B7280", fontWeight: "500" },
  btnVioletFull: { display: "block", textAlign: "center", textDecoration: "none", backgroundColor: "#AD56C4", color: "#fff", padding: "8px 0", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "600" },
  btnOutline: { display: "block", textAlign: "center", textDecoration: "none", border: "1px solid rgba(173,86,196,0.4)", color: "#AD56C4", padding: "8px 0", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "600" },
};
