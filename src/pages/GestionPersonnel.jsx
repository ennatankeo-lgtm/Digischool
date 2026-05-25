import { useState } from "react";
import AdminLayout from "../components/AdminLayout";

const PERSONNEL = [
  { id: 1, nom: "Maeva", prenom: "", role: "Fondatrice", matiere: "Direction", statut: "Présente", type: "admin", email: "maeva@digischool.cm", tel: "+237 699 000 001", sexe: "F" },
  { id: 2, nom: "Elie", prenom: "Mr", role: "Enseignant", matiere: "Mathématiques", statut: "Absent", type: "enseignant", email: "elie@digischool.cm", tel: "+237 699 000 002", sexe: "M" },
  { id: 3, nom: "David", prenom: "Mr", role: "Enseignant", matiere: "Informatique", statut: "Absent", type: "enseignant", email: "david@digischool.cm", tel: "+237 699 000 003", sexe: "M" },
  { id: 4, nom: "Admin", prenom: "", role: "Admin", matiere: "Administration", statut: "Présent", type: "admin", email: "admin@digischool.cm", tel: "+237 699 000 004", sexe: "M" },
  { id: 5, nom: "Sophie", prenom: "Mme", role: "Enseignant", matiere: "Français", statut: "Présente", type: "enseignant", email: "sophie@digischool.cm", tel: "+237 699 000 005", sexe: "F" },
  { id: 6, nom: "Armand", prenom: "Mr", role: "Enseignant", matiere: "Sciences", statut: "Présent", type: "enseignant", email: "armand@digischool.cm", tel: "+237 699 000 006", sexe: "M" },
  { id: 7, nom: "Berthe", prenom: "Mme", role: "Administratif", matiere: "Scolarité", statut: "Présente", type: "admin", email: "berthe@digischool.cm", tel: "+237 699 000 007", sexe: "F" },
  { id: 8, nom: "Jules", prenom: "Mr", role: "Enseignant", matiere: "Histoire-Géo", statut: "En congé", type: "enseignant", email: "jules@digischool.cm", tel: "+237 699 000 008", sexe: "M" },
];

const ABSENCES = [
  { id: 1, nom: "Mr Elie", role: "Enseignant", matiere: "Mathématiques", date: "2026-05-22", motif: "Maladie", statut: "Validé" },
  { id: 2, nom: "Mr David", role: "Enseignant", matiere: "Informatique", date: "2026-05-22", motif: "Personnel", statut: "En attente" },
  { id: 3, nom: "Mr Jules", role: "Enseignant", matiere: "Histoire-Géo", date: "2026-05-20", motif: "Congé annuel", statut: "Validé" },
];

const CONGES = [
  { id: 1, nom: "Mr Jules", role: "Enseignant", debut: "2026-05-20", fin: "2026-05-30", jours: 10, motif: "Congé annuel", statut: "Approuvé" },
  { id: 2, nom: "Mme Sophie", role: "Enseignant", debut: "2026-06-01", fin: "2026-06-05", jours: 5, motif: "Congé maladie", statut: "En attente" },
];

const statutColors = {
  "Présent":  { color: "#059669", background: "#ECFDF5" },
  "Présente": { color: "#059669", background: "#ECFDF5" },
  "Absent":   { color: "#DC2626", background: "#FEF2F2" },
  "En congé": { color: "#D97706", background: "#FFFBEB" },
};
const valColors = {
  "Validé":     { color: "#059669", background: "#ECFDF5" },
  "Approuvé":   { color: "#059669", background: "#ECFDF5" },
  "En attente": { color: "#D97706", background: "#FFFBEB" },
  "Refusé":     { color: "#DC2626", background: "#FEF2F2" },
};

const TABS = [
  { id: "general",    label: "Vue générale" },
  { id: "enseignant", label: "Enseignants" },
  { id: "admin",      label: "Personnel admin" },
  { id: "absences",   label: "Absence & Congés" },
];

const mkAvatar = (nom, sexe) => {
  const initials = nom.replace(/^(Mr|Mme)\s*/i, "").trim().slice(0, 2).toUpperCase();
  const bg    = sexe === "F" ? "#F5E8FB" : "#E8F0FB";
  const color = sexe === "F" ? "#AD56C4" : "#2563EB";
  return { initials, bg, color };
};

