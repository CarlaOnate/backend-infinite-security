import { Input, Alert, Button} from 'antd'
import React, { useState } from 'react'
import { SearchData } from '../../Componentes/SearchData'
import { getUser, makeUserAdmin } from '../../services/axios/user'
import { adminManagementTableColumn } from './userFixtures'
import  '../../Estilos/admin-management.css'

export const AdminManagement = () => {
  const [ editInputs, setEditInputs ] = useState({})
  const [ addInputs, setAddInputs ] = useState({})
  const [ showEditInputs, setShowEditInputs ] = useState(false)
  const [ showAddAdminInputs, setShowAddAdminInputs ] = useState(false)
  const [ data, setData ] = useState()
  const [ error, setError ] = useState(false)
  const [ warning, setWarning ] = useState({ msg: "" })
  const [ success, setSuccess ] = useState(false)

  const fetchData = () => {
    data && onSearch(data[0].pk)
  }

  const onClickButton = buttonType => {
    if (buttonType === 'edit') {
      !showEditInputs && setShowAddAdminInputs(false)
      return setShowEditInputs(!showEditInputs)
    }
    if (buttonType === 'add') {
      !showAddAdminInputs && setShowEditInputs(false)
      return setShowAddAdminInputs(!showAddAdminInputs)
    }
    if (buttonType === 'remove') {
      setShowEditInputs(false)
      setShowAddAdminInputs(false)
      return console.log('PICO remove ADMIN');
    }
  }

  const onChangeEditInput = (e, key) => {
    const { target } = e;
    setEditInputs(prev => ({ ...prev, [key]: target.value }))
  }

  const onChangeAddInputs = (e, key) => {
    const { target } = e;
    setAddInputs(prev => ({ ...prev, [key]: target.value }))
  }

  const onSearch = value => {
    getUser({value}).then(data => {
      if(data.warning) {
        setWarning({ msg: data.warning })
      } else {
        resetShowStates()
        setData([data])
      }
    }).catch(() => setError(true))
  }

  const onSubmitAddAdmin = () => {
    const makeAdminBody = {
      ...addInputs,
      id: data[0].pk,
      secondLastName: data[0].apellidoMaterno,
      lastName: data[0].apellidoPaterno,
      name: data[0].nombre,
    }
    makeUserAdmin(makeAdminBody)
      .then(data => {
        data.username && setSuccess(true)
        resetShowStates()
        fetchData()
      })
      .catch(error => setError(true))
  }

  const resetAltersStates = () => {
    setWarning({ msg: "" })
    setError(false)
    setSuccess(false)
  }

  const resetShowStates = () => {
    setShowEditInputs(false)
    setShowAddAdminInputs(false)
  }

  const searchTableActions = [
    {
      text: "Agregar",
      style: "user-admin-edit__button",
      onClick: () => onClickButton('add'),
      show: data && data[0].rol === null
    },
    {
      text: "Editar",
      style: "user-admin-edit__button",
      onClick: () => onClickButton('edit'),
      show: true
    },
    {
      text: "Quitar administrador",
      style: "user-admin-edit__button",
      onClick: () => onClickButton('remove'),
      show: data && data[0].rol !== 0
    }
  ]

  const editAdminOptions = [
    {
      text: "Nombre",
      style: "user-admin-edit__button",
      onChange: (e) => onChangeEditInput(e, 'name'),
      show: true
    },
    {
      text: "Apellido Paterno",
      style: "user-admin-edit__button",
      onChange: (e) => onChangeEditInput(e, 'lastName'),
      show: true
    },
    {
      text: "Apellido Materno",
      style: "user-admin-edit__button",
      onChange: (e) => onChangeEditInput(e, 'secondLastName'),
      show: true
    },
    {
      text: "Rol",
      style: "user-admin-edit__button",
      onChange: (e) => onChangeEditInput(e, 'rol'),
      show: data && data[0].rol === null
    },
    {
      text: "Departamento",
      style: "user-admin-edit__button",
      onChange: (e) => onChangeEditInput(e, 'departament'),
      show: data && data[0].rol !== 0
    },
    {
      text: "Correo",
      style: "user-admin-edit__button",
      onChange: (e) => onChangeEditInput(e, 'email'),
      show: data && data[0].rol === 0
    }
  ]

  const addAdminInputs = [
    {
      text: "Rol",
      style: "user-admin-edit__button",
      onChange: (e) => onChangeAddInputs(e, 'rol'),
      show: data && data[0].rol === null,
    },
    {
      text: "Departamento",
      style: "user-admin-edit__button",
      onChange: (e) => onChangeAddInputs(e, 'departament'),
      show: data && data[0].rol !== 0
    }
  ]

  const renderInputs = (options, onSubmit) => {
    return (
      <div>
        <div>
          {options.map(option => (
            <div key={option.text}>
              {option.show && (<>
                <label> {option.text} </label>
                <Input onChange={option.onChange} />
              </>)}
            </div>
          ))}
        </div>
        <div>
          <Button onClick={onSubmit}>Confirmar</Button>
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
      afterClose={resetAltersStates}
      showIcon
      closable
    />
    )
  }

  console.log(addInputs)

  return (
    <div>
      <SearchData
        title="Nombre o ID de Usuario o Administrador"
        buttons={searchTableActions}
        onSearch={onSearch}
        renderAlert={renderWarning}
        data={data}
        columns={adminManagementTableColumn}
      />
      {showEditInputs && renderInputs(editAdminOptions)}
      {showAddAdminInputs && renderInputs(addAdminInputs, onSubmitAddAdmin)}
      {error &&
        <Alert
          message="Error"
          description="Hubo un error, inténtalo mas tarde"
          type="error"
          showIcon
          afterClose={resetAltersStates}
          closable
        />}
       {success &&
        <Alert
          message="Se hizo el cambio con exito"
          type="success"
          showIcon
          afterClose={resetAltersStates}
          closable
        />}
    </div>
  )
}
