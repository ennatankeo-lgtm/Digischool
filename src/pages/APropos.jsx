import { Link } from "react-router-dom";

const TEAM = [
  {
    name: "Équipe de développement",
    role: "Génie Informatique — Promo 2028",
    icon: "👨‍💻",
  },
  {
    name: "Encadreur académique",
    role: "Cours Projet de Base de Données",
    icon: "🎓",
  },
];

const VALEURS = [
  {
    icon: "🏫",
    titre: "Innovation scolaire",
    desc: "DigiSchool modernise la gestion des établissements scolaires grâce à une plateforme numérique centralisée.",
  },
  {
    icon: "🔒",
    titre: "Sécurité & confidentialité",
    desc: "Toutes les données sont protégées par authentification JWT et contrôle d'accès basé sur les rôles (RBAC).",
  },
  {
    icon: "🤝",
    titre: "Connexion école–familles",
    desc: "Un portail dédié aux parents pour suivre les notes, paiements, et communiquer avec l'administration.",
  },
  {
    icon: "📊",
    titre: "Transparence financière",
    desc: "Suivi complet des paiements de scolarité, relances automatiques et reçus PDF générés à la volée.",
  },
];

const MODULES = [
  "Authentification & Comptes",
  "Gestion Académique",
  "Gestion Pédagogique",
  "Évaluations & Bulletins",
  "Scolarité & Paiements",
  "Communication",
  "Discipline",
  "Documents & Médias",
  "Reporting & Tableaux de bord",
  "Audit & Logs",
];

