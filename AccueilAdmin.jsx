import AdminLayout from "../components/AdminLayout";
import { Link } from "react-router-dom";

const kpis = [
  { label: "Élèves inscrits", value: "347", icon: "🎓", color: "#AD56C4", bg: "#F5E8FB" },
  { label: "Enseignants", value: "24", icon: "👩‍🏫", color: "#2563EB", bg: "#EFF6FF" },
  { label: "Classes actives", value: "18", icon: "🏫", color: "#059669", bg: "#ECFDF5" },
  { label: "Paiements du jour", value: "12", icon: "💳", color: "#D97706", bg: "#FFFBEB" },
];

const recentStudents = [
  { matricule: "CE1A2018", nom: "TANKEO ENNA", classe: "CE1 A", sexe: "F", paiement: "1ère Tranche" },
  { matricule: "CE1A2019", nom: "MBIDA PAUL", classe: "CE1 A", sexe: "M", paiement: "Complet" },
  { matricule: "CM2B2020", nom: "FOTSO MARIE", classe: "CM2 B", sexe: "F", paiement: "En retard" },
  { matricule: "SIL2021", nom: "NKOA JEAN", classe: "SIL A", sexe: "M", paiement: "1ère Tranche" },
  { matricule: "CP2022", nom: "ESSOMBA ALICE", classe: "CP B", sexe: "F", paiement: "2ème Tranche" },
];

const paiementColor = {
  "Complet": { color: "#059669", bg: "#ECFDF5" },
  "1ère Tranche": { color: "#D97706", bg: "#FFFBEB" },
  "2ème Tranche": { color: "#2563EB", bg: "#EFF6FF" },
  "En retard": { color: "#DC2626", bg: "#FEF2F2" },
};

const quickActions = [
  { label: "Nouvelle inscription", icon: "➕", to: "/admin/eleves/nouveau" },
  { label: "Saisir un paiement", icon: "💰", to: "/admin/finance/paiement" },
  { label: "Envoyer un message", icon: "✉️", to: "/admin/messages/nouveau" },
  { label: "Générer un bulletin", icon: "📄", to: "/admin/bulletins" },
];

export default function AccueilAdmin() {
  return (
    <AdminLayout title="Tableau de bord" userName="Admin">
      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {kpis.map((k) => (
          <div
            key={k.label}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "20px 22px",
              border: "1px solid #EAE0F5",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: k.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              {k.icon}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 12, color: "#888", fontWeight: 500 }}>{k.label}</p>
              <p style={{ margin: "4px 0 0", fontSize: 26, fontWeight: 700, color: k.color }}>
                {k.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, alignItems: "start" }}>
        {/* Students Table */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            border: "1px solid #EAE0F5",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #F0E8F8",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#1a1a2e" }}>
              Élèves récents
            </h2>
            <Link
              to="/admin/eleves"
              style={{
                fontSize: 12,
                color: "#AD56C4",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Voir tout →
            </Link>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#FAF5FF" }}>
                  {["Matricule", "Nom & Prénom(s)", "Classe", "Sexe", "Paiement"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#666",
                        borderBottom: "1px solid #F0E8F8",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((s, i) => (
                  <tr
                    key={s.matricule}
                    style={{
                      borderBottom: i < recentStudents.length - 1 ? "1px solid #FAF5FF" : "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF5FF")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "12px 16px", color: "#AD56C4", fontWeight: 600, fontFamily: "monospace" }}>
                      {s.matricule}
                    </td>
                    <td style={{ padding: "12px 16px", fontWeight: 500, color: "#1a1a2e" }}>
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
                          ...(paiementColor[s.paiement] || { color: "#555", bg: "#f0f0f0" }),
                          background: (paiementColor[s.paiement] || {}).bg,
                        }}
                      >
                        {s.paiement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            border: "1px solid #EAE0F5",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #F0E8F8",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#1a1a2e" }}>
              Actions rapides
            </h2>
          </div>
          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            {quickActions.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  borderRadius: 10,
                  border: "1px solid #EAE0F5",
                  textDecoration: "none",
                  color: "#1a1a2e",
                  fontSize: 13,
                  fontWeight: 500,
                  transition: "background 0.15s, border-color 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#FAF5FF";
                  e.currentTarget.style.borderColor = "#D0A9D0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "#EAE0F5";
                }}
              >
                <span style={{ fontSize: 20 }}>{a.icon}</span>
                {a.label}
              </Link>
            ))}
          </div>

          {/* Upcoming */}
          <div
            style={{
              padding: "16px 20px",
              borderTop: "1px solid #F0E8F8",
            }}
          >
            <h3 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: "#888" }}>
              PROCHAINES ÉCHÉANCES
            </h3>
            {[
              { label: "Tranche 2 — CE1", date: "31 Jan" },
              { label: "Remise bulletins T1", date: "05 Fév" },
              { label: "Réunion parents", date: "10 Fév" },
            ].map((e) => (
              <div
                key={e.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #FAF5FF",
                  fontSize: 12,
                }}
              >
                <span style={{ color: "#444" }}>{e.label}</span>
                <span
                  style={{
                    background: "#EFF7F6",
                    color: "#0D9488",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: 6,
                  }}
                >
                  {e.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
