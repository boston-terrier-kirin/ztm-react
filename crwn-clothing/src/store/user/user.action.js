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
//   ↓
// userReducerのSIGN_IN_SUCCESSで、currentUserがセットされる。
//   ↓
// navigationでuseSelectorをしているので、currentUserがセットされたことが検知できて、SIGN OUT に変わる。

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
//   ↓
// ※sign-upでgetSnapshotFromUserAuthを呼ばずに、
//   sign-inを別で呼んでいるのは、userReducerがSIGN_IN_SUCCESSの時にcurrentUserをupdateしているため。
//   ↓
// userReducerのSIGN_IN_SUCCESSで、currentUserがセットされる。
//   ↓
// navigationでuseSelectorをしているので、currentUserがセットされたことが検知できて、SIGN OUT に変わる。

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

// ■sign-outの流れ
// navigationでsignOutStartを呼び出す。
//   ↓
// user.sagaのonSignOutStartが呼ばれる。
//   ↓
// user.sagaのsignOutが呼ばれる。
//   ↓
// signOutSuccess/signOutFailedが呼び戻される。
//   ↓
// userReducerのSIGN_OUT_SUCCESSで、currentUserがnullになる。
//   ↓
// navigationでuseSelectorをしているので、currentUserがnullになったことが検知できて、SIGN IN に変わる。

export const signOutStart = () => {
  return {
    type: USER_ACTION_TYPES.SIGN_OUT_START,
  };
};

export const signOutSuccess = () => {
  return {
    type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS,
  };
};

export const signOutFailed = (err) => {
  return {
    type: USER_ACTION_TYPES.SIGN_OUT_FAILED,
    payload: err,
  };
};
