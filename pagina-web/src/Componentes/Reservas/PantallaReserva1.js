import React, {useState, useEffect} from "react";
import { Radio } from 'antd';
import MenuInterno from "./menuInterno";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';
import { getRecursos } from "../../services/axios/user";


const PantallaReserva1 = (props) => {

    const [pantallainterior, setPantallainterior] = useState(1);

    const [itemName, setItemName] = useState("Select User Name");
    const [itemName2, setItemName2] = useState("Select User Name");
    

    const onChange = (e) => {
        console.log("cambio a " + e.target.value)
        setPantallainterior(e.target.value);
    };

    // const items=[
    //     {
    //       key: '1',
    //       label: 'Item 1',
    //     },
    //     {
    //       key: '2',
    //       label: 'Item 2',
    //     },
    //     {
    //       key: '3',
    //       label: 'Item 3',
    //     },
    // ]

    const menu = (
        <Menu 
          selectable
          defaultSelectedKeys={['3']}
          items = {props.items}
          onClick = {({key}) => {
            setItemName(props.items.find((elm) => elm.key === key).key);
          }}
        />
    );
    const menu2 = (
        <Menu 
          selectable
          defaultSelectedKeys={['3']}
          items = {props.items}
          onClick = {({key}) => {
            setItemName2(props.items.find((elm) => elm.key === key).key);
          }}
        />
    );

    props.enviado["Piso"] = itemName;
    props.enviado["Salon"] = itemName2;
    console.log(props.enviado)
    
    if(pantallainterior === 2){
        props.enviado["Categoria"] = "No aplica";
        props.enviado["Cantidad"] = "No aplica";
        props.enviado["Productos"] = "No aplica";
    }

    return(
        <div>

            <Dropdown overlay={menu}>
                <Typography.Link >
                <Space>
                    Piso
                    <DownOutlined />
                </Space>
                </Typography.Link>
            </Dropdown>

            <Dropdown overlay={menu2}>
                <Typography.Link>
                <Space>
                    Salón
                    <DownOutlined />
                </Space>
                </Typography.Link>
            </Dropdown>
            <br></br>

            <Radio.Group onChange={onChange} value={pantallainterior}>
                <Radio value={1}>Si </Radio>
                <Radio value={2}>No</Radio>
            </Radio.Group>

            {pantallainterior === 1 && <MenuInterno  enviado = {props.enviado}/>}

        </div>
    )
}

export default PantallaReserva1;