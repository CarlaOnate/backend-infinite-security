import { Input, Alert } from 'antd'
import React, { useState } from 'react'
import { SearchData } from '../../Componentes/SearchData'
import { getUser } from '../../services/axios/user'
import { adminManagementTableColumn } from './userFixtures'
import  '../../Estilos/admin-management.css'

export const AdminManagement = () => {
  const [ editInputs, setEditInputs ] = useState({})
  const [ showEditInputs, setShowEditInputs ] = useState(false)
  const [ data, setData ] = useState([])
  const [ error, setError ] = useState(false)
  const [ warning, setWarning ] = useState({ msg: "" })

  const onClickButton = buttonType => {
    console.log('BUTTON CLICKED', buttonType)
    if (buttonType === 'edit') return setShowEditInputs(!showEditInputs);
    if (buttonType === 'add') return console.log('PICO ADD ADMIN');
    if (buttonType === 'remove') return console.log('PICO remove ADMIN');
  }

  const onChangeEditInput = (e, key) => {
    const { target } = e;
    setEditInputs(prev => ({ ...prev, [key]: target.value }))
  }

  const onSearch = value => {
    getUser({value}).then(data => {
      if(data.warning) {
        setWarning({ msg: data.warning })
      } else {
        setData([data])
      }
    }).catch(errorMsg => setError(true))
    console.log('SEARCH =>', value)
  }

  const resetWarningsAndError = () => {
    setWarning({ msg: "" })
    setError(false)
  }

  const searchTableActions = [
    {
      text: "Agregar",
      style: "user-admin-edit__button",
      onClick: () => onClickButton('add')
    },
    {
      text: "Editar",
      style: "user-admin-edit__button",
      onClick: () => onClickButton('edit')
    },
    {
      text: "Quitar administrador",
      style: "user-admin-edit__button",
      onClick: () => onClickButton('remove')
    }
  ]

  const editAdminOptions = [
    {
      text: "Nombre",
      style: "user-admin-edit__button",
      onChange: (e) => onChangeEditInput(e, 'name')
    },
    {
      text: "Apellido Paterno",
      style: "user-admin-edit__button",
      onChange: (e) => onChangeEditInput(e, 'lastName')
    },
    {
      text: "Apellido Materno",
      style: "user-admin-edit__button",
      onChange: (e) => onChangeEditInput(e, 'secondLastName')
    },
    {
      text: "Rol",
      style: "user-admin-edit__button",
      onChange: (e) => onChangeEditInput(e, 'rol')
    },
    {
      text: "Departamento",
      style: "user-admin-edit__button",
      onChange: (e) => onChangeEditInput(e, 'department')
    }
  ]

  const renderInputs = (options) => {
    return (
      <div>
        <div>
          {options.map(option => (
            <div key={option.text}>
              <label> {option.text} </label>
              <Input onChange={option.onChange} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderWarning = () => {
    if (!warning.msg) return
    return (
      <Alert
      message={warning.msg}
      type="warning"
      afterClose={resetWarningsAndError}
      showIcon
      closable
    />
    )
  }

  console.log(data)

  return (
    <div>
      <SearchData
        buttons={searchTableActions}
        onSearch={onSearch}
        renderAlert={renderWarning}
        data={data}
        columns={adminManagementTableColumn}
      />
      {showEditInputs && renderInputs(editAdminOptions)}
      {error &&
        <Alert
          message="Error Text"
          description="Hubo un error, inténtalo mas tarde"
          type="error"
          showIcon
          afterClose={resetWarningsAndError}
          closable
        />}
    </div>
  )
}
