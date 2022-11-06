import React from 'react';
import InputField from '../../shared/components/InputField';

export default function LoginInput({ mail, setMail, password, setPassword }) {
  return (
    <>
      <InputField
        // value and setValue 會從loginPage那頁來設定
        value={mail}
        setValue={setMail}
        fieldname="email"
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
}
