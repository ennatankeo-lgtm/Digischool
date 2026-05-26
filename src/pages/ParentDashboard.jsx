import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from "recharts";

/* ══════════════════════════════════════════════════════════
   DONNÉES FICTIVES — à remplacer par les appels API réels
══════════════════════════════════════════════════════════ */
const PARENT = { name: "Marie Tankeo", avatar: null };

const CHILDREN = [
  { id: 1, name: "Emma Tankeo",  classe: "CE2 A", matricule: "EL-2024-001", age: 9,  langue: "Français" },
  { id: 2, name: "Paul Mbarga",  classe: "CM1 B", matricule: "EL-2024-002", age: 11, langue: "Français" },
];

const GRADES = {
  1: [
    { id: 1, subject: "Mathématiques", type: "CC1",    score: 15, max: 20, date: "Jan 2026" },
    { id: 2, subject: "Français",      type: "Devoir", score: 13, max: 20, date: "Jan 2026" },
    { id: 3, subject: "Sciences",      type: "CC2",    score: 17, max: 20, date: "Fév 2026" },
    { id: 4, subject: "Histoire",      type: "CC1",    score: 14, max: 20, date: "Fév 2026" },
    { id: 5, subject: "Mathématiques", type: "CC2",    score: 16, max: 20, date: "Mar 2026" },
    { id: 6, subject: "Français",      type: "CC2",    score: 12, max: 20, date: "Mar 2026" },
  ],
  2: [
    { id: 1, subject: "Mathématiques", type: "CC1",    score: 12, max: 20, date: "Jan 2026" },
    { id: 2, subject: "Français",      type: "Devoir", score:  9, max: 20, date: "Jan 2026" },
    { id: 3, subject: "Sciences",      type: "CC1",    score: 14, max: 20, date: "Fév 2026" },
    { id: 4, subject: "Histoire",      type: "CC2",    score: 11, max: 20, date: "Fév 2026" },
    { id: 5, subject: "Mathématiques", type: "CC2",    score: 13, max: 20, date: "Mar 2026" },
    { id: 6, subject: "Français",      type: "CC2",    score: 10, max: 20, date: "Mar 2026" },
  ],
};

const DISCIPLINE = {
  1: [
    { id: 1, date: "12/03/2026", reason: "Retard répété", note: "Avertissement verbal", gravite: "légère" },
  ],
  2: [],
};

const PAYMENTS = {
  1: [
    { id: 1, tranche: "Tranche 1", montant: 45000, statut: "payé",      date: "05/01/2026" },
    { id: 2, tranche: "Tranche 2", montant: 45000, statut: "en retard", date: null },
    { id: 3, tranche: "Tranche 3", montant: 45000, statut: "à venir",   date: null },
  ],
  2: [
    { id: 1, tranche: "Tranche 1", montant: 50000, statut: "payé",    date: "07/01/2026" },
    { id: 2, tranche: "Tranche 2", montant: 50000, statut: "payé",    date: "03/03/2026" },
    { id: 3, tranche: "Tranche 3", montant: 50000, statut: "à venir", date: null },
  ],
};

const HOMEWORKS = {
  1: [
    { id: 1, subject: "Mathématiques", title: "Exercices 1 à 5 p.42",   due: "28/05/2026", file: "maths_devoir3.pdf" },
    { id: 2, subject: "Français",      title: "Lecture + résumé Ch.4",  due: "30/05/2026", file: "francais_lecture.pdf" },
    { id: 3, subject: "Sciences",      title: "Schéma du cycle de l'eau", due: "02/06/2026", file: "sciences_schema.pdf" },
  ],
  2: [
    { id: 1, subject: "Mathématiques", title: "Fractions — fiche 7",    due: "28/05/2026", file: "maths_fractions.pdf" },
    { id: 2, subject: "Histoire",      title: "Frise chronologique",    due: "31/05/2026", file: "histoire_frise.pdf" },
  ],
};

const MESSAGES_DATA = [
  { id: 1, from: "Direction",   subject: "Réunion parents — 15 juin",    date: "20/05/2026", read: false, body: "Chère madame, nous vous convions à une réunion parents-professeurs le 15 juin 2026 à 15h." },
  { id: 2, from: "Scolarité",   subject: "Rappel paiement Tranche 2",    date: "18/05/2026", read: true,  body: "Nous vous rappelons que la Tranche 2 est due depuis le 1er mai. Merci de régulariser votre situation." },
  { id: 3, from: "M. Essomba",  subject: "Résultats CC2 Mathématiques",  date: "14/05/2026", read: true,  body: "Les résultats du CC2 de mathématiques sont disponibles. Votre enfant a obtenu 15/20." },
];

