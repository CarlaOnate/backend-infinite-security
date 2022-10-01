import React, {useState} from "react";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';


const MenuInterno = (props) =>{

  const [itemName, setItemName] = useState("No aplica");
  const [itemName2, setItemName2] = useState("No aplica");
  const [itemName3, setItemName3] = useState("No aplica");

  const items=[
    {
      key: '1',
      label: 'Item 1',
    },
    {
      key: '2',
      label: 'Item 2',
    },
    {
      key: '3',
      label: 'Item 3',
    },
  ]

  const menu = (
    <Menu 
      selectable
      defaultSelectedKeys={['3']}
      items = {items}
      onClick = {({key}) => {
        setItemName(items.find((elm) => elm.key === key).key);
      }}
    />
  );

  const menu2 = (
    <Menu 
      selectable
      defaultSelectedKeys={['3']}
      items = {items}
      onClick = {({key}) => {
        setItemName2(items.find((elm) => elm.key === key).key);
      }}
    />
  );

  const menu3 = (
    <Menu
      selectable
      defaultSelectedKeys={['3']}
      items = {items}
      onClick = {({key}) => {
        setItemName3(items.find((elm) => elm.key === key).key);
      }}
    />
  );

  props.enviado["Categoria"] = itemName;
  props.enviado["Cantidad"] = itemName2;
  props.enviado["Productos"] = itemName3;
  console.log(props.enviado)

    return(
        <div>
            <Dropdown overlay={menu}>
                <Typography.Link>
                <Space>
                    Categoría de Productos
                    <DownOutlined />
                </Space>
                </Typography.Link>
            </Dropdown>


            <Dropdown overlay={menu2}>
                <Typography.Link>
                <Space>
                    Cantidad
                    <DownOutlined />
                </Space>
                </Typography.Link>
            </Dropdown>


            <Dropdown overlay={menu3}>
                <Typography.Link>
                <Space>
                    Productos y/o Licencias
                    <DownOutlined />
                </Space>
                </Typography.Link>
            </Dropdown>

        </div>
    )
}

export default MenuInterno;