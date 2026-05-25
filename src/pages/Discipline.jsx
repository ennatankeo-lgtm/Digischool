// src/pages/teacher/Discipline.jsx
import { useState } from "react";

const C = { violet: "#AD56C4", violetLight: "rgba(173,86,196,0.15)", bg: "#EFF7F6" };

const navItems = [
  { label: "Tableau de bord", href: "/teacher", icon: "🏠" },
  { label: "Mes classes", href: "/teacher/classes", icon: "🏫" },
  { label: "Mes élèves", href: "/teacher/students", icon: "👥" },
  { label: "Mes épreuves", href: "/teacher/exams", icon: "📄" },
  { label: "Saisie des notes", href: "/teacher/exams/grades", icon: "✏️" },
  { label: "Emploi du temps", href: "/teacher/schedule", icon: "📅" },
  { label: "Discipline", href: "/teacher/discipline", icon: "⚠️", active: true },
  { label: "Messages", href: "/messages", icon: "💬" },
];

const referentiel = [
  { faute: "Retard non justifié", points: 2 },
  { faute: "Absence non justifiée", points: 5 },
  { faute: "Insolence envers un enseignant", points: 8 },
  { faute: "Bagarre", points: 10 },
  { faute: "Tricherie", points: 7 },
  { faute: "Dégradation de matériel", points: 6 },
];

const rapportsInit = [
  { id: 1, date: "2026-04-08", eleve: "Mbarga Paul", classe: "CE2 A", faute: "Retard non justifié", points: 2, statut: "Validé", gravite: "Mineure" },
  { id: 2, date: "2026-04-14", eleve: "Eyong Marie", classe: "CM1 B", faute: "Insolence envers un enseignant", points: 8, statut: "En attente", gravite: "Grave" },
  { id: 3, date: "2026-04-20", eleve: "Fouda Claire", classe: "CE2 A", faute: "Absence non justifiée", points: 5, statut: "Validé", gravite: "Modérée" },
];

const graviteColor = (g) => {
  if (g === "Mineure") return { bg: "rgba(6,95,70,0.1)", color: "#065F46" };
  if (g === "Modérée") return { bg: "rgba(180,83,9,0.1)", color: "#B45309" };
  return { bg: "rgba(185,28,28,0.1)", color: "#B91C1C" };
};

