import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.nom.trim()) e.nom = "Le nom est requis.";
    if (!form.email.trim()) e.email = "L'email est requis.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email invalide.";
    if (!form.sujet.trim()) e.sujet = "Le sujet est requis.";
    if (!form.message.trim()) e.message = "Le message est requis.";
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Simulation — remplacer par appel API réel
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "12px 14px",
    border: `1.5px solid ${errors[field] ? "#e74c3c" : "#d0d0d0"}`,
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "#fafafa",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  });

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: 600,
    color: "#333",
    marginBottom: "8px",
  };

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
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "52px 20px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "660px" }}>
          {/* Header */}
          <div style={{ marginBottom: "40px" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#1a1a2e",
                margin: "0 0 10px",
                fontFamily: "Georgia, serif",
              }}
            >
              Contactez-nous
            </h1>
            <p style={{ color: "#666", fontSize: "15px", margin: 0 }}>
              Une question, une suggestion ou un problème ? Envoyez-nous un
              message, nous vous répondrons rapidement.
            </p>
          </div>

          {/* Success message */}
          {sent ? (
            <div
              style={{
                backgroundColor: "#e8f8f0",
                border: "1.5px solid #2ecc71",
                borderRadius: "12px",
                padding: "32px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#1a7a44",
                  marginBottom: "10px",
                }}
              >
                Message envoyé !
              </h2>
              <p style={{ color: "#2d8a50", fontSize: "15px", margin: 0 }}>
                Merci pour votre message. Nous vous répondrons dans les plus
                brefs délais.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setForm({ nom: "", email: "", sujet: "", message: "" });
                }}
                style={{
                  marginTop: "24px",
                  backgroundColor: "#AD56C4",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50px",
                  padding: "12px 32px",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Nouveau message
              </button>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                padding: "40px",
                boxShadow: "0 4px 20px rgba(173,86,196,0.08)",
              }}
            >
              <form onSubmit={handleSubmit} noValidate>
                {/* Nom & Email côte à côte */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Nom complet</label>
                    <input
                      type="text"
                      placeholder="Ex : Jean Dupont"
                      value={form.nom}
                      onChange={handleChange("nom")}
                      style={inputStyle("nom")}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "#AD56C4")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = errors.nom
                          ? "#e74c3c"
                          : "#d0d0d0")
                      }
                    />
                    {errors.nom && (
                      <span
                        style={{ color: "#e74c3c", fontSize: "12px", marginTop: "4px", display: "block" }}
                      >
                        {errors.nom}
                      </span>
                    )}
                  </div>
                  <div>
                    <label style={labelStyle}>Adresse email</label>
                    <input
                      type="email"
                      placeholder="Ex : jean@email.com"
                      value={form.email}
                      onChange={handleChange("email")}
                      style={inputStyle("email")}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "#AD56C4")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = errors.email
                          ? "#e74c3c"
                          : "#d0d0d0")
                      }
                    />
                    {errors.email && (
                      <span
                        style={{ color: "#e74c3c", fontSize: "12px", marginTop: "4px", display: "block" }}
                      >
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Sujet */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>Sujet</label>
                  <input
                    type="text"
                    placeholder="Ex : Problème de connexion"
                    value={form.sujet}
                    onChange={handleChange("sujet")}
                    style={inputStyle("sujet")}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "#AD56C4")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.sujet
                        ? "#e74c3c"
                        : "#d0d0d0")
                    }
                  />
                  {errors.sujet && (
                    <span
                      style={{ color: "#e74c3c", fontSize: "12px", marginTop: "4px", display: "block" }}
                    >
                      {errors.sujet}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div style={{ marginBottom: "28px" }}>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    placeholder="Décrivez votre demande en détail..."
                    value={form.message}
                    onChange={handleChange("message")}
                    rows={6}
                    style={{
                      ...inputStyle("message"),
                      resize: "vertical",
                      minHeight: "140px",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "#AD56C4")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.message
                        ? "#e74c3c"
                        : "#d0d0d0")
                    }
                  />
                  {errors.message && (
                    <span
                      style={{ color: "#e74c3c", fontSize: "12px", marginTop: "4px", display: "block" }}
                    >
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <div style={{ textAlign: "center" }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: "#AD56C4",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50px",
                      padding: "14px 64px",
                      fontSize: "16px",
                      fontWeight: 600,
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.75 : 1,
                      boxShadow: "0 4px 14px rgba(173,86,196,0.35)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) e.target.style.backgroundColor = "#9b42b3";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#AD56C4";
                    }}
                  >
                    {loading ? "Envoi en cours..." : "Envoyer"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Infos contact */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              marginTop: "32px",
            }}
          >
            {[
              { icon: "📧", label: "Email", value: "contact@digischool.cm" },
              { icon: "📞", label: "Téléphone", value: "+237 600 000 000" },
              { icon: "📍", label: "Adresse", value: "Yaoundé, Cameroun" },
            ].map((info, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "20px 16px",
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ fontSize: "26px", marginBottom: "8px" }}>
                  {info.icon}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#AD56C4",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "4px",
                  }}
                >
                  {info.label}
                </div>
                <div style={{ fontSize: "13px", color: "#555" }}>
                  {info.value}
                </div>
              </div>
            ))}
          </div>
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
