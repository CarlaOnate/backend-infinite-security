import React from "react";
import { Input } from 'antd';

const Login = props => {
  const { changeForm } = props;

  return (
    <div>
      <p>LOGIN</p>
      <Input
        allowClear
        maxLength={3}
      />
      <p onClick={changeForm}>O registrate</p>
    </div>
  )
}

export default Login;
