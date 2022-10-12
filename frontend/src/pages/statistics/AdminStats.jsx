import React, { useEffect, useState } from 'react'
import { Button } from 'antd';
import { Chart } from "react-google-charts";
import { getAdminStats } from '../../services/axios/user';

const dataDefaultTexts = {
  lugares: {
    title: "Lugares mas reservados",
    buttonText: "Lugares mas reservados",
  },
  productos: {
    title: "Productos mas reservados",
    buttonText: "Productos mas reservados",
  },
  categorias: {
    title: "Categorias mas reservadas",
    buttonText: "Categorias mas reservadas",
  }
}

export const AdminStats = () => {
  const [selectedGraphs, setSelectedGraphs] = useState({count: 0})
  const [selectedButtons, setSelectedButtons] = useState({})
  const [data, setData] = useState({})
  const [formattedData, setFormattedData] = useState({})

  useEffect(() => {
    const formatGraphObject = () => {
      Object.keys(data).forEach(key => {
        const columns = []
        let columnData
        data && data[key].forEach(el => {
          if (key === 'productos') {
            columnData = ["Productos", "Cantidad"]
            return columns.push([el.recurso.nombre, el.count])
          }
          if (key === 'lugares') {
            columnData = ["Lugares", "Cantidad"]
            return columns.push([`Piso ${el.recurso.piso}, Salon ${el.recurso.salon}`, el.count])
          }
          if (key === 'categorias') {
            columnData = ["Categorias", "Cantidad"]
            return columns.push([el.recurso, el.count])
          }
        })
        setFormattedData(prev => ({
          ...prev,
          [key]: {
            data: [columnData, ...columns],
            buttonText: dataDefaultTexts[key].buttonText,
            options: {
              legend: { position: 'none' },
              chart: {
                title: dataDefaultTexts[key].title,
              },
            }
          }
        }))
      })
    }

    if (Object.keys(data).length === 0) {
      getAdminStats({ graph: 'Producto', timeRange: 'year'}).then(data => {setData(prev => ({...prev, "productos": data.value}))})
      getAdminStats({ graph: 'Lugar', timeRange: 'year'}).then(data => {setData(prev => ({...prev, "lugares": data.value}))})
      getAdminStats({ graph: 'Producto-categoria', timeRange: 'year'}).then(data => {setData(prev => ({...prev, "categorias": data.value}))})
    }
    formatGraphObject()
  }, [data])

  const removeGraphSelection = (type) => {
    setSelectedButtons(prev => ({...prev, [type]: false}))
    setSelectedGraphs(prev => ({
      ...prev,
      [type]: false,
      count: prev.count-1
    }))
  }

  const addGraphSelection = (type) => {
    if (selectedGraphs.count < 2) {
      setSelectedButtons(prev=> ({
        ...prev,
        [type]: true,
      }))
      setSelectedGraphs(prev => ({
        ...prev,
        [type]: formattedData[type].data,
        count: prev.count+1
      }))
    }
  }

  const handleOnClick = (type) => {
    if (selectedButtons[type]) return removeGraphSelection(type)
    return addGraphSelection(type)
  }

  return (
    <>
      <section className='stats'>
        <div>
          <div className='stats-top'>
            <h1>Estadistica</h1>
          </div>
          <div>
            <div className='stats-options'>
              {Object.keys(formattedData).map(key => (
                <Button key={key} type={`${selectedButtons[key] && 'primary'}`} onClick={() => handleOnClick(key)}>{formattedData[key].buttonText}</Button>
              ))}
            </div>
            <div className='stats-graphs'>
              {Object.keys(selectedGraphs) !== 0 && Object.keys(selectedGraphs).filter(el => el !== 'count').map(key => {
                if (selectedGraphs[key]) {
                  return (
                  <Chart
                    key={key}
                    chartType="Bar"
                    height="300px"
                    width={"45vw"}
                    data={selectedGraphs[key]}
                    options={formattedData[key].options}
                  /> )
                }
                return <></>
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
