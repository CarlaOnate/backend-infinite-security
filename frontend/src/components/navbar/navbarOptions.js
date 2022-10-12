export const adminOptions = [
  { text: "Historial reservas", to: "/reserves-history", className: 'navbar__option' ,selectedClassName: 'navbar__option--selected'},
  { text: "Estadísticas", to: "/statistics", className: 'navbar__option',  selectedClassName: 'navbar__option--selected' },
  { text: "Usuarios", to: "/users", className: 'navbar__option',  selectedClassName: 'navbar__option--selected' },
  { text: "Reservas", to: "/reservation", className: 'navbar__option',  selectedClassName: 'navbar__option--selected' },
  //{ text: "Conoce el HUB", to: "/", className: 'navbar__option',  selectedClassName: 'navbar__option--selected' },
]

export const userOptions = [
  { text: "Estadísticas", to: "/statistics", className: 'navbar__option',  selectedClassName: 'navbar__option--selected' },
  //{ text: "Conoce el HUB", to: "/", className: 'navbar__option',  selectedClassName: 'navbar__option--selected' },
]

export const notLoggedOptions = [
  { text: "Inicio", to: "/", className: 'navbar__option',  selectedClassName: 'navbar__option--selected' },
  { text: "Reservas", to: "/reserves", className: 'navbar__option',  selectedClassName: 'navbar__option--selected' },
  { text: "Iniciar Sesión", to: "/login", className: 'navbar__option',  selectedClassName: 'navbar__option--selected' },
]