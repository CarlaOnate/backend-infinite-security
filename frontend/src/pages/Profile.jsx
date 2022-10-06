import { Button, DatePicker, Spin, Input, Radio, Alert, Popconfirm } from 'antd';
import React, { useEffect, useContext } from 'react'
import { useState } from 'react';
import { getUser, editUser, deleteUser, logout } from '../services/axios/user';
import moment from 'moment';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

export const Profile = props => {
  const { userIsGeneralAdmin, userId } = props;

  const [ data, setData ] = useState()
  const [ error, setError ] = useState(false)
  const [ success, setSuccess ] = useState(false)
  const [ editInputs, setEditInputs ] = useState({})
  const [ editValues, setEditValues ] = useState(false)

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const disableInputs = !editValues;
  const showDeleteAccount = !userIsGeneralAdmin

  useEffect(() => {
    getUser({ value: userId })
    .then(data => {
      const fechaNacimiento = moment(data.fechaNacimiento)
      setData({ ...data, fechaNacimiento })
      })
      .catch(() => setError(true))
  }, [userId])

  const onClickEdit = () => setEditValues(true)

  const onClickLogout = () => {
    logout()
      .then(data => {
        setUser(prev => ({ ...prev, user: null, id: null, rol: null }))
        if (data.msg) navigate('/')
      })
      .catch(() => setError(true))
  }

  const onClickDeleteAccount = () => {
    deleteUser({ id: data.pk })
      .then(async data => {
        if (data.user) {
          setSuccess(true)
          await logout();
          setUser(prev => ({ ...prev, user: null, id: null, rol: null }))
        }
      })
  }

  const onChangeEditValue = (value, type) => {
    if (value.target !== null) {
      const { target } = value;
      return setEditInputs(prev => ({
        ...prev,
        [type]: target.value,
      }))
    }
    setEditInputs(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const resetAltersStates = () => {
    setError(false)
    setSuccess(false)
  }

  const onSubmitEdit = () => {
    const defaultRequest = {
      id: data.pk,
      name: data.nombre,
      lastName: data.apellidoPaterno,
      secondLastName: data.apellidoMaterno,
      departament: data.departament,
      email: data.correo,
      rol: data.rol
    }
    editUser({ ...defaultRequest, ...editInputs })
      .then(data => {
        if (data.user) setSuccess(true)
      })
      .catch(err => {
        setEditInputs({})
        setError(true)
      })
    setEditValues(false)
  }

  const loading = !data

  return (
    <section className='SeccionGlobalProfile'>
      {loading && <Spin />}
      {!loading && (<>
        <div className='TituloCajaProfile'><h1 className='TituloProfile'>Mi perfil</h1></div>
        <div className='SeccionContenidoProfile'>
          <div>
            <div className='CorreoProfile'>
              <label>Correo:</label>
              <Input disabled defaultValue={data.correo}/>
            </div>
            <div className='FechaProfile'>
              <label>Fecha de nacimiento:</label>
              <DatePicker disabled={disableInputs} defaultValue={data.fechaNacimiento} onChange={e => onChangeEditValue(e, 'dateOfBirth')}/>
            </div>
          </div>

          <div>
            <div className='NombresProfile'>
              <label>Nombre:</label>
              <Input disabled={disableInputs} defaultValue={data.nombre} onChange={e => onChangeEditValue(e, 'name')}/>
              <Input disabled={disableInputs} defaultValue={data.apellidoPaterno} onChange={e => onChangeEditValue(e, 'lastName')}/>
              <Input disabled={disableInputs} defaultValue={data.apellidoMaterno} onChange={e => onChangeEditValue(e, 'secondLastName')}/>
            </div>
            
            <div className='GeneroProfile'>
              <label>Género:</label>
              <Radio.Group defaultValue={data.genero} onChange={e => onChangeEditValue(e, 'gender')} disabled={disableInputs} >
                <Radio value={1}>Masculino</Radio>
                <Radio value={2}>Femenimo</Radio>
                <Radio value={3}>Otro</Radio>
              </Radio.Group>
            </div>
            <div>
              <label>Oficio:</label>
              <Radio.Group defaultValue={data.oficioNumber} onChange={e => onChangeEditValue(e, 'work')} disabled={disableInputs}>
                <Radio value={1}>Profesor</Radio>
                <Radio value={2}>Estudiante</Radio>
                <Radio value={3}>Investigador</Radio>
                <Radio value={4}>Otro</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
        {editValues && (<Button onClick={onSubmitEdit}>Confirmar cambios</Button>)}
        {!editValues && (
          <div className='BotonesProfile'>

            <Button className = 'CodigoPeque' onClick={onClickEdit}>Editar</Button>

            <Button className = 'Codigoverde' onClick={onClickLogout}>Cerrar sesión</Button>
            {showDeleteAccount &&
              <Popconfirm
                title="¿Estas seguro?"
                okText="Sí, eliminar cuenta"
                cancelText="No"
                onConfirm={onClickDeleteAccount}>
                Eliminar cuenta
              </Popconfirm>
            }
          </div>
        )}
        </>)}
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
    </section>
  )
}
