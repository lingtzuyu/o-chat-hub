import React from 'react';
import InputField from '../../shared/components/InputField';

const LoginInput = ({ mail, setMail, password, setPassword }) => {
  return (
    <>
      <InputField
        // value and setValue 會從loginPage那頁來設定
        value={mail}
        setValue={setMail}
        fieldname="E-Mail ADDRESS"
        type="text"
        placeholder="E-MAIL"
      />
      <InputField
        // value and setValue 會從loginPage那頁來設定
        value={password}
        setValue={setPassword}
        fieldname="PASSWORD"
        type="text"
        placeholder="PASSWORD"
      />
    </>
  );
};

export default LoginInput;
