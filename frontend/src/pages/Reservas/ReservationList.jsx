import React, { useEffect, useState } from 'react'
import { Table } from '../../components/Table';
import { Alert } from 'antd'
import { userHistorial } from '../../services/axios/user'
import { tableColumns } from '../reservesHistory/tableColumns'

export const ReservationList = props => {

  const [ data, setData ] = useState()
  const [ error, setError ] = useState(false)

  useEffect(() => {
    userHistorial()
    .then(data => {
      setData(data.values)
    })
    .catch(() => setError(true))
  }, [])

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
        columns={ tableColumns }
        data={data || []}
      />
    </section>
  )
}