export default function Discipline() {
  const [showForm, setShowForm] = useState(false);
  const [rapports, setRapports] = useState(rapportsInit);
  const [form, setForm] = useState({ eleve: "", classe: "CE2 A", faute: referentiel[0].faute, points: referentiel[0].points, gravite: "Mineure" });

  const handleFaute = (f) => {
    const ref = referentiel.find((r) => r.faute === f);
    setForm({ ...form, faute: f, points: ref ? ref.points : 0 });
  };

  const handleSubmit = () => {
    if (!form.eleve) return;
    const newR = {
      id: rapports.length + 1,
      date: new Date().toISOString().slice(0, 10),
      eleve: form.eleve,
      classe: form.classe,
      faute: form.faute,
      points: form.points,
      statut: "En attente",
      gravite: form.gravite,
    };
    setRapports([newR, ...rapports]);
    setShowForm(false);
    setForm({ eleve: "", classe: "CE2 A", faute: referentiel[0].faute, points: referentiel[0].points, gravite: "Mineure" });
  };

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
              <h1 style={s.pageTitle}>⚠️ Discipline</h1>
              <p style={s.pageSubtitle}>Gestion des rapports disciplinaires</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} style={s.btnViolet}>
              {showForm ? "✕ Annuler" : "+ Nouveau rapport"}
            </button>
          </div>

          {/* KPI */}
          <div style={s.kpiGrid}>
            {[
              { label: "Total rapports", value: rapports.length, color: C.violet, bg: C.violetLight },
              { label: "En attente", value: rapports.filter((r) => r.statut === "En attente").length, color: "#B45309", bg: "rgba(180,83,9,0.12)" },
              { label: "Validés", value: rapports.filter((r) => r.statut === "Validé").length, color: "#065F46", bg: "rgba(6,95,70,0.12)" },
              { label: "Graves", value: rapports.filter((r) => r.gravite === "Grave").length, color: "#B91C1C", bg: "rgba(185,28,28,0.1)" },
            ].map((k) => (
              <div key={k.label} style={{ ...s.kpiCard, backgroundColor: k.bg }}>
                <span style={{ ...s.kpiValue, color: k.color }}>{k.value}</span>
                <span style={{ ...s.kpiLabel, color: k.color }}>{k.label}</span>
              </div>
            ))}
          </div>

          {/* Formulaire */}
          {showForm && (
            <div style={s.formCard}>
              <h3 style={s.formTitle}>Saisir un rapport disciplinaire</h3>
              <div style={s.formGrid}>
                <div style={s.formGroup}>
                  <label style={s.label}>Nom de l'élève</label>
                  <input style={s.input} placeholder="Nom & Prénom" value={form.eleve} onChange={(e) => setForm({ ...form, eleve: e.target.value })} />
                </div>
                <div style={s.formGroup}>
                  <label style={s.label}>Classe</label>
                  <select style={s.input} value={form.classe} onChange={(e) => setForm({ ...form, classe: e.target.value })}>
                    <option>CE2 A</option><option>CM1 B</option><option>CM2 A</option>
                  </select>
                </div>
                <div style={s.formGroup}>
                  <label style={s.label}>Type de faute</label>
                  <select style={s.input} value={form.faute} onChange={(e) => handleFaute(e.target.value)}>
                    {referentiel.map((r) => <option key={r.faute}>{r.faute}</option>)}
                  </select>
                </div>
                <div style={s.formGroup}>
                  <label style={s.label}>Gravité</label>
                  <select style={s.input} value={form.gravite} onChange={(e) => setForm({ ...form, gravite: e.target.value })}>
                    <option>Mineure</option><option>Modérée</option><option>Grave</option>
                  </select>
                </div>
              </div>
              <div style={s.pointsInfo}>
                <span style={{ color: "#6B7280", fontSize: "0.875rem" }}>Points attribués :</span>
                <span style={{ fontWeight: "700", color: "#B91C1C", fontSize: "1.1rem" }}>{form.points} pts</span>
              </div>
              <button style={s.btnViolet} onClick={handleSubmit}>Soumettre le rapport</button>
            </div>
          )}

          {/* Référentiel */}
          <div style={s.grid2}>
            <div style={s.card}>
              <h2 style={s.cardTitle}>📋 Référentiel des fautes</h2>
              {referentiel.map((r, i) => (
                <div key={i} style={s.refRow}>
                  <span style={{ fontSize: "0.875rem", color: "#0B0B0B" }}>{r.faute}</span>
                  <span style={{ ...s.badge, backgroundColor: "rgba(185,28,28,0.1)", color: "#B91C1C" }}>{r.points} pts</span>
                </div>
              ))}
            </div>

            {/* Rapports */}
            <div style={s.card}>
              <h2 style={s.cardTitle}>📝 Mes rapports ({rapports.length})</h2>
              {rapports.map((r) => {
                const gc = graviteColor(r.gravite);
                return (
                  <div key={r.id} style={s.rapportRow}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "600", fontSize: "0.875rem", color: "#0B0B0B" }}>{r.eleve} <span style={{ color: "#6B7280", fontWeight: "400" }}>· {r.classe}</span></div>
                      <div style={{ fontSize: "0.78rem", color: "#6B7280", marginTop: "2px" }}>{r.faute} · {r.date}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                      <span style={{ ...s.badge, backgroundColor: gc.bg, color: gc.color }}>{r.gravite}</span>
                      <span style={{ ...s.badge, backgroundColor: r.statut === "Validé" ? "rgba(6,95,70,0.1)" : "rgba(180,83,9,0.1)", color: r.statut === "Validé" ? "#065F46" : "#B45309" }}>{r.statut}</span>
                    </div>
                  </div>
                );
              })}
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
  btnViolet: { backgroundColor: "#AD56C4", color: "#fff", border: "none", borderRadius: "20px", padding: "8px 20px", fontSize: "0.875rem", fontWeight: "600", cursor: "pointer" },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" },
  kpiCard: { borderRadius: "12px", padding: "1.25rem 1rem", display: "flex", flexDirection: "column", gap: "4px" },
  kpiValue: { fontSize: "2rem", fontWeight: "700", lineHeight: 1 },
  kpiLabel: { fontSize: "0.8rem", fontWeight: "500" },
  formCard: { backgroundColor: "#fff", borderRadius: "12px", padding: "1.5rem", border: "1px solid rgba(173,86,196,0.2)", display: "flex", flexDirection: "column", gap: "1rem" },
  formTitle: { fontSize: "1rem", fontWeight: "600", color: "#0B0B0B", margin: 0 },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" },
  formGroup: { display: "flex", flexDirection: "column", gap: "4px" },
  label: { fontSize: "0.8rem", fontWeight: "600", color: "#6B7280" },
  input: { padding: "8px 12px", border: "1px solid rgba(173,86,196,0.3)", borderRadius: "8px", fontSize: "0.875rem", outline: "none", backgroundColor: "#EFF7F6" },
  pointsInfo: { display: "flex", alignItems: "center", gap: "1rem", padding: "10px 14px", backgroundColor: "rgba(185,28,28,0.06)", borderRadius: "8px" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "1.25rem" },
  card: { backgroundColor: "#fff", borderRadius: "12px", padding: "1.25rem", border: "1px solid rgba(173,86,196,0.15)", display: "flex", flexDirection: "column", gap: "0.6rem" },
  cardTitle: { fontSize: "1rem", fontWeight: "600", color: "#0B0B0B", margin: 0 },
  refRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #F3F4F6" },
  rapportRow: { display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 0", borderBottom: "1px solid #F3F4F6" },
  badge: { padding: "3px 10px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: "600" },
};