/* ══════════════════════════════════════════════════════════
   UTILITAIRES
══════════════════════════════════════════════════════════ */
const C = {
  primary:   "#8B3FA8",
  primaryLt: "#F3E8FA",
  primaryMd: "#C77DDD",
  accent:    "#F59E0B",
  success:   "#059669",
  danger:    "#DC2626",
  warning:   "#D97706",
  text:      "#1A1A2E",
  muted:     "#6B7280",
  border:    "#EDE9F3",
  bg:        "#F7F4FC",
  card:      "#FFFFFF",
};

function initials(name) {
  return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
}

function moyenne(grades) {
  if (!grades || !grades.length) return null;
  const s = grades.reduce((acc, g) => acc + (g.score / g.max) * 20, 0);
  return (s / grades.length).toFixed(1);
}

function scoreColor(score, max) {
  const p = score / max;
  if (p >= 0.75) return C.success;
  if (p >= 0.5)  return C.warning;
  return C.danger;
}

function statutStyle(s) {
  if (s === "payé")       return { bg: "#D1FAE5", color: C.success,  label: "Payé ✓" };
  if (s === "en retard")  return { bg: "#FEE2E2", color: C.danger,   label: "En retard !" };
  return                         { bg: "#F3F4F6", color: C.muted,    label: "À venir" };
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

function downloadHomework(hw) {
  downloadText(hw.file, `[Simulation] Devoir — ${hw.subject}\n${hw.title}\nÀ rendre le : ${hw.due}\n`);
}

function downloadBulletin(child) {
  const grades = GRADES[child.id] || [];
  const lines = [
    `BULLETIN DE NOTES — ${child.name}`,
    `Classe : ${child.classe} | Matricule : ${child.matricule}`,
    `Année académique : 2025-2026`,
    "─".repeat(48),
    ...grades.map(g => `${g.subject.padEnd(18)} [${g.type.padEnd(6)}]  ${g.score}/${g.max}`),
    "─".repeat(48),
    `Moyenne générale : ${moyenne(grades)}/20`,
  ];
  downloadText(`bulletin_${child.name.replaceAll(" ", "_")}.txt`, lines.join("\n"));
}

/* ══════════════════════════════════════════════════════════
   GRAPHIQUES
══════════════════════════════════════════════════════════ */

/* Radar par matière */
function RadarNotes({ grades }) {
  const bySubject = {};
  grades.forEach(g => {
    if (!bySubject[g.subject]) bySubject[g.subject] = [];
    bySubject[g.subject].push((g.score / g.max) * 20);
  });
  const data = Object.entries(bySubject).map(([subj, scores]) => ({
    subject: subj.length > 8 ? subj.slice(0, 8) + "." : subj,
    moyenne: parseFloat((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)),
    fullMark: 20,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={data}>
        <PolarGrid stroke={C.border} />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: C.muted }} />
        <Radar name="Moyenne" dataKey="moyenne" stroke={C.primary} fill={C.primary} fillOpacity={0.25} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

/* Bar chart notes dans le temps */
function BarNotes({ grades }) {
  const data = grades.map(g => ({
    name: `${g.subject.slice(0,4)}. ${g.type}`,
    note: g.score,
    max: g.max,
  }));
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: C.muted }} angle={-35} textAnchor="end" interval={0} />
        <YAxis domain={[0, 20]} tick={{ fontSize: 11, fill: C.muted }} />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12 }}
          formatter={(v) => [`${v}/20`, "Note"]}
        />
        <Bar dataKey="note" fill={C.primary} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* Line chart évolution dans le temps */
function LineEvolution({ grades }) {
  const byDate = {};
  grades.forEach(g => {
    if (!byDate[g.date]) byDate[g.date] = [];
    byDate[g.date].push((g.score / g.max) * 20);
  });
  const data = Object.entries(byDate).map(([date, scores]) => ({
    date,
    moyenne: parseFloat((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)),
  }));
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: C.muted }} />
        <YAxis domain={[0, 20]} tick={{ fontSize: 11, fill: C.muted }} />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12 }}
          formatter={(v) => [`${v}/20`, "Moy."]}
        />
        <Line type="monotone" dataKey="moyenne" stroke={C.primary} strokeWidth={2.5} dot={{ r: 4, fill: C.primary }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

/* Bar paiements */
function BarPaiements({ payments }) {
  const data = payments.map(p => ({
    name: p.tranche,
    montant: p.statut === "payé" ? p.montant : 0,
    restant: p.statut !== "payé" ? p.montant : 0,
  }));
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: C.muted }} />
        <YAxis tick={{ fontSize: 10, fill: C.muted }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12 }}
          formatter={(v) => [`${v.toLocaleString("fr-CM")} XAF`]}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="montant" name="Payé"    fill={C.success} radius={[4,4,0,0]} stackId="a" />
        <Bar dataKey="restant" name="Restant" fill="#FCA5A5"   radius={[4,4,0,0]} stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ══════════════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════════════ */
