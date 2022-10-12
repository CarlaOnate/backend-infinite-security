import React, { useState } from 'react'
import { Button } from 'antd'
import { AdminManagement } from './AdminManagement'
import { UserManagement } from './UserManagement'
import { UserList } from './UserList'

export const Users = props => {
  const { userIsGeneralAdmin } = props;

  const [ menuSelection, setMenuSelection ] = useState('user-list')

  const shouldShowAdminManagement = userIsGeneralAdmin;

  const onClickOption = (selection) => {
    setMenuSelection(selection)
  }

  const showUserList = menuSelection === 'user-list'
  const showAdminManagement = menuSelection === 'admin-management'
  const showUserManagement = menuSelection === 'user-management'

  return (
    <section className='SeccionGlobalUsuarios'>
      <div>
        <div className='BotonesUsuario'>
          <div><Button className='CodigoPeque' onClick={() => onClickOption('user-list')}> Usuarios </Button></div>
          {shouldShowAdminManagement && <div><Button className='CodigoPeque' onClick={() => onClickOption('admin-management')}> Manejo de administradores </Button></div>}
          <div><Button className='CodigoPeque' onClick={() => onClickOption('user-management')}> Manejo de usuarios </Button></div>
        </div>

        <div className='users__right'>
          {showAdminManagement && <AdminManagement />}
          {showUserList && <UserList />}
          {showUserManagement && <UserManagement />}
        </div>
      </div>
    </section>
  )
}