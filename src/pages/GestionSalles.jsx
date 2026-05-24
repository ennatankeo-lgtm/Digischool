import { useState } from "react";
import { Link } from "react-router-dom";

// ─── Données fictives ────────────────────────────────────────────────
const SALLES = [
  { id: 1, nom: "Salle A1", classe: "CP", places: 30, statut: "occupée", type: "classe" },
  { id: 2, nom: "Salle B2", classe: "CM2", places: 50, statut: "libre", type: "classe" },
  { id: 3, nom: "Salle C3", classe: "CE1", places: 45, statut: "libre", type: "classe" },
  { id: 4, nom: "Salle Info", classe: "Informatique", places: 50, statut: "occupée", type: "spécialisée" },
  { id: 5, nom: "Salle D4", classe: "CE2", places: 35, statut: "libre", type: "classe" },
  { id: 6, nom: "Labo Sciences", classe: "Sciences", places: 30, statut: "maintenance", type: "spécialisée" },
];

const CLASSES = ["CM1", "CM2", "CE1", "CE2", "CP", "SIL"];

const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const HEURES = ["7h00", "8h00", "9h00", "10h00", "11h00", "12h00", "13h00", "14h00", "15h00"];

const EMPLOI_DU_TEMPS = {
  CM1: {
    lundi:    ["Français", "", "Mathématiques", "", "", "", "", "Sciences", ""],
    mardi:    ["Anglais", "", "", "Histoire", "", "", "Maths", "", ""],
    mercredi: ["Français", "Sciences", "", "", "", "", "", "", ""],
    jeudi:    ["", "Mathématiques", "", "Anglais", "", "", "", "Français", ""],
    vendredi: ["Sciences", "", "Histoire", "", "Anglais", "", "", "", ""],
    samedi:   ["Maths", "", "", "", "", "", "", "", ""],
  },
};

const MATIERES = [
  { id: 1, nom: "Français", coef: 3, noteMax: 20, classe: "CE1" },
  { id: 2, nom: "Mathématiques", coef: 3, noteMax: 20, classe: "CM1" },
  { id: 3, nom: "Sciences", coef: 2, noteMax: 20, classe: "CM2" },
  { id: 4, nom: "Anglais", coef: 2, noteMax: 20, classe: "CE2" },
  { id: 5, nom: "Histoire-Géo", coef: 1, noteMax: 20, classe: "CP" },
  { id: 6, nom: "Informatique", coef: 2, noteMax: 20, classe: "CM1" },
];

const COURS_COULEURS = {
  Français: "#d8b4fe",
  Mathématiques: "#bfdbfe",
  Sciences: "#bbf7d0",
  Anglais: "#fde68a",
  Histoire: "#fed7aa",
  "Histoire-Géo": "#fed7aa",
  Maths: "#bfdbfe",
  Informatique: "#c4b5fd",
};

// ─── Composants ────────────────────────────────────────────────────────

function StatutBadge({ statut }) {
  const colors = {
    occupée: { bg: "#C4A8D4", color: "#5b2d7a" },
    libre: { bg: "#C4A8D4", color: "#2d5a3b" },
    maintenance: { bg: "#fca5a5", color: "#7f1d1d" },
  };
  const c = colors[statut] || colors.libre;
  return (
    <span
      style={{
        backgroundColor: c.bg,
        color: c.color,
        padding: "4px 14px",
        borderRadius: "50px",
        fontSize: "13px",
        fontWeight: 700,
      }}
    >
      {statut}
    </span>
  );
}

// ─── Onglets ────────────────────────────────────────────────────────────

