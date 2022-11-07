import React from 'react';
import { styled } from '@mui/system';

// 注意看這邊 styled後面的()的變化，哪些是div，哪些是p

const InputWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
});

const FieldName = styled('p')({
  color: 'white',
  textTransform: 'uppercase',
  fontWeight: '800',
  fontSize: '20px',
});

const Input = styled('input')({
  fontSize: '20px',
  flexGrow: 1,
  height: '60px',
  border: '1px solid black',
  borderRadius: '5px',
  color: 'black',
  background: 'white',
  margin: 0,
  padding: '0, 6px',
});

const InputField = (props) => {
  const { value, setValue, fieldname, type, placeholder } = props;

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    <InputWrapper>
      <FieldName>{fieldname}</FieldName>
      <Input
        value={value}
        onChange={valueChangeHandler}
        type={type}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
};

export default InputField;
// 這邊這個全局共用，可以拿來在需要input的地方使用
