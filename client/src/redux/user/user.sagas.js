import { takeLatest, call, put, all } from "redux-saga/effects";
import UserActionTypes from './user.types'
import { googleProvider, auth, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.utils";
import { 
  signInSuccess, 
  signInFailure, 
  signOutSuccess, 
  signOutFailure, 
  signUpSuccess, 
  signUpFailure
} from "./user.actions";

function* getSnapshotFromUserAuth(user){
  try{ 
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
  }
  catch (error) {
    yield put(signInFailure(error.message))
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error.message))
  }
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch(error) {
    yield put(signInFailure(error.message))
  }
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error))
  }
}

function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess())
  } catch (error) {
    yield put(signOutFailure(error.message))
  }
}

function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password)
    yield call (createUserProfileDocument, user, {displayName} );

    yield put(signUpSuccess( { email, password } ))
    // yield put(signUpSuccess( { user, additionalData: { displayName } } ))
    
  } catch (error) {
    yield put(signUpFailure(error.message))
  }
}

function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle )
}

function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail )
}

function* onCheckUserSession(){
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated )
}

function* onSignOutStart(){
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut )
}

function* onSignUpStart(){
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp )
}

function* onSignUpSuccess(){
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInWithEmail )
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}