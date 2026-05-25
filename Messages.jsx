// src/pages/teacher/Messages.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const C = { violet: "#AD56C4", violetLight: "rgba(173,86,196,0.15)", bg: "#EFF7F6" };

const navItems = [
  { label: "Tableau de bord", href: "/teacher", icon: "🏠" },
  { label: "Mes classes", href: "/teacher/classes", icon: "🏫" },
  { label: "Mes élèves", href: "/teacher/students", icon: "👥" },
  { label: "Mes épreuves", href: "/teacher/exams", icon: "📄" },
  { label: "Saisie des notes", href: "/teacher/exams/grades", icon: "✏️" },
  { label: "Emploi du temps", href: "/teacher/schedule", icon: "📅" },
  { label: "Discipline", href: "/teacher/discipline", icon: "⚠️" },
  { label: "Messages", href: "/messages", icon: "💬", active: true },
];

const messagesInit = [
  { id: 1, expediteur: "Direction", objet: "Réunion pédagogique vendredi", corps: "Bonjour, une réunion pédagogique est prévue ce vendredi à 14h en salle de conférence. Votre présence est obligatoire.", date: "Aujourd'hui", lu: false, type: "reçu" },
  { id: 2, expediteur: "Admin Scolarité", objet: "Liste des impayés CE2 A", corps: "Veuillez trouver ci-joint la liste des élèves de votre classe CE2 A ayant des impayés au 30 avril 2026.", date: "Hier", lu: true, type: "reçu" },
  { id: 3, expediteur: "Parent Tankeo", objet: "Absence de mon enfant", corps: "Bonjour, mon enfant Emma Tankeo sera absente jeudi et vendredi pour raison médicale. Merci de bien vouloir en prendre note.", date: "Il y a 2 j", lu: true, type: "reçu" },
  { id: 4, expediteur: "Moi", objet: "Résultats CC1 Mathématiques", corps: "Bonjour, les résultats du CC1 de Mathématiques ont été saisis et validés pour les classes CE2 A et CM1 B.", date: "Il y a 3 j", lu: true, type: "envoyé" },
];

