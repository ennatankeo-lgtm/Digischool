import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Tableau de bord", icon: "🏠", path: "/admin" },
  { label: "Élèves", icon: "🎓", path: "/admin/eleves" },
  { label: "Finance", icon: "💰", path: "/admin/finance" },
  { label: "Personnel", icon: "👥", path: "/admin/personnel" },
  { label: "Salles & cours", icon: "📚", path: "/admin/salles" },
  { label: "Messages", icon: "✉️", path: "/admin/messages" },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? 64 : 220,
        minHeight: "100vh",
        background: "#7C3FAE",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "18px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: "#fff",
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          D
        </div>
        {!collapsed && (
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: 0.5 }}>
            DIGISCHOOL
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.7)",
            cursor: "pointer",
            fontSize: 18,
            padding: 0,
          }}
          aria-label="Réduire le menu"
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px" }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 8,
                color: active ? "#fff" : "rgba(255,255,255,0.7)",
                background: active ? "rgba(255,255,255,0.18)" : "transparent",
                textDecoration: "none",
                fontSize: 14,
                marginBottom: 2,
                transition: "background 0.15s",
                fontWeight: active ? 600 : 400,
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
        <Link
          to="/login"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 8,
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          <span style={{ fontSize: 18 }}>🚪</span>
          {!collapsed && <span>Déconnexion</span>}
        </Link>
      </div>
    </aside>
  );
}
