import { useState } from "react";
import { Link } from "react-router-dom";

const SPECIALITES = ["Toutes", "Français", "Mathématiques", "Sciences", "Anglais", "Histoire", "Informatique"];

const LIVRES = [
  { id: 1, titre: "Français CE1", specialite: "Français", classe: "CE1", couleur: "#d8b4fe" },
  { id: 2, titre: "English CP", specialite: "Anglais", classe: "CP", couleur: "#bfdbfe" },
  { id: 3, titre: "French Class 1", specialite: "Français", classe: "SIL", couleur: "#bbf7d0" },
  { id: 4, titre: "Science Class 6", specialite: "Sciences", classe: "CM2", couleur: "#fde68a" },
  { id: 5, titre: "Mathématiques CE2", specialite: "Mathématiques", classe: "CE2", couleur: "#fca5a5" },
  { id: 6, titre: "English CM1", specialite: "Anglais", classe: "CM1", couleur: "#a5f3fc" },
  { id: 7, titre: "Histoire CE1", specialite: "Histoire", classe: "CE1", couleur: "#fed7aa" },
  { id: 8, titre: "Informatique CM2", specialite: "Informatique", classe: "CM2", couleur: "#c4b5fd" },
  { id: 9, titre: "Maths CP", specialite: "Mathématiques", classe: "CP", couleur: "#fbcfe8" },
];

const KPI = [
  { icon: "📚", label: "Livres totaux", value: 9 },
  { icon: "🔖", label: "Spécialités", value: 7 },
  { icon: "📖", label: "Cours associés", value: 12 },
];

export default function Livres() {
  const [search, setSearch] = useState("");
  const [specialite, setSpecialite] = useState("Toutes");

  const filtered = LIVRES.filter((l) => {
    const matchSearch =
      l.titre.toLowerCase().includes(search.toLowerCase()) ||
      l.specialite.toLowerCase().includes(search.toLowerCase());
    const matchSpec = specialite === "Toutes" || l.specialite === specialite;
    return matchSearch && matchSpec;
  });

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
          <Link to="/" style={{ color: "#333", textDecoration: "none", fontSize: "15px" }}>
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
      <div style={{ flex: 1, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "44px 24px" }}>

        {/* Titre */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "36px" }}>
          <span style={{ fontSize: "36px" }}>📖</span>
          <h1 style={{ fontSize: "34px", fontWeight: 700, color: "#1a1a2e", margin: 0, fontFamily: "Georgia, serif" }}>
            Bibliothèque
          </h1>
        </div>

        {/* KPI Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "36px",
          }}
        >
          {KPI.map((k, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#EFF7F6",
                border: "1.5px solid #dde8e6",
                borderRadius: "14px",
                padding: "28px 24px",
                display: "flex",
                alignItems: "center",
                gap: "18px",
              }}
            >
              <span style={{ fontSize: "40px" }}>{k.icon}</span>
              <div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: "#AD56C4" }}>
                  {k.value}
                </div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#333" }}>
                  {k.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Barre recherche + filtre */}
        <div
          style={{
            backgroundColor: "#EFF7F6",
            border: "1.5px solid #dde8e6",
            borderRadius: "12px",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <input
            type="text"
            placeholder="Rechercher un livre, une spécialité, ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              fontSize: "15px",
              outline: "none",
              color: "#333",
            }}
          />
          <select
            value={specialite}
            onChange={(e) => setSpecialite(e.target.value)}
            style={{
              padding: "10px 16px",
              border: "1.5px solid #ccc",
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: "#fff",
              cursor: "pointer",
              outline: "none",
              color: "#333",
              minWidth: "160px",
            }}
          >
            {SPECIALITES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Catalogue */}
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", marginBottom: "24px" }}>
          Catalogue
        </h2>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#999", fontSize: "16px" }}>
            Aucun livre trouvé pour cette recherche.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {filtered.map((livre) => (
              <div
                key={livre.id}
                style={{
                  backgroundColor: "#EFF7F6",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(173,86,196,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.07)";
                }}
              >
                {/* Couverture */}
                <div
                  style={{
                    height: "180px",
                    backgroundColor: livre.couleur,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "14px 14px 0 0",
                  }}
                >
                  <span style={{ fontSize: "56px", opacity: 0.7 }}>📗</span>
                </div>

                {/* Infos */}
                <div style={{ padding: "16px 18px 20px" }}>
                  <div style={{ fontSize: "17px", fontWeight: 700, color: "#1a1a2e", marginBottom: "4px" }}>
                    {livre.titre}
                  </div>
                  <div style={{ fontSize: "13px", color: "#888", marginBottom: "16px" }}>
                    {livre.specialite} · {livre.classe}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <button
                      style={{
                        backgroundColor: "#AD56C4",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50px",
                        padding: "10px 36px",
                        fontSize: "15px",
                        fontWeight: 700,
                        cursor: "pointer",
                        width: "100%",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#9b42b3")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#AD56C4")}
                      onClick={() => alert(`Ouverture de "${livre.titre}"…`)}
                    >
                      Ouvrir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
          marginTop: "40px",
        }}
      >
        <span style={{ fontWeight: 800, fontSize: "16px", color: "#AD56C4" }}>DIGISCHOOL</span>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Contact", "Aide", "À propos"].map((item) => (
            <span key={item} style={{ color: "#555", fontSize: "14px", cursor: "pointer" }}>
              {item}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
