import React, { useEffect, useState } from 'react'
import { Table } from '../../components/Table';
import { Alert } from 'antd'
import { getUsers } from '../../services/axios/user'
import { userListTableColumns } from './userFixtures'

export const UserList = () => {
  const [ data, setData ] = useState()
  const [ error, setError ] = useState(false)

  useEffect(() => {
    getUsers()
    .then(data => {
      setData(data.values)
    })
    .catch(err => setError(true))
  }, [])

  return (
    <>
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
        columns={userListTableColumns}
        data={data || []}
      />
    </>
  )
}