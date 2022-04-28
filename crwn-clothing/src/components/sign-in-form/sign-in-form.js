import { useState, useContext } from 'react';
import { UserContext } from '../../context/user.context';
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';
import Button from '../button/botton';
import FormInput from '../form-input/form-input';
import './sign-in-form.scss';

const defaultFormFilelds = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFilelds);
  const { email, password } = formFields;
  const userContext = useContext(UserContext);

  const restFormFields = () => {
    setFormFields(defaultFormFilelds);
  };

  const signInWithGoogle = async () => {
    const res = await signInWithGooglePopup();
    await createUserDocumentFromAuth(res.user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await signInAuthUserWithEmailAndPassword(email, password);
      userContext.setCurrentUser(res.user);
      restFormFields();
    } catch (err) {
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        alert('Invalid credentials.');
      }
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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

        <div className="buttons-container">
          <Button>Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
