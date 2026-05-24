import { useState } from "react";

export default function Topbar({ title, userName = "Admin" }) {
  const [lang, setLang] = useState("Français");

  return (
    <header
      style={{
        height: 56,
        background: "#fff",
        borderBottom: "1px solid #E8E0F0",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <h1 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a2e", margin: 0, flex: 1 }}>
        {title}
      </h1>

      {/* Year badge */}
      <span
        style={{
          background: "#EFF7F6",
          color: "#7C3FAE",
          fontSize: 12,
          fontWeight: 600,
          padding: "4px 10px",
          borderRadius: 6,
          border: "1px solid #D0A9D0",
        }}
      >
        2025–2026
      </span>

      {/* Language */}
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        style={{
          border: "1px solid #E8E0F0",
          borderRadius: 6,
          padding: "4px 8px",
          fontSize: 12,
          color: "#555",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        <option>Français</option>
        <option>English</option>
      </select>

      {/* User */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#AD56C4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {userName.charAt(0).toUpperCase()}
        </div>
        <span style={{ fontSize: 13, color: "#333", fontWeight: 500 }}>
          Bienvenue, <strong>{userName}</strong>
        </span>
      </div>
    </header>
  );
}
