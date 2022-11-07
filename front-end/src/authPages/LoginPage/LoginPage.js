import React, { useState } from 'react';
import LoginArea from '../../shared/components/LoginArea';
import LoginPageHeader from './LoginPageHeader';
import LoginInput from './LoginInput';
import LoginPageButton from './LoginPageButton';

const LoginPage = () => {
  // 設定state & hook
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  // 丟東西進來都要設定他的狀態
  const [validInput, setValidInput] = useState(false);
  const checkLogin = () => {
    console.log('login');
  };

  // 在上方import component進來後
  // 所有loginArea (看回去loginArea.js)內的東西都會apply loginArea.js內的該區域

  return (
    <LoginArea>
      <LoginPageHeader />

      {/* 設定input區域各個元件的hook */}
      <LoginInput
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageButton validInput={validInput} checkLogin={checkLogin} />
    </LoginArea>
  );
};

export default LoginPage;
