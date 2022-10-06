import React, {useState, useEffect} from "react";
import { Radio } from 'antd';
import MenuInterno from "./menuInterno";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';
import { getRecursos } from "../../services/axios/user";

const PantallaReserva1 = (props) => {
    const [pantallainterior, setPantallainterior] = useState(1);
    const [piso, setPiso] = useState();
    const [salon, setSalon] = useState("Select User Name");
    const [salonesMostrar, setSalonesMostrar] = useState("");

    const onChange = (e) => {
        setPantallainterior(e.target.value);
    };

    const menu = (
        <Menu
          selectable
          defaultSelectedKeys={['3']}
          items = {props.items}
          onClick = {({key}) => {
            setPiso(props.items.find((elm) => elm.key === key).key);
          }}
        />
    );

    const menu2 = (
        <Menu
          selectable
          defaultSelectedKeys={['3']}
          items = {salonesMostrar}
          onClick = {({key}) => {
            setSalon(salonesMostrar.find((elm) => elm.key === key).key);
          }}
        />
    );

    useEffect(() =>{
        const generarArreglo = (piso) =>{

            const filtrado = {
                "resourceType": "Lugar",
                "byFloor": true
            }

            getRecursos(filtrado).then((response) => {
                // console.log(response)
                // console.log(props.enviado)
                const salones = response[piso];
                const salonesMostrar = []
                salones.map(element => {
                    // console.log("Aqui")
                    // console.log(element.fields.salon)
                    // console.log(element)
                    // console.log("Comprobando")
                    // console.log(element.pk)
                    salonesMostrar.push({
                        key: `${element.pk}`,
                        label: `${element.fields.salon}`
                    })
                })

                // console.log("Aqui")
                // console.log(salonesMostrar)
                setSalonesMostrar(salonesMostrar)
                setSalon("No aplica")

            }).catch((error) =>{
                console.log("error pantalla reserva 1")
            })
        }
        generarArreglo(piso)

    }, [piso])
    
    props.enviado["Piso"] = piso;
    props.enviado["Salon"] = salon;
    //console.log(props.enviado)
    console.log(props.enviado)
    
    if(pantallainterior === 2){
        props.enviado["Categoria"] = "No aplica";
        props.enviado["Cantidad"] = "No aplica";
        props.enviado["Productos"] = "No aplica";
    }

    return(
        <div className="HacerReservaCentral">

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
            
            <p>¿Requiere algun recurso extra?</p>
            <Radio.Group onChange={onChange} value={pantallainterior}>
                <Radio value={1}>Si </Radio>
                <Radio value={2}>No</Radio>
            </Radio.Group>

            <br></br>

            <p>Equipo seleccionado</p>
            {pantallainterior === 1 && <MenuInterno  enviado = {props.enviado}/>}

        </div>
    )
}

export default PantallaReserva1;