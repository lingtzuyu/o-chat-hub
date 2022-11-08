import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

import LoginArea from '../../shared/components/LoginArea';
import { validateSignupInputFormat } from '../../shared/utils/validators';
import SignupInput from './SingupInput';
import SignupPageButton from './SignupPageButton';
import { connect } from 'react-redux';
import { getActions } from '../../store/actions/auth_actions';
import { useNavigate } from 'react-router-dom';

const SignupPage = ({ signup }) => {
  const forwardTo = useNavigate();
  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValidInput, setIsValidInput] = useState(false);

  const handleSignup = () => {
    const signupData = { mail, password, username };
    signup(signupData, forwardTo);
    console.log(mail);
    console.log(password);
    console.log(username);
    console.log('signup');
  };

  useEffect(() => {
    setIsValidInput(validateSignupInputFormat({ mail, username, password }));
  }, [mail, username, password, setIsValidInput]);

  return (
    <LoginArea>
      <Typography variant="h5" sx={{ color: 'white' }}>
        Create Account
      </Typography>
      {/* pass the props, you can check signupInput.js for it */}
      <SignupInput
        mail={mail}
        setMail={setMail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <SignupPageButton
        handleSignup={handleSignup}
        isValidInput={isValidInput}
      />
    </LoginArea>
  );
};

// 把getActions那邊掛上去
const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(null, mapActionsToProps)(SignupPage);
