import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link } from "react-router-dom";

const ELEVES = [
  { matricule: "CE1A2018", nom: "TANKEO ENNA", classe: "CE1 A", sexe: "F", paiement: "1ère Tranche", statut: "Actif" },
  { matricule: "CE1A2019", nom: "MBIDA PAUL", classe: "CE1 A", sexe: "M", paiement: "Complet", statut: "Actif" },
  { matricule: "CM2B2020", nom: "FOTSO MARIE", classe: "CM2 B", sexe: "F", paiement: "En retard", statut: "Actif" },
  { matricule: "SIL2021", nom: "NKOA JEAN", classe: "SIL A", sexe: "M", paiement: "1ère Tranche", statut: "Actif" },
  { matricule: "CP2022", nom: "ESSOMBA ALICE", classe: "CP B", sexe: "F", paiement: "2ème Tranche", statut: "Actif" },
  { matricule: "CE2A2021", nom: "BELLO OMAR", classe: "CE2 A", sexe: "M", paiement: "Complet", statut: "Actif" },
  { matricule: "CM1A2020", nom: "NGUEMA SARAH", classe: "CM1 A", sexe: "F", paiement: "En retard", statut: "Inactif" },
  { matricule: "CE1B2022", nom: "TAGNE BORIS", classe: "CE1 B", sexe: "M", paiement: "1ère Tranche", statut: "Actif" },
];

const NOTES = [
  { matricule: "CE1A2018", nom: "TANKEO ENNA", classe: "CE1 A", maths: 17, francais: 15, eveil: 14, moyenne: 15.3, rang: 1 },
  { matricule: "CE1A2019", nom: "MBIDA PAUL", classe: "CE1 A", maths: 12, francais: 14, eveil: 13, moyenne: 13.0, rang: 3 },
  { matricule: "CM2B2020", nom: "FOTSO MARIE", classe: "CM2 B", maths: 16, francais: 18, eveil: 15, moyenne: 16.3, rang: 1 },
  { matricule: "SIL2021", nom: "NKOA JEAN", classe: "SIL A", maths: 10, francais: 12, eveil: 11, moyenne: 11.0, rang: 5 },
  { matricule: "CP2022", nom: "ESSOMBA ALICE", classe: "CP B", maths: 14, francais: 16, eveil: 15, moyenne: 15.0, rang: 2 },
];

const DISCIPLINES = [
  { matricule: "CE1A2019", nom: "MBIDA PAUL", classe: "CE1 A", faute: "Bavardage", points: 2, date: "2026-01-15", statut: "Noté" },
  { matricule: "CM2B2020", nom: "FOTSO MARIE", classe: "CM2 B", faute: "Absence injustifiée", points: 5, date: "2026-01-18", statut: "Validé" },
  { matricule: "SIL2021", nom: "NKOA JEAN", classe: "SIL A", faute: "Retard répété", points: 3, date: "2026-01-20", statut: "Noté" },
  { matricule: "CE1B2022", nom: "TAGNE BORIS", classe: "CE1 B", faute: "Insolence", points: 8, date: "2026-01-22", statut: "En attente" },
];

const paiementColor = {
  Complet: { color: "#059669", background: "#ECFDF5" },
  "1ère Tranche": { color: "#D97706", background: "#FFFBEB" },
  "2ème Tranche": { color: "#2563EB", background: "#EFF6FF" },
  "En retard": { color: "#DC2626", background: "#FEF2F2" },
};

const statutColor = {
  Actif: { color: "#059669", background: "#ECFDF5" },
  Inactif: { color: "#888", background: "#F5F5F5" },
};

const disciplineStatut = {
  Noté: { color: "#D97706", background: "#FFFBEB" },
  Validé: { color: "#059669", background: "#ECFDF5" },
  "En attente": { color: "#DC2626", background: "#FEF2F2" },
};

const TABS = [
  { id: "liste", label: "Liste des élèves" },
  { id: "inscription", label: "Inscription" },
  { id: "examen", label: "Notes & Examens" },
  { id: "discipline", label: "Discipline" },
];

