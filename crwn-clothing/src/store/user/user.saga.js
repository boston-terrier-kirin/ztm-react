import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import {
  signInFailed,
  signInSuccess,
  signUpFailed,
  signUpSuccess,
} from './user.action';
import { USER_ACTION_TYPES } from './user.types';

export function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInformation
    );

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) {
      return;
    }

    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* signInWithEmail(action) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      action.payload.email,
      action.payload.password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* signUp(action) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      action.payload.email,
      action.payload.password
    );

    // signUpSucessを呼び戻して、signUpSucessが呼ばれることで、onSignUpSuccessが呼ばれる。
    yield put(signUpSuccess(user, { displayName: action.payload.displayName }));
  } catch (err) {
    yield put(signUpFailed(err));
  }
}

export function* signInAfterSignUp(action) {
  // signUpSucessを呼び戻して、signUpSucessが呼ばれることで、onSignUpSuccessが呼ばれる。
  //   ↓
  // signInAfterSignUpが呼ばれることで、getSnapshotFromUserAuthを呼んで、sing-inする。
  yield call(
    getSnapshotFromUserAuth,
    action.payload.user,
    action.payload.additionalInformation
  );
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
