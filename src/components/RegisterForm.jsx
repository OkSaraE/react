import PropTypes from 'prop-types';
import useForm from '../hooks/FormHooks';
import {useUser} from '../hooks/ApiHooks';
import {Box, Button, TextField} from '@mui/material';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {registerForm} from '../utils/errorMessages';
import {registerValidator} from '../utils/validators';
import {useEffect} from 'react';

const RegisterForm = ({toggle}) => {
  const {postUser, getCheckUser} = useUser();

  const initValues = {
    username: '',
    password: '',
    email: '',
    full_name: '',
  };

  const doRegister = async () => {
    try {
      const withoutConfirm = {...inputs};
      delete withoutConfirm.confirm;
      const userResult = await postUser(withoutConfirm);
      alert(userResult.message);
      toggle();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUsername = async () => {
    const {available} = await getCheckUser(inputs.username);
    available || alert('Username not available');
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doRegister,
    initValues
  );

  useEffect(() => {
    ValidatorForm.addValidationRule(
      'isPasswordMatch',
      (value) => value === inputs.password
    );
    ValidatorForm.addValidationRule('isUsernameAvailable', async (value) => {
      return await getCheckUser(inputs.username);
    });
  }, [inputs]);

  return (
    <>
      <ValidatorForm onSubmit={handleSubmit} noValidate>
        <TextValidator
          fullWidth
          margin="dense"
          variant="filled"
          name="username"
          placeholder="Username"
          onChange={handleInputChange}
          value={inputs.username}
          validators={registerValidator.username}
          errorMessages={registerForm.username}
        />
        <TextValidator
          fullWidth
          margin="dense"
          variant="filled"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleInputChange}
          value={inputs.password}
          validators={registerValidator.password}
          errorMessages={registerForm.password}
        />
        <TextValidator
          fullWidth
          margin="dense"
          variant="filled"
          name="confirm"
          type="password"
          placeholder="Confirm Password"
          onChange={handleInputChange}
          value={inputs.confirm}
          validators={registerValidator.confirm}
          errorMessages={registerForm.confirm}
        />
        <TextValidator
          fullWidth
          margin="dense"
          variant="filled"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleInputChange}
          value={inputs.email}
          validators={registerValidator.email}
          errorMessages={registerForm.email}
        />
        <TextValidator
          fullWidth
          margin="dense"
          variant="filled"
          name="full_name"
          placeholder="Full name"
          onChange={handleInputChange}
          value={inputs.full_name}
          validators={registerValidator.full_name}
          errorMessages={registerForm.full_name}
        />
        <Button fullWidth sx={{mt: 2}} variant="contained" type="submit">
          Register
        </Button>
      </ValidatorForm>
    </>
  );
};

RegisterForm.propTypes = {toggle: PropTypes.func};

export default RegisterForm;