function VueGenerale() {
  const kpis = [
    { value: 14, label: "Salles de classe", color: "#1d8cf8" },
    { value: 6,  label: "Salles spécialisées", color: "#1d8cf8" },
    { value: 2,  label: "Libre maintenant", color: "#1d8cf8" },
    { value: 1,  label: "Maintenance", color: "#1d8cf8" },
  ];

  return (
    <div>
      {/* KPI */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {kpis.map((k, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#EFF7F6",
              border: "1.5px solid #333",
              borderRadius: "10px",
              padding: "20px 18px",
            }}
          >
            <div style={{ fontSize: "32px", fontWeight: 800, color: k.color }}>
              {k.value}
            </div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#1a1a2e" }}>
              {k.label}
            </div>
          </div>
        ))}
      </div>

      {/* État des salles */}
      <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>
        État des salles
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        {SALLES.map((s) => (
          <div
            key={s.id}
            style={{
              backgroundColor: "#d4c8d8",
              borderRadius: "24px",
              padding: "20px 22px",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: 800, marginBottom: "4px" }}>
              {s.nom}
            </div>
            <div style={{ fontSize: "16px", color: "#444", marginBottom: "12px" }}>
              {s.classe}-{s.places} {s.type === "spécialisée" ? "postes" : "places"}
            </div>
            <StatutBadge statut={s.statut} />
          </div>
        ))}
      </div>

      {/* Emploi du temps mini */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>
          Emploi de temps — semaine
        </h2>
        <select
          defaultValue="CM1"
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: "#d9d9d9",
            fontSize: "16px",
            fontWeight: 700,
            cursor: "pointer",
            minWidth: "160px",
          }}
        >
          {CLASSES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Grille emploi du temps */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "2px solid #333",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#fff" }}>
              <th style={{ border: "1px solid #333", padding: "14px 8px", fontSize: "14px", color: "#888", width: "60px" }}>
                Heure
              </th>
              {JOURS.map((j) => (
                <th
                  key={j}
                  style={{
                    border: "1px solid #333",
                    padding: "16px 8px",
                    fontSize: "18px",
                    fontWeight: 800,
                    textAlign: "center",
                    textTransform: "lowercase",
                  }}
                >
                  {j}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HEURES.map((heure, hi) => (
              <tr key={hi}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px 8px",
                    fontSize: "12px",
                    color: "#888",
                    textAlign: "center",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  {heure}
                </td>
                {JOURS.map((jour) => {
                  const cours = (EMPLOI_DU_TEMPS["CM1"]?.[jour]?.[hi]) || "";
                  return (
                    <td
                      key={jour}
                      style={{
                        border: "1px solid #e0d0e8",
                        padding: "10px 6px",
                        backgroundColor: cours ? COURS_COULEURS[cours] || "#f3e8ff" : "#f9f5ff",
                        textAlign: "center",
                        fontSize: "13px",
                        fontWeight: cours ? 600 : 400,
                        color: cours ? "#3d1a5c" : "transparent",
                        minWidth: "90px",
                        height: "40px",
                      }}
                    >
                      {cours || "·"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GestionSallesTab() {
  const [showForm, setShowForm] = useState(false);
  const [salles, setSalles] = useState(SALLES);
  const [form, setForm] = useState({ nom: "", classe: "", places: "", type: "classe" });

  const handleAdd = () => {
    if (!form.nom || !form.places) return;
    setSalles((prev) => [
      ...prev,
      { id: prev.length + 1, ...form, statut: "libre" },
    ]);
    setForm({ nom: "", classe: "", places: "", type: "classe" });
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>Liste des salles</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            backgroundColor: "#AD56C4",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 22px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          + Nouvelle salle
        </button>
      </div>

      {/* Formulaire ajout */}
      {showForm && (
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
            gap: "12px",
            alignItems: "end",
          }}
        >
          {[
            { label: "Nom", field: "nom", placeholder: "Ex: Salle D5" },
            { label: "Classe associée", field: "classe", placeholder: "Ex: CM1" },
            { label: "Capacité", field: "places", placeholder: "Ex: 40", type: "number" },
          ].map((f) => (
            <div key={f.field}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#555", marginBottom: "6px" }}>
                {f.label}
              </label>
              <input
                type={f.type || "text"}
                placeholder={f.placeholder}
                value={form[f.field]}
                onChange={(e) => setForm((p) => ({ ...p, [f.field]: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1.5px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ))}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#555", marginBottom: "6px" }}>
              Type
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
              style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #ddd", borderRadius: "8px", fontSize: "14px" }}
            >
              <option value="classe">Classe</option>
              <option value="spécialisée">Spécialisée</option>
            </select>
          </div>
          <button
            onClick={handleAdd}
            style={{
              backgroundColor: "#AD56C4",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Ajouter
          </button>
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden" }}>
          <thead>
            <tr style={{ backgroundColor: "#AD56C4", color: "#fff" }}>
              {["Salle", "Classe", "Capacité", "Type", "Statut", "Actions"].map((h) => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: "14px", fontWeight: 600 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {salles.map((s, i) => (
              <tr key={s.id} style={{ backgroundColor: i % 2 === 0 ? "#faf5ff" : "#fff" }}>
                <td style={{ padding: "12px 16px", fontWeight: 700, color: "#1a1a2e" }}>{s.nom}</td>
                <td style={{ padding: "12px 16px", color: "#555" }}>{s.classe}</td>
                <td style={{ padding: "12px 16px", color: "#555" }}>{s.places} places</td>
                <td style={{ padding: "12px 16px", color: "#555", textTransform: "capitalize" }}>{s.type}</td>
                <td style={{ padding: "12px 16px" }}>
                  <StatutBadge statut={s.statut} />
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <button
                    style={{ background: "none", border: "1px solid #AD56C4", color: "#AD56C4", borderRadius: "6px", padding: "5px 14px", fontSize: "13px", cursor: "pointer" }}
                  >
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmploiDuTemps() {
  const [classeSelected, setClasseSelected] = useState("CM1");
  const planning = EMPLOI_DU_TEMPS[classeSelected] || {};

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px", flexWrap: "wrap" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>
          Emploi de temps — semaine
        </h2>
        <select
          value={classeSelected}
          onChange={(e) => setClasseSelected(e.target.value)}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: "#d9d9d9",
            fontSize: "15px",
            fontWeight: 700,
            cursor: "pointer",
            minWidth: "140px",
          }}
        >
          {CLASSES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", border: "2px solid #333" }}>
          <thead>
            <tr style={{ backgroundColor: "#fff" }}>
              <th style={{ border: "1px solid #333", padding: "14px 8px", fontSize: "13px", color: "#888", width: "60px" }}>
                Heure
              </th>
              {JOURS.map((j) => (
                <th key={j} style={{ border: "1px solid #333", padding: "16px 8px", fontSize: "17px", fontWeight: 800, textAlign: "center" }}>
                  {j}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HEURES.map((heure, hi) => (
              <tr key={hi}>
                <td style={{ border: "1px solid #ddd", padding: "10px 8px", fontSize: "12px", color: "#888", textAlign: "center", backgroundColor: "#f9f9f9" }}>
                  {heure}
                </td>
                {JOURS.map((jour) => {
                  const cours = planning[jour]?.[hi] || "";
                  return (
                    <td
                      key={jour}
                      style={{
                        border: "1px solid #e0d0e8",
                        padding: "10px 6px",
                        backgroundColor: cours ? COURS_COULEURS[cours] || "#f3e8ff" : "#faf5ff",
                        textAlign: "center",
                        fontSize: "13px",
                        fontWeight: cours ? 600 : 400,
                        color: cours ? "#3d1a5c" : "#ddd",
                        minWidth: "100px",
                        height: "44px",
                      }}
                    >
                      {cours || "—"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Affectations() {
  return (
    <div>
      <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "24px" }}>Affectations élèves</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden" }}>
          <thead>
            <tr style={{ backgroundColor: "#AD56C4", color: "#fff" }}>
              {["Matricule", "Nom", "Classe", "Salle affectée", "Année"].map((h) => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: "14px", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { mat: "EL001", nom: "Awa Ngo", classe: "CM1", salle: "Salle A1", annee: "2025-2026" },
              { mat: "EL002", nom: "Jean Mbah", classe: "CE2", salle: "Salle C3", annee: "2025-2026" },
              { mat: "EL003", nom: "Fatou Bello", classe: "CP", salle: "Salle B2", annee: "2025-2026" },
              { mat: "EL004", nom: "Paul Essono", classe: "CM2", salle: "Salle B2", annee: "2025-2026" },
              { mat: "EL005", nom: "Marie Talla", classe: "CE1", salle: "Salle C3", annee: "2025-2026" },
            ].map((row, i) => (
              <tr key={row.mat} style={{ backgroundColor: i % 2 === 0 ? "#faf5ff" : "#fff" }}>
                <td style={{ padding: "12px 16px", fontWeight: 700, color: "#AD56C4" }}>{row.mat}</td>
                <td style={{ padding: "12px 16px", color: "#1a1a2e", fontWeight: 600 }}>{row.nom}</td>
                <td style={{ padding: "12px 16px", color: "#555" }}>{row.classe}</td>
                <td style={{ padding: "12px 16px", color: "#555" }}>{row.salle}</td>
                <td style={{ padding: "12px 16px", color: "#555" }}>{row.annee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Matieres() {
  const [showForm, setShowForm] = useState(false);
  const [matieres, setMatieres] = useState(MATIERES);
  const [form, setForm] = useState({ nom: "", coef: "", noteMax: "20", classe: "CM1" });

  const handleAdd = () => {
    if (!form.nom || !form.coef) return;
    setMatieres((prev) => [...prev, { id: prev.length + 1, ...form, coef: Number(form.coef), noteMax: Number(form.noteMax) }]);
    setForm({ nom: "", coef: "", noteMax: "20", classe: "CM1" });
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>Matières & Cours</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ backgroundColor: "#AD56C4", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 22px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
        >
          + Nouvelle matière
        </button>
      </div>

      {showForm && (
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
            gap: "12px",
            alignItems: "end",
          }}
        >
          {[
            { label: "Nom", field: "nom", placeholder: "Ex: Géographie" },
            { label: "Coefficient", field: "coef", placeholder: "Ex: 2", type: "number" },
            { label: "Note max", field: "noteMax", placeholder: "20", type: "number" },
          ].map((f) => (
            <div key={f.field}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#555", marginBottom: "6px" }}>{f.label}</label>
              <input
                type={f.type || "text"}
                placeholder={f.placeholder}
                value={form[f.field]}
                onChange={(e) => setForm((p) => ({ ...p, [f.field]: e.target.value }))}
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #ddd", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>
          ))}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#555", marginBottom: "6px" }}>Classe</label>
            <select
              value={form.classe}
              onChange={(e) => setForm((p) => ({ ...p, classe: e.target.value }))}
              style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #ddd", borderRadius: "8px", fontSize: "14px" }}
            >
              {CLASSES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={handleAdd} style={{ backgroundColor: "#AD56C4", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
            Ajouter
          </button>
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden" }}>
          <thead>
            <tr style={{ backgroundColor: "#AD56C4", color: "#fff" }}>
              {["#", "Matière", "Coefficient", "Note max", "Classe", "Actions"].map((h) => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: "14px", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matieres.map((m, i) => (
              <tr key={m.id} style={{ backgroundColor: i % 2 === 0 ? "#faf5ff" : "#fff" }}>
                <td style={{ padding: "12px 16px", color: "#999", fontSize: "13px" }}>{i + 1}</td>
                <td style={{ padding: "12px 16px", fontWeight: 700, color: "#1a1a2e" }}>{m.nom}</td>
                <td style={{ padding: "12px 16px", color: "#555" }}>Coef. {m.coef}</td>
                <td style={{ padding: "12px 16px", color: "#555" }}>{m.noteMax}/20</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ backgroundColor: "#f3e8ff", color: "#AD56C4", padding: "3px 12px", borderRadius: "50px", fontSize: "13px", fontWeight: 600 }}>
                    {m.classe}
                  </span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <button style={{ background: "none", border: "1px solid #AD56C4", color: "#AD56C4", borderRadius: "6px", padding: "5px 14px", fontSize: "13px", cursor: "pointer" }}>
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Page principale ────────────────────────────────────────────────────
const ONGLETS = ["Vue générale", "Salles", "Emploi de temps", "Affectations", "Matière"];

export default function GestionSalles() {
  const [onglet, setOnglet] = useState("Vue générale");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { label: "Tableau de bord", icon: "🏠", path: "/admin" },
    { label: "Élèves", icon: "🎓", path: "/admin/eleves" },
    { label: "Finance", icon: "💰", path: "/admin/finance" },
    { label: "Personnel", icon: "👥", path: "/admin/personnel" },
    { label: "Salles & Cours", icon: "🏫", path: "/admin/salles", active: true },
    { label: "Messages", icon: "✉️", path: "/admin/messages" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#EFF7F6" }}>

      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? "220px" : "60px",
          backgroundColor: "#AD56C4",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.25s",
          flexShrink: 0,
          position: "relative",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "20px 16px 10px", borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
          {sidebarOpen && (
            <span style={{ fontWeight: 800, fontSize: "18px", color: "#fff", letterSpacing: "0.5px" }}>
              DIGISCHOOL
            </span>
          )}
        </div>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: "absolute",
            top: "20px",
            right: "-12px",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            border: "2px solid #AD56C4",
            cursor: "pointer",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 0" }}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 18px",
                textDecoration: "none",
                backgroundColor: item.active ? "rgba(255,255,255,0.25)" : "transparent",
                color: "#fff",
                fontSize: "14px",
                fontWeight: item.active ? 700 : 500,
                borderLeft: item.active ? "4px solid #fff" : "4px solid transparent",
                transition: "background-color 0.15s",
              }}
            >
              <span style={{ fontSize: "18px", flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Topbar */}
        <div
          style={{
            backgroundColor: "#EFF7F6",
            padding: "14px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #dde8e6",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#AD56C4", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "16px" }}>
              👤
            </div>
            <span style={{ fontWeight: 700, fontSize: "18px", color: "#1a1a2e" }}>Bienvenue</span>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <select style={{ padding: "8px 16px", border: "1.5px solid #AD56C4", borderRadius: "8px", backgroundColor: "#fff", color: "#AD56C4", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
              <option>Français</option>
              <option>English</option>
            </select>
            <select style={{ padding: "8px 16px", border: "1.5px solid #AD56C4", borderRadius: "8px", backgroundColor: "#fff", color: "#AD56C4", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
              <option>2025-2026</option>
              <option>2024-2025</option>
            </select>
            <button style={{ backgroundColor: "#AD56C4", color: "#fff", border: "none", borderRadius: "50px", padding: "10px 22px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
              Déconnexion
            </button>
          </div>
        </div>

        {/* Onglets */}
        <div style={{ backgroundColor: "#C9A0DC", display: "flex" }}>
          {ONGLETS.map((tab) => (
            <button
              key={tab}
              onClick={() => setOnglet(tab)}
              style={{
                flex: 1,
                padding: "16px 8px",
                border: "none",
                backgroundColor: onglet === tab ? "rgba(255,255,255,0.25)" : "transparent",
                color: onglet === tab ? "#fff" : "rgba(255,255,255,0.75)",
                fontSize: "16px",
                fontWeight: onglet === tab ? 800 : 600,
                cursor: "pointer",
                borderBottom: onglet === tab ? "3px solid #fff" : "3px solid transparent",
                transition: "all 0.15s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
          {onglet === "Vue générale"    && <VueGenerale />}
          {onglet === "Salles"          && <GestionSallesTab />}
          {onglet === "Emploi de temps" && <EmploiDuTemps />}
          {onglet === "Affectations"    && <Affectations />}
          {onglet === "Matière"         && <Matieres />}
        </div>
      </div>
    </div>
  );
}
