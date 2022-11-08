import React from 'react';
import InputField from '../../shared/components/InputField';

const SignupInput = (props) => {
  const { mail, setMail, username, setUsername, password, setPassword } = props;
  return (
    <>
      <InputField
        value={mail}
        setValue={setMail}
        fieldname="Mail Address"
        type="text"
        placeholder="Please enter a valid mail"
      />
      <InputField
        value={username}
        setValue={setUsername}
        fieldname="Username"
        type="text"
        placeholder="Please enter your username (8~20 charactors)"
      />
      <InputField
        value={password}
        setValue={setPassword}
        fieldname="Password"
        type="text"
        placeholder="Please enter password (8~20 charactors)"
      />
    </>
  );
};

export default SignupInput;
