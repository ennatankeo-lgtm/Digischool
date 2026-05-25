import { useState } from "react";

const C = {
  violet: "#AD56C4",
  violetLight: "rgba(173,86,196,0.12)",
  violetMedium: "rgba(173,86,196,0.5)",
  bg: "#EFF7F6",
  white: "#ffffff",
  text: "#0B0B0B",
  textMuted: "#6B7280",
  border: "#E5E7EB",
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <span style={styles.logo}>DIGISCHOOL</span>
        <div style={styles.navLinks}>
          <a href="/" style={styles.navLink}>Accueil</a>
          <a href="/about" style={styles.navLink}>À propos</a>
          <a href="/login" style={styles.btnOutline}>Connexion</a>
        </div>
      </nav>

      {/* Card */}
      <div style={styles.container}>
        <div style={styles.card}>
          {!submitted ? (
            <>
              <div style={styles.iconWrap}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                  stroke={C.violet} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>

              <h1 style={styles.title}>Mot de passe oublié</h1>
              <p style={styles.subtitle}>
                Entrez votre adresse e-mail. Nous transmettrons votre demande
                à l'administrateur système.
              </p>

              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.field}>
                  <label style={styles.label}>Adresse e-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@ecole.cm"
                    required
                    style={styles.input}
                    onFocus={(e) => {
                      e.target.style.borderColor = C.violet;
                      e.target.style.boxShadow = `0 0 0 3px ${C.violetLight}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = C.border;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    ...styles.btn,
                    opacity: loading ? 0.75 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Envoi en cours..." : "Envoyer la demande"}
                </button>
              </form>

              <a href="/login" style={styles.backLink}>
                ← Retour à la connexion
              </a>
            </>
          ) : (
            <div style={styles.successWrap}>
              <div style={styles.successIcon}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                  stroke={C.violet} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h2 style={styles.successTitle}>Demande envoyée</h2>
              <p style={styles.successText}>
                Votre demande de réinitialisation a bien été transmise à
                l'administrateur. Vous recevrez vos nouveaux identifiants
                prochainement.
              </p>
              <a href="/login" style={styles.btn}>
                Retour à la connexion
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <span style={styles.logo}>DIGISCHOOL</span>
        <div style={styles.footerLinks}>
          <a href="/contact" style={styles.footerLink}>Contact</a>
          <a href="/aide" style={styles.footerLink}>Aide</a>
          <a href="/about" style={styles.footerLink}>À propos</a>
        </div>
      </footer>
    </div>
  );
}

const C2 = {
  violet: "#AD56C4",
  violetLight: "rgba(173,86,196,0.12)",
  bg: "#EFF7F6",
  white: "#ffffff",
  text: "#0B0B0B",
  textMuted: "#6B7280",
  border: "#E5E7EB",
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#EFF7F6",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Segoe UI', sans-serif",
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2rem",
    height: "60px",
    backgroundColor: "#EFF7F6",
    borderBottom: "1px solid rgba(173,86,196,0.2)",
  },
  logo: {
    fontWeight: "700",
    fontSize: "1.25rem",
    color: "#AD56C4",
    letterSpacing: "0.5px",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  navLink: {
    textDecoration: "none",
    color: "#0B0B0B",
    fontSize: "0.95rem",
  },
  btnOutline: {
    textDecoration: "none",
    color: "#AD56C4",
    border: "1.5px solid #AD56C4",
    borderRadius: "20px",
    padding: "6px 18px",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  },
  iconWrap: {
    width: "60px",
    height: "60px",
    backgroundColor: "rgba(173,86,196,0.12)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.25rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#0B0B0B",
    textAlign: "center",
    margin: "0 0 0.5rem",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#6B7280",
    textAlign: "center",
    lineHeight: "1.6",
    margin: "0 0 1.75rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#0B0B0B",
  },
  input: {
    padding: "10px 14px",
    fontSize: "0.95rem",
    border: "1.5px solid #E5E7EB",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    color: "#0B0B0B",
    backgroundColor: "#fff",
  },
  btn: {
    display: "block",
    width: "100%",
    padding: "12px",
    backgroundColor: "#AD56C4",
    color: "#ffffff",
    border: "none",
    borderRadius: "30px",
    fontSize: "1rem",
    fontWeight: "600",
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
    marginTop: "0.25rem",
  },
  backLink: {
    display: "block",
    textAlign: "center",
    marginTop: "1.25rem",
    fontSize: "0.875rem",
    color: "#AD56C4",
    textDecoration: "none",
  },
  successWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    textAlign: "center",
  },
  successIcon: {
    width: "72px",
    height: "72px",
    backgroundColor: "rgba(173,86,196,0.12)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  successTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#0B0B0B",
    margin: 0,
  },
  successText: {
    fontSize: "0.9rem",
    color: "#6B7280",
    lineHeight: "1.6",
    margin: "0 0 0.5rem",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    borderTop: "1px solid rgba(173,86,196,0.2)",
    backgroundColor: "#EFF7F6",
  },
  footerLinks: {
    display: "flex",
    gap: "1.5rem",
  },
  footerLink: {
    textDecoration: "none",
    color: "#6B7280",
    fontSize: "0.875rem",
  },
};
