import react, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import SignInButton from './SignInButton';
import SigninInputField from './SigninInputField';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackgroundGif from '../../shared/images/inspringDesign.gif';
import GuideStep from '../Components/GuideStep';
import MainLogo from '../../shared/images/LogoPureBlue.png';
import Swal from 'sweetalert2';
import { validateInputFormat } from '../../shared/utils/validators';
import { connect } from 'react-redux';
import { getActions } from '../../store/actions/auth_actions';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://take-notes.chat">
        take-notes.chat
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignInSide = ({ login }) => {
  const forwardTo = useNavigate();
  // 設定state & hook
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  // 控制能否按下login (過validation)
  const [isValidInput, setIsValidInput] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);

    const loginData = { mail, password };
    // auth action
    const result = await login(loginData, forwardTo);

    if (result !== 200) {
      Toast.fire({
        icon: 'warning',
        title: 'Email or Password incorrect!',
      });
    } else {
      Toast.fire({
        icon: 'success',
        title: 'Succesfully Login!',
      });
    }
  };

  // 控制是否過validation
  useEffect(() => {
    setIsValidInput(validateInputFormat({ mail, password }));
  }, [mail, password, setIsValidInput]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={3}
          md={6.5}
          sx={{
            backgroundImage: `url(${BackgroundGif})`,
            opacity: 0.8,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              marginLeft: '20%',
              opacity: 1.0,
              marginTop: '50%',
              marginRight: '20%',
            }}
          >
            <GuideStep />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={9}
          md={5.5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box>
              <img
                src={MainLogo}
                style={{ width: 100, borderRadius: 60 }}
                alt="take-notes.chat"
              />
            </Box>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <SigninInputField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                // autoComplete="email"
                autoFocus
                value={mail}
                setValue={setMail}
                type="text"
              />
              <SigninInputField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                // autoComplete="current-password"
                value={password}
                setValue={setPassword}
              />

              <SignInButton
                type="submit"
                fullWidth
                variant="contained"
                handleLogin={handleLogin}
                isValidInput={isValidInput}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </SignInButton>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>

              {/* <Box sx={{ marginTop: '10%', alignItems: 'center' }}>
                <Avatar
                  sx={{ m: 1, bgcolor: 'secondary.main', alignItems: 'center' }}
                >
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <GuideStep></GuideStep>
              </Box> */}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(null, mapActionsToProps)(SignInSide);
