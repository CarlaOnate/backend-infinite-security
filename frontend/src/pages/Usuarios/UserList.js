import React, { useEffect, useState } from 'react'
import { Table, Alert } from 'antd'
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
        columns={userListTableColumns}
        dataSource={data || []}
        scroll = {{y:250}}
      />
    </section>
  )
}