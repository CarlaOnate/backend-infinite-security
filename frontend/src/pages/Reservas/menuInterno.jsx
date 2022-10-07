import React, {useState, useEffect} from "react";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';
import { getRecursos } from "../../services/axios/user";

const MenuInterno = (props) =>{
  
  const [categoriaMostrar, setcategoriaMostrar] = useState("No aplica")
  const [categoria, setCategoría] = useState("No aplica");
  const [cantidadesMostrar, setCantidades] = useState("0");
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(null)

  const [nombre, setNombre] = useState(null)
  const [nombreMostrar, setNombreMostrar] = useState("No aplica");

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

  useEffect(() =>{//Ya sirve y es para desplegar las categorias
    const generarArreglo = (categoria) =>{
      const filtrado = {
        "resourceType": "Producto",
        "byCategory":true
      }
      getRecursos(filtrado).then((response) => {
        const categoriaMostrar = [];
        const categoriasPrevias = Object.keys(response.value);
        categoriasPrevias && categoriasPrevias.map(element => {
          if(response.value && response.value[element].length !== 0){
            const categoriaParcial = element;
            categoriaMostrar.push({
              key: element,
              label: `${categoriaParcial}`
            })
          }
        });

        setcategoriaMostrar(categoriaMostrar);
        setCategoría(null)
        setCantidadSeleccionada(null)
        setNombre(null)
        })
      }
      generarArreglo()

  }, [])

  useEffect(() =>{ 
    const generarArreglo = (categoria) =>{

      const filtrado = {
        "resourceType": "Producto",
        "byCategory":true
      }

      getRecursos(filtrado).then((response) => {
        const cantidadesMostrar = [];
        if(response.value && response.value[categoria].length === 0){
          setCantidades(0)
        } else {
          let contador = 0;
          const categoriaElegida = response.value[categoria];
          categoriaElegida && categoriaElegida.map(() => {
            contador = contador + 1;
            cantidadesMostrar.push({
              key: `${contador}`,
              label: `${contador}`
            })
          });

          setCantidades(cantidadesMostrar);
          setCantidadSeleccionada(null)
        }
        })
      }
      generarArreglo(categoria)

  }, [categoria])

  useEffect(() =>{ 
    const generarArreglo = (categoria) =>{

      const filtrado = {
        "resourceType": "Producto",
        "byCategory":true
      }

      
      getRecursos(filtrado).then((response) => {
        const nombreMostrar = [];
        response.value && response.value[categoria].map(element => {
          nombreMostrar.push({
            key: `${element.id}`,
            label: `${element.nombre}`
          })
        });
          setNombreMostrar(nombreMostrar);
          setCantidadSeleccionada(null)
        })
      }
      generarArreglo(categoria)
  }, [categoria])


  const menu = (
    <Menu 
      selectable
      items = {categoriaMostrar}
      onClick = {({key}) => {
        setCategoría(categoriaMostrar.find((elm) => elm.key === key).key);
      }}
    />
  );

  const menu2 = (
    <Menu
      selectable
      items = {cantidadesMostrar}
      onClick = {({key}) => {
        setCantidadSeleccionada(cantidadesMostrar.find((elm) => elm.key === key).key);
      }}
    />
  );

  const menu3 = (
    <Menu
      selectable
      items = {nombreMostrar}
      onClick = {({key}) => {
        setNombre(nombreMostrar.find((elm) => elm.key === key).key);
      }}
    />
  );

  props.enviado["Categoria"] = categoria;
  props.enviado["Cantidad"] = cantidadSeleccionada;
  props.enviado["Productos"] = nombre;

    return(
        <div className="HacerReservaCentral">
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