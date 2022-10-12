import React from 'react'
import { Button, Input, Table } from 'antd'
const { Search } = Input

export const SearchData = props => {
  const { title, buttons, onSearch, renderAlert, data = [], columns = [] } = props;

  return (
    <div className='search-data'>
      {renderAlert()}
      <div className='search-data__search-bar'>
        <label>{title}</label>
        <Search
          placeholder={title}
          enterButton="Buscar"
          size="medium"
          onSearch={onSearch}
        />
      </div>
      <div className='search-data__table'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
      <div className='BotonesUser'>
        {data.length > 0 && buttons.map(button => (
          <div key={button.text}>
            {button.show && <Button className={button.style} onClick={button.onClick}> {button.text} </Button>}
          </div>
        ))}
      </div>
    </div>
  )
}