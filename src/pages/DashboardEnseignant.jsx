import { useState } from "react";
import { useNavigate } from "react-router-dom";

const C = {
  violet: "#AD56C4",
  violetMedium: "rgba(173,86,196,0.5)",
  violetLight: "rgba(173,86,196,0.15)",
  violetBorder: "rgba(173,86,196,0.2)",
  navActive: "#D0A9D0",
  bg: "#EFF7F6",
  white: "#ffffff",
  text: "#0B0B0B",
  textMuted: "#6B7280",
  border: "#E5E7EB",
};

const joursLong = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const joursShort = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

const emploiDuTemps = [
  { jour: 0, heure: "07h30", cours: "Mathématiques", classe: "CE2 A", salle: "Salle A1" },
  { jour: 0, heure: "09h00", cours: "Mathématiques", classe: "CM1 B", salle: "Salle B2" },
  { jour: 1, heure: "07h30", cours: "Mathématiques", classe: "CE2 A", salle: "Salle A1" },
  { jour: 2, heure: "10h30", cours: "Mathématiques", classe: "CM2 A", salle: "Salle C3" },
  { jour: 3, heure: "07h30", cours: "Mathématiques", classe: "CM1 B", salle: "Salle B2" },
  { jour: 4, heure: "09h00", cours: "Mathématiques", classe: "CE2 A", salle: "Salle A1" },
];

const notesASaisir = [
  { epreuve: "CC1 — Mathématiques", classe: "CE2 A", echeance: "Aujourd'hui", urgent: true },
  { epreuve: "Devoir mercredi — Maths", classe: "CM1 B", echeance: "Dans 2 jours", urgent: false },
  { epreuve: "CC1 — Mathématiques", classe: "CM2 A", echeance: "Dans 4 jours", urgent: false },
];

const mesClasses = [
  { classe: "CE2 A", salle: "Salle A1", effectif: 32, moyenne: 13.4 },
  { classe: "CM1 B", salle: "Salle B2", effectif: 28, moyenne: 12.1 },
  { classe: "CM2 A", salle: "Salle C3", effectif: 30, moyenne: 14.7 },
];

const messagesRecents = [
  { expediteur: "Direction", objet: "Réunion pédagogique vendredi", date: "Aujourd'hui", lu: false },
  { expediteur: "Admin Scolarité", objet: "Liste des impayés CE2 A", date: "Hier", lu: true },
  { expediteur: "Parent Tankeo", objet: "Absence de mon enfant", date: "Il y a 2 j", lu: true },
];

const navItems = [
  { label: "Tableau de bord", href: "/teacher", icon: "🏠", active: true },
  { label: "Mes classes", href: "/teacher/classes", icon: "🏫" },
  { label: "Mes élèves", href: "/teacher/students", icon: "👥" },
  { label: "Mes épreuves", href: "/teacher/exams", icon: "📄" },
  { label: "Saisie des notes", href: "/teacher/exams/grades", icon: "✏️" },
  { label: "Emploi du temps", href: "/teacher/schedule", icon: "📅" },
  { label: "Discipline", href: "/teacher/discipline", icon: "⚠️" },
  { label: "Messages", href: "/messages", icon: "💬" },
];

