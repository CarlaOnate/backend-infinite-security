import { DatePicker, Alert, Button } from 'antd'
import React, { useState } from 'react'
import { SearchData } from '../../components/SearchData'
import { getUser, editUser, deleteUser } from '../../services/axios/user'
import { adminManagementTableColumn } from './userFixtures'
import  '../../Estilos/admin-management.css'
import { OneUserReservation } from './OneUserReservation'
import { OneUserStats } from './OneUserStats'
const { RangePicker } = DatePicker;

export const UserManagement = () => {
  const [ blockInputs, setBlockInputs ] = useState({})
  const [ showBlockInputs, setShowBlockInputs ] = useState(false)
  const [ data, setData ] = useState()
  const [ error, setError ] = useState(false)
  const [ warning, setWarning ] = useState({ msg: "" })
  const [ success, setSuccess ] = useState(false)
  const [ showUserDetails, setShowUserDetails ] = useState()

  const fetchData = () => {
    data && onSearch(data[0].pk)
  }

  const onClickUserDetails = (type) => {
    setShowUserDetails(type)
  }

  const onClickButton = buttonType => {
    if (buttonType === 'activate') {
      setShowBlockInputs(false)
      onSubmit({ activate: true }, buttonType)
    }
    if (buttonType === 'block') {
      return setShowBlockInputs(!showBlockInputs)
    }
    if (buttonType === 'remove') {
      setShowBlockInputs(false)
      onSubmit(null, buttonType)
    }
  }

  const onChangeBlockInputs = (value) => {
    setBlockInputs({
      blockDate: value[0].format("YYYY-MM-DD HH:mm:ss"),
      unblockDate: value[1].format("YYYY-MM-DD HH:mm:ss")
    })
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

  const onSubmit = (inputs = {}, type) => {
    if (type === 'block' || type === 'activate') {
      const formatData = {
        id: data[0].pk,
        secondLastName: data[0].apellidoMaterno,
        lastName: data[0].apellidoPaterno,
        name: data[0].nombre,
        email: data[0].correo,
        departament: data[0].departament,
        rol: data[0].rol,
        ...inputs,
      }
      editUser(formatData)
        .then(data => {
          if (data.user) setSuccess(true)
          resetShowStates()
          fetchData()
        })
        .catch(() => setError(true))
    }

    if (type === 'remove') {
      const userId = { id: data[0].pk }
      deleteUser(userId)
        .then(data => {
          data.user && setSuccess(true)
          resetShowStates()
          fetchData()
        })
        .catch(() => setError(true))
    }
  }

  const resetAltersStates = () => {
    setWarning({ msg: "" })
    setError(false)
    setSuccess(false)
  }

  const resetShowStates = () => {
    setShowBlockInputs(false)
  }

  const searchTableActions = [
    {
      text: "Activar",
      style: "Codigoverde",
      onClick: () => onClickButton('activate'),
      show: data && data[0].rol === null
    },
    {
      text: "Bloquear",
      style: "CodigoPeque",
      onClick: () => onClickButton('block'),
      show: data && data[0].rol === null
    },
    {
      text: "Eliminar",
      style: "Codigorojopeque",
      onClick: () => onClickButton('remove'),
      show: data && data[0].rol === null
    }
  ]

  const blockOptions = [
    {
      text: "Tiempo desactivación:",
      style: "user-admin-edit__button",
      onChange: (e) => onChangeBlockInputs(e, 'blockedRange'),
      type: 'blockedRange',
      show: true
    }
  ]

  const renderInputs = (options, inputs) => {
    return (
      <div className='BloquearUserSection'>
        <div>
          {options.map(option => (
            <div key={option.text}>
              {option.show && (<>
                <label> {option.text} </label>
                <RangePicker showTime onChange={option.onChange} />
              </>)}
            </div>
          ))}
        </div>
        <div className='BotonConfirmarBloqueo'>
          <Button className="accept-button" onClick={() => onSubmit(inputs, 'block')}>Confirmar</Button>
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

  return (
    <div>
      {!showUserDetails && (<>
        <SearchData
          title="Nombre o ID de Usuario"
          buttons={searchTableActions}
          onSearch={onSearch}
          renderAlert={renderWarning}
          data={data}
          columns={adminManagementTableColumn}
        />
        {showBlockInputs && renderInputs(blockOptions, blockInputs)}
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

          <div className='user-management__secondary-actions'>
            {data && (<>
            <Button size="small" className="secondary-action-button-purple" onClick={() => onClickUserDetails('reservations')}> Historial Reservas </Button>
            <Button size="small" className="secondary-action-button-green" onClick={() => onClickUserDetails('stats')}> Estadisticas </Button>
            </>)}
          </div>
          
        </>)}
        {showUserDetails === 'stats' && <OneUserStats user={data[0]} onClickReturn={() => onClickUserDetails(null)} />}
        {showUserDetails === 'reservations' && <OneUserReservation user={data[0]} onClickReturn={() => onClickUserDetails(null)} />}
    </div>
  )
}