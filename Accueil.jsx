import { Link } from "react-router-dom";

const features = [
  {
    icon: "🏫",
    title: "Gestion académique",
    desc: "Classes, matières, emplois du temps, bulletins automatiques.",
  },
  {
    icon: "💳",
    title: "Suivi financier",
    desc: "Frais de scolarité, reçus, alertes de retard de paiement.",
  },
  {
    icon: "💬",
    title: "Communication",
    desc: "Messagerie ciblée, notifications, accusés de lecture.",
  },
  {
    icon: "📊",
    title: "Statistiques & rapports",
    desc: "Tableaux de bord, graphiques de progression, discipline.",
  },
  {
    icon: "📍",
    title: "Géolocalisation",
    desc: "Transport scolaire optimisé.",
  },
  {
    icon: "🔒",
    title: "Sécurité & rôles",
    desc: "Authentification JWT, accès par rôle.",
  },
];

export default function Accueil() {
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#1a1a2e" }}>
      {/* NAVBAR */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#fff",
          borderBottom: "1px solid #E8E0F0",
          padding: "0 40px",
          height: 60,
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        <span style={{ fontWeight: 800, fontSize: 18, color: "#AD56C4", letterSpacing: 1 }}>
          DIGISCHOOL
        </span>
        <div style={{ flex: 1 }} />
        <Link to="/livres" style={navLinkStyle}>Livres</Link>
        <Link to="/" style={{ ...navLinkStyle, color: "#AD56C4", fontWeight: 600 }}>Accueil</Link>
        <Link to="/about" style={navLinkStyle}>À propos</Link>
        <Link to="/register" style={navLinkStyle}>S'inscrire</Link>
        <Link
          to="/login"
          style={{
            background: "#AD56C4",
            color: "#fff",
            padding: "8px 20px",
            borderRadius: 8,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Connexion
        </Link>
      </nav>

      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(135deg, #7C3FAE 0%, #AD56C4 60%, #C97FD9 100%)",
          padding: "80px 40px 90px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: 42, fontWeight: 800, margin: "0 0 16px", lineHeight: 1.2 }}>
          La gestion scolaire,<br />simplifiée.
        </h1>
        <p style={{ fontSize: 18, opacity: 0.9, margin: "0 0 36px", maxWidth: 520, marginInline: "auto" }}>
          Une plateforme complète pour les établissements primaires et secondaires — de l'inscription à la remise des bulletins.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/register"
            style={{
              background: "#fff",
              color: "#AD56C4",
              padding: "12px 32px",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 16,
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            S'inscrire gratuitement
          </Link>
          <Link
            to="/login"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              padding: "12px 32px",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 16,
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          >
            Se connecter
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "72px 40px", background: "#F7F3FB" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: 26,
            fontWeight: 700,
            marginBottom: 8,
            color: "#1a1a2e",
          }}
        >
          Des outils pensés pour l'efficacité
        </h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 48, fontSize: 15 }}>
          Tout ce dont votre établissement a besoin, en un seul endroit.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "28px 24px",
                border: "1px solid #EAE0F5",
                transition: "box-shadow 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(173,86,196,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px", color: "#1a1a2e" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: "#666", margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "64px 40px",
          textAlign: "center",
          background: "#fff",
        }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
          Prêt à nous rejoindre ?
        </h2>
        <p style={{ color: "#666", marginBottom: 28, fontSize: 15 }}>
          Créez votre espace en quelques minutes. Aucune carte bancaire requise.
        </p>
        <Link
          to="/register"
          style={{
            background: "#AD56C4",
            color: "#fff",
            padding: "14px 40px",
            borderRadius: 10,
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          S'inscrire
        </Link>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#1a1a2e",
          color: "rgba(255,255,255,0.7)",
          padding: "32px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span style={{ fontWeight: 700, color: "#AD56C4", fontSize: 16 }}>DIGISCHOOL</span>
        <div style={{ display: "flex", gap: 24 }}>
          <Link to="/login" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>Connexion</Link>
          <Link to="/contact" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>Contact</Link>
          <Link to="/aide" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>Aide</Link>
          <Link to="/about" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>À propos</Link>
        </div>
      </footer>
    </div>
  );
}

const navLinkStyle = {
  color: "#444",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500,
};
