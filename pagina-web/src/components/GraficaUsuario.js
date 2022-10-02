import { Radio, Tabs } from 'antd';
import React, { useState } from 'react';
import Graficas  from './Graficas.js'

const GraficasUsuario = () => {
  const [size, setSize] = useState('large');

  const onChange = (e) => {
    setSize(e.target.value);
  };

  return (
    <div>
        
        <section className='header'>.</section>
        
        <div className='Titulos'>
            <h1>Estadísticas</h1>
            <h3>Resumen del mes</h3>
        </div>
        
      {/* <Radio.Group
        value={size}
        onChange={onChange}
        style={{
          marginBottom: 16,
        }}
      >
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="middle">Middle</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
      </Radio.Group> */}
      
        <Tabs
            defaultActiveKey="1"
            type="card"
            size={size}
            items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
                label: `Card Tab ${id}`,
                key: id,
                //children: `Content of card tab ${id}`,x
                children: <Graficas nombre = {id}/>,
            };
            })}
        />

        <section className='footer'>.</section>
    
    </div>
  );
};

export default GraficasUsuario;