import React, { useEffect, useState } from 'react';
import { Table } from '../../components/Table';
import { historial } from '../../services/axios/user';
import { Dropdown } from './Dropdown';
import { tableColumns } from './tableColumns';
import { Input, Alert, Spin } from 'antd';
import moment from 'moment';
import { DownloadOutlined } from '@ant-design/icons';
import { formatDownloadData } from './formatDownloadData';
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
  const [ data, setData ] = useState()
  const [ error, setError ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ dropdownItem, setDropdownItem ] = useState()

  const fetchData = filter => {
    historial(filter).then(data => {
      if (data.error) {
        setError(true)
        return setLoading(false)
      }
      setData(data.values)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
      setError(true)
    })
  }

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
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

  const resetAltersStates = () => {
    setError(false)
  }

  const showDropdownTooltip = dropdownItem === '3'

  const onDonwloadData = () => formatDownloadData(data, setError);

  return (
    <section className='historial-reservas'>
      {loading && <Spin size="small" />}
      {!loading && (
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
                <div>
                  {showDropdownTooltip &&
                  <div className='historial-reservas__tooltip'>
                    <p>(1: Por iniciar, 2: En progreso, 3: Finalizada, 4: Cancelada)</p>
                  </div>
                  }
                <Search
                  className='historial-reservas__search-bar'
                  size="small"
                  placeholder="valor a filtrar"
                  onSearch={onSearch}
                />
                </div>
              </div>
          </div>
          {error &&
            <div>
              <Alert
                message="Error"
                description="Hubo un error, inténtalo mas tarde"
                type="error"
                showIcon
                afterClose={resetAltersStates}
                closable/>
            </div>
          }
          <div className='full-table'>
            <Table
              columns={tableColumns}
              data={data}
            />
          </div>
          <button className='button-right' onClick={onDonwloadData}>
            <DownloadOutlined />
            Descargar historial
          </button>
        </div>
      )}
    </section>
  );
};