export default function DashboardEnseignant() {
  const navigate = useNavigate();
  const [jourActif, setJourActif] = useState(
    new Date().getDay() === 0 ? 5 : Math.min(new Date().getDay() - 1, 5)
  );

  const coursAujourdHui = emploiDuTemps.filter((e) => e.jour === jourActif);

  return (
    <div style={styles.page}>
      {/* Topbar */}
      <header style={styles.topbar}>
        <span style={styles.logo}>DIGISCHOOL</span>
        <nav style={styles.topNav}>
          <a href="/teacher/exams" style={styles.topNavLink}>Banque de sujets</a>
          <a href="/teacher/exams/grades" style={styles.topNavLink}>Saisie des notes</a>
          <a href="/teacher/schedule" style={styles.topNavLink}>Emploi du temps</a>
          <a href="/messages" style={styles.topNavLink}>Messages</a>
        </nav>
        <div style={styles.topRight}>
          <select style={styles.select}>
            <option>Français</option>
            <option>English</option>
          </select>
          <select style={styles.select}>
            <option>2025-2026</option>
          </select>
         <button style={styles.btnDeco} onClick={() => navigate("/login")}>Déconnexion</button>
        </div>
      </header>

      <div style={styles.body}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                ...styles.sidebarItem,
                ...(item.active ? styles.sidebarItemActive : {}),
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </aside>

        {/* Main */}
        <main style={styles.main}>
          {/* Header */}
          <div style={styles.pageHeader}>
            <div>
              <h1 style={styles.pageTitle}>Bienvenue 👋</h1>
              <p style={styles.pageSubtitle}>Enseignant — Mathématiques</p>
            </div>
          </div>

          {/* KPI */}
          <div style={styles.kpiGrid}>
            {[
              { label: "Mes classes", value: 3, bg: C.violetLight, color: C.violet },
              { label: "Mes élèves", value: 90, bg: "rgba(3,105,161,0.12)", color: "#0369A1" },
              { label: "Notes à saisir", value: notesASaisir.length, bg: "rgba(180,83,9,0.12)", color: "#B45309" },
              { label: "Messages non lus", value: messagesRecents.filter(m => !m.lu).length, bg: "rgba(6,95,70,0.12)", color: "#065F46" },
            ].map((kpi) => (
              <div key={kpi.label} style={{ ...styles.kpiCard, backgroundColor: kpi.bg }}>
                <span style={{ ...styles.kpiValue, color: kpi.color }}>{kpi.value}</span>
                <span style={{ ...styles.kpiLabel, color: kpi.color }}>{kpi.label}</span>
              </div>
            ))}
          </div>

          <div style={styles.grid2}>
            {/* Emploi du temps */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>📅 Emploi du temps</h2>
              </div>
              <div style={styles.jourTabs}>
                {joursShort.map((j, i) => (
                  <button
                    key={j}
                    onClick={() => setJourActif(i)}
                    style={{
                      ...styles.jourTab,
                      ...(jourActif === i ? styles.jourTabActive : {}),
                    }}
                  >
                    {j}
                  </button>
                ))}
              </div>
              <p style={styles.jourLabel}>{joursLong[jourActif]}</p>
              {coursAujourdHui.length === 0 ? (
                <p style={styles.empty}>Aucun cours ce jour.</p>
              ) : (
                coursAujourdHui.map((c, i) => (
                  <div key={i} style={styles.coursRow}>
                    <span style={styles.coursHeure}>{c.heure}</span>
                    <div>
                      <div style={styles.coursNom}>{c.cours}</div>
                      <div style={styles.coursClasse}>{c.classe} · {c.salle}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Notes à saisir */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>✏️ Notes à saisir</h2>
              </div>
              {notesASaisir.map((n, i) => (
                <div key={i} style={styles.noteRow}>
                  <div style={{ flex: 1 }}>
                    <div style={styles.noteEpreuve}>{n.epreuve}</div>
                    <div style={styles.noteClasse}>{n.classe}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: n.urgent ? "rgba(185,28,28,0.1)" : "#F3F4F6",
                      color: n.urgent ? "#B91C1C" : "#6B7280",
                    }}>
                      {n.echeance}
                    </span>
                    <a href="/teacher/exams/grades" style={styles.btnSaisir}>Saisir</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.grid2}>
            {/* Mes classes */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>🏫 Mes classes</h2>
                <a href="/teacher/classes" style={styles.voirTout}>Voir tout →</a>
              </div>
              {mesClasses.map((c, i) => (
                <div key={i} style={styles.classeRow}>
                  <div style={styles.classeAvatar}>{c.classe.slice(0, 2)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={styles.classeNom}>{c.classe}</div>
                    <div style={styles.classeSalle}>{c.salle} · {c.effectif} élèves</div>
                  </div>
                  <span style={styles.classeMoyenne}>{c.moyenne}/20</span>
                </div>
              ))}
            </div>

            {/* Messages récents */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>💬 Messages récents</h2>
                <a href="/messages" style={styles.voirTout}>Voir tout →</a>
              </div>
              {messagesRecents.map((m, i) => (
                <div key={i} style={styles.msgRow}>
                  <div style={{ width: "10px", display: "flex", alignItems: "center" }}>
                    {!m.lu && <span style={styles.unreadDot} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ ...styles.msgExpediteur, fontWeight: m.lu ? "400" : "600" }}>
                      {m.expediteur}
                    </div>
                    <div style={styles.msgObjet}>{m.objet}</div>
                  </div>
                  <span style={styles.msgDate}>{m.date}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#EFF7F6",
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1.5rem",
    height: "56px",
    backgroundColor: "#EFF7F6",
    borderBottom: "1px solid rgba(173,86,196,0.2)",
    position: "sticky",
    top: 0,
    zIndex: 10,
    gap: "1rem",
  },
  logo: {
    fontWeight: "700",
    fontSize: "1.1rem",
    color: "#AD56C4",
    whiteSpace: "nowrap",
  },
  topNav: {
    display: "flex",
    gap: "1.5rem",
    flex: 1,
    justifyContent: "center",
  },
  topNavLink: {
    textDecoration: "none",
    color: "#0B0B0B",
    fontSize: "0.875rem",
    whiteSpace: "nowrap",
  },
  topRight: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  select: {
    border: "1px solid rgba(173,86,196,0.4)",
    borderRadius: "6px",
    padding: "4px 8px",
    fontSize: "0.8rem",
    color: "#0B0B0B",
    backgroundColor: "rgba(173,86,196,0.08)",
    cursor: "pointer",
  },
  btnDeco: {
    backgroundColor: "#AD56C4",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "6px 16px",
    fontSize: "0.8rem",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  body: {
    display: "flex",
    flex: 1,
  },
  sidebar: {
    width: "220px",
    minWidth: "220px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid rgba(173,86,196,0.15)",
    padding: "1rem 0",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  sidebarItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 1.25rem",
    textDecoration: "none",
    color: "#0B0B0B",
    fontSize: "0.875rem",
    borderLeft: "3px solid transparent",
  },
  sidebarItemActive: {
    backgroundColor: "#D0A9D0",
    color: "#ffffff",
    fontWeight: "600",
    borderLeftColor: "#AD56C4",
  },
  main: {
    flex: 1,
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    overflowY: "auto",
  },
  pageHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pageTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#0B0B0B",
    margin: 0,
  },
  pageSubtitle: {
    fontSize: "0.875rem",
    color: "#6B7280",
    margin: "4px 0 0",
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1rem",
  },
  kpiCard: {
    borderRadius: "12px",
    padding: "1.25rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  kpiValue: {
    fontSize: "2rem",
    fontWeight: "700",
    lineHeight: 1,
  },
  kpiLabel: {
    fontSize: "0.8rem",
    fontWeight: "500",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.25rem",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "1.25rem",
    border: "1px solid rgba(173,86,196,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#0B0B0B",
    margin: 0,
  },
  voirTout: {
    fontSize: "0.8rem",
    color: "#AD56C4",
    textDecoration: "none",
  },
  jourTabs: {
    display: "flex",
    gap: "4px",
  },
  jourTab: {
    flex: 1,
    padding: "6px 4px",
    border: "1px solid rgba(173,86,196,0.25)",
    borderRadius: "6px",
    backgroundColor: "#EFF7F6",
    color: "#6B7280",
    fontSize: "0.75rem",
    cursor: "pointer",
    fontWeight: "500",
  },
  jourTabActive: {
    backgroundColor: "#AD56C4",
    color: "#fff",
    borderColor: "#AD56C4",
  },
  jourLabel: {
    fontSize: "0.8rem",
    color: "#6B7280",
    margin: 0,
    fontWeight: "500",
  },
  coursRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 0",
    borderBottom: "1px solid #EFF7F6",
  },
  coursHeure: {
    fontSize: "0.8rem",
    fontWeight: "600",
    color: "#AD56C4",
    minWidth: "44px",
  },
  coursNom: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#0B0B0B",
  },
  coursClasse: {
    fontSize: "0.75rem",
    color: "#6B7280",
  },
  empty: {
    fontSize: "0.875rem",
    color: "#9CA3AF",
    textAlign: "center",
    padding: "1rem 0",
    margin: 0,
  },
  noteRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #EFF7F6",
    gap: "8px",
  },
  noteEpreuve: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#0B0B0B",
  },
  noteClasse: {
    fontSize: "0.75rem",
    color: "#6B7280",
  },
  badge: {
    fontSize: "0.7rem",
    fontWeight: "500",
    padding: "3px 8px",
    borderRadius: "20px",
    whiteSpace: "nowrap",
  },
  btnSaisir: {
    textDecoration: "none",
    backgroundColor: "#AD56C4",
    color: "#fff",
    fontSize: "0.75rem",
    fontWeight: "600",
    padding: "4px 12px",
    borderRadius: "20px",
    whiteSpace: "nowrap",
  },
  classeRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 0",
    borderBottom: "1px solid #EFF7F6",
  },
  classeAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    backgroundColor: "rgba(173,86,196,0.15)",
    color: "#AD56C4",
    fontWeight: "700",
    fontSize: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  classeNom: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#0B0B0B",
  },
  classeSalle: {
    fontSize: "0.75rem",
    color: "#6B7280",
  },
  classeMoyenne: {
    fontSize: "0.875rem",
    fontWeight: "700",
    color: "#AD56C4",
  },
  msgRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 0",
    borderBottom: "1px solid #EFF7F6",
  },
  unreadDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#AD56C4",
    display: "block",
  },
  msgExpediteur: {
    fontSize: "0.875rem",
    color: "#0B0B0B",
  },
  msgObjet: {
    fontSize: "0.75rem",
    color: "#6B7280",
  },
  msgDate: {
    fontSize: "0.7rem",
    color: "#9CA3AF",
    whiteSpace: "nowrap",
  },
};
