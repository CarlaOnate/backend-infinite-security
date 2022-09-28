import React from 'react'
import { Menu as AntMenu, Dropdown as AntDropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';


export const Dropdown = props => {
  const { selectedItem, onClickItem } = props;

  const items = [
    {
      label: 'Código reserva',
      key: 0,
    },
    {
      label: 'Lugar',
      key: 1,
    },
    {
      label: 'Producto',
      key: 2,
    },
    {
      label: 'Estatus',
      key: 3,
    },
    {
      label: 'Fecha inicial',
      key: 4,
    },
    {
      label: 'Nombre',
      key: 5,
    },
  ]

  const menu = (<AntMenu onClick={onClickItem} selectable items={items}/>)

  return (
    <AntDropdown overlay={menu}>
      <Space>
        {selectedItem ? items[selectedItem].label : "Filtrar por"}
        <DownOutlined />
      </Space>
    </AntDropdown>
  )
}