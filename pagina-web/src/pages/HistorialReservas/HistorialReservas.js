import React, { useEffect, useContext, useState } from 'react'
import { Table } from '../../Componentes/Table';
import { UserContext } from '../../context/userContext'
import { login, historial } from '../../services/axios/user'
import { Dropdown } from './Dropdown';
import { tableColumns } from './tableColumns';
import '../../Estilos/historial-reservas.css'


export const HistorialReservas = props => {
  const { history } = props;
  const { user } = useContext(UserContext)
  const [ data, setData ] = useState()
  const [ dropdownItem, setDropdownItem ] = useState()

  if (user.rol) history.push('/login')

  const fetchData = () => {
    historial().then(data => {
      setData(data.values)
      console.log(data)
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

  console.log()

  return (
    <div className='historial-reservas-container'>
      <div className='historial-top'>
        <p className='tab'>Reservas</p>
        <div className='historial-filter'>
          <Dropdown onClickItem={handleDropdownItem} selectedItem={dropdownItem}/>
        </div>
      </div>
      <div className='full-table'>
        <Table
          columns={tableColumns}
          data={data}
        />
      </div>
      <button className='button-right'>Descargar historial</button>
    </div>
  )
}
