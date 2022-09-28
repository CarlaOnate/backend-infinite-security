import React, { useEffect, useState } from 'react'
import { Space, Table as AntTable, Tag } from 'antd'
import { login, historial } from '../services/axios/user'
import moment from 'moment'

export const Table = props => {
  // TODO: Optionat - poner pagination
  const { columns, data, renderFooter } = props;

  return (
    <section>
      <AntTable
        bordered
        size="small"
        columns={columns}
        dataSource={data}
        footer={renderFooter}
        scroll={{ y: 450 }}
        pagination={{
          position: ['bottomCenter'],
        }}
      />
    </section>
  )
}
