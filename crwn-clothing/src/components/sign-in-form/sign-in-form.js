import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  emailSignInStart,
  googleSignInStart,
} from '../../store/user/user.action';
import Button from '../button/botton';
import FormInput from '../form-input/form-input';
import './sign-in-form.scss';

const defaultFormFilelds = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFilelds);
  const { email, password } = formFields;

  const restFormFields = () => {
    setFormFields(defaultFormFilelds);
  };

  const signInWithGoogle = async () => {
    // redux-sagaで置き換え
    // const res = await signInWithGooglePopup();
    // await createUserDocumentFromAuth(res.user);
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // redux-sagaで置き換え
      //await signInAuthUserWithEmailAndPassword(email, password);
      dispatch(emailSignInStart(email, password));

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
