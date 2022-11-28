import React from 'react';
import TextField from '@mui/material/TextField';

const SigninInputField = (props) => {
  const { value, setValue, id, label, name, autoComplete, type } = props;

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      margin="normal"
      required
      value={value}
      onChange={valueChangeHandler}
      fullWidth
      id={id}
      label={label}
      name={name}
      autoComplete={autoComplete}
      autoFocus
      type={type}
    />
  );
};

export default SigninInputField;
// 這邊這個全局共用，可以拿來在需要input的地方使用
