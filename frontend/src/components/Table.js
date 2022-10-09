import React from 'react';
import { Table as AntTable } from 'antd';

export const Table = props => {
  const { columns, data, renderFooter } = props;

  return (
    <section>
      <AntTable
        bordered
        size="small"
        columns={columns}
        dataSource={data}
        footer={renderFooter}
        scroll={{ y: 250 }}
        pagination={{
          position: ['bottomCenter'],
        }}
      />
    </section>
  )
}