export default function Messages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(messagesInit);
  const [selectionne, setSelectionne] = useState(null);
  const [onglet, setOnglet] = useState("reçus");
  const [showCompose, setShowCompose] = useState(false);
  const [nouveau, setNouveau] = useState({ destinataire: "", objet: "", corps: "" });
  const [recherche, setRecherche] = useState("");

  const filtres = messages.filter((m) => {
    const matchOnglet = onglet === "reçus" ? m.type === "reçu" : m.type === "envoyé";
    const matchRecherche = m.objet.toLowerCase().includes(recherche.toLowerCase()) || m.expediteur.toLowerCase().includes(recherche.toLowerCase());
    return matchOnglet && matchRecherche;
  });

  const lireMessage = (m) => {
    setSelectionne(m);
    setMessages((prev) => prev.map((msg) => msg.id === m.id ? { ...msg, lu: true } : msg));
  };

  const envoyer = () => {
    if (!nouveau.destinataire || !nouveau.objet) return;
    const msg = { id: messages.length + 1, expediteur: "Moi", objet: nouveau.objet, corps: nouveau.corps, date: "À l'instant", lu: true, type: "envoyé" };
    setMessages([msg, ...messages]);
    setShowCompose(false);
    setNouveau({ destinataire: "", objet: "", corps: "" });
  };

  const nonLus = messages.filter((m) => !m.lu && m.type === "reçu").length;

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
              {item.label === "Messages" && nonLus > 0 && (
                <span style={s.notifDot}>{nonLus}</span>
              )}
            </a>
          ))}
        </aside>

        <main style={s.main}>
          <div style={s.pageHeader}>
            <div>
              <h1 style={s.pageTitle}>💬 Messagerie</h1>
              <p style={s.pageSubtitle}>{nonLus > 0 ? `${nonLus} message(s) non lu(s)` : "Tous les messages lus"}</p>
            </div>
            <button onClick={() => { setShowCompose(!showCompose); setSelectionne(null); }} style={s.btnViolet}>
              {showCompose ? "✕ Annuler" : "✉️ Nouveau message"}
            </button>
          </div>

          {/* Compose */}
          {showCompose && (
            <div style={s.composeCard}>
              <h3 style={s.formTitle}>Nouveau message</h3>
              <input style={s.input} placeholder="Destinataire (ex: Direction, Parent Tankeo…)" value={nouveau.destinataire} onChange={(e) => setNouveau({ ...nouveau, destinataire: e.target.value })} />
              <input style={s.input} placeholder="Objet" value={nouveau.objet} onChange={(e) => setNouveau({ ...nouveau, objet: e.target.value })} />
              <textarea style={{ ...s.input, height: "100px", resize: "vertical" }} placeholder="Corps du message…" value={nouveau.corps} onChange={(e) => setNouveau({ ...nouveau, corps: e.target.value })} />
              <button style={s.btnViolet} onClick={envoyer}>Envoyer</button>
            </div>
          )}

          <div style={s.messagesLayout}>
            {/* Liste */}
            <div style={s.listeCard}>
              {/* Onglets */}
              <div style={s.onglets}>
                {["reçus", "envoyés"].map((o) => (
                  <button key={o} onClick={() => { setOnglet(o); setSelectionne(null); }} style={{ ...s.onglet, ...(onglet === o ? s.ongletActive : {}) }}>
                    {o === "reçus" ? "📥 Reçus" : "📤 Envoyés"}
                    {o === "reçus" && nonLus > 0 && <span style={s.badge}>{nonLus}</span>}
                  </button>
                ))}
              </div>

              <input style={s.searchInput} placeholder="Rechercher…" value={recherche} onChange={(e) => setRecherche(e.target.value)} />

              <div style={s.listeMsgs}>
                {filtres.map((m) => (
                  <div key={m.id} onClick={() => lireMessage(m)} style={{ ...s.msgItem, ...(selectionne?.id === m.id ? s.msgItemActive : {}), ...((!m.lu) ? s.msgItemUnread : {}) }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: m.lu ? "500" : "700", fontSize: "0.875rem", color: "#0B0B0B" }}>{m.expediteur}</span>
                      <span style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>{m.date}</span>
                    </div>
                    <div style={{ fontSize: "0.82rem", color: m.lu ? "#6B7280" : "#0B0B0B", fontWeight: m.lu ? "400" : "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {m.objet}
                    </div>
                    {!m.lu && <div style={s.unreadBar} />}
                  </div>
                ))}
                {filtres.length === 0 && (
                  <div style={{ textAlign: "center", color: "#9CA3AF", padding: "2rem", fontSize: "0.875rem" }}>Aucun message</div>
                )}
              </div>
            </div>

            {/* Détail */}
            <div style={s.detailCard}>
              {selectionne ? (
                <>
                  <div style={s.detailHeader}>
                    <h2 style={s.detailObjet}>{selectionne.objet}</h2>
                    <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "#6B7280" }}>
                      <span>De : <strong>{selectionne.expediteur}</strong></span>
                      <span>{selectionne.date}</span>
                    </div>
                  </div>
                  <p style={s.detailCorps}>{selectionne.corps}</p>
                  {selectionne.type === "reçu" && (
                    <div style={s.replyZone}>
                      <textarea style={{ ...s.input, height: "80px", resize: "none" }} placeholder="Répondre…" />
                      <button style={s.btnSmViolet}>Répondre</button>
                    </div>
                  )}
                </>
              ) : (
                <div style={s.emptyDetail}>
                  <span style={{ fontSize: "2.5rem" }}>💬</span>
                  <span style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>Sélectionnez un message</span>
                </div>
              )}
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
  sidebarItem: { display: "flex", alignItems: "center", gap: "10px", padding: "10px 1.25rem", textDecoration: "none", color: "#0B0B0B", fontSize: "0.875rem", borderLeft: "3px solid transparent", position: "relative" },
  sidebarItemActive: { backgroundColor: "#D0A9D0", color: "#fff", fontWeight: "600", borderLeftColor: "#AD56C4" },
  notifDot: { marginLeft: "auto", backgroundColor: "#B91C1C", color: "#fff", borderRadius: "20px", padding: "1px 7px", fontSize: "0.7rem", fontWeight: "700" },
  main: { flex: 1, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem", overflowY: "auto" },
  pageHeader: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  pageTitle: { fontSize: "1.5rem", fontWeight: "700", color: "#0B0B0B", margin: 0 },
  pageSubtitle: { fontSize: "0.875rem", color: "#6B7280", margin: "4px 0 0" },
  btnViolet: { backgroundColor: "#AD56C4", color: "#fff", border: "none", borderRadius: "20px", padding: "8px 20px", fontSize: "0.875rem", fontWeight: "600", cursor: "pointer" },
  btnSmViolet: { backgroundColor: "#AD56C4", color: "#fff", border: "none", borderRadius: "8px", padding: "7px 16px", fontSize: "0.8rem", fontWeight: "600", cursor: "pointer", alignSelf: "flex-end" },
  composeCard: { backgroundColor: "#fff", borderRadius: "12px", padding: "1.5rem", border: "1px solid rgba(173,86,196,0.2)", display: "flex", flexDirection: "column", gap: "0.75rem" },
  formTitle: { fontSize: "1rem", fontWeight: "600", color: "#0B0B0B", margin: 0 },
  input: { padding: "8px 12px", border: "1px solid rgba(173,86,196,0.3)", borderRadius: "8px", fontSize: "0.875rem", outline: "none", backgroundColor: "#EFF7F6", width: "100%", boxSizing: "border-box", fontFamily: "inherit" },
  messagesLayout: { display: "grid", gridTemplateColumns: "320px 1fr", gap: "1.25rem", flex: 1 },
  listeCard: { backgroundColor: "#fff", borderRadius: "12px", border: "1px solid rgba(173,86,196,0.15)", display: "flex", flexDirection: "column", overflow: "hidden" },
  onglets: { display: "flex", borderBottom: "1px solid rgba(173,86,196,0.15)" },
  onglet: { flex: 1, padding: "12px", border: "none", backgroundColor: "transparent", cursor: "pointer", fontSize: "0.82rem", fontWeight: "500", color: "#6B7280", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" },
  ongletActive: { color: "#AD56C4", fontWeight: "700", borderBottom: "2px solid #AD56C4" },
  badge: { backgroundColor: "#B91C1C", color: "#fff", borderRadius: "20px", padding: "1px 6px", fontSize: "0.7rem", fontWeight: "700" },
  searchInput: { margin: "8px", padding: "7px 12px", border: "1px solid rgba(173,86,196,0.25)", borderRadius: "8px", fontSize: "0.8rem", outline: "none", backgroundColor: "#EFF7F6" },
  listeMsgs: { flex: 1, overflowY: "auto" },
  msgItem: { padding: "12px 1rem", cursor: "pointer", borderBottom: "1px solid #F3F4F6", position: "relative" },
  msgItemActive: { backgroundColor: "rgba(173,86,196,0.07)" },
  msgItemUnread: { backgroundColor: "rgba(173,86,196,0.04)" },
  unreadBar: { position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", backgroundColor: "#AD56C4", borderRadius: "2px" },
  detailCard: { backgroundColor: "#fff", borderRadius: "12px", border: "1px solid rgba(173,86,196,0.15)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" },
  detailHeader: { borderBottom: "1px solid #F3F4F6", paddingBottom: "0.75rem" },
  detailObjet: { fontSize: "1.1rem", fontWeight: "700", color: "#0B0B0B", margin: "0 0 6px" },
  detailCorps: { fontSize: "0.9rem", color: "#374151", lineHeight: "1.6", flex: 1 },
  replyZone: { display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "auto" },
  emptyDetail: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem" },
};
