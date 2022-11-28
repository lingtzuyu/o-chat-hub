// 報廢

import React, { useState, useEffect } from 'react';
import LoginArea from '../../shared/components/LoginArea';
import LoginPageHeader from './LoginPageHeader';
import LoginInput from './LoginInput';
import LoginPageButton from './LoginPageButton';
import { validateInputFormat } from '../../shared/utils/validators';
import { connect } from 'react-redux';
import { getActions } from '../../store/actions/auth_actions';
import { useNavigate } from 'react-router-dom';

// 這邊的login參數是在react-redux套件從getActions那邊call來，掛上去當成props
const LoginPage = ({ login }) => {
  const forwardTo = useNavigate();
  // 設定state & hook
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  // 丟東西進來都要設定他的狀態
  const [isValidInput, setIsValidInput] = useState(false);

  const handleLogin = () => {
    const loginData = { mail, password };
    // 掛上API後，就可以把login()這邊掛上去 (看auth_actions那邊的login() function)
    login(loginData, forwardTo);
    console.log(mail);
    console.log(password);
    console.log('login');
  };

  // 製作 useEffect 來控制輸入的格式有無相符合
  // 當mail以及password改變的時候，即啟動effect
  useEffect(() => {
    setIsValidInput(validateInputFormat({ mail, password }));
  }, [mail, password, setIsValidInput]);

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
      <LoginPageButton handleLogin={handleLogin} isValidInput={isValidInput} />
    </LoginArea>
  );
};

// 把getActions那邊掛上去
const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(null, mapActionsToProps)(LoginPage);
