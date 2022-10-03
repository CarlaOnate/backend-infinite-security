import React, {useState, useEffect} from "react";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';
import { getRecursos } from "../../services/axios/user";

const MenuInterno = (props) =>{
  
  const [categoriaMostrar, setcategoriaMostrar] = useState("No aplica")
  const [categoria, setCategoría] = useState("No aplica");
  const [cantidadesMostrar, setCantidades] = useState("0");
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState('No aplica')

  const [nombre, setNombre] = useState('No aplica')
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
        
        console.log(response)
        // console.log(response[categoria])
        const categoriaMostrar = [];

        const categoriasPrevias = Object.keys(response);

        categoriasPrevias.map(element => {

          //console.log(element)
          
          if(response[element].length !== 0){
            
            const categoriaParcial = element;

            categoriaMostrar.push({

              key: element,
              label: `${categoriaParcial}`
            })

          }

        });

        console.log(categoriaMostrar)
        setcategoriaMostrar(categoriaMostrar);
        setCategoría('No aplica')
        setCantidadSeleccionada('No aplica')
        setNombre('No aplica')
        }).catch((error) =>{
            console.log("error pantalla reserva 2.2")
        })

      }
      generarArreglo()

  }, [])

  useEffect(() =>{ //Ya sirve y es para dar las cantidades
    const generarArreglo = (categoria) =>{

      const filtrado = {
        "resourceType": "Producto",
        "byCategory":true
      }

      getRecursos(filtrado).then((response) => {
        
        // console.log(categoria)
        // console.log(response[categoria])
        const cantidadesMostrar = [];

        if(response[categoria].lenght === 0){
          setCantidades(0)
        }else{
          let contador = 0;
          const categoriaElegida = response[categoria];
          categoriaElegida.map(element => {

            contador = contador + 1;
            
            cantidadesMostrar.push({
              key: `${contador}`,
              label: `${contador}`
            })

          });

          setCantidades(cantidadesMostrar);
          setCantidadSeleccionada('No aplica')
        }

        //setSalonesMostrar(salonesMostrar)
        //setSalon("No aplica")

        }).catch((error) =>{
            console.log("error pantalla reserva 2.1")
        })

      }
      generarArreglo(categoria)

  }, [categoria])

  useEffect(() =>{ //Ya sirve y es para dar los nombres
    const generarArreglo = (categoria) =>{

      const filtrado = {
        "resourceType": "Producto",
        "byCategory":true
      }

      getRecursos(filtrado).then((response) => {
        //console.log(response)
        const nombreMostrar = [];

        const categoriaElegida = categoria
        response[categoria].map(element => {
            // console.log("Comprobando")
            // console.log(element.pk)

          nombreMostrar.push({
            key: `${element.pk}`,
            label: `${element.fields.nombre}`
          })

        });

        setNombreMostrar(nombreMostrar);
        setCantidadSeleccionada('No aplica')

        }).catch((error) =>{
            console.log("error pantalla reserva 2.3")
        })

      }
      generarArreglo(categoria)

  }, [categoria])


  const menu = (//Ya sirve
    <Menu 
      selectable
      items = {categoriaMostrar}
      onClick = {({key}) => {
        setCategoría(categoriaMostrar.find((elm) => elm.key === key).key);
      }}
    />
  );

  const menu2 = (//Ya sirve
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
  console.log(props.enviado)

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