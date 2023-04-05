import {Button, Grid, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = (props) => {
  const [formToggle, setFormToggle] = useState(true);
  const toggle = () => {
    setFormToggle(!formToggle);
  };
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={8}>
        <Typography component="h1" variant="h2">
          Login / Register
        </Typography>
      </Grid>
      <Grid item xs={8}>
        {formToggle ? <LoginForm /> : <RegisterForm toggle={toggle} />}
      </Grid>
      <Grid item xs={8}>
        <p>{formToggle ? 'First time here?' : 'or'}</p>
      </Grid>
      <Grid item xs={8}>
        <Button onClick={toggle}>{formToggle ? 'Register' : 'Login'}</Button>
      </Grid>
    </Grid>
  );
};

Login.PropTypes = {};

export default Login;
