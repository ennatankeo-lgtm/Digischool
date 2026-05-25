import { useState } from "react";
import { Link } from "react-router-dom";

// ─── Données fictives ─────────────────────────────────────────────────────────
const TRANCHES_INIT = [
  { id: 1, label: "Inscription", montant: 25000,  echeance: "2025-09-01" },
  { id: 2, label: "Tranche 1",   montant: 45000,  echeance: "2025-10-15" },
  { id: 3, label: "Tranche 2",   montant: 45000,  echeance: "2026-01-15" },
  { id: 4, label: "Tranche 3",   montant: 45000,  echeance: "2026-04-15" },
];

const PAIEMENTS_INIT = [
  { mat:"EL001", nom:"Awa Ngo Biyong",     classe:"CM1", sexe:"F", libelle:"Tranche 1", due:45000, paye:45000 },
  { mat:"EL002", nom:"Jean Paul Mbah",     classe:"CE2", sexe:"M", libelle:"Inscription",due:25000, paye:25000 },
  { mat:"EL003", nom:"Fatou Bello Amara",  classe:"CP",  sexe:"F", libelle:"Tranche 1", due:45000, paye:0     },
  { mat:"EL004", nom:"Paul Essono Biyong", classe:"CM2", sexe:"M", libelle:"Tranche 2", due:45000, paye:22000 },
  { mat:"EL005", nom:"Marie Talla Nkolo",  classe:"CE1", sexe:"F", libelle:"Tranche 1", due:45000, paye:45000 },
  { mat:"EL006", nom:"Luc Abomo Essama",   classe:"SIL", sexe:"M", libelle:"Inscription",due:25000, paye:25000 },
  { mat:"EL007", nom:"Clarisse Mvogo",     classe:"CM1", sexe:"F", libelle:"Tranche 2", due:45000, paye:0     },
  { mat:"EL008", nom:"David Nanga Bela",   classe:"CE2", sexe:"M", libelle:"Tranche 3", due:45000, paye:45000 },
];

const fmt = (n) =>
  new Intl.NumberFormat("fr-FR").format(n) + " FCFA";

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("fr-FR", { day:"2-digit", month:"short", year:"numeric" });

// ─── Statut badge ─────────────────────────────────────────────────────────────
function StatutBadge({ due, paye }) {
  const reste = due - paye;
  if (reste === 0)
    return <span style={{ backgroundColor:"#bbf7d0", color:"#166534", padding:"3px 12px", borderRadius:"50px", fontSize:"12px", fontWeight:700 }}>Libellé</span>;
  if (paye === 0)
    return <span style={{ backgroundColor:"#fca5a5", color:"#7f1d1d", padding:"3px 12px", borderRadius:"50px", fontSize:"12px", fontWeight:700 }}>Impayé</span>;
  return <span style={{ backgroundColor:"#fde68a", color:"#78350f", padding:"3px 12px", borderRadius:"50px", fontSize:"12px", fontWeight:700 }}>Partiel</span>;
}

