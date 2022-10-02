import React, { useEffect, useContext, useState } from 'react';
import { Table } from '../../components/Table';
import { UserContext } from '../../context/userContext';
import { historial } from '../../services/axios/user';
import { Dropdown } from './Dropdown';
import { tableColumns } from './tableColumns';
import { Input } from 'antd';
import moment from 'moment';
import { DownloadOutlined } from '@ant-design/icons';
import '../../Estilos/historial-reservas.css';
const { Search } = Input;

const dropdownItems = [
  {
    label: 'Código reserva',
    key: 0,
    dbname: 'codigoReserva'
  },
  {
    label: 'Lugar (Salon)',
    key: 1,
    dbname: 'idLugar__salon'
  },
  {
    label: 'Producto',
    key: 2,
    dbname: 'idProducto__nombre'
  },
  {
    label: 'Estatus',
    key: 3,
    dbname: 'estatus'
  },
  {
    label: 'Fecha inicial',
    key: 4,
    dbname: 'fechaInicio'
  },
  {
    label: 'Nombre',
    key: 5,
    dbname: 'idUsuario__username'
  },
  {
    label: 'Lugar (Piso)',
    key: 6,
    dbname: 'idLugar__piso'
  },
]

export const HistorialReservas = props => {
  const { history } = props;
  const { user } = useContext(UserContext)
  const [ data, setData ] = useState()
  const [ dropdownItem, setDropdownItem ] = useState()

  if (user.rol) history.push('/login')

  const fetchData = filter => {
    historial(filter).then(data => {
      setData(data.values)
    }).catch(e => console.log(e))
  }

  useEffect(() => {
    const fetch = async () => {
      await fetchData()
    }
    fetch()
  }, [])

  const handleDropdownItem = ({ key }) => {
    setDropdownItem(key)
  }

  const onSearch = value => {
    let filterObj = {}
    if (dropdownItems[dropdownItem].key === 4) {
      const date = moment(value).format('YYYY-MM-DD')
      filterObj = { column: dropdownItems[dropdownItem].dbname, value: date }
    } else {
      filterObj = { column: dropdownItems[dropdownItem].dbname, value }
    }
    fetchData(filterObj)
  }

  return (
    <div className='historial-reservas-container'>
      <div className='historial-top'>
        <p className='tab'>Reservas</p>
        <div className='historial-filter'>
          <Dropdown
            className='historial-dropdown'
            onClickItem={handleDropdownItem}
            selectedItem={dropdownItem}
            items={dropdownItems}
          />
          <Search
            size="small"
            placeholder="valor a filtrar"
            onSearch={onSearch}
          />
        </div>
      </div>
      <div className='full-table'>
        <Table
          columns={tableColumns}
          data={data}
        />
      </div>
      <button className='button-right'>
        <DownloadOutlined />
        Descargar historial
      </button>
    </div>
  );
};
