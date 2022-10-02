import { Checkbox } from 'antd';
import React from 'react';
import '../Estilos/CheckBox.css'

const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
};

const CheckBox = (props) => {
    return(
        <Checkbox onChange={onChange} className= 'Checkbox'>{props.txt}</Checkbox>
    )
}

export default CheckBox;