const NAV_SECTIONS = [
  {
    title: "GÉNÉRAL",
    items: [
      { key: "dashboard",  icon: "⊞",  label: "Tableau de bord" },
      { key: "messages",   icon: "✉",  label: "Messages",        badge: true },
    ],
  },
  {
    title: "MES ENFANTS",
    items: "children", // généré dynamiquement
  },
];

function Sidebar({ activeKey, onNav, children, unread, onLogout }) {
  return (
    <aside style={{
      width: 248, minHeight: "100vh", background: C.text,
      display: "flex", flexDirection: "column", padding: "0 0 20px 0",
      flexShrink: 0,
    }}>
      {/* Brand */}
      <div style={{ padding: "24px 20px 20px", borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: C.primary, display: "flex", alignItems: "center",
            justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16,
          }}>E</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>EcoleApp</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>Espace Parent</div>
          </div>
        </div>

        {/* Profil parent */}
        <div style={{
          marginTop: 16, display: "flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "10px 12px",
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: C.primaryMd, display: "flex", alignItems: "center",
            justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13,
          }}>
            {initials(PARENT.name)}
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{PARENT.name}</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Parent</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
        {/* Général */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontWeight: 700, letterSpacing: 1.2, padding: "0 8px 8px" }}>
            GÉNÉRAL
          </div>
          {[
            { key: "dashboard", icon: "⊞", label: "Tableau de bord" },
            { key: "messages",  icon: "✉", label: "Messages", badge: unread },
          ].map(item => (
            <NavBtn key={item.key} item={item} active={activeKey === item.key} onClick={() => onNav(item.key)} />
          ))}
        </div>

        {/* Par enfant */}
        <div>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontWeight: 700, letterSpacing: 1.2, padding: "0 8px 8px" }}>
            MES ENFANTS
          </div>
          {children.map(child => (
            <div key={child.id} style={{ marginBottom: 4 }}>
              <button
                onClick={() => onNav(`child-${child.id}-overview`)}
                style={{
                  ...navBtnBase,
                  ...(activeKey.startsWith(`child-${child.id}`) ? navBtnActiveStyle : {}),
                }}
              >
                <div style={{
                  width: 26, height: 26, borderRadius: 6,
                  background: activeKey.startsWith(`child-${child.id}`) ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0,
                }}>
                  {initials(child.name)}
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{child.name.split(" ")[0]}</div>
                  <div style={{ fontSize: 10, opacity: 0.5 }}>{child.classe}</div>
                </div>
              </button>

              {/* Sous-items enfant */}
              {activeKey.startsWith(`child-${child.id}`) && (
                <div style={{ marginLeft: 16, marginTop: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                  {[
                    { key: `child-${child.id}-overview`,    label: "Vue d'ensemble" },
                    { key: `child-${child.id}-notes`,       label: "Notes" },
                    { key: `child-${child.id}-devoirs`,     label: "Devoirs" },
                    { key: `child-${child.id}-bulletin`,    label: "Bulletin" },
                    { key: `child-${child.id}-discipline`,  label: "Discipline" },
                    { key: `child-${child.id}-paiements`,   label: "Paiements" },
                  ].map(sub => (
                    <button
                      key={sub.key}
                      onClick={() => onNav(sub.key)}
                      style={{
                        background: activeKey === sub.key ? "rgba(139,63,168,0.4)" : "none",
                        border: "none", color: activeKey === sub.key ? "#fff" : "rgba(255,255,255,0.45)",
                        fontSize: 12, padding: "6px 10px", borderRadius: 6,
                        cursor: "pointer", textAlign: "left", width: "100%",
                        fontWeight: activeKey === sub.key ? 600 : 400,
                      }}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Déconnexion */}
      <div style={{ padding: "0 12px" }}>
        <button
          onClick={onLogout}
          style={{
            width: "100%", padding: "10px 12px", borderRadius: 8,
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", textAlign: "left",
          }}
        >
          🚪 Déconnexion
        </button>
      </div>
    </aside>
  );
}

const navBtnBase = {
  display: "flex", alignItems: "center", gap: 10,
  width: "100%", padding: "8px 10px", borderRadius: 8,
  border: "none", background: "none", cursor: "pointer",
  color: "rgba(255,255,255,0.6)", textAlign: "left", marginBottom: 2,
};
const navBtnActiveStyle = {
  background: "rgba(139,63,168,0.35)", color: "#fff",
};

function NavBtn({ item, active, onClick }) {
  return (
    <button onClick={onClick} style={{ ...navBtnBase, ...(active ? navBtnActiveStyle : {}) }}>
      <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{item.icon}</span>
      <span style={{ flex: 1, fontSize: 13, fontWeight: active ? 600 : 400 }}>{item.label}</span>
      {item.badge > 0 && (
        <span style={{
          background: C.danger, color: "#fff",
          borderRadius: 20, fontSize: 10, fontWeight: 700,
          padding: "2px 7px",
        }}>{item.badge}</span>
      )}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTIONS PRINCIPALES
══════════════════════════════════════════════════════════ */

/* ── Dashboard global ── */
function SectionDashboard({ onNav }) {
  return (
    <div>
      <PageHeader title="Tableau de bord" sub="Vue d'ensemble de vos enfants" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 18 }}>
        {CHILDREN.map(child => {
          const grades = GRADES[child.id] || [];
          const moy    = moyenne(grades);
          const disc   = (DISCIPLINE[child.id] || []).length;
          const pays   = PAYMENTS[child.id] || [];
          const retard = pays.filter(p => p.statut === "en retard").length;
          const total  = pays.reduce((s, p) => s + p.montant, 0);
          const paye   = pays.filter(p => p.statut === "payé").reduce((s, p) => s + p.montant, 0);

          return (
            <div key={child.id} style={S.card}>
              {/* En-tête enfant */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ ...S.avatar, background: C.primaryLt, color: C.primary, fontSize: 18, fontWeight: 800 }}>
                  {initials(child.name)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: C.text }}>{child.name}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{child.classe} · Matricule {child.matricule}</div>
                </div>
              </div>

              {/* KPI row */}
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <KPITile label="Moyenne" value={moy ? `${moy}/20` : "—"} color={moy >= 10 ? C.success : C.danger} />
                <KPITile label="Rapports" value={disc} color={disc > 0 ? C.danger : C.success} />
                <KPITile label="Retards" value={retard} color={retard > 0 ? C.warning : C.success} />
              </div>

              {/* Mini radar */}
              {grades.length > 0 && <RadarNotes grades={grades} />}

              {/* Paiement progress */}
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted, marginBottom: 6 }}>
                  <span>Scolarité payée</span>
                  <span style={{ fontWeight: 700, color: C.text }}>{paye.toLocaleString("fr-CM")} / {total.toLocaleString("fr-CM")} XAF</span>
                </div>
                <div style={{ height: 6, background: C.border, borderRadius: 4 }}>
                  <div style={{ height: "100%", width: `${(paye/total)*100}%`, background: C.success, borderRadius: 4, transition: "width 0.6s" }} />
                </div>
              </div>

              {/* Actions rapides */}
              <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                <Btn primary onClick={() => onNav(`child-${child.id}-notes`)}>📊 Notes</Btn>
                <Btn onClick={() => onNav(`child-${child.id}-devoirs`)}>📥 Devoirs</Btn>
                <Btn onClick={() => downloadBulletin(child)}>🧾 Bulletin</Btn>
                <Btn onClick={() => onNav(`child-${child.id}-paiements`)}>💳 Paiements</Btn>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Vue d'ensemble d'un enfant ── */
function SectionChildOverview({ child, onNav }) {
  const grades = GRADES[child.id] || [];
  const moy    = moyenne(grades);

  return (
    <div>
      <ChildHeader child={child} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>

        <div style={S.card}>
          <SectionTitle>📈 Évolution de la moyenne</SectionTitle>
          <LineEvolution grades={grades} />
        </div>

        <div style={S.card}>
          <SectionTitle>🕸 Profil par matière</SectionTitle>
          <RadarNotes grades={grades} />
        </div>

        <div style={{ ...S.card, gridColumn: "1/-1" }}>
          <SectionTitle>📊 Notes par évaluation</SectionTitle>
          <BarNotes grades={grades} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 18, marginTop: 18 }}>
        <div style={{ ...S.card, flex: 1 }}>
          <SectionTitle>📋 Résumé rapide</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
            <InfoRow label="Classe"      value={child.classe} />
            <InfoRow label="Matricule"   value={child.matricule} />
            <InfoRow label="Âge"         value={`${child.age} ans`} />
            <InfoRow label="Langue"      value={child.langue} />
            <InfoRow label="Moyenne gén." value={moy ? `${moy}/20` : "—"} highlight />
          </div>
        </div>

        <div style={{ ...S.card, flex: 1 }}>
          <SectionTitle>⚡ Actions rapides</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            {[
              { label: "📊 Voir toutes les notes",   key: "notes" },
              { label: "📥 Télécharger les devoirs", key: "devoirs" },
              { label: "🧾 Télécharger le bulletin", action: () => downloadBulletin(child) },
              { label: "⚠️ Rapports disciplinaires", key: "discipline" },
              { label: "💳 État des paiements",      key: "paiements" },
            ].map((item, i) => (
              <button key={i}
                onClick={() => item.key ? onNav(`child-${child.id}-${item.key}`) : item.action()}
                style={{
                  width: "100%", textAlign: "left", padding: "10px 14px",
                  borderRadius: 8, border: `1px solid ${C.border}`,
                  background: "#fff", cursor: "pointer", fontSize: 13,
                  color: C.text, fontWeight: 500,
                  transition: "background 0.15s",
                }}
              >{item.label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Notes ── */
function SectionNotes({ child }) {
  const grades = GRADES[child.id] || [];
  const moy = moyenne(grades);

  return (
    <div>
      <ChildHeader child={child} />

      {/* Graphiques */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
        <div style={S.card}>
          <SectionTitle>📈 Évolution mensuelle</SectionTitle>
          <LineEvolution grades={grades} />
        </div>
        <div style={S.card}>
          <SectionTitle>🕸 Radar par matière</SectionTitle>
          <RadarNotes grades={grades} />
        </div>
        <div style={{ ...S.card, gridColumn: "1/-1" }}>
          <SectionTitle>📊 Détail par évaluation</SectionTitle>
          <BarNotes grades={grades} />
        </div>
      </div>

      {/* Tableau */}
      <div style={S.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <SectionTitle>📋 Toutes les évaluations</SectionTitle>
          <span style={{ fontSize: 13, color: C.muted }}>
            Moyenne générale : <strong style={{ color: C.primary, fontSize: 16 }}>{moy}/20</strong>
          </span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: C.primaryLt }}>
              {["Matière","Type","Date","Note","/ 20","Barre"].map(h => (
                <th key={h} style={{ ...S.th, textAlign: h === "Note" || h === "/ 20" ? "center" : "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grades.map(g => {
              const pct = Math.round((g.score / g.max) * 100);
              return (
                <tr key={g.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={S.td}><strong>{g.subject}</strong></td>
                  <td style={S.td}><Tag>{g.type}</Tag></td>
                  <td style={{ ...S.td, color: C.muted, fontSize: 12 }}>{g.date}</td>
                  <td style={{ ...S.td, textAlign: "center", fontWeight: 800, fontSize: 16, color: scoreColor(g.score, g.max) }}>{g.score}</td>
                  <td style={{ ...S.td, textAlign: "center", color: C.muted }}>{g.max}</td>
                  <td style={{ ...S.td, minWidth: 100 }}>
                    <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: scoreColor(g.score, g.max), borderRadius: 3 }} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Devoirs ── */
function SectionDevoirs({ child }) {
  const homeworks = HOMEWORKS[child.id] || [];

  // Stats pour le graphique
  const bySubject = {};
  homeworks.forEach(h => {
    bySubject[h.subject] = (bySubject[h.subject] || 0) + 1;
  });
  const chartData = Object.entries(bySubject).map(([s, c]) => ({ subject: s.slice(0, 8), count: c }));

  return (
    <div>
      <ChildHeader child={child} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 18, marginBottom: 18 }}>
        <div style={S.card}>
          <SectionTitle>📚 Devoirs par matière</SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: C.muted }} />
              <YAxis type="category" dataKey="subject" tick={{ fontSize: 11, fill: C.muted }} width={70} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" name="Devoirs" fill={C.primary} radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={S.card}>
          <SectionTitle>🗓 Calendrier des échéances</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
            {homeworks.map(hw => (
              <div key={hw.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 14px", borderRadius: 10, background: C.bg,
                border: `1px solid ${C.border}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, background: C.primaryLt,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18,
                  }}>📄</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{hw.subject}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{hw.title}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: C.muted }}>À rendre le {hw.due}</span>
                  <Btn primary onClick={() => downloadHomework(hw)}>📥 Télécharger</Btn>
                </div>
              </div>
            ))}
            {homeworks.length === 0 && <EmptyState icon="📭" text="Aucun devoir disponible" />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Bulletin ── */
function SectionBulletin({ child }) {
  const grades = GRADES[child.id] || [];
  const moy    = moyenne(grades);

  return (
    <div>
      <ChildHeader child={child} />
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>

        {/* Prévisualisation bulletin */}
        <div style={S.card}>
          <SectionTitle>🧾 Aperçu du bulletin — T1 2025-2026</SectionTitle>
          <div style={{
            marginTop: 14, border: `2px solid ${C.border}`, borderRadius: 12,
            padding: 20, background: C.bg,
          }}>
            {/* En-tête bulletin */}
            <div style={{ textAlign: "center", marginBottom: 16, paddingBottom: 14, borderBottom: `2px solid ${C.border}` }}>
              <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>République du Cameroun</div>
              <div style={{ fontWeight: 800, fontSize: 18, color: C.text, margin: "4px 0" }}>EcoleApp 2026</div>
              <div style={{ fontSize: 13, color: C.muted }}>Bulletin de notes — Trimestre 1</div>
            </div>

            {/* Infos élève */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, fontSize: 13 }}>
              <div><strong>Élève :</strong> {child.name}</div>
              <div><strong>Classe :</strong> {child.classe}</div>
              <div><strong>Matricule :</strong> {child.matricule}</div>
            </div>

            {/* Tableau notes */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 14 }}>
              <thead>
                <tr style={{ background: C.primaryLt }}>
                  <th style={{ ...S.th, padding: "8px 10px" }}>Matière</th>
                  <th style={{ ...S.th, textAlign: "center", padding: "8px 10px" }}>Note</th>
                  <th style={{ ...S.th, textAlign: "center", padding: "8px 10px" }}>/ 20</th>
                  <th style={{ ...S.th, textAlign: "center", padding: "8px 10px" }}>Appréciation</th>
                </tr>
              </thead>
              <tbody>
                {grades.map(g => (
                  <tr key={g.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "8px 10px" }}>{g.subject}</td>
                    <td style={{ padding: "8px 10px", textAlign: "center", fontWeight: 700, color: scoreColor(g.score, g.max) }}>{g.score}</td>
                    <td style={{ padding: "8px 10px", textAlign: "center", color: C.muted }}>{g.max}</td>
                    <td style={{ padding: "8px 10px", textAlign: "center", fontSize: 12 }}>
                      {g.score/g.max >= 0.75 ? "Très bien" : g.score/g.max >= 0.5 ? "Assez bien" : "À améliorer"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 14 }}>
                <strong>Moyenne générale : </strong>
                <span style={{ color: C.primary, fontWeight: 800, fontSize: 18 }}>{moy}/20</span>
              </div>
              <div style={{
                background: "#D1FAE5", color: C.success, padding: "4px 14px",
                borderRadius: 20, fontSize: 12, fontWeight: 700,
              }}>✓ Validé par le Directeur</div>
            </div>
          </div>

          <button onClick={() => downloadBulletin(child)} style={{ ...S.btnPrimary, marginTop: 14, width: "100%" }}>
            ⬇️ Télécharger le bulletin sous forme .txt
          </button>
        </div>

        {/* Graphique récap */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={S.card}>
            <SectionTitle>🕸 Profil par matière</SectionTitle>
            <RadarNotes grades={grades} />
          </div>
          <div style={S.card}>
            <SectionTitle>📈 Évolution mensuelle</SectionTitle>
            <LineEvolution grades={grades} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Discipline ── */
function SectionDiscipline({ child }) {
  const rapports = DISCIPLINE[child.id] || [];

  const chartData = [
    { name: "Légère", value: rapports.filter(r => r.gravite === "légère").length },
    { name: "Grave",  value: rapports.filter(r => r.gravite === "grave").length },
    { name: "Autre",  value: rapports.filter(r => !r.gravite).length },
  ].filter(d => d.value > 0);

  return (
    <div>
      <ChildHeader child={child} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 18 }}>

        <div style={S.card}>
          <SectionTitle>📊 Répartition</SectionTitle>
          {rapports.length === 0 ? (
            <EmptyState icon="🌟" text="Aucun rapport disciplinaire — Excellent comportement !" />
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: C.muted }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: C.muted }} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" name="Rapports" fill={C.danger} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
            <KPITile label="Total rapports" value={rapports.length} color={rapports.length > 0 ? C.danger : C.success} />
          </div>
        </div>

        <div style={S.card}>
          <SectionTitle>📋 Détail des rapports</SectionTitle>
          {rapports.length === 0 ? (
            <EmptyState icon="✅" text="Aucun rapport disciplinaire enregistré pour cet élève." />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
              {rapports.map(r => (
                <div key={r.id} style={{
                  padding: "14px 16px", borderRadius: 10,
                  background: "#FEF2F2", border: `1px solid #FECACA`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, color: C.danger }}>{r.reason}</span>
                    <span style={{ fontSize: 12, color: C.muted }}>{r.date}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "#7F1D1D" }}>{r.note}</div>
                  {r.gravite && (
                    <span style={{ fontSize: 11, background: "#FEE2E2", color: C.danger, padding: "2px 8px", borderRadius: 12, marginTop: 6, display: "inline-block" }}>
                      Gravité : {r.gravite}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Paiements ── */
function SectionPaiements({ child }) {
  const pays   = PAYMENTS[child.id] || [];
  const total  = pays.reduce((s, p) => s + p.montant, 0);
  const paye   = pays.filter(p => p.statut === "payé").reduce((s, p) => s + p.montant, 0);
  const retard = pays.filter(p => p.statut === "en retard").reduce((s, p) => s + p.montant, 0);

  return (
    <div>
      <ChildHeader child={child} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
        <div style={S.card}>
          <SectionTitle>💳 Suivi des paiements</SectionTitle>
          <BarPaiements payments={pays} />
        </div>

        <div style={S.card}>
          <SectionTitle>📊 Résumé financier</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
            <InfoRow label="Total scolarité"  value={`${total.toLocaleString("fr-CM")} XAF`} />
            <InfoRow label="Total payé"       value={`${paye.toLocaleString("fr-CM")} XAF`}   highlight />
            <InfoRow label="En retard"        value={`${retard.toLocaleString("fr-CM")} XAF`}  danger={retard > 0} />
            <InfoRow label="Restant"          value={`${(total - paye).toLocaleString("fr-CM")} XAF`} />
          </div>
          {/* Barre progression */}
          <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted, marginBottom: 6 }}>
              <span>Progression</span>
              <span>{Math.round((paye/total)*100)}%</span>
            </div>
            <div style={{ height: 10, background: C.border, borderRadius: 5 }}>
              <div style={{ height: "100%", width: `${(paye/total)*100}%`, background: C.success, borderRadius: 5 }} />
            </div>
          </div>
        </div>
      </div>

      <div style={S.card}>
        <SectionTitle>🧾 Détail des tranches</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
          {pays.map(p => {
            const st = statutStyle(p.statut);
            return (
              <div key={p.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 16px", borderRadius: 10, background: C.bg, border: `1px solid ${C.border}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: st.bg,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                  }}>
                    {p.statut === "payé" ? "✅" : p.statut === "en retard" ? "⚠️" : "🕐"}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{p.tranche}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{p.date ? `Payé le ${p.date}` : "Non encore payé"}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontWeight: 800, fontSize: 16 }}>{p.montant.toLocaleString("fr-CM")} XAF</span>
                  <span style={{ background: st.bg, color: st.color, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                    {st.label}
                  </span>
                  {p.statut === "payé" && (
                    <Btn onClick={() => downloadText(`recu_${p.tranche}.txt`, `Reçu — ${child.name}\n${p.tranche} : ${p.montant.toLocaleString("fr-CM")} XAF\nDate : ${p.date}\nStatut : PAYÉ`)}>
                      🧾 Reçu
                    </Btn>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Messages ── */
function SectionMessages({ onNavKey }) {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <PageHeader title="Messages" sub="Communications de l'école" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 18 }}>
        <div style={S.card}>
          <SectionTitle>📬 Boîte de réception</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
            {MESSAGES_DATA.map(m => (
              <button key={m.id} onClick={() => setSelected(m)} style={{
                width: "100%", textAlign: "left", padding: "12px 14px", borderRadius: 10,
                border: `1px solid ${selected?.id === m.id ? C.primary : C.border}`,
                background: selected?.id === m.id ? C.primaryLt : m.read ? "#fff" : "#faf5fb",
                cursor: "pointer",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontWeight: m.read ? 500 : 700, fontSize: 13, color: C.text }}>{m.from}</span>
                  <span style={{ fontSize: 11, color: C.muted }}>{m.date}</span>
                </div>
                <div style={{ fontSize: 12, color: C.muted, fontWeight: m.read ? 400 : 600 }}>{m.subject}</div>
                {!m.read && <span style={{ fontSize: 10, background: C.primary, color: "#fff", padding: "1px 6px", borderRadius: 10, marginTop: 4, display: "inline-block" }}>Nouveau</span>}
              </button>
            ))}
          </div>
        </div>

        <div style={S.card}>
          {selected ? (
            <div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>De : {selected.from} · {selected.date}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>{selected.subject}</div>
              <div style={{ fontSize: 14, color: C.text, lineHeight: 1.7, background: C.bg, padding: 14, borderRadius: 10 }}>{selected.body}</div>
              <Btn primary style={{ marginTop: 14 }}>↩ Répondre</Btn>
            </div>
          ) : (
            <EmptyState icon="✉️" text="Sélectionnez un message pour le lire" />
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   COMPOSANTS UI RÉUTILISABLES
══════════════════════════════════════════════════════════ */
function PageHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: C.text }}>{title}</h1>
      {sub && <p style={{ margin: "4px 0 0", fontSize: 14, color: C.muted }}>{sub}</p>}
    </div>
  );
}

function ChildHeader({ child }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
      <div style={{ ...S.avatar, width: 52, height: 52, background: C.primaryLt, color: C.primary, fontSize: 20, fontWeight: 800 }}>
        {initials(child.name)}
      </div>
      <div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: C.text }}>{child.name}</h1>
        <p style={{ margin: 0, fontSize: 13, color: C.muted }}>{child.classe} · {child.matricule}</p>
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 4 }}>{children}</div>;
}

function KPITile({ label, value, color }) {
  return (
    <div style={{ flex: 1, background: C.bg, borderRadius: 10, padding: "10px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <span style={{ fontSize: 22, fontWeight: 800, color: color || C.primary }}>{value}</span>
      <span style={{ fontSize: 11, color: C.muted, textAlign: "center" }}>{label}</span>
    </div>
  );
}

function InfoRow({ label, value, highlight, danger }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}`, fontSize: 14 }}>
      <span style={{ color: C.muted }}>{label}</span>
      <span style={{ fontWeight: 700, color: danger ? C.danger : highlight ? C.primary : C.text }}>{value}</span>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span style={{ background: C.primaryLt, color: C.primary, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>
      {children}
    </span>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div style={{ textAlign: "center", padding: "32px 20px", color: C.muted }}>
      <div style={{ fontSize: 36, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: 14 }}>{text}</div>
    </div>
  );
}

function Btn({ children, primary, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
      cursor: "pointer",
      background: primary ? C.primary : "transparent",
      color: primary ? "#fff" : C.text,
      border: primary ? "none" : `1px solid ${C.border}`,
      ...(style || {}),
    }}>
      {children}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
══════════════════════════════════════════════════════════ */
export default function ParentDashboard() {
  const navigate  = useNavigate();
  const [activeKey, setActiveKey] = useState("dashboard");
  const unread = MESSAGES_DATA.filter(m => !m.read).length;

  function handleLogout() {
    // TODO : révoquer le refresh token via l'API (/auth/logout)
    navigate("/login");
  }

  function findChild(key) {
    const match = key.match(/^child-(\d+)-/);
    if (!match) return null;
    return CHILDREN.find(c => c.id === parseInt(match[1])) || null;
  }

  function renderSection() {
    if (activeKey === "dashboard") return <SectionDashboard onNav={setActiveKey} />;
    if (activeKey === "messages")  return <SectionMessages />;

    const child = findChild(activeKey);
    if (!child) return <SectionDashboard onNav={setActiveKey} />;

    if (activeKey.endsWith("-overview"))   return <SectionChildOverview child={child} onNav={setActiveKey} />;
    if (activeKey.endsWith("-notes"))      return <SectionNotes child={child} />;
    if (activeKey.endsWith("-devoirs"))    return <SectionDevoirs child={child} />;
    if (activeKey.endsWith("-bulletin"))   return <SectionBulletin child={child} />;
    if (activeKey.endsWith("-discipline")) return <SectionDiscipline child={child} />;
    if (activeKey.endsWith("-paiements"))  return <SectionPaiements child={child} />;

    return <SectionDashboard onNav={setActiveKey} />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif", background: C.bg }}>
      <Sidebar activeKey={activeKey} onNav={setActiveKey} children={CHILDREN} unread={unread} onLogout={handleLogout} />
      <main style={{ flex: 1, padding: "32px 28px", overflowY: "auto", maxHeight: "100vh" }}>
        {renderSection()}
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   STYLES PARTAGÉS
══════════════════════════════════════════════════════════ */
const S = {
  card: {
    background: C.card, borderRadius: 14,
    padding: 20, boxShadow: "0 2px 16px rgba(26,26,46,0.06)",
  },
  avatar: {
    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  th: {
    padding: "10px 12px", fontSize: 12, color: C.muted,
    fontWeight: 700, textAlign: "left",
    borderBottom: `2px solid ${C.border}`,
  },
  td: { padding: "11px 12px", fontSize: 14, color: C.text },
  btnPrimary: {
    background: C.primary, color: "#fff", border: "none",
    padding: "10px 18px", borderRadius: 8, cursor: "pointer",
    fontSize: 14, fontWeight: 600,
  },
};