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
            const piso = props.items.find((elm) => elm.key === key).key;
            setPiso(piso);
            props.enviado(prev => ({
              ...prev,
              Piso: piso
            }))
          }}
        />
    );

    const menu2 = (
        <Menu
          selectable
          defaultSelectedKeys={['3']}
          items = {salonesMostrar}
          onClick = {({key}) => {
            const salon = salonesMostrar.find((elm) => elm.key === key).key
            props.enviado(prev => ({
              ...prev,
              Salon: salon
            }))
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

                const salones = response.value[piso];
                const salonesMostrar = []

                salones.map(element => {
                    salonesMostrar.push({
                        key: `${element.id}`,
                        label: `${element.salon}`
                    })
                })
                setSalonesMostrar(salonesMostrar)
                setSalon(null)

            }).catch((error) =>{
                console.error("ERROR: PantallaReserva1", error)
            })
        }
        generarArreglo(piso)

    }, [piso])

    useEffect( () => {
      if (pantallainterior === 2) {
        props.enviado(prev => ({
          ...prev,
          Categoria: null,
          Cantidad: null,
          Productos: null
        }))
      }
    }, [props, pantallainterior])

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

            {pantallainterior === 1 && <MenuInterno  enviado = {props.enviado}/>}

        </div>
    )
}

export default PantallaReserva1;