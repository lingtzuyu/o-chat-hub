import React from 'react';
import MainButton from '../../shared/components/MainButton';
import RedirectPopInfo from '../../shared/components/RedirectPopInfo';
// useHistory can't use in v6
import { useNavigate } from 'react-router-dom';

const LoginPageButton = (checkLogin, validInput) => {
  const forwardTo = useNavigate();
  const forwardToRegister = () => {
    forwardTo('/signup');
  };

  return (
    <>
      <div>
        <MainButton
          // 輸入這邊的客製化訊息來製造按鈕
          buttonName="Login"
          customStyles={{ marginTop: '25px', width: '60%' }}
          // 如果輸入格式不符合，則disable
          onClick={checkLogin}
          disable={!validInput}
        />
      </div>
      <RedirectPopInfo
        content="Going to register page"
        redirectInfo="Create account"
        handleRedirect={forwardToRegister}
        customStyles={{ marginTop: '10px' }}
      />
    </>
  );
};

export default LoginPageButton;