export default function GestionEleve() {
  const [activeTab, setActiveTab] = useState("liste");
  const [search, setSearch] = useState("");
  const [classeFilter, setClasseFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nom: "", prenom: "", sexe: "M", dateNaissance: "", lieuNaissance: "",
    classe: "", langue: "Français", parent: "", telephone: "",
  });

  const classes = [...new Set(ELEVES.map((e) => e.classe))].sort();

  const filtered = ELEVES.filter((e) => {
    const matchSearch =
      !search ||
      e.nom.toLowerCase().includes(search.toLowerCase()) ||
      e.matricule.toLowerCase().includes(search.toLowerCase());
    const matchClasse = !classeFilter || e.classe === classeFilter;
    return matchSearch && matchClasse;
  });

  return (
    <AdminLayout title="Gestion des élèves" userName="Admin">
      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 20,
          borderBottom: "2px solid #EAE0F5",
          paddingBottom: 0,
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 20px",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              color: activeTab === tab.id ? "#AD56C4" : "#888",
              borderBottom: activeTab === tab.id ? "3px solid #AD56C4" : "3px solid transparent",
              marginBottom: -2,
              transition: "color 0.15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ===== LISTE DES ÉLÈVES ===== */}
      {activeTab === "liste" && (
        <div>
          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 16,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="🔍  Rechercher par nom ou matricule…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                minWidth: 220,
                padding: "9px 14px",
                borderRadius: 8,
                border: "1px solid #E0D0EE",
                fontSize: 13,
                outline: "none",
              }}
            />
            <select
              value={classeFilter}
              onChange={(e) => setClasseFilter(e.target.value)}
              style={{
                padding: "9px 14px",
                borderRadius: 8,
                border: "1px solid #E0D0EE",
                fontSize: 13,
                color: "#444",
                background: "#fff",
              }}
            >
              <option value="">Toutes les classes</option>
              {classes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <button
              onClick={() => setShowModal(true)}
              style={{
                background: "#AD56C4",
                color: "#fff",
                border: "none",
                padding: "9px 20px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              ➕ Nouvel élève
            </button>
            <button
              style={{
                background: "#fff",
                color: "#AD56C4",
                border: "1px solid #D0A9D0",
                padding: "9px 16px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ⬇ Exporter
            </button>
          </div>

          {/* Table */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              border: "1px solid #EAE0F5",
              overflow: "hidden",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#FAF5FF" }}>
                    {["Matricule", "Nom & Prénom(s)", "Classe", "Sexe", "Paiement", "Statut", "Actions"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "11px 16px",
                          textAlign: "left",
                          fontWeight: 600,
                          color: "#777",
                          borderBottom: "1px solid #EAE0F5",
                          whiteSpace: "nowrap",
                          fontSize: 12,
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: 32, textAlign: "center", color: "#aaa" }}>
                        Aucun élève trouvé.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((s, i) => (
                      <tr
                        key={s.matricule}
                        style={{
                          borderBottom: i < filtered.length - 1 ? "1px solid #FAF5FF" : "none",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF5FF")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td style={{ padding: "12px 16px", color: "#AD56C4", fontWeight: 700, fontFamily: "monospace" }}>
                          {s.matricule}
                        </td>
                        <td style={{ padding: "12px 16px", fontWeight: 600, color: "#1a1a2e" }}>
                          {s.nom}
                        </td>
                        <td style={{ padding: "12px 16px", color: "#555" }}>{s.classe}</td>
                        <td style={{ padding: "12px 16px", color: "#555" }}>{s.sexe}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              padding: "3px 10px",
                              borderRadius: 20,
                              ...(paiementColor[s.paiement] || { color: "#555", background: "#f5f5f5" }),
                            }}
                          >
                            {s.paiement}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              padding: "3px 10px",
                              borderRadius: 20,
                              ...(statutColor[s.statut] || {}),
                            }}
                          >
                            {s.statut}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", gap: 6 }}>
                            <Link
                              to={`/admin/eleves/${s.matricule}`}
                              style={{
                                fontSize: 11,
                                padding: "4px 10px",
                                borderRadius: 6,
                                border: "1px solid #D0A9D0",
                                color: "#AD56C4",
                                textDecoration: "none",
                                fontWeight: 600,
                              }}
                            >
                              Voir
                            </Link>
                            <button
                              style={{
                                fontSize: 11,
                                padding: "4px 10px",
                                borderRadius: 6,
                                border: "1px solid #EAE0F5",
                                color: "#666",
                                background: "none",
                                cursor: "pointer",
                                fontWeight: 500,
                              }}
                            >
                              Modifier
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div
              style={{
                padding: "10px 16px",
                borderTop: "1px solid #FAF5FF",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 12,
                color: "#888",
              }}
            >
              <span>{filtered.length} élève(s) affiché(s)</span>
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      border: "1px solid #E0D0EE",
                      background: p === 1 ? "#AD56C4" : "#fff",
                      color: p === 1 ? "#fff" : "#666",
                      fontSize: 12,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== INSCRIPTION ===== */}
      {activeTab === "inscription" && (
        <div style={{ maxWidth: 720 }}>
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              border: "1px solid #EAE0F5",
              padding: 28,
            }}
          >
            <h2 style={{ margin: "0 0 24px", fontSize: 16, fontWeight: 700, color: "#1a1a2e" }}>
              📋 Nouvelle inscription d'élève
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={labelStyle}>Nom</label>
                <input
                  style={inputStyle}
                  placeholder="Ex: TANKEO"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Prénom(s)</label>
                <input
                  style={inputStyle}
                  placeholder="Ex: ENNA Marie"
                  value={form.prenom}
                  onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Sexe</label>
                <select
                  style={inputStyle}
                  value={form.sexe}
                  onChange={(e) => setForm({ ...form, sexe: e.target.value })}
                >
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Date de naissance</label>
                <input
                  type="date"
                  style={inputStyle}
                  value={form.dateNaissance}
                  onChange={(e) => setForm({ ...form, dateNaissance: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Lieu de naissance</label>
                <input
                  style={inputStyle}
                  placeholder="Ex: Yaoundé"
                  value={form.lieuNaissance}
                  onChange={(e) => setForm({ ...form, lieuNaissance: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Classe</label>
                <select
                  style={inputStyle}
                  value={form.classe}
                  onChange={(e) => setForm({ ...form, classe: e.target.value })}
                >
                  <option value="">-- Sélectionner --</option>
                  {["SIL A", "SIL B", "CP A", "CP B", "CE1 A", "CE1 B", "CE2 A", "CM1 A", "CM2 A", "CM2 B"].map(
                    (c) => <option key={c}>{c}</option>
                  )}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Langue d'enseignement</label>
                <select
                  style={inputStyle}
                  value={form.langue}
                  onChange={(e) => setForm({ ...form, langue: e.target.value })}
                >
                  <option>Français</option>
                  <option>Anglais</option>
                  <option>Bilingue</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Nom du parent / tuteur</label>
                <input
                  style={inputStyle}
                  placeholder="Ex: TANKEO Robert"
                  value={form.parent}
                  onChange={(e) => setForm({ ...form, parent: e.target.value })}
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Téléphone du parent</label>
                <input
                  type="tel"
                  style={inputStyle}
                  placeholder="Ex: +237 6XX XXX XXX"
                  value={form.telephone}
                  onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Photo de l'élève (optionnel)</label>
                <input
                  type="file"
                  accept="image/*"
                  style={{ ...inputStyle, padding: "8px 12px" }}
                />
              </div>
            </div>

            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <button
                style={{
                  background: "#AD56C4",
                  color: "#fff",
                  border: "none",
                  padding: "11px 28px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={() => alert("Élève enregistré avec succès !")}
              >
                ✅ Enregistrer l'inscription
              </button>
              <button
                style={{
                  background: "#fff",
                  color: "#888",
                  border: "1px solid #E0D0EE",
                  padding: "11px 20px",
                  borderRadius: 8,
                  fontSize: 14,
                  cursor: "pointer",
                }}
                onClick={() =>
                  setForm({
                    nom: "", prenom: "", sexe: "M", dateNaissance: "",
                    lieuNaissance: "", classe: "", langue: "Français", parent: "", telephone: "",
                  })
                }
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== NOTES & EXAMENS ===== */}
      {activeTab === "examen" && (
        <div>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 16,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <select style={{ ...inputStyle, width: "auto" }}>
              <option>Trimestre 1</option>
              <option>Trimestre 2</option>
              <option>Trimestre 3</option>
            </select>
            <select style={{ ...inputStyle, width: "auto" }}>
              <option>Toutes les classes</option>
              {classes.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select style={{ ...inputStyle, width: "auto" }}>
              <option>CC1</option>
              <option>CC2</option>
              <option>Examen</option>
              <option>Devoir mercredi</option>
            </select>
            <button
              style={{
                marginLeft: "auto",
                background: "#AD56C4",
                color: "#fff",
                border: "none",
                padding: "9px 18px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              📥 Téléverser une épreuve
            </button>
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              border: "1px solid #EAE0F5",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#FAF5FF" }}>
                  {["Matricule", "Nom & Prénom(s)", "Classe", "Maths /20", "Français /20", "Éveil /20", "Moyenne", "Rang"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "11px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#777",
                        borderBottom: "1px solid #EAE0F5",
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: 0.3,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {NOTES.map((n, i) => (
                  <tr
                    key={n.matricule}
                    style={{ borderBottom: i < NOTES.length - 1 ? "1px solid #FAF5FF" : "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF5FF")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "12px 16px", color: "#AD56C4", fontFamily: "monospace", fontWeight: 600 }}>{n.matricule}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 600 }}>{n.nom}</td>
                    <td style={{ padding: "12px 16px", color: "#666" }}>{n.classe}</td>
                    {[n.maths, n.francais, n.eveil].map((note, idx) => (
                      <td key={idx} style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            color: note >= 16 ? "#059669" : note >= 10 ? "#1a1a2e" : "#DC2626",
                            fontWeight: 600,
                          }}
                        >
                          {note}
                        </span>
                        <span style={{ color: "#aaa", fontSize: 11 }}>/20</span>
                      </td>
                    ))}
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          fontWeight: 700,
                          color: n.moyenne >= 14 ? "#059669" : n.moyenne >= 10 ? "#D97706" : "#DC2626",
                        }}
                      >
                        {n.moyenne.toFixed(1)}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: n.rang === 1 ? "#FEF08A" : "#F5F5F5",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 700,
                          color: n.rang === 1 ? "#854D0E" : "#555",
                        }}
                      >
                        {n.rang}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== DISCIPLINE ===== */}
      {activeTab === "discipline" && (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
            <button
              style={{
                background: "#AD56C4",
                color: "#fff",
                border: "none",
                padding: "9px 18px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ➕ Nouveau rapport
            </button>
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              border: "1px solid #EAE0F5",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#FAF5FF" }}>
                  {["Matricule", "Élève", "Classe", "Faute", "Points", "Date", "Statut", "Actions"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "11px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#777",
                        borderBottom: "1px solid #EAE0F5",
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: 0.3,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DISCIPLINES.map((d, i) => (
                  <tr
                    key={i}
                    style={{ borderBottom: i < DISCIPLINES.length - 1 ? "1px solid #FAF5FF" : "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF5FF")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "12px 16px", color: "#AD56C4", fontFamily: "monospace", fontWeight: 600 }}>{d.matricule}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 600 }}>{d.nom}</td>
                    <td style={{ padding: "12px 16px", color: "#666" }}>{d.classe}</td>
                    <td style={{ padding: "12px 16px", color: "#444" }}>{d.faute}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          fontWeight: 700,
                          color: d.points >= 7 ? "#DC2626" : d.points >= 4 ? "#D97706" : "#059669",
                        }}
                      >
                        {d.points} pts
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#666", fontSize: 12 }}>{d.date}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 20,
                          ...(disciplineStatut[d.statut] || { color: "#555", background: "#f0f0f0" }),
                        }}
                      >
                        {d.statut}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <button
                        style={{
                          fontSize: 11,
                          padding: "4px 10px",
                          borderRadius: 6,
                          border: "1px solid #D0A9D0",
                          color: "#AD56C4",
                          background: "none",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        Détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal nouvelle inscription */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: 28,
              maxWidth: 500,
              width: "90%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Inscrire un élève</h2>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#999" }}
              >
                ✕
              </button>
            </div>
            <p style={{ color: "#888", fontSize: 13, margin: "0 0 16px" }}>
              Utilisez l'onglet <strong>Inscription</strong> pour le formulaire complet.
            </p>
            <button
              onClick={() => { setShowModal(false); setActiveTab("inscription"); }}
              style={{
                width: "100%",
                background: "#AD56C4",
                color: "#fff",
                border: "none",
                padding: 12,
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Aller au formulaire d'inscription →
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

const labelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "#666",
  marginBottom: 5,
  textTransform: "uppercase",
  letterSpacing: 0.4,
};

const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: 8,
  border: "1px solid #E0D0EE",
  fontSize: 13,
  color: "#1a1a2e",
  outline: "none",
  boxSizing: "border-box",
  background: "#FDFAFF",
};