function PersonnelTable({ data }) {
  const [search, setSearch] = useState("");
  const filtered = data.filter(p =>
    !search ||
    (p.prenom + " " + p.nom).toLowerCase().includes(search.toLowerCase()) ||
    p.matiere.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div style={{ display:"flex", gap:12, marginBottom:16, alignItems:"center", flexWrap:"wrap" }}>
        <input placeholder="Rechercher…" value={search} onChange={e=>setSearch(e.target.value)} style={{ ...iS, flex:1, minWidth:200 }} />
        <button style={bP}>➕ Ajouter</button>
        <button style={bS}>⬇ Exporter</button>
      </div>
      <div style={tW}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead><tr style={{ background:"#FAF5FF" }}>
            {["Nom","Rôle","Matière / Poste","Email","Téléphone","Statut","Actions"].map(h=>(
              <th key={h} style={tH}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((p,i) => {
              const av = mkAvatar(p.nom, p.sexe);
              return (
                <tr key={p.id} style={{ borderBottom: i<filtered.length-1?"1px solid #FAF5FF":"none" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#FAF5FF"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <td style={{ padding:"12px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:34,height:34,borderRadius:"50%",background:av.bg,color:av.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0 }}>{av.initials}</div>
                      <span style={{ fontWeight:600, color:"#1a1a2e" }}>{p.prenom} {p.nom}</span>
                    </div>
                  </td>
                  <td style={{ padding:"12px 16px",color:"#555" }}>{p.role}</td>
                  <td style={{ padding:"12px 16px",color:"#555" }}>{p.matiere}</td>
                  <td style={{ padding:"12px 16px",color:"#2563EB",fontSize:12 }}>{p.email}</td>
                  <td style={{ padding:"12px 16px",color:"#555",fontSize:12 }}>{p.tel}</td>
                  <td style={{ padding:"12px 16px" }}>
                    <span style={{ fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,...(statutColors[p.statut]||{ color:"#888",background:"#f5f5f5" }) }}>{p.statut}</span>
                  </td>
                  <td style={{ padding:"12px 16px" }}>
                    <div style={{ display:"flex",gap:6 }}>
                      <button style={aB("#AD56C4","#F5E8FB")}>Voir</button>
                      <button style={aB("#555","#F5F5F5")}>Modifier</button>
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

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center" }}
      onClick={onClose}>
      <div style={{ background:"#fff",borderRadius:14,padding:28,width:480,maxWidth:"90vw",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}
        onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
          <h2 style={{ margin:0,fontSize:17,fontWeight:700,color:"#1a1a2e" }}>{title}</h2>
          <button onClick={onClose} style={{ background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#999" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function GestionPersonnel() {
  const [activeTab, setActiveTab] = useState("general");
  const [showAbsModal, setShowAbsModal]     = useState(false);
  const [showCongeModal, setShowCongeModal] = useState(false);

  const enseignants = PERSONNEL.filter(p=>p.type==="enseignant");
  const admins      = PERSONNEL.filter(p=>p.type==="admin");
  const absents     = PERSONNEL.filter(p=>p.statut==="Absent"||p.statut==="En congé");

  return (
    <AdminLayout title="Gestion du personnel" userName="Admin">

      {/* Tabs */}
      <div style={{ display:"flex",gap:4,marginBottom:24,borderBottom:"2px solid #EAE0F5" }}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{
            padding:"10px 20px",border:"none",background:"none",cursor:"pointer",fontSize:14,fontWeight:600,
            color:activeTab===t.id?"#AD56C4":"#888",
            borderBottom:activeTab===t.id?"3px solid #AD56C4":"3px solid transparent",
            marginBottom:-2,transition:"color 0.15s",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── VUE GÉNÉRALE ── */}
      {activeTab==="general" && (
        <div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginBottom:28 }}>
            {[
              { label:"Enseignants",       value:14, icon:"👩‍🏫", color:"#AD56C4", bg:"#F5E8FB" },
              { label:"Personnel admin",   value:6,  icon:"🗂️",  color:"#2563EB", bg:"#EFF6FF" },
              { label:"Absents aujourd'hui", value:2, icon:"🚫", color:"#DC2626", bg:"#FEF2F2" },
              { label:"En congé",          value:1,  icon:"🏖️",  color:"#D97706", bg:"#FFFBEB" },
            ].map(k=>(
              <div key={k.label} style={{ background:"#fff",borderRadius:12,padding:"20px 22px",border:"1px solid #EAE0F5",display:"flex",alignItems:"center",gap:16 }}>
                <div style={{ width:48,height:48,borderRadius:12,background:k.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0 }}>{k.icon}</div>
                <div>
                  <p style={{ margin:0,fontSize:12,color:"#888",fontWeight:500 }}>{k.label}</p>
                  <p style={{ margin:"4px 0 0",fontSize:28,fontWeight:700,color:k.color }}>{k.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display:"grid",gridTemplateColumns:"1fr 300px",gap:20,alignItems:"start" }}>
            {/* Table résumé */}
            <div style={{ background:"#fff",borderRadius:12,border:"1px solid #EAE0F5",overflow:"hidden" }}>
              <div style={{ padding:"16px 20px",borderBottom:"1px solid #F0E8F8",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <h2 style={{ margin:0,fontSize:15,fontWeight:600 }}>Liste du personnel</h2>
                <button onClick={()=>setActiveTab("enseignant")} style={{ fontSize:12,color:"#AD56C4",background:"none",border:"none",cursor:"pointer",fontWeight:600 }}>Voir tout →</button>
              </div>
              <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
                <thead><tr style={{ background:"#FAF5FF" }}>
                  {["Nom","Rôle","Matière / Poste","Statut","Actions"].map(h=><th key={h} style={tH}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {PERSONNEL.slice(0,6).map((p,i)=>{
                    const av=mkAvatar(p.nom,p.sexe);
                    return (
                      <tr key={p.id} style={{ borderBottom:i<5?"1px solid #FAF5FF":"none" }}
                        onMouseEnter={e=>e.currentTarget.style.background="#FAF5FF"}
                        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                        <td style={{ padding:"11px 16px" }}>
                          <div style={{ display:"flex",alignItems:"center",gap:9 }}>
                            <div style={{ width:30,height:30,borderRadius:"50%",background:av.bg,color:av.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0 }}>{av.initials}</div>
                            <span style={{ fontWeight:600,color:"#1a1a2e" }}>{p.prenom} {p.nom}</span>
                          </div>
                        </td>
                        <td style={{ padding:"11px 16px",color:"#555" }}>{p.role}</td>
                        <td style={{ padding:"11px 16px",color:"#555" }}>{p.matiere}</td>
                        <td style={{ padding:"11px 16px" }}>
                          <span style={{ fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,...(statutColors[p.statut]||{ color:"#888",background:"#f5f5f5" }) }}>{p.statut}</span>
                        </td>
                        <td style={{ padding:"11px 16px" }}><button style={aB("#AD56C4","#F5E8FB")}>Voir</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Panneau droit */}
            <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
              <div style={{ background:"#fff",borderRadius:12,border:"1px solid #EAE0F5",overflow:"hidden" }}>
                <div style={{ padding:"14px 18px",borderBottom:"1px solid #F0E8F8" }}>
                  <h2 style={{ margin:0,fontSize:14,fontWeight:600 }}>Actions rapides</h2>
                </div>
                <div style={{ padding:"12px 14px",display:"flex",flexDirection:"column",gap:8 }}>
                  {[
                    { label:"Déclarer une absence",        icon:"🚫", fn:()=>setShowAbsModal(true) },
                    { label:"Soumettre une demande de congé", icon:"📋", fn:()=>setShowCongeModal(true) },
                    { label:"Ajouter un membre",           icon:"➕", fn:()=>{} },
                  ].map(a=>(
                    <button key={a.label} onClick={a.fn} style={{
                      display:"flex",alignItems:"center",gap:10,padding:"11px 13px",
                      borderRadius:9,border:"1px solid #EAE0F5",background:"none",
                      textAlign:"left",cursor:"pointer",fontSize:13,fontWeight:500,color:"#333",
                    }}
                      onMouseEnter={e=>{e.currentTarget.style.background="#FAF5FF";e.currentTarget.style.borderColor="#D0A9D0";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.borderColor="#EAE0F5";}}>
                      <span style={{ fontSize:18 }}>{a.icon}</span>
                      <span style={{ flex:1 }}>{a.label}</span>
                      <span style={{ color:"#AD56C4",fontSize:12 }}>ouvrir →</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ background:"#fff",borderRadius:12,border:"1px solid #EAE0F5",overflow:"hidden" }}>
                <div style={{ padding:"14px 18px",borderBottom:"1px solid #F0E8F8" }}>
                  <h2 style={{ margin:0,fontSize:14,fontWeight:600 }}>Absents aujourd'hui</h2>
                </div>
                <div style={{ padding:"10px 14px" }}>
                  {absents.length===0
                    ? <p style={{ color:"#aaa",fontSize:13,padding:"8px 0" }}>Aucune absence aujourd'hui.</p>
                    : absents.map(p=>{
                        const av=mkAvatar(p.nom,p.sexe);
                        return (
                          <div key={p.id} style={{ display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:"1px solid #FAF5FF" }}>
                            <div style={{ width:32,height:32,borderRadius:"50%",background:av.bg,color:av.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700 }}>{av.initials}</div>
                            <div style={{ flex:1 }}>
                              <p style={{ margin:0,fontSize:13,fontWeight:600 }}>{p.prenom} {p.nom}</p>
                              <p style={{ margin:0,fontSize:11,color:"#888" }}>{p.matiere}</p>
                            </div>
                            <span style={{ fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:20,...(statutColors[p.statut]||{}) }}>{p.statut}</span>
                          </div>
                        );
                      })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab==="enseignant" && <PersonnelTable data={enseignants} />}
      {activeTab==="admin"      && <PersonnelTable data={admins} />}

      {/* ── ABSENCES & CONGÉS ── */}
      {activeTab==="absences" && (
        <div>
          <div style={{ display:"flex",gap:12,marginBottom:20,flexWrap:"wrap" }}>
            <button style={bP} onClick={()=>setShowAbsModal(true)}>🚫 Déclarer une absence</button>
            <button style={{ ...bP,background:"#2563EB" }} onClick={()=>setShowCongeModal(true)}>📋 Demande de congé</button>
          </div>

          <h3 style={{ fontSize:14,fontWeight:700,color:"#444",margin:"0 0 12px",textTransform:"uppercase",letterSpacing:0.5 }}>Absences récentes</h3>
          <div style={{ ...tW,marginBottom:28 }}>
            <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
              <thead><tr style={{ background:"#FAF5FF" }}>
                {["Membre","Rôle","Matière","Date","Motif","Statut","Actions"].map(h=><th key={h} style={tH}>{h}</th>)}
              </tr></thead>
              <tbody>
                {ABSENCES.map((a,i)=>(
                  <tr key={a.id} style={{ borderBottom:i<ABSENCES.length-1?"1px solid #FAF5FF":"none" }}
                    onMouseEnter={e=>e.currentTarget.style.background="#FAF5FF"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"12px 16px",fontWeight:600 }}>{a.nom}</td>
                    <td style={{ padding:"12px 16px",color:"#666" }}>{a.role}</td>
                    <td style={{ padding:"12px 16px",color:"#666" }}>{a.matiere}</td>
                    <td style={{ padding:"12px 16px",color:"#666",fontSize:12 }}>{a.date}</td>
                    <td style={{ padding:"12px 16px",color:"#444" }}>{a.motif}</td>
                    <td style={{ padding:"12px 16px" }}>
                      <span style={{ fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,...(valColors[a.statut]||{}) }}>{a.statut}</span>
                    </td>
                    <td style={{ padding:"12px 16px" }}>
                      <div style={{ display:"flex",gap:6 }}>
                        <button style={aB("#059669","#ECFDF5")}>✓ Valider</button>
                        <button style={aB("#DC2626","#FEF2F2")}>✕ Refuser</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize:14,fontWeight:700,color:"#444",margin:"0 0 12px",textTransform:"uppercase",letterSpacing:0.5 }}>Demandes de congé</h3>
          <div style={tW}>
            <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
              <thead><tr style={{ background:"#FAF5FF" }}>
                {["Membre","Rôle","Début","Fin","Jours","Motif","Statut","Actions"].map(h=><th key={h} style={tH}>{h}</th>)}
              </tr></thead>
              <tbody>
                {CONGES.map((c,i)=>(
                  <tr key={c.id} style={{ borderBottom:i<CONGES.length-1?"1px solid #FAF5FF":"none" }}
                    onMouseEnter={e=>e.currentTarget.style.background="#FAF5FF"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"12px 16px",fontWeight:600 }}>{c.nom}</td>
                    <td style={{ padding:"12px 16px",color:"#666" }}>{c.role}</td>
                    <td style={{ padding:"12px 16px",color:"#666",fontSize:12 }}>{c.debut}</td>
                    <td style={{ padding:"12px 16px",color:"#666",fontSize:12 }}>{c.fin}</td>
                    <td style={{ padding:"12px 16px" }}>
                      <span style={{ background:"#EFF6FF",color:"#2563EB",fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:20 }}>{c.jours}j</span>
                    </td>
                    <td style={{ padding:"12px 16px",color:"#444" }}>{c.motif}</td>
                    <td style={{ padding:"12px 16px" }}>
                      <span style={{ fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,...(valColors[c.statut]||{}) }}>{c.statut}</span>
                    </td>
                    <td style={{ padding:"12px 16px" }}>
                      <div style={{ display:"flex",gap:6 }}>
                        <button style={aB("#059669","#ECFDF5")}>✓ Approuver</button>
                        <button style={aB("#DC2626","#FEF2F2")}>✕ Refuser</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL ABSENCE */}
      {showAbsModal && (
        <Modal title="Déclarer une absence" onClose={()=>setShowAbsModal(false)}>
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            <div><label style={lS}>Membre du personnel</label>
              <select style={iS}>
                <option value="">-- Sélectionner --</option>
                {PERSONNEL.map(p=><option key={p.id}>{p.prenom} {p.nom} — {p.matiere}</option>)}
              </select>
            </div>
            <div><label style={lS}>Date d'absence</label><input type="date" style={iS} defaultValue="2026-05-24" /></div>
            <div><label style={lS}>Motif</label>
              <select style={iS}>
                <option>Maladie</option><option>Personnel</option><option>Congé annuel</option><option>Autre</option>
              </select>
            </div>
            <div><label style={lS}>Commentaire (optionnel)</label>
              <textarea style={{ ...iS,height:70,resize:"vertical" }} placeholder="Détails supplémentaires…" />
            </div>
            <button style={{ ...bP,width:"100%",justifyContent:"center",padding:"11px 0" }} onClick={()=>setShowAbsModal(false)}>
              ✅ Enregistrer l'absence
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL CONGÉ */}
      {showCongeModal && (
        <Modal title="Demande de congé" onClose={()=>setShowCongeModal(false)}>
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            <div><label style={lS}>Membre du personnel</label>
              <select style={iS}>
                <option value="">-- Sélectionner --</option>
                {PERSONNEL.map(p=><option key={p.id}>{p.prenom} {p.nom}</option>)}
              </select>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
              <div><label style={lS}>Date de début</label><input type="date" style={iS} /></div>
              <div><label style={lS}>Date de fin</label><input type="date" style={iS} /></div>
            </div>
            <div><label style={lS}>Motif</label>
              <select style={iS}>
                <option>Congé annuel</option><option>Congé maladie</option>
                <option>Congé maternité / paternité</option><option>Autre</option>
              </select>
            </div>
            <div><label style={lS}>Justificatif (optionnel)</label>
              <input type="file" style={{ ...iS,padding:"7px 10px" }} />
            </div>
            <button style={{ ...bP,width:"100%",justifyContent:"center",padding:"11px 0" }} onClick={()=>setShowCongeModal(false)}>
              📋 Soumettre la demande
            </button>
          </div>
        </Modal>
      )}

    </AdminLayout>
  );
}

/* ─── shared micro-styles ─── */
const tH = { padding:"10px 16px",textAlign:"left",fontWeight:600,color:"#777",borderBottom:"1px solid #EAE0F5",fontSize:12,textTransform:"uppercase",letterSpacing:0.4,whiteSpace:"nowrap" };
const tW = { background:"#fff",borderRadius:12,border:"1px solid #EAE0F5",overflow:"hidden" };
const iS = { width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid #E0D0EE",fontSize:13,color:"#1a1a2e",outline:"none",boxSizing:"border-box",background:"#FDFAFF" };
const lS = { display:"block",fontSize:12,fontWeight:600,color:"#666",marginBottom:5,textTransform:"uppercase",letterSpacing:0.4 };
const bP = { background:"#AD56C4",color:"#fff",border:"none",padding:"9px 18px",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6 };
const bS = { background:"#fff",color:"#AD56C4",border:"1px solid #D0A9D0",padding:"9px 16px",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer" };
const aB = (color,bg) => ({ fontSize:11,padding:"4px 10px",borderRadius:6,border:`1px solid ${color}33`,color,background:bg,cursor:"pointer",fontWeight:600 });
