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
import ForgotPassword from "./pages/ForgotPassword";

// Pages enseignant
import DashboardEnseignant from "./pages/DashboardEnseignant";
import MesClasses from "./pages/MesClasses";
import MesEleves from "./pages/MesEleves";
import MesEpreuves from "./pages/MesEpreuves";
import SaisieNotes from "./pages/SaisieNotes";
import EmploiDuTemps from "./pages/EmploiDuTemps";
import Discipline from "./pages/Discipline";
import Messages from "./pages/Messages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages publiques */}
        <Route path="/"                         element={<Accueil />} />
        <Route path="/login"                    element={<Connexion />} />
        <Route path="/about"                    element={<APropos />} />
        <Route path="/contact"                  element={<Contact />} />
        <Route path="/aide"                     element={<Aide />} />
        <Route path="/livres"                   element={<Livres />} />
        <Route path="/forgotPassword"           element={<ForgotPassword />} />

        {/* Pages admin */}
        <Route path="/admin"                    element={<AccueilAdmin />} />
        <Route path="/admin/Eleves"             element={<GestionEleve />} />
        <Route path="/admin/Salles"             element={<Gestionsalles />} />

        {/* Pages enseignant */}
        <Route path="/teacher"                  element={<DashboardEnseignant />} />
        <Route path="/teacher/classes"          element={<MesClasses />} />
        <Route path="/teacher/students"         element={<MesEleves />} />
        <Route path="/teacher/exams"            element={<MesEpreuves />} />
        <Route path="/teacher/exams/grades"     element={<SaisieNotes />} />
        <Route path="/teacher/schedule"         element={<EmploiDuTemps />} />
        <Route path="/teacher/discipline"       element={<Discipline />} />
        <Route path="/messages"                 element={<Messages />} />
      </Routes>
    </BrowserRouter>
  );
}