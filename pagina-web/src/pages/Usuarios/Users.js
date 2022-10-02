import React from 'react'
import { AdminManagement } from './AdminManagement'

export const Users = () => {
  return (
    <section>
      <div>
        <div><button>Usuarios</button></div>
        <div><button>Manejo de administradores</button></div>
        <div><button>Manejo de usuarios</button></div>
      </div>
      <div>
        <AdminManagement />
      </div>
    </section>
  )
}