export default function APropos() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#EFF7F6",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#1a1a2e",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 40px",
          backgroundColor: "#EFF7F6",
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: "1px solid #dde8e6",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: "22px",
              color: "#AD56C4",
            }}
          >
            DIGISCHOOL
          </span>
        </Link>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link
            to="/"
            style={{
              color: "#333",
              textDecoration: "none",
              fontSize: "15px",
            }}
          >
            Accueil
          </Link>
          <Link
            to="/login"
            style={{
              backgroundColor: "#6EC6F5",
              color: "#fff",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
              padding: "8px 20px",
              borderRadius: "50px",
            }}
          >
            Connexion
          </Link>
        </div>
      </nav>

      {/* Hero – Tableau noir */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "380px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Bande bois haut */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "44px",
            background:
              "linear-gradient(180deg, #c8842a 0%, #a0621a 50%, #c8842a 100%)",
            borderBottom: "3px solid #7a4510",
            zIndex: 2,
          }}
        >
          {/* Craies décoratives */}
          <div
            style={{
              position: "absolute",
              right: "60px",
              top: "6px",
              display: "flex",
              gap: "4px",
              transform: "rotate(-8deg)",
            }}
          >
            {["#E74C8B", "#2ECC71", "#3498DB", "#F39C12"].map((c, i) => (
              <div
                key={i}
                style={{
                  width: "8px",
                  height: "70px",
                  backgroundColor: c,
                  borderRadius: "2px",
                  boxShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Tableau vert */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #1a6b3c 0%, #2d8a50 40%, #1e7a44 100%)",
          }}
        />

        {/* Livre ouvert décoratif bas droite */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: "80px",
            width: "200px",
            height: "140px",
            background:
              "linear-gradient(90deg, #f5f5f5 0%, #e8e8e8 48%, #f0f0f0 52%, #ffffff 100%)",
            clipPath:
              "polygon(0 20%, 48% 0, 52% 0, 100% 20%, 100% 100%, 52% 80%, 48% 80%, 0 100%)",
            opacity: 0.85,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            padding: "80px 60px 60px",
            maxWidth: "700px",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: 900,
              color: "#fff",
              margin: "0 0 16px",
              textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
              lineHeight: 1.2,
            }}
          >
            Notre vision : une école connectée et humaine
          </h1>
          <p
            style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "560px",
            }}
          >
            DigiSchool est une application de gestion scolaire développée dans
            le cadre du Cours Projet de Base de Données — Génie Informatique
            2028. Elle connecte administrateurs, enseignants, parents et élèves
            sur une seule plateforme sécurisée.
          </p>
        </div>

        {/* Bande bois bas */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "44px",
            background:
              "linear-gradient(180deg, #a0621a 0%, #c8842a 50%, #a0621a 100%)",
            borderTop: "3px solid #7a4510",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            gap: "6px",
          }}
        >
          {/* Craies en bas */}
          {["#3498DB", "#E74C8B"].map((c, i) => (
            <div
              key={i}
              style={{
                width: "60px",
                height: "8px",
                backgroundColor: c,
                borderRadius: "2px",
                opacity: 0.9,
              }}
            />
          ))}
        </div>
      </div>

      {/* Section valeurs */}
      <div style={{ padding: "64px 40px", maxWidth: "1100px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "28px",
            fontWeight: 700,
            color: "#AD56C4",
            marginBottom: "48px",
          }}
        >
          Nos valeurs fondamentales
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {VALEURS.map((v, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#fff",
                borderRadius: "14px",
                padding: "28px 24px",
                boxShadow: "0 2px 12px rgba(173,86,196,0.08)",
                borderTop: "4px solid #AD56C4",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={{ fontSize: "36px", marginBottom: "14px" }}>
                {v.icon}
              </div>
              <h3
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  margin: "0 0 10px",
                }}
              >
                {v.titre}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stack technique */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "56px 40px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#1a1a2e",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            Stack technique
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            {[
              { label: "React 18", color: "#61DAFB", bg: "#e8f8fd" },
              { label: "Node.js / Express", color: "#3d8c2f", bg: "#eaf6e8" },
              { label: "MySQL 8.0", color: "#00758F", bg: "#e0f4f8" },
              { label: "TypeScript", color: "#3178C6", bg: "#e7eef9" },
              { label: "Vite 5", color: "#BD34FE", bg: "#f3e8ff" },
              { label: "TailwindCSS", color: "#06B6D4", bg: "#e0f9fc" },
              { label: "JWT / RBAC", color: "#AD56C4", bg: "#f5eaff" },
              { label: "Sequelize ORM", color: "#52B0E7", bg: "#e5f3fc" },
            ].map((tech, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: tech.bg,
                  color: tech.color,
                  padding: "10px 22px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: 700,
                  border: `1.5px solid ${tech.color}30`,
                }}
              >
                {tech.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modules */}
      <div style={{ padding: "56px 40px", maxWidth: "1100px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "26px",
            fontWeight: 700,
            color: "#1a1a2e",
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          10 modules fonctionnels
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "12px",
          }}
        >
          {MODULES.map((mod, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "14px 18px",
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "#AD56C4",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                M{i + 1}
              </div>
              <span style={{ fontSize: "13px", color: "#333", fontWeight: 500 }}>
                {mod}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Équipe */}
      <div
        style={{
          backgroundColor: "#AD56C4",
          padding: "56px 40px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "26px",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "12px",
          }}
        >
          L'équipe
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "15px",
            marginBottom: "36px",
          }}
        >
          Un projet étudiant ambitieux — Génie Informatique, Promo 2028
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          {TEAM.map((member, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                borderRadius: "14px",
                padding: "28px 32px",
                minWidth: "220px",
                backdropFilter: "blur(4px)",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>
                {member.icon}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "6px",
                }}
              >
                {member.name}
              </div>
              <div
                style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)" }}
              >
                {member.role}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mentions légales */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <p
          style={{ fontSize: "14px", color: "#888", lineHeight: 1.7, margin: 0 }}
        >
          EcoleApp 2026 — Projet académique, Cours Projet de Base de Données —
          Génie Informatique.
          <br />
          Base de données :{" "}
          <code
            style={{
              backgroundColor: "#f4f4f4",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            ecole2026
          </code>{" "}
          · MySQL 8.0 · Stack Node.js / Express / React / MySQL
          <br />
          Version 1.0 — Mai 2026
        </p>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#EFF7F6",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #dde8e6",
        }}
      >
        <span
          style={{ fontWeight: 800, fontSize: "16px", color: "#AD56C4" }}
        >
          DIGISCHOOL
        </span>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Contact", "Aide", "À propos"].map((item) => (
            <span
              key={item}
              style={{ color: "#555", fontSize: "14px", cursor: "pointer" }}
            >
              {item}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
