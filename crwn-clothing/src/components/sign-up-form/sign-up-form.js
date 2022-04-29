import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import Button from '../button/botton';
import FormInput from '../form-input/form-input';
import './sign-up-form.scss';

const defaultFormFilelds = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFilelds);
  const { displayName, email, password, confirmPassword } = formFields;

  const restFormFields = () => {
    setFormFields(defaultFormFilelds);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password do not match');
      return;
    }

    try {
      const res = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(res.user, { displayName });
      restFormFields();
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('Email taken.');
      }
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          name="displayName"
          type="text"
          required
          value={displayName}
          onChange={handleChange}
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          required
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          required
          value={password}
          onChange={handleChange}
        />

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={handleChange}
        />

        <Button>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
