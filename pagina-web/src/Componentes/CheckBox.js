import { Checkbox } from 'antd';
import React from 'react';
import '../Estilos/CheckBox.css'

// const onChange = (e) => {
//     console.log(`checked = ${e.target.checked}`);
// };

const CheckBox = (props) => {
    return(
        <Checkbox.Group options = {props.options} onChange={props.onChange} className= 'Checkbox'>{props.txt}</Checkbox.Group>
    )
}

export default CheckBox;