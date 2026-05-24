import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import APropos from "./pages/APropos";
import AccueilAdmin from "./pages/AccueilAdmin";
import GestionEleve from "./pages/GestionEleve";
import Contact from "./pages/Contact";
import Aide from "./pages/Aide";
import Livres from "./pages/Livres";
import Gestionsalles from "./pages/Gestionsalles";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Accueil />} />
        <Route path="/login"    element={<Connexion />} />
        <Route path="/about"    element={<APropos />} />
        <Route path="/admin"    element={<AccueilAdmin />} />
        <Route path="/contact" element={<Contact />} />
	<Route path="/aide"    element={<Aide />} />
	<Route path="/Livres"    element={<Livres />} />
	<Route path="/admin/Salles & cours"    element={<Gestionsalles />} />
        <Route path="/admin/eleves" element={<GestionEleve />} />
        {/* ajoute /teacher, /parent selon les besoins */}
      </Routes>
    </BrowserRouter>
  );
}
