import { useState } from "react";
import { Link } from "react-router-dom";

const FAQ = [
  {
    section: "1. Premier pas",
    questions: [
      {
        q: "Comment créer mon compte parent, enseignant, admin ?",
        a: (
          <>
            Rendez-vous sur la page d'<strong>accueil</strong> et cliquez sur{" "}
            <strong>S'inscrire.</strong> Sélectionnez votre profil et renseignez
            les informations demandées.
          </>
        ),
      },
      {
        q: "J'ai oublié mon mot de passe",
        a: (
          <>
            Depuis la page de <strong>connexion</strong>, cliquez sur{" "}
            <strong>Mot de passe oublié ?</strong>. Saisissez l'adresse email
            liée à votre compte. Vous recevrez un lien de réinitialisation.
          </>
        ),
      },
    ],
  },
  {
    section: "2. Relevé des notes",
    questions: [
      {
        q: "Comment consulter les notes, et bulletins de mon enfant ?",
        a: (
          <>
            Connectez-vous en tant que <strong>parent</strong>, allez à l'onglet{" "}
            <strong>Relevé de notes</strong>.
          </>
        ),
      },
    ],
  },
  {
    section: "3. Paiements",
    questions: [
      {
        q: "Comment payer la scolarité ?",
        a: (
          <>
            Connectez-vous en tant que <strong>parent</strong>, allez à l'onglet{" "}
            <strong>Frais de scolarité.</strong>
          </>
        ),
      },
    ],
  },
  {
    section: "4. Messages et communication",
    questions: [
      {
        q: "Comment recevoir les messages de l'école ?",
        a: (
          <>
            Les messages apparaissent dans votre espace <strong>Messages</strong>.
          </>
        ),
      },
      {
        q: "L'école peut-elle envoyer un message à tous les parents ?",
        a: "Oui, l'administration peut diffuser un message global à l'ensemble des parents ou à un groupe spécifique.",
      },
    ],
  },
  {
    section: "5. Problèmes techniques",
    questions: [
      {
        q: "Que faire en cas de problème technique ?",
        a: (
          <>
            Déconnectez-vous puis reconnectez-vous. Si le problème persiste,
            joignez-nous dans l'onglet{" "}
            <Link to="/contact" style={{ color: "#AD56C4" }}>
              contact
            </Link>
            .
          </>
        ),
      },
    ],
  },
];

function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid #eee",
        marginBottom: "2px",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "16px 0",
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#1a1a2e",
            lineHeight: 1.4,
          }}
        >
          {question}
        </span>
        <span
          style={{
            color: "#AD56C4",
            fontSize: "20px",
            fontWeight: 700,
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "rotate(0)",
            transition: "transform 0.2s",
            display: "inline-block",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          style={{
            padding: "0 0 16px 0",
            fontSize: "15px",
            color: "#555",
            lineHeight: 1.7,
            animation: "fadeIn 0.2s ease",
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}

export default function Aide() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#EFF7F6",
        fontFamily: "'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
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
          borderBottom: "1px solid #dde8e6",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{ fontWeight: 800, fontSize: "22px", color: "#AD56C4" }}>
            DIGISCHOOL
          </span>
        </Link>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Link
            to="/"
            style={{ color: "#333", textDecoration: "none", fontSize: "15px" }}
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

      {/* Main */}
      <div
        style={{
          flex: 1,
          maxWidth: "820px",
          width: "100%",
          margin: "0 auto",
          padding: "52px 24px",
        }}
      >
        {/* Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          <span
            style={{
              fontSize: "48px",
              fontWeight: 900,
              color: "#AD56C4",
              lineHeight: 1,
            }}
          >
            ?
          </span>
          <h1
            style={{
              fontSize: "34px",
              fontWeight: 700,
              color: "#1a1a2e",
              margin: 0,
              fontFamily: "Georgia, serif",
            }}
          >
            Besoin d'aide ?
          </h1>
        </div>

        {/* Search bar */}
        <div style={{ position: "relative", marginBottom: "48px" }}>
          <input
            type="text"
            placeholder="Rechercher dans l'aide..."
            style={{
              width: "100%",
              padding: "14px 20px 14px 48px",
              border: "1.5px solid #d0d0d0",
              borderRadius: "50px",
              fontSize: "15px",
              outline: "none",
              boxSizing: "border-box",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#AD56C4")}
            onBlur={(e) => (e.target.style.borderColor = "#d0d0d0")}
          />
          <span
            style={{
              position: "absolute",
              left: "18px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "18px",
              color: "#aaa",
            }}
          >
            🔍
          </span>
        </div>

        {/* FAQ Sections */}
        {FAQ.map((section, si) => (
          <div key={si} style={{ marginBottom: "36px" }}>
            {/* Section header */}
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#1a1a2e",
                margin: "0 0 16px",
                paddingBottom: "12px",
                borderBottom: "2px solid #AD56C4",
                display: "inline-block",
              }}
            >
              {section.section}
            </h2>

            {/* Questions */}
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "8px 24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {section.questions.map((item, qi) => (
                <AccordionItem
                  key={qi}
                  question={item.q}
                  answer={item.a}
                />
              ))}
            </div>
          </div>
        ))}

        {/* CTA Contact */}
        <div
          style={{
            backgroundColor: "#AD56C4",
            borderRadius: "14px",
            padding: "32px",
            textAlign: "center",
            marginTop: "16px",
          }}
        >
          <h3
            style={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: 700,
              margin: "0 0 10px",
            }}
          >
            Vous n'avez pas trouvé votre réponse ?
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "15px",
              margin: "0 0 20px",
            }}
          >
            Notre équipe est disponible pour vous aider.
          </p>
          <Link
            to="/contact"
            style={{
              display: "inline-block",
              backgroundColor: "#fff",
              color: "#AD56C4",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "15px",
              padding: "12px 32px",
              borderRadius: "50px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            Contacter le support →
          </Link>
        </div>
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
        <span style={{ fontWeight: 800, fontSize: "16px", color: "#AD56C4" }}>
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
