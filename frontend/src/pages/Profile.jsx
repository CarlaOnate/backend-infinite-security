import { Button, DatePicker, Spin, Input, Radio } from 'antd';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { getUser } from '../services/axios/user';
import moment from 'moment';

export const Profile = props => {
  const { userLoggedIn, userIsGeneralAdmin, userId } = props;

  const [ data, setData ] = useState()
  const [ error, setError ] = useState(false)
  const [ editValues, setEditValues ] = useState(false)
  const [ checkbod, setCheckbox ] = useState()

  const disableInputs = !editValues;
  const showDeleteAccount = !userIsGeneralAdmin

  useEffect(() => {
    getUser({ value: 11 })
    .then(data => {
      const fechaNacimiento = moment(data.fechaNacimiento)
      setData({ ...data, fechaNacimiento })
      setCheckbox(data.genero)
      setCheckbox(data.oficio)
      })
      .catch(error => setError(true))
    }, [userId])

  const loading = !data

  console.log(userLoggedIn, userIsGeneralAdmin)
  console.log(data)

  return (
    <section>
      {loading && <Spin />}
      {!loading && (<>
        <div><h1>Mi perfil</h1></div>
        <div>
          <div>
            <div>
              <label>Correo:</label>
              <Input disabled={disableInputs} value={data.correo}/>
            </div>
            <div>
              <label>Password:</label>
              <Input disabled={disableInputs} value={data.password} />
            </div>
            <div>
              <label>Fecha de nacimiento:</label>
              <DatePicker defaultValue={data.fechaNacimiento}/>
            </div>
          </div>
          <div>
            <div>
              <label>Nombre:</label>
              <Input disabled={disableInputs} value={data.nombre} />
              <Input disabled={disableInputs} value={data.lastName}/>
              <Input disabled={disableInputs} value={data.secondLastName} />
            </div>
            <div>
              <label>Género:</label>
              <Radio.Group disabled={disableInputs} >
                <Radio value={1}>Masculino</Radio>
                <Radio value={2}>Femenimo</Radio>
                <Radio value={3}>Otro</Radio>
              </Radio.Group>
            </div>
            <div>
              <label>Oficio:</label>
              <Radio.Group>
                <Radio value={1}>Profesor</Radio>
                <Radio value={2}>Estudiante</Radio>
                <Radio value={3}>Investigador</Radio>
                <Radio value={4}>Otro</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
        <div>
          <Button>Editar</Button>
          <Button>Cerrar sesión</Button>
          {showDeleteAccount && <Button>Eliminar cuenta</Button>}
        </div>
        </>)}
    </section>
  )
}
