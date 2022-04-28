import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

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
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          name="displayName"
          type="text"
          required
          value={displayName}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          required
          value={password}
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={handleChange}
        />

        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
