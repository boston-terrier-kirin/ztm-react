import { USER_ACTION_TYPES } from './user.types';

// redux-sagaで置き換え
// export const setCurrentUser = (user) => {
//   return {
//     type: USER_ACTION_TYPES.SET_CURRENT_USER,
//     payload: user,
//   };
// };

// SAGAの仕組みとしては、syncなactionを呼び出した後に処理をするので、
// componentからはsyncなactionを呼び出して、
// そのあとに、sagaでasyncな処理をして、
// saga側からsyncなactionを呼び戻す。

// 起動時にAppからcheckUserSessionを呼び出す。
//   ↓
// user.sagaのonCheckUserSessionが呼ばれる。
//   ↓
// user.sagaのisUserAuthenticatedが呼ばれる。
//   ↓
// signInSuccess/signInFailedが呼び戻される。

export const checkUserSession = () => {
  return {
    type: USER_ACTION_TYPES.CHECK_USER_SESSION,
  };
};

// ■sign-inの流れ
// sign-in-formでgoogleSignInStart/emailSignInStartを呼び出す。
//   ↓
// user.sagaのonGoogleSignInStart/onEmailSignInStartが呼ばれる。
//   ↓
// user.sagaのsignInWithGoogle/signInWithEmailが呼ばれる。
//   ↓
// signInSuccess/signInFailedが呼び戻される。

export const googleSignInStart = () => {
  return {
    type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
  };
};

export const emailSignInStart = (email, password) => {
  return {
    type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    payload: { email, password },
  };
};

export const signInSuccess = (user) => {
  return {
    type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
    payload: user,
  };
};

export const signInFailed = (err) => {
  return {
    type: USER_ACTION_TYPES.SIGN_IN_FAILED,
    payload: err,
  };
};

// ■sign-upの流れ ※sing-upした後にsign-inする。
// sign-up-signUpStartを呼び出す。
//   ↓
// user.onSignUpStartが呼ばれる。
//   ↓
// user.sagaのsignUpが呼ばれる。
//   ↓
// signInSuccess/signInFailedが呼び戻される。
//   ↓
// ★user.sagaのonSignUpSuccessが呼ばれる。
//   ↓
// ★user.sagaのsignInAfterSignUpが呼ばれる。
//   ↓
// ★signInSuccessが呼び戻される。

export const signUpStart = (email, password, displayName) => {
  return {
    type: USER_ACTION_TYPES.SIGN_UP_START,
    payload: { email, password, displayName },
  };
};

export const signUpSuccess = (user, additionalInformation) => {
  return {
    type: USER_ACTION_TYPES.SIGN_UP_SUCCESS,
    payload: { user, additionalInformation },
  };
};

export const signUpFailed = (err) => {
  return {
    type: USER_ACTION_TYPES.SIGN_UP_FAILED,
    payload: err,
  };
};
