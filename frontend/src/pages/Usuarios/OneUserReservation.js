import React, { useState, useEffect } from 'react'
import { userHistorial } from '../../services/axios/user'
import { Table } from '../../components/Table';
import { Button, Alert } from 'antd';
import { tableColumns } from '../reservesHistory/tableColumns';

export const OneUserReservation = props => {
  const { user, onClickReturn } = props;
  const [ error, setError ] = useState(false)
  const [ data, setData ] = useState()

  const fetchData = filter => {
    userHistorial(filter).then(data => {
      setData(data.values)
    }).catch(e => console.error(e))
  }

  useEffect(() => {
    const fetch = async () => {
      await fetchData({ id: user.pk })
    }
    fetch()
  }, [user.pk])

  return (
    <section>
      {error &&
        <Alert
          message="Error"
          description="Hubo un error, inténtalo mas tarde"
          type="error"
          showIcon
          afterClose={setError(false)}
          closable
        />}
      <Table
        columns={tableColumns}
        data={data}
      />
      <div className='BotonVolverRegistroUser'>
        <Button className='CodigoPeque' onClick={onClickReturn}> Volver </Button>
      </div>
    </section>
  )
}