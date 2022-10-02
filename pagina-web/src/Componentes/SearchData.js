import React from 'react'
import { Button, Input, Table } from 'antd'
const { Search } = Input

export const SearchData = props => {
  // TODO: Render custom search option, render custom buttons with onlick, after onlick is managed outside this component
  const { buttons, onSearch, renderAlert, data, columns } = props;

  return (
    <div className='search-data'>
      {renderAlert()}
      <div className='search-data__search-bar'>
        <label>Nombre o ID de Usuario o Administrador</label>
        <Search
          placeholder="Nombre, ID de usuario"
          allowClear
          enterButton="Buscar"
          size="medium"
          onSearch={onSearch}
        />
      </div>
      <div className='search-data__table'>
        <Table
          columns={columns}
          dataSource={data}
        />
      </div>
      <div className='search-data__buttons'>
        {buttons.map(button => (
          <Button key={button.text} className={button.style} onClick={button.onClick}> {button.text} </Button>
        ))}
      </div>
    </div>
  )
}
