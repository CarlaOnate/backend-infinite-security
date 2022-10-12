import { Alert, Button, Input } from 'antd'
import React, { useState } from 'react'
import { SearchData } from '../../components/SearchData'
import { getReserva, updateReserva, deleteReserva } from '../../services/axios/user'
import { tableColumns } from '../reservesHistory/tableColumns';

export const ReservesManagement = () => {
  const [ editInputs, setEditInputs ] = useState({})
  const [ showBlockInputs, setShowBlockInputs ] = useState(false)
  const [ showEditInputs, setShowEditInputs ] = useState(false)
  const [ data, setData ] = useState()
  const [ error, setError ] = useState(false)
  const [ warning, setWarning ] = useState({})
  const [ success, setSuccess ] = useState(false)
  const [ editWarning, setEditWarning ] = useState(false)

  const fetchData = () => {
    data && onSearch(data[0].reserva.id)
  }

  const onClickButton = buttonType => {
    if (buttonType === 'edit') {
      !showEditInputs && setShowBlockInputs(false)
      return setShowEditInputs(!showEditInputs)
    }
    if (buttonType === 'block') {
      return setShowBlockInputs(!showBlockInputs)
    }
    if (buttonType === 'remove') {
      setShowBlockInputs(false)
      onSubmit(null, buttonType)
    }
  }

  const onChangeEditInput = (e, key) => {
    const { target } = e;
    const value = target.value.trim().length !== 0 ? target.value : null
    setEditInputs(prev => ({ ...prev, [key]: value }))
  }

  const onSearch = value => {
    getReserva({ value }).then(data => {
      if(data.warning) {
        setWarning({ msg: data.warning })
      } else {
        setData([data])
      }
    }).catch(() => setError({ msg: "Hubo un problema consultando la información" }))
  }

  const onSubmit = (inputs = {}, type) => {
    if (type === 'edit') {
      if (inputs.estatus < 1 || inputs.estatus > 4) return setEditWarning({ msg: "Valor estatus no valido (1 - 4)"})
      const editRequest = {
        reserva: data[0].reserva.id,
        estatus: data[0].reserva.estatus,
        lugar: data[0].lugar && data[0].lugar.id,
        producto: data[0].producto && data[0].producto.id,
        usuario: data[0].usuario.id,
        ...inputs,
      }
      updateReserva(editRequest)
        .then(data => {
          if (data.recurso) setSuccess(true)
          if (data.warning) setEditWarning({ msg: data.warning })
          fetchData()
        })
        .catch(() => setError({ msg: "Hubo un problema editando la reserva" }))
    }
    if (type === 'remove') {
      deleteReserva({ id: data[0].reserva.id })
        .then(data => {
          if (data.recurso) setSuccess(true)
          fetchData()
        })
        .catch(() => setError({ msg: "Hubo un problema borrando la reserva" }))
    }
  }

  const resetAltersStates = () => {
    setWarning({})
    setEditWarning({})
    setError(false)
    setSuccess(false)
  }

  const editReservationOptions = [
    {
      text: "Producto id",
      key: 'product',
      style: "reservation-edit-input",
      onChange: (e) => onChangeEditInput(e, 'producto'),
      inputType: "number",
      show: data
    },
    {
      text: "Lugar id",
      key: 'lugar',
      style: "reservation-edit-input",
      onChange: (e) => onChangeEditInput(e, 'lugar'),
      inputType: "number",
      show: data
    },
    {
      text: "Estatus (1: Por iniciar, 2: En proceso, 3: Finalizada, 4: Cancelada)",
      key: 'estatus',
      style: "reservation-edit-input",
      onChange: (e) => onChangeEditInput(e, 'estatus'),
      inputType: "number",
      show: data
    },
  ]

  const searchTableActions = [
    {
      text: "Editar",
      style: "user-admin-edit__button",
      onClick: () => onClickButton('edit'),
      show: data
    },
    {
      text: "Cancelar",
      style: "user-admin-edit__button",
      onClick: () => onClickButton('remove'),
      show: data
    }
  ]

  const renderWarning = (extraWarning = warning) => {
    if (!extraWarning.msg) return
    return (
      <Alert
      message={extraWarning.msg}
      type="warning"
      afterClose={resetAltersStates}
      showIcon
      closable
    />
    )
  }

  const renderInputs = (options, inputs, type) => {
    return (
      <div className="reserva_management__inputs">
        <div>
          {options.map(option => (
            <div key={option.text}>
              {option.show && (<>
                <label> {option.text} </label>
                {option.key === 'estatus' ?
                  <Input type={option.inputType} min={1} max={4} onChange={option.onChange} /> :
                  <Input type={option.inputType} onChange={option.onChange} />}
              </>)}
            </div>
          ))}
        </div>
        <div>
          <Button className="accept-button" onClick={() => onSubmit(inputs, type)}>Confirmar</Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <SearchData
        title="Nombre o ID de Reserva"
        buttons={searchTableActions}
        onSearch={onSearch}
        renderAlert={renderWarning}
        data={data}
        columns={tableColumns}
      />
      {showEditInputs && renderInputs(editReservationOptions, editInputs, 'edit')}
      {error.msg &&
        <Alert
          message="Error"
          description={error.msg}
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
        {editWarning.msg && (renderWarning(editWarning))}
    </div>
  )
}
