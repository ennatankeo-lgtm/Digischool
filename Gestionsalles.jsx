import { useState } from "react";
import AdminLayout from "../components/AdminLayout";

export default function GestionSalles() {
  const [activeTab, setActiveTab] = useState("salles");
  const [selectedClass, setSelectedClass] = useState("CM1");

  // Données simulées (à remplacer par appel API)
  const salles = [
    { id: 1, nom: "Salle A1", capacite: 30, type: "Classe", statut: "occupée" },
    { id: 2, nom: "Salle A2", capacite: 28, type: "Classe", statut: "libre" },
    { id: 3, nom: "Labo Informatique", capacite: 50, type: "Spécialisée", statut: "occupée" },
    { id: 4, nom: "Bibliothèque", capacite: 40, type: "Spécialisée", statut: "maintenance" },
    { id: 5, nom: "Salle de Musique", capacite: 20, type: "Spécialisée", statut: "libre" },
    { id: 6, nom: "Salle B1", capacite: 32, type: "Classe", statut: "libre" },
  ];

  const cours = [
    { id: 1, nom: "Mathématiques", coefficient: 4, classes: ["CM1", "CM2", "6ème"] },
    { id: 2, nom: "Français", coefficient: 5, classes: ["CM1", "CM2"] },
    { id: 3, nom: "Anglais", coefficient: 2, classes: ["CM1", "CM2", "6ème"] },
    { id: 4, nom: "SVT", coefficient: 3, classes: ["6ème"] },
  ];

  const emploiDuTemps = {
    CM1: {
      lundi: ["Maths (8h-10h)", "Français (10h-12h)", "EPS (14h-16h)"],
      mardi: ["Anglais (8h-9h)", "Histoire (9h-11h)", "Musique (14h-15h)"],
      mercredi: ["Maths (8h-10h)", "SVT (10h-12h)"],
      jeudi: ["Français (8h-10h)", "Anglais (10h-12h)", "Sport (14h-16h)"],
      vendredi: ["Maths (8h-9h)", "Français (9h-11h)", "Arts plastiques (14h-16h)"],
      samedi: ["Soutien (8h-12h)"],
    },
  };

  const stats = {
    totalSalles: salles.length,
    specialisees: salles.filter((s) => s.type === "Spécialisée").length,
    libres: salles.filter((s) => s.statut === "libre").length,
    maintenance: salles.filter((s) => s.statut === "maintenance").length,
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-[#EFF7F6] min-h-screen">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Gestion des salles et cours</h1>
          <p className="text-gray-500">Administrez les salles, les matières et les emplois du temps</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-[#AD56C4]">
            <p className="text-gray-500 text-sm">Salles de classe</p>
            <p className="text-3xl font-bold text-gray-800">{stats.totalSalles}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-[#AD56C4]">
            <p className="text-gray-500 text-sm">Salles spécialisées</p>
            <p className="text-3xl font-bold text-gray-800">{stats.specialisees}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500">
            <p className="text-gray-500 text-sm">Libres maintenant</p>
            <p className="text-3xl font-bold text-gray-800">{stats.libres}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-orange-500">
            <p className="text-gray-500 text-sm">En maintenance</p>
            <p className="text-3xl font-bold text-gray-800">{stats.maintenance}</p>
          </div>
        </div>

        {/* Onglets */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("salles")}
              className={`px-6 py-3 text-sm font-medium transition ${
                activeTab === "salles"
                  ? "text-[#AD56C4] border-b-2 border-[#AD56C4]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              📋 Salles
            </button>
            <button
              onClick={() => setActiveTab("cours")}
              className={`px-6 py-3 text-sm font-medium transition ${
                activeTab === "cours"
                  ? "text-[#AD56C4] border-b-2 border-[#AD56C4]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              📚 Cours & Matières
            </button>
            <button
              onClick={() => setActiveTab("emploi")}
              className={`px-6 py-3 text-sm font-medium transition ${
                activeTab === "emploi"
                  ? "text-[#AD56C4] border-b-2 border-[#AD56C4]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              📅 Emploi du temps
            </button>
          </div>

          <div className="p-5">
            {/* Onglet Salles */}
            {activeTab === "salles" && (
              <div>
                <div className="flex justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Liste des salles</h2>
                  <button className="bg-[#AD56C4] text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition">
                    + Nouvelle salle
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nom
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Capacité
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {salles.map((salle) => (
                        <tr key={salle.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{salle.nom}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{salle.capacite} places</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{salle.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                salle.statut === "occupée"
                                  ? "bg-red-100 text-red-800"
                                  : salle.statut === "libre"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                              }`}
                            >
                              {salle.statut}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-[#AD56C4] hover:text-purple-700 mr-3">✏️</button>
                            <button className="text-red-500 hover:text-red-700">🗑️</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Onglet Cours */}
            {activeTab === "cours" && (
              <div>
                <div className="flex justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Matières enseignées</h2>
                  <button className="bg-[#AD56C4] text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition">
                    + Nouveau cours
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Matière
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Coefficient
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Classes concernées
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cours.map((c) => (
                        <tr key={c.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.nom}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.coefficient}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{c.classes.join(", ")}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-[#AD56C4] hover:text-purple-700 mr-3">✏️</button>
                            <button className="text-red-500 hover:text-red-700">🗑️</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Onglet Emploi du temps */}
            {activeTab === "emploi" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Emploi du temps hebdomadaire</h2>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-[#AD56C4]"
                  >
                    <option value="CM1">CM1</option>
                    <option value="CM2">CM2</option>
                    <option value="6ème">6ème</option>
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jour</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cours</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(emploiDuTemps[selectedClass] || {}).map(([jour, coursList]) => (
                        <tr key={jour}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 capitalize">{jour}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {coursList.length > 0 ? coursList.join(" • ") : "Aucun cours"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-right">
                  <button className="text-[#AD56C4] text-sm hover:underline">📥 Exporter l'emploi du temps (PDF)</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}