import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({ children, title, userName }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F7F3FB" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar title={title} userName={userName} />
        <main style={{ flex: 1, padding: 24, overflowY: "auto" }}>{children}</main>
      </div>
    </div>
  );
}
