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
        placeholder="email for login"
      />
      <InputField
        // value and setValue 會從loginPage那頁來設定
        value={password}
        setValue={setPassword}
        fieldname="password"
        type="text"
        placeholder="password for login"
      />
    </>
  );
};

export default LoginInput;
