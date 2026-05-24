<NavLink
  to="/admin/salles"
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive ? "bg-purple-800 text-white" : "text-purple-100 hover:bg-purple-700"
    }`
  }
>
  📚 Salles & Cours
</NavLink>