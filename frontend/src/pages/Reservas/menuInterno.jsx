import React, {useState, useEffect} from "react";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';
import { getRecursos } from "../../services/axios/user";

const MenuInterno = (props) => {
  const { setEnviado2 } = props;
  const [categoriaMostrar, setcategoriaMostrar] = useState("No aplica")
  const [categoria, setCategoría] = useState("No aplica");
  const [nombre, setNombre] = useState(null)
  const [nombreMostrar, setNombreMostrar] = useState("No aplica");

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
        const nombreMostrar = [];
        response.value && response.value[categoria].map(element => {
          nombreMostrar.push({
            key: `${element.id}`,
            label: `${element.nombre}`
          })
        });
          setNombreMostrar(nombreMostrar);
        })
      }
      generarArreglo(categoria)
  }, [categoria])


  const menu = (
    <Menu
      selectable
      items = {categoriaMostrar}
      onClick = {({key}) => {
        const categoria = categoriaMostrar.find((elm) => elm.key === key).key;
        setCategoría(categoria);
        props.enviado(prev => ({
          ...prev,
          Categoria: categoria
        }))
      }}
    />
  );

  const menu3 = (
    <Menu
      selectable
      items = {nombreMostrar}
      onClick = {({key}) => {
        const nombre = nombreMostrar.find((elm) => elm.key === key).key
        setNombre(nombre)
        props.enviado(prev => ({
          ...prev,
          Productos: nombre
        }))
      }}
    />
  );

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