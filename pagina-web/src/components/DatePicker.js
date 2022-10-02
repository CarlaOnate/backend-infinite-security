import React from "react";
import '../Estilos/DatePicker.css'

const DatePicker2 = () =>{
    return(
        <div>
            <input type="date" id="start" name="trip-start"
            min="1900-01-01" max="2048-12-31"></input>

        </div>
    )
    
}

export default DatePicker2