// ─── Modal enregistrement paiement ───────────────────────────────────────────
function ModalPaiement({ onClose, onSave }) {
  const [form, setForm] = useState({ matricule:"", montant:"", mode:"cash", libelle:"Tranche 1" });
  const set = (f) => (e) => setForm(p=>({...p,[f]:e.target.value}));

  return (
    <div style={{ position:"fixed", inset:0, backgroundColor:"rgba(0,0,0,0.45)",
      display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 }}>
      <div style={{ backgroundColor:"#fff", borderRadius:"16px", padding:"36px",
        width:"100%", maxWidth:"480px", boxShadow:"0 8px 40px rgba(0,0,0,0.2)" }}>
        <h2 style={{ fontSize:"20px", fontWeight:700, marginBottom:"24px", color:"#1a1a2e" }}>
          Enregistrer un paiement
        </h2>
        <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
          {[
            { label:"Matricule élève", field:"matricule", placeholder:"Ex : EL001" },
            { label:"Montant (FCFA)",  field:"montant",   placeholder:"Ex : 45000", type:"number" },
          ].map(f=>(
            <div key={f.field}>
              <label style={{ display:"block", fontSize:"13px", fontWeight:600,
                color:"#555", marginBottom:"6px" }}>{f.label}</label>
              <input type={f.type||"text"} placeholder={f.placeholder}
                value={form[f.field]} onChange={set(f.field)}
                style={{ width:"100%", padding:"11px 14px", border:"1.5px solid #ddd",
                  borderRadius:"8px", fontSize:"14px", boxSizing:"border-box",
                  outline:"none", fontFamily:"inherit" }}
                onFocus={e=>e.target.style.borderColor="#AD56C4"}
                onBlur={e=>e.target.style.borderColor="#ddd"} />
            </div>
          ))}
          <div>
            <label style={{ display:"block", fontSize:"13px", fontWeight:600,
              color:"#555", marginBottom:"6px" }}>Libellé</label>
            <select value={form.libelle} onChange={set("libelle")}
              style={{ width:"100%", padding:"11px 14px", border:"1.5px solid #ddd",
                borderRadius:"8px", fontSize:"14px" }}>
              {["Inscription","Tranche 1","Tranche 2","Tranche 3"].map(l=>
                <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display:"block", fontSize:"13px", fontWeight:600,
              color:"#555", marginBottom:"6px" }}>Mode de paiement</label>
            <select value={form.mode} onChange={set("mode")}
              style={{ width:"100%", padding:"11px 14px", border:"1.5px solid #ddd",
                borderRadius:"8px", fontSize:"14px" }}>
              {["cash","Orange Money","MTN MoMo","Virement"].map(m=>
                <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display:"flex", gap:"12px", marginTop:"28px", justifyContent:"flex-end" }}>
          <button onClick={onClose}
            style={{ padding:"10px 24px", border:"1.5px solid #ddd", borderRadius:"8px",
              backgroundColor:"#fff", fontSize:"14px", fontWeight:600, cursor:"pointer" }}>
            Annuler
          </button>
          <button onClick={()=>{ onSave(form); onClose(); }}
            style={{ padding:"10px 28px", backgroundColor:"#AD56C4", color:"#fff",
              border:"none", borderRadius:"8px", fontSize:"14px",
              fontWeight:700, cursor:"pointer" }}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label:"Tableau de bord", path:"/admin"           },
  { label:"Élèves",          path:"/admin/eleves"    },
  { label:"Finance",         path:"/admin/finance", active:true },
  { label:"Personnel",       path:"/admin/personnel" },
  { label:"Salles & cours",  path:"/admin/salles"    },
  { label:"Messages",        path:"/admin/messages"  },
];

