import React, { useState } from 'react'
import { Button } from 'antd'
import { AdminManagement } from './AdminManagement'
import { UserManagement } from './UserManagement'
import { UserList } from './UserList'

export const Users = props => {
  const { userIsAdmin } = props;

  const [ menuSelection, setMenuSelection ] = useState('user-list')

  const shouldShowAdminManagement = userIsAdmin;

  const onClickOption = (selection) => {
    setMenuSelection(selection)
  }

  const showUserList = menuSelection === 'user-list'
  const showAdminManagement = menuSelection === 'admin-management'
  const showUserManagement = menuSelection === 'user-management'

  return (
    <section className='SeccionGlobalUsuarios'>
      <div className='BotonesUsuario'>
        <div><Button className='CodigoPeque' onClick={() => onClickOption('user-list')}> Usuarios </Button></div>
        <div><Button className='CodigoPeque' onClick={() => onClickOption('admin-management')}> Manejo de administradores </Button></div>
        <div><Button className='CodigoPeque' onClick={() => onClickOption('user-management')}> Manejo de usuarios </Button></div>
      </div>
      
      <div>
        {shouldShowAdminManagement && showAdminManagement && <AdminManagement />}
        {showUserList && <UserList />}
        {showUserManagement && <UserManagement />}
      </div>
    </section>
  )
}