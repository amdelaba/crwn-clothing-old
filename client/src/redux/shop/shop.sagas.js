import { takeLatest, call, put, all } from "redux-saga/effects";
import ShopActionTypes from "./shop.types";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { fetchCollectionsSuccess, fetchCollectionsFailure } from "./shop.actions";

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');

    // yield is like await, but also pauses execution of the function 
    // this wait for get() to finish stores value in snapshot and pauses function
    //until next() is called ( next() is calle implicitly by redux-saga)
    const snapshot = yield collectionRef.get();

    // we use yield on potentially heavy computations or a request
    // call takes in the function as 1st param and the function's params as subsequent params
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot );

    // put dispatches an action and payload to the redeucer ( is like dispatch but for use inside saga)
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch(error){
    yield put(fetchCollectionsFailure(error.message));
  }

  // This code from thunk converted to saga code above
  // collectionRef.get().then(snapshot => {
  //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //   dispatch(fetchCollectionsSuccess(collectionsMap));
  // }).catch(error => 
  //   dispatch(fetchCollectionsFailure(error.message)));
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  )
}

export function* shopSagas() {
  yield all([
    call(fetchCollectionsStart)
  ])
};