import React from 'react';
import { Menu as AntMenu, Dropdown as AntDropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';


export const Dropdown = props => {
  const { items, selectedItem, onClickItem } = props;
  const menu = (<AntMenu size="small" onClick={onClickItem} selectable items={items}/>)

  return (
    <AntDropdown overlay={menu} overlayStyle={{fontSize: '12px'}}>
      <Space>
        {selectedItem ? items[selectedItem].label : "Filtrar por"}
        <DownOutlined />
      </Space>
    </AntDropdown>
  );
};