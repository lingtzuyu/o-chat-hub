import React from 'react';

import MainButton from '../../shared/components/MainButton';
import RedirectPopInfo from '../../shared/components/RedirectPopInfo';
// useHistory can't use in v6
import { useNavigate } from 'react-router-dom';
// tooltip 套件，可以在mouse over的時候有提示
import { Tooltip } from '@mui/material';

// 等等要丟到tooltip內的訊息
const getIncorrectFormatTip = () => {
  return 'please check mail format and password (8~20 characters)';
};
const getCorrectFormatTip = () => {
  return 'please click signup button for register';
};

// buttonName, customStyles, disabled, onClick
const SignupPageButton = ({ handleSignup, isValidInput }) => {
  const forwardTo = useNavigate();
  const forwardToLogin = () => {
    forwardTo('/login');
  };

  return (
    <>
      {/* 用tooltip將其包起來 */}
      <Tooltip
        title={!isValidInput ? getIncorrectFormatTip() : getCorrectFormatTip()}
      >
        <div>
          <MainButton
            // 輸入這邊的客製化訊息來製造按鈕
            buttonName="Signup"
            customStyles={{ marginTop: '25px', width: '60%' }}
            // 決定是否disable
            disabled={!isValidInput}
            // 如果輸入格式不符合，則disable
            onClick={handleSignup}
          />
        </div>
      </Tooltip>
      <RedirectPopInfo
        content="Already have an account"
        redirectInfo="Login"
        handleRedirect={forwardToLogin}
        customStyles={{ marginTop: '10px' }}
      />
    </>
  );
};

export default SignupPageButton;