export default function GestionFinance() {
  const [tranches, setTranches]     = useState(TRANCHES_INIT);
  const [paiements, setPaiements]   = useState(PAIEMENTS_INIT);
  const [filtre, setFiltre]         = useState("Tous");
  const [showModal, setShowModal]   = useState(false);
  const [showTrancheForm, setShowTrancheForm] = useState(false);
  const [editTranche, setEditTranche] = useState(null);
  const [toast, setToast]           = useState("");

  // KPI
  const totalAttendu = paiements.reduce((s, p) => s + p.due, 0);
  const totalEncaisse = paiements.reduce((s, p) => s + p.paye, 0);
  const totalImpaye = totalAttendu - totalEncaisse;
  const prochaine = tranches.find(t => new Date(t.echeance) >= new Date())?.echeance || "—";

  // Filtre tableau
  const filteredPaiements = paiements.filter(p => {
    if (filtre === "Libellé") return p.paye >= p.due;
    if (filtre === "Impayé")  return p.paye < p.due;
    return true;
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleSavePaiement = (form) => {
    setPaiements(prev => prev.map(p =>
      p.mat === form.matricule
        ? { ...p, paye: Math.min(p.due, p.paye + Number(form.montant)), libelle: form.libelle }
        : p
    ));
    showToast("✅ Paiement enregistré avec succès !");
  };

  const handleDeleteTranche = (id) => {
    setTranches(prev => prev.filter(t => t.id !== id));
    showToast("Tranche supprimée.");
  };

  const handleSaveTranche = (form) => {
    if (editTranche) {
      setTranches(prev => prev.map(t => t.id === editTranche.id ? { ...t, ...form } : t));
    } else {
      setTranches(prev => [...prev, { id: Date.now(), ...form }]);
    }
    setEditTranche(null);
    setShowTrancheForm(false);
    showToast("Tranche sauvegardée !");
  };

  return (
    <div style={{ minHeight:"100vh", backgroundColor:"#EFF7F6",
      fontFamily:"'Segoe UI', sans-serif", display:"flex", flexDirection:"column" }}>

      {/* ── Topbar ────────────────────────────────────────────────── */}
      <div style={{ backgroundColor:"#EFF7F6", padding:"14px 32px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        borderBottom:"1px solid #dde8e6" }}>
        <span style={{ fontWeight:800, fontSize:"22px", color:"#AD56C4" }}>DIGISCHOOL</span>
        <button style={{ backgroundColor:"#AD56C4", color:"#fff", border:"none",
          borderRadius:"50px", padding:"11px 28px", fontSize:"15px",
          fontWeight:700, cursor:"pointer" }}>
          Déconnexion
        </button>
      </div>

      {/* ── Sous-topbar ───────────────────────────────────────────── */}
      <div style={{ backgroundColor:"#EFF7F6", padding:"14px 32px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        borderBottom:"1px solid #dde8e6" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{ width:"38px", height:"38px", borderRadius:"50%",
            backgroundColor:"#AD56C4", display:"flex", alignItems:"center",
            justifyContent:"center", color:"#fff", fontSize:"18px" }}>👤</div>
          <span style={{ fontWeight:700, fontSize:"20px", color:"#1a1a2e" }}>Bienvenue</span>
        </div>
        <div style={{ display:"flex", gap:"16px" }}>
          <select style={{ padding:"9px 16px", border:"1.5px solid #AD56C4",
            borderRadius:"8px", backgroundColor:"#fff", color:"#AD56C4",
            fontWeight:600, fontSize:"15px", cursor:"pointer" }}>
            <option>Français</option><option>English</option>
          </select>
          <select style={{ padding:"9px 16px", border:"1.5px solid #AD56C4",
            borderRadius:"8px", backgroundColor:"#fff", color:"#AD56C4",
            fontWeight:600, fontSize:"15px", cursor:"pointer" }}>
            <option>2025-2026</option><option>2024-2025</option>
          </select>
        </div>
      </div>

      {/* ── Barre de navigation ───────────────────────────────────── */}
      <div style={{ backgroundColor:"#C9A0DC", display:"flex" }}>
        {NAV_ITEMS.map(item => (
          <Link key={item.label} to={item.path}
            style={{ flex:1, padding:"16px 8px", textDecoration:"none",
              display:"block", textAlign:"center",
              backgroundColor: item.active?"rgba(255,255,255,0.22)":"transparent",
              color: item.active?"#fff":"rgba(255,255,255,0.75)",
              fontSize:"15px", fontWeight: item.active?800:600,
              borderBottom: item.active?"3px solid #fff":"3px solid transparent",
              transition:"all 0.15s" }}>
            {item.label}
          </Link>
        ))}
      </div>

      {/* ── Contenu ───────────────────────────────────────────────── */}
      <div style={{ flex:1, padding:"32px 40px" }}>

        {/* Bouton exporter */}
        <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:"28px" }}>
          <button onClick={()=>showToast("📥 Export en cours…")}
            style={{ display:"flex", alignItems:"center", gap:"8px",
              backgroundColor:"#AD56C4", color:"#fff", border:"none",
              borderRadius:"50px", padding:"12px 28px", fontSize:"15px",
              fontWeight:700, cursor:"pointer",
              boxShadow:"0 4px 14px rgba(173,86,196,0.3)" }}>
            <span>⬆</span> Exporter
          </button>
        </div>

        {/* ── 4 KPI Cards ────────────────────────────────────────── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)",
          gap:"20px", marginBottom:"36px" }}>
          {[
            { label:"Total attendu",     value:fmt(totalAttendu),  color:"#AD56C4" },
            { label:"Encaissé",          value:fmt(totalEncaisse), color:"#AD56C4" },
            { label:"Impayé",            value:fmt(totalImpaye),   color:"#AD56C4" },
            { label:"Prochaine échéance",value:prochaine==="—"?"—":fmtDate(prochaine), color:"#AD56C4" },
          ].map((k,i)=>(
            <div key={i} style={{ backgroundColor:"#fff", borderRadius:"14px",
              padding:"24px 20px", boxShadow:"0 2px 10px rgba(0,0,0,0.06)",
              border:"1px solid #eee" }}>
              <div style={{ fontSize:"14px", fontWeight:700, color:k.color,
                marginBottom:"12px" }}>{k.label}</div>
              <div style={{ fontSize:"20px", fontWeight:800, color:"#1a1a2e",
                wordBreak:"break-word" }}>{k.value}</div>
            </div>
          ))}
        </div>

        {/* ── Configuration tranches ─────────────────────────────── */}
        <div style={{ backgroundColor:"#fff", borderRadius:"16px", padding:"28px 32px",
          marginBottom:"28px", boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}>

          <div style={{ display:"flex", alignItems:"center",
            justifyContent:"space-between", marginBottom:"24px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
              <span style={{ fontSize:"28px" }}>⚙️</span>
              <h2 style={{ fontSize:"22px", fontWeight:700, color:"#1a1a2e", margin:0 }}>
                Configuration des tranches de la scolarité
              </h2>
            </div>
            <button onClick={()=>{ setEditTranche(null); setShowTrancheForm(true); }}
              style={{ width:"40px", height:"40px", borderRadius:"8px",
                backgroundColor:"#AD56C4", color:"#fff", border:"none",
                fontSize:"22px", cursor:"pointer", display:"flex",
                alignItems:"center", justifyContent:"center" }}>
              +
            </button>
          </div>

          {/* Formulaire ajout/édition tranche */}
          {showTrancheForm && (
            <TrancheForm
              initial={editTranche}
              onSave={handleSaveTranche}
              onCancel={()=>{ setShowTrancheForm(false); setEditTranche(null); }}
            />
          )}

          {/* Cards tranches */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px" }}>
            {tranches.map(t=>(
              <div key={t.id} style={{ border:"1.5px solid #ddd", borderRadius:"12px",
                padding:"20px 18px", backgroundColor:"#fafafa" }}>
                <div style={{ fontSize:"14px", fontWeight:800, color:"#AD56C4",
                  marginBottom:"10px", textAlign:"center" }}>{t.label}</div>
                <div style={{ fontSize:"17px", fontWeight:900, textAlign:"center",
                  color:"#1a1a2e", marginBottom:"6px" }}>
                  {new Intl.NumberFormat("fr-FR").format(t.montant)}
                </div>
                <div style={{ fontSize:"11px", fontWeight:700, color:"#888",
                  textAlign:"center", marginBottom:"4px" }}>FCFA</div>
                <div style={{ fontSize:"13px", color:"#555", textAlign:"center",
                  marginBottom:"16px" }}>
                  <span style={{ fontWeight:700 }}>Échéance : </span>
                  {fmtDate(t.echeance)}
                </div>
                <div style={{ display:"flex", justifyContent:"center", gap:"16px" }}>
                  <button onClick={()=>{ setEditTranche(t); setShowTrancheForm(true); }}
                    style={{ background:"none", border:"none", cursor:"pointer",
                      fontSize:"18px", color:"#AD56C4" }} title="Modifier">✏️</button>
                  <button onClick={()=>handleDeleteTranche(t.id)}
                    style={{ background:"none", border:"none", cursor:"pointer",
                      fontSize:"18px", color:"#e74c3c" }} title="Supprimer">🗑️</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:"8px",
            marginTop:"16px", color:"#b07d00", fontSize:"13px" }}>
            <span>ℹ️</span>
            <span>Vous définissez ici les montants des tranches</span>
          </div>
        </div>

        {/* ── Suivi des paiements ────────────────────────────────── */}
        <div style={{ backgroundColor:"#fff", borderRadius:"16px", padding:"28px 32px",
          marginBottom:"28px", boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}>

          <div style={{ display:"flex", alignItems:"center",
            justifyContent:"space-between", marginBottom:"24px", flexWrap:"wrap", gap:"12px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
              <span style={{ fontSize:"28px" }}>💳</span>
              <h2 style={{ fontSize:"22px", fontWeight:700, color:"#1a1a2e", margin:0 }}>
                Suivi des paiements
              </h2>
            </div>
            {/* Filtres */}
            <div style={{ display:"flex", gap:"8px", backgroundColor:"#f3f4f6",
              borderRadius:"50px", padding:"4px" }}>
              {["Tous","Libellé","Impayé"].map(f=>(
                <button key={f} onClick={()=>setFiltre(f)}
                  style={{ padding:"8px 20px", borderRadius:"50px", border:"none",
                    backgroundColor: filtre===f?"#fff":"transparent",
                    color: filtre===f?"#1a1a2e":"#666",
                    fontWeight: filtre===f?700:500,
                    fontSize:"14px", cursor:"pointer",
                    boxShadow: filtre===f?"0 1px 4px rgba(0,0,0,0.12)":"none",
                    transition:"all 0.15s" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", minWidth:"720px" }}>
              <thead>
                <tr style={{ borderBottom:"2px solid #eee" }}>
                  {["Matricule","Nom & Prénom(s)","Classe","Sexe",
                    "Libellé","Montant dû","Payé","Reste","Statut"].map(h=>(
                    <th key={h} style={{ padding:"12px 14px", textAlign:"left",
                      fontSize:"13px", fontWeight:700, color:"#555",
                      whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPaiements.map((p,i)=>(
                  <tr key={p.mat}
                    style={{ backgroundColor:i%2===0?"#faf5ff":"#fff",
                      borderBottom:"1px solid #f0e6ff" }}>
                    <td style={{ padding:"12px 14px", fontWeight:700,
                      color:"#AD56C4", fontSize:"13px" }}>{p.mat}</td>
                    <td style={{ padding:"12px 14px", fontWeight:600,
                      color:"#1a1a2e", fontSize:"14px" }}>{p.nom}</td>
                    <td style={{ padding:"12px 14px" }}>
                      <span style={{ backgroundColor:"#f3e8ff", color:"#AD56C4",
                        padding:"3px 10px", borderRadius:"50px",
                        fontSize:"12px", fontWeight:600 }}>{p.classe}</span>
                    </td>
                    <td style={{ padding:"12px 14px", color:"#555",
                      fontSize:"13px" }}>{p.sexe}</td>
                    <td style={{ padding:"12px 14px", color:"#555",
                      fontSize:"13px" }}>{p.libelle}</td>
                    <td style={{ padding:"12px 14px", fontSize:"13px",
                      fontWeight:600, color:"#1a1a2e" }}>
                      {new Intl.NumberFormat("fr-FR").format(p.due)}
                    </td>
                    <td style={{ padding:"12px 14px", fontSize:"13px",
                      fontWeight:600, color:"#166534" }}>
                      {new Intl.NumberFormat("fr-FR").format(p.paye)}
                    </td>
                    <td style={{ padding:"12px 14px", fontSize:"13px",
                      fontWeight:600,
                      color: p.due-p.paye>0?"#e74c3c":"#166534" }}>
                      {new Intl.NumberFormat("fr-FR").format(p.due - p.paye)}
                    </td>
                    <td style={{ padding:"12px 14px" }}>
                      <StatutBadge due={p.due} paye={p.paye} />
                    </td>
                  </tr>
                ))}
                {filteredPaiements.length === 0 && (
                  <tr>
                    <td colSpan={9} style={{ textAlign:"center", padding:"40px",
                      color:"#999", fontSize:"15px" }}>
                      Aucun paiement trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Bouton enregistrer paiement */}
          <div style={{ textAlign:"center", marginTop:"28px" }}>
            <button onClick={()=>setShowModal(true)}
              style={{ backgroundColor:"#AD56C4", color:"#fff", border:"none",
                borderRadius:"50px", padding:"14px 48px", fontSize:"16px",
                fontWeight:700, cursor:"pointer",
                boxShadow:"0 4px 14px rgba(173,86,196,0.35)" }}>
              Enregistrer un paiement
            </button>
          </div>
        </div>

        {/* ── Actions rapides ────────────────────────────────────── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px" }}>
          {[
            { icon:"🔔", label:"Relance automatique (impayés)",
              action:()=>showToast("📤 Relances envoyées aux parents concernés !") },
            { icon:"🧾", label:"Générer reçu",
              action:()=>showToast("📄 Reçu PDF généré !") },
            { icon:"⏰", label:"Planifier rappel automatique",
              action:()=>showToast("✅ Rappel planifié !") },
          ].map((btn,i)=>(
            <button key={i} onClick={btn.action}
              style={{ display:"flex", alignItems:"center", gap:"12px",
                backgroundColor:"#EFF7F6", border:"1.5px solid #dde8e6",
                borderRadius:"12px", padding:"16px 22px", fontSize:"15px",
                fontWeight:600, color:"#1a1a2e", cursor:"pointer",
                transition:"all 0.2s" }}
              onMouseEnter={e=>{
                e.currentTarget.style.backgroundColor="#AD56C4";
                e.currentTarget.style.color="#fff";
                e.currentTarget.style.borderColor="#AD56C4";
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.backgroundColor="#EFF7F6";
                e.currentTarget.style.color="#1a1a2e";
                e.currentTarget.style.borderColor="#dde8e6";
              }}>
              <span style={{ fontSize:"22px" }}>{btn.icon}</span>
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Modal paiement ────────────────────────────────────────── */}
      {showModal && (
        <ModalPaiement
          onClose={()=>setShowModal(false)}
          onSave={handleSavePaiement}
        />
      )}

      {/* ── Toast ─────────────────────────────────────────────────── */}
      {toast && (
        <div style={{ position:"fixed", bottom:"28px", right:"28px",
          backgroundColor:"#1a1a2e", color:"#fff", padding:"14px 24px",
          borderRadius:"10px", fontSize:"14px", fontWeight:600,
          boxShadow:"0 4px 20px rgba(0,0,0,0.25)", zIndex:2000,
          animation:"slideIn 0.3s ease" }}>
          {toast}
        </div>
      )}
    </div>
  );
}

// ─── Formulaire tranche ───────────────────────────────────────────────────────
function TrancheForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({
    label:    initial?.label    || "",
    montant:  initial?.montant  || "",
    echeance: initial?.echeance || "",
  });
  const set = (f) => (e) => setForm(p=>({...p,[f]:e.target.value}));

  return (
    <div style={{ backgroundColor:"#f9f5ff", borderRadius:"12px",
      padding:"20px", marginBottom:"20px", border:"1.5px solid #e9d5ff" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr auto",
        gap:"12px", alignItems:"end" }}>
        <div>
          <label style={{ display:"block", fontSize:"12px", fontWeight:600,
            color:"#555", marginBottom:"6px" }}>Libellé</label>
          <input placeholder="Ex : Tranche 4" value={form.label} onChange={set("label")}
            style={{ width:"100%", padding:"10px 12px", border:"1.5px solid #ddd",
              borderRadius:"8px", fontSize:"14px", boxSizing:"border-box" }} />
        </div>
        <div>
          <label style={{ display:"block", fontSize:"12px", fontWeight:600,
            color:"#555", marginBottom:"6px" }}>Montant (FCFA)</label>
          <input type="number" placeholder="Ex : 45000" value={form.montant} onChange={set("montant")}
            style={{ width:"100%", padding:"10px 12px", border:"1.5px solid #ddd",
              borderRadius:"8px", fontSize:"14px", boxSizing:"border-box" }} />
        </div>
        <div>
          <label style={{ display:"block", fontSize:"12px", fontWeight:600,
            color:"#555", marginBottom:"6px" }}>Échéance</label>
          <input type="date" value={form.echeance} onChange={set("echeance")}
            style={{ width:"100%", padding:"10px 12px", border:"1.5px solid #ddd",
              borderRadius:"8px", fontSize:"14px", boxSizing:"border-box" }} />
        </div>
        <div style={{ display:"flex", gap:"8px" }}>
          <button onClick={()=>onSave(form)}
            style={{ backgroundColor:"#AD56C4", color:"#fff", border:"none",
              borderRadius:"8px", padding:"10px 18px", fontSize:"14px",
              fontWeight:600, cursor:"pointer" }}>
            {initial?"Modifier":"Ajouter"}
          </button>
          <button onClick={onCancel}
            style={{ backgroundColor:"#fff", border:"1.5px solid #ddd",
              borderRadius:"8px", padding:"10px 14px", fontSize:"14px",
              cursor:"pointer" }}>✕</button>
        </div>
      </div>
    </div>
  );
}
