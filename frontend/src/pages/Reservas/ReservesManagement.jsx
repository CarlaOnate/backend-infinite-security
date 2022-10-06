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
  const [ warning1, setWarning1 ] = useState(false)

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
    setEditInputs(prev => ({ ...prev, [key]: target.value }))
  }

  const onSearch = value => {
    getReserva({ value }).then(data => {
      if(data.warning) {
        setWarning({ msg: data.warning })
      } else {
        setData([data])
      }
    }).catch(() => setError(true))
  }

  const onSubmit = (inputs = {}, type) => {
    if (type === 'edit') {
      const editRequest = {
        reserva: data[0].reserva.id,
        estatus: data[0].reserva.estatus,
        lugar: data[0].lugar.id,
        producto: data[0].producto.id,
        usuario: data[0].usuario.id,
        ...inputs,
      }
      updateReserva(editRequest)
        .then(data => {
          if (data.recurso) setSuccess(true)
          if (data.warning) setWarning1({ msg: data.warning })
          fetchData()
        })
        .catch(() => setError(true))
    }
    if (type === 'remove') {
      deleteReserva({ id: data[0].reserva.id })
        .then(data => {
          if (data.recurso) setSuccess(true)
          fetchData()
        })
        .catch(() => setError(true))
    }
  }

  const resetAltersStates = () => {
    setWarning({})
    setWarning1({})
    setError(false)
    setSuccess(false)
  }

  const editReservationOptions = [
    {
      text: "Producto id",
      style: "reservation-edit-input",
      onChange: (e) => onChangeEditInput(e, 'producto'),
      show: data
    },
    {
      text: "Lugar id",
      style: "reservation-edit-input",
      onChange: (e) => onChangeEditInput(e, 'lugar'),
      show: data
    },
    {
      text: "Estatus (numero)",
      style: "reservation-edit-input",
      onChange: (e) => onChangeEditInput(e, 'estatus'),
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
          <Button onClick={() => onSubmit(inputs, type)}>Confirmar</Button>
        </div>
      </div>
    )
  }

  return (
    <section>
      <SearchData
        title="Nombre o ID de Reserva"
        buttons={searchTableActions}
        onSearch={onSearch}
        renderAlert={renderWarning}
        data={data}
        columns={tableColumns}
      />
      {showEditInputs && renderInputs(editReservationOptions, editInputs, 'edit')}
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
        {warning1.msg && (renderWarning(warning1))}
    </section>
  )
}
