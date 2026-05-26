import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5174";

await axios.post(`${API_BASE}/api/v1/auth/register`, payload);

const TYPES_PERSONNE = [
  { value: 4, label: "Parent" },
  { value: 3, label: "Enseignant" },
  { value: 5, label: "Élève" },
];

export default function Inscription() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
    genre: "M",
    typePersonne: 4,
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.nom.trim()) e.nom = "Nom requis";
    else if (form.nom.length > 100) e.nom = "100 caractères max";

    if (!form.prenom.trim()) e.prenom = "Prénom requis";
    else if (form.prenom.length > 100) e.prenom = "100 caractères max";

    if (!form.email.trim()) e.email = "Email requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalide";

    if (form.telephone && !/^[0-9+\s-]{6,20}$/.test(form.telephone))
      e.telephone = "Téléphone invalide";

    if (!form.dateNaissance) e.dateNaissance = "Date de naissance requise";

    if (!form.username.trim()) e.username = "Nom d'utilisateur requis";
    else if (!/^[a-zA-Z0-9._-]{3,30}$/.test(form.username))
      e.username = "3 à 30 caractères (lettres, chiffres, . _ -)";

    if (!form.password) e.password = "Mot de passe requis";
    else if (form.password.length < 8) e.password = "8 caractères minimum";

    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Les mots de passe ne correspondent pas";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        nom: form.nom.trim(),
        prenom: form.prenom.trim(),
        email: form.email.trim().toLowerCase(),
        telephone: form.telephone.trim() || null,
        dateNaissance: form.dateNaissance,
        genre: form.genre,
        typePersonne: Number(form.typePersonne),
        username: form.username.trim(),
        password: form.password,
      };

      await axios.post(`${API_BASE}/api/v1/auth/register`, payload);

      navigate("/login", {
        state: { info: "Compte créé. Vous pouvez vous connecter." },
      });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Erreur lors de l'inscription. Réessayez.";
      setServerError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Créer un compte</h1>
        <p className="text-sm text-gray-500 mb-6">
          EcoleApp 2028 — inscription d'un nouvel utilisateur.
        </p>

        {serverError && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm p-3">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Nom" name="nom" value={form.nom} onChange={handleChange} error={errors.nom} />
          <Field label="Prénom" name="prenom" value={form.prenom} onChange={handleChange} error={errors.prenom} />

          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
          <Field label="Téléphone" name="telephone" value={form.telephone} onChange={handleChange} error={errors.telephone} />

          <Field label="Date de naissance" name="dateNaissance" type="date" value={form.dateNaissance} onChange={handleChange} error={errors.dateNaissance} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Type d'utilisateur</label>
            <select
              name="typePersonne"
              value={form.typePersonne}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {TYPES_PERSONNE.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <Field label="Nom d'utilisateur" name="username" value={form.username} onChange={handleChange} error={errors.username} />
          <div className="hidden md:block" />

          <Field label="Mot de passe" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />
          <Field label="Confirmer le mot de passe" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

          <div className="md:col-span-2 flex items-center justify-between mt-2">
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              Déjà un compte ? Se connecter
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium px-5 py-2 rounded-md"
            >
              {submitting ? "Création..." : "S'inscrire"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
          error ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
        }`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
