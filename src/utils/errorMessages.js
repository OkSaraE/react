const registerForm = {
  username: [
    'This field is required',
    'Minimum length 3',
    'Username not available',
  ],
  password: ['This field is required', 'Minimum length 5'],
  confirm: ['This field is required', 'Passwords dont match'],
  email: ['This field is required', 'Email is not valid'],
  full_name: ['Minimum length 2'],
};

const loginForm = {
  username: ['this field is required'],
  password: ['this field is required'],
};

export {registerForm, loginForm};
