import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ROLES = [
  { id: "parent", label: "Parent" },
  { id: "admin", label: "Administrateur" },
  { id: "enseignant", label: "Enseignant" },
];

export default function Connexion() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      setError("Veuillez sélectionner un rôle.");
      return;
    }
    if (!login || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setError("");
    setLoading(true);
    // Simulation — remplacer par appel API réel
    setTimeout(() => {
      setLoading(false);
      if (selectedRole === "admin") navigate("/admin");
      else if (selectedRole === "enseignant") navigate("/teacher");
      else navigate("/parent");
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#EFF7F6",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI', sans-serif",
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
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: "22px",
              color: "#AD56C4",
              letterSpacing: "0.5px",
            }}
          >
            DIGISCHOOL
          </span>
        </Link>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link
            to="/"
            style={{ color: "#333", textDecoration: "none", fontSize: "15px" }}
          >
            Accueil
          </Link>
          <Link
            to="/about"
            style={{ color: "#333", textDecoration: "none", fontSize: "15px" }}
          >
            À propos
          </Link>
        </div>
      </nav>

      {/* Main */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            padding: "48px 44px",
            width: "100%",
            maxWidth: "480px",
            boxShadow: "0 4px 24px rgba(173,86,196,0.10)",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "#1a1a2e",
                margin: "0 0 8px 0",
                fontFamily: "Georgia, serif",
              }}
            >
              Connexion
            </h1>
            <p
              style={{
                color: "#555",
                fontSize: "15px",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Accéder à votre espace sécurisé
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Role selector */}
            <div
              style={{
                display: "flex",
                gap: "24px",
                marginBottom: "28px",
                flexWrap: "wrap",
              }}
            >
              {ROLES.map((role) => (
                <label
                  key={role.id}
                  htmlFor={`role-${role.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    fontSize: "15px",
                    color: "#333",
                    fontWeight: selectedRole === role.id ? 600 : 400,
                  }}
                >
                  <input
                    id={`role-${role.id}`}
                    type="radio"
                    name="role"
                    value={role.id}
                    checked={selectedRole === role.id}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    style={{ display: "none" }}
                  />
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      border: `2px solid ${
                        selectedRole === role.id ? "#AD56C4" : "#aaa"
                      }`,
                      borderRadius: "3px",
                      backgroundColor:
                        selectedRole === role.id ? "#AD56C4" : "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                      flexShrink: 0,
                      cursor: "pointer",
                    }}
                  >
                    {selectedRole === role.id && (
                      <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                        <path
                          d="M1 4L4 7L10 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  {role.label}
                </label>
              ))}
            </div>

            {/* Login */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  color: "#333",
                  marginBottom: "8px",
                }}
              >
                Login
              </label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Votre identifiant"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1.5px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "15px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                  backgroundColor: "#fafafa",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#AD56C4")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  color: "#333",
                  marginBottom: "8px",
                }}
              >
                Mot de passe
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  style={{
                    width: "100%",
                    padding: "12px 44px 12px 14px",
                    border: "1.5px solid #ccc",
                    borderRadius: "6px",
                    fontSize: "15px",
                    outline: "none",
                    boxSizing: "border-box",
                    backgroundColor: "#fafafa",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#AD56C4")}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#888",
                    fontSize: "18px",
                    padding: 0,
                  }}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                onClick={() => setRemember(!remember)}
                style={{
                  width: "18px",
                  height: "18px",
                  border: `2px solid ${remember ? "#AD56C4" : "#aaa"}`,
                  borderRadius: "3px",
                  backgroundColor: remember ? "#AD56C4" : "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
              >
                {remember && (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path
                      d="M1 4L4 7L10 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#333" }}>
                Se souvenir de moi
              </span>
            </div>

            {/* Forgot password */}
            <div style={{ marginBottom: "28px" }}>
              <Link
                to="/forgot-password"
                style={{
                  color: "#AD56C4",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  backgroundColor: "#fde8f0",
                  color: "#c0392b",
                  padding: "10px 14px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  marginBottom: "16px",
                }}
              >
                {error}
              </div>
            )}

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
                  padding: "14px 60px",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  transition: "all 0.2s",
                  boxShadow: "0 4px 14px rgba(173,86,196,0.35)",
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.target.style.backgroundColor = "#9b42b3";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#AD56C4";
                }}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </div>
          </form>
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
