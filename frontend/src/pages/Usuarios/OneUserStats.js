import React, { useState, useEffect } from 'react'
import { userStats } from '../../services/axios/user'
import { Chart } from "react-google-charts";
import { Button, Alert } from 'antd';


export const OneUserStats = props => {
  const { user, onClickReturn } = props;
  const [ error, setError ] = useState(false)
  const [ graphData, setGraphData ] = useState()

  useEffect(() => {
    const formatGraphObject = (data) => {
      const { value, graphCols } = data;
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
      formatGraphObject(data)
    }).catch(() => setError(true))
  }, [user.pk])

  return (
    <section>
      {error &&
        <Alert
          message="Error"
          description="Hubo un error, inténtalo mas tarde"
          type="error"
          showIcon
          afterClose={setError(false)}
          closable
        />}
      <Chart
        chartType="Bar"
        height="300px"
        data={(graphData && graphData.data) || []}
        options={(graphData && graphData.options) || {}}
      />
      <Button className= "CodigoPeque" onClick={onClickReturn}>Volver</Button>
    </section>
  )
}