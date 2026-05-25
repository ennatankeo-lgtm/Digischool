const C = { violet: "#AD56C4", violetLight: "rgba(173,86,196,0.15)", bg: "#EFF7F6" };

const navItems = [
  { label: "Tableau de bord", href: "/teacher", icon: "🏠" },
  { label: "Mes classes", href: "/teacher/classes", icon: "🏫" },
  { label: "Mes élèves", href: "/teacher/students", icon: "👥" },
  { label: "Mes épreuves", href: "/teacher/exams", icon: "📄" },
  { label: "Saisie des notes", href: "/teacher/exams/grades", icon: "✏️" },
  { label: "Emploi du temps", href: "/teacher/schedule", icon: "📅", active: true },
  { label: "Discipline", href: "/teacher/discipline", icon: "⚠️" },
  { label: "Messages", href: "/messages", icon: "💬" },
];

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const heures = ["07h30", "09h00", "10h30", "12h00", "14h00", "15h30"];

const emploi = [
  { jour: 0, heure: "07h30", cours: "Mathématiques", classe: "CE2 A", salle: "Salle A1", duree: 1 },
  { jour: 0, heure: "09h00", cours: "Mathématiques", classe: "CM1 B", salle: "Salle B2", duree: 1 },
  { jour: 1, heure: "07h30", cours: "Mathématiques", classe: "CE2 A", salle: "Salle A1", duree: 1 },
  { jour: 1, heure: "10h30", cours: "Mathématiques", classe: "CM2 A", salle: "Salle C3", duree: 1 },
  { jour: 2, heure: "09h00", cours: "Mathématiques", classe: "CM1 B", salle: "Salle B2", duree: 1 },
  { jour: 3, heure: "07h30", cours: "Mathématiques", classe: "CM1 B", salle: "Salle B2", duree: 1 },
  { jour: 3, heure: "14h00", cours: "Mathématiques", classe: "CM2 A", salle: "Salle C3", duree: 1 },
  { jour: 4, heure: "09h00", cours: "Mathématiques", classe: "CE2 A", salle: "Salle A1", duree: 1 },
  { jour: 5, heure: "07h30", cours: "Mathématiques", classe: "CM2 A", salle: "Salle C3", duree: 1 },
];

const classeColor = (c) => {
  if (c === "CE2 A") return { bg: C.violetLight, color: C.violet };
  if (c === "CM1 B") return { bg: "rgba(3,105,161,0.12)", color: "#0369A1" };
  return { bg: "rgba(6,95,70,0.12)", color: "#065F46" };
};

