import React from 'react';
import { Menu as AntMenu, Dropdown as AntDropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';


export const Dropdown = props => {
  const { items, selectedItem, onClickItem, className } = props;
  const menu = (<AntMenu size="small" onClick={onClickItem} selectable items={items}/>)

  return (
    <AntDropdown className={className} overlay={menu} size="small">
      <Space>
        {selectedItem ? items[selectedItem].label : "Filtrar"}
        <DownOutlined />
      </Space>
    </AntDropdown>
  );
};