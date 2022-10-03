import React, { useState, useEffect } from 'react'
import { userStats } from '../../services/axios/user'
import { Chart } from "react-google-charts";
import { Button } from 'antd';


export const UserStats = props => {
  const { user, onClickReturn } = props;
  const [ mostReservedProducts, setMostReservedProducts ] = useState()
  const [ error, setError ] = useState(false)
  const [ graphData, setGraphData ] = useState()

  useEffect(() => {
    const formatGraphObject = (data) => {
      const { value, graphCols } = data;
      console.log('FORMATTINg OBJECT')
      const formattedData = value.map(dataEl => {
        return [dataEl.recurso.nombre, dataEl.count]
      })
      setGraphData({
        data: [graphCols, ...formattedData],
        options: {
          chart: {
            title: "Productos mas reservados",
          }
        }
      })
    }

    userStats({ graph: 'Producto', id: user.pk, timeRange: 'month'}).then(data => {
      console.log('data =>', data)
      formatGraphObject(data)
    }).catch(() => setError(true))
  }, [user.pk])

  console.log(mostReservedProducts)
  console.log('graphdata =>', graphData)

  return (
    <section>
      <Chart
        chartType="Bar"
        height="300px"
        data={(graphData && graphData.data) || []}
        options={(graphData && graphData.options) || {}}
      />
      <Button onClick={onClickReturn}>Volver</Button>
    </section>
  )
}