export default function EmploiDuTemps() {
  const totalHeures = emploi.length;
  const classesUniq = [...new Set(emploi.map((e) => e.classe))];

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
              <h1 style={s.pageTitle}>📅 Emploi du temps</h1>
              <p style={s.pageSubtitle}>Semaine — Mathématiques · Année 2025-2026</p>
            </div>
            <div style={s.legend}>
              {classesUniq.map((c) => {
                const col = classeColor(c);
                return (
                  <span key={c} style={{ ...s.legendItem, backgroundColor: col.bg, color: col.color }}>{c}</span>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div style={s.statsBar}>
            {[
              { label: "Heures / semaine", value: totalHeures, color: C.violet, bg: C.violetLight },
              { label: "Classes", value: classesUniq.length, color: "#0369A1", bg: "rgba(3,105,161,0.12)" },
              { label: "Jours actifs", value: [...new Set(emploi.map((e) => e.jour))].length, color: "#065F46", bg: "rgba(6,95,70,0.12)" },
            ].map((k) => (
              <div key={k.label} style={{ ...s.statCard, backgroundColor: k.bg }}>
                <span style={{ ...s.statVal, color: k.color }}>{k.value}</span>
                <span style={{ fontSize: "0.8rem", color: k.color, fontWeight: "500" }}>{k.label}</span>
              </div>
            ))}
          </div>

          {/* Grille */}
          <div style={s.card}>
            <div style={s.gridWrapper}>
              {/* En-tête jours */}
              <div style={s.gridHeader}>
                <div style={s.heureCol} />
                {jours.map((j) => (
                  <div key={j} style={s.jourHeader}>{j}</div>
                ))}
              </div>

              {/* Lignes heures */}
              {heures.map((h) => (
                <div key={h} style={s.gridRow}>
                  <div style={s.heureLabel}>{h}</div>
                  {jours.map((_, ji) => {
                    const cours = emploi.find((e) => e.jour === ji && e.heure === h);
                    const col = cours ? classeColor(cours.classe) : null;
                    return (
                      <div key={ji} style={s.cellule}>
                        {cours && (
                          <div style={{ ...s.coursBlock, backgroundColor: col.bg, borderLeft: `3px solid ${col.color}` }}>
                            <span style={{ ...s.coursNom, color: col.color }}>{cours.cours}</span>
                            <span style={s.coursClasse}>{cours.classe}</span>
                            <span style={s.coursSalle}>{cours.salle}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Liste détaillée */}
          <div style={s.card}>
            <h2 style={s.cardTitle}>Liste détaillée</h2>
            <div style={s.tableWrapper}>
              <table style={s.table}>
                <thead>
                  <tr>
                    {["Jour", "Heure", "Cours", "Classe", "Salle"].map((h) => (
                      <th key={h} style={s.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {emploi.sort((a, b) => a.jour - b.jour || heures.indexOf(a.heure) - heures.indexOf(b.heure)).map((e, i) => {
                    const col = classeColor(e.classe);
                    return (
                      <tr key={i} style={s.tr}>
                        <td style={{ ...s.td, fontWeight: "600" }}>{jours[e.jour]}</td>
                        <td style={{ ...s.td, color: C.violet, fontWeight: "600" }}>{e.heure}</td>
                        <td style={s.td}>{e.cours}</td>
                        <td style={s.td}>
                          <span style={{ ...s.badge, backgroundColor: col.bg, color: col.color }}>{e.classe}</span>
                        </td>
                        <td style={s.td}>{e.salle}</td>
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
  pageHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" },
  pageTitle: { fontSize: "1.5rem", fontWeight: "700", color: "#0B0B0B", margin: 0 },
  pageSubtitle: { fontSize: "0.875rem", color: "#6B7280", margin: "4px 0 0" },
  legend: { display: "flex", gap: "0.5rem" },
  legendItem: { padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "600" },
  statsBar: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" },
  statCard: { borderRadius: "12px", padding: "1rem", display: "flex", flexDirection: "column", gap: "4px" },
  statVal: { fontSize: "2rem", fontWeight: "700", lineHeight: 1 },
  card: { backgroundColor: "#fff", borderRadius: "12px", padding: "1.25rem", border: "1px solid rgba(173,86,196,0.15)", display: "flex", flexDirection: "column", gap: "0.75rem" },
  cardTitle: { fontSize: "1rem", fontWeight: "600", color: "#0B0B0B", margin: 0 },
  gridWrapper: { overflowX: "auto" },
  gridHeader: { display: "grid", gridTemplateColumns: "60px repeat(6, 1fr)", gap: "4px", marginBottom: "4px" },
  jourHeader: { textAlign: "center", fontSize: "0.8rem", fontWeight: "700", color: "#6B7280", padding: "6px 4px", backgroundColor: "rgba(173,86,196,0.08)", borderRadius: "6px" },
  heureCol: {},
  gridRow: { display: "grid", gridTemplateColumns: "60px repeat(6, 1fr)", gap: "4px", marginBottom: "4px" },
  heureLabel: { fontSize: "0.72rem", fontWeight: "600", color: "#AD56C4", display: "flex", alignItems: "center", justifyContent: "center" },
  cellule: { minHeight: "64px", borderRadius: "6px", backgroundColor: "#F9FAFB", padding: "2px" },
  coursBlock: { height: "100%", borderRadius: "5px", padding: "6px 8px", display: "flex", flexDirection: "column", gap: "2px" },
  coursNom: { fontSize: "0.72rem", fontWeight: "700" },
  coursClasse: { fontSize: "0.68rem", fontWeight: "600", color: "#6B7280" },
  coursSalle: { fontSize: "0.65rem", color: "#9CA3AF" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" },
  th: { textAlign: "left", padding: "8px 10px", backgroundColor: "rgba(173,86,196,0.08)", color: "#6B7280", fontWeight: "600", fontSize: "0.75rem", borderBottom: "1px solid rgba(173,86,196,0.15)" },
  tr: { borderBottom: "1px solid #F3F4F6" },
  td: { padding: "10px", color: "#0B0B0B", verticalAlign: "middle" },
  badge: { padding: "3px 10px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: "600" },
};
