import React from "react";
import '../Estilos/DatePicker.css'
import { DatePicker, Space } from 'antd';



const DatePicker2 = (props) =>{
    return(
        <div>
            {/* <input type="date" id="start" name="trip-start"
            min="1900-01-01" max="2048-12-31"></input> */}

            <DatePicker onChange={props.onChange} />
        </div>
    )
    
}

export default DatePicker2