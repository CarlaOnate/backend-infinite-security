import React from 'react';
import { Table as AntTable } from 'antd';

export const Table = props => {
  const { columns, data, renderFooter } = props;

  return (
    <section className="table">
      <AntTable
        bordered
        size="small"
        columns={columns}
        dataSource={data}
        footer={renderFooter}
        scroll={{ y: '50vh' }}
        pagination={{
          position: ['bottomCenter'],
        }}
      />
    </section>
  )
}