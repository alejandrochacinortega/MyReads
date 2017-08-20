import { takeEvery } from 'redux-saga/effects';
import { fork, put } from 'redux-saga/effects';

import {
  BOOK_UPDATED,
  BOOK_UPDATED_SUCCESS,
  GET_ALL_BOOKS,
  GET_ALL_BOOKS_SUCCESS,
  SEARCH_BOOKS,
  SEARCH_BOOKS_SUCCESS
} from '../actions';

import * as BooksAPI from '../BooksAPI'


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getAllBooks() {
  const books = yield BooksAPI.getAll();
  try {
    yield put({type: GET_ALL_BOOKS_SUCCESS, payload: books});
  } catch (e) {
    yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

function* fetchBooks({ query, callback }) {
  const books = yield BooksAPI.search(query, 20);
  try {
    yield put({type: SEARCH_BOOKS_SUCCESS, payload: books});
    callback();
  } catch (e) {
    yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
  
}

function* updateBook({ book, shelf }) {
  yield BooksAPI.update(book.toJS(), shelf);
  const books = yield BooksAPI.getAll();
  try {
    yield put({type: BOOK_UPDATED_SUCCESS, payload: books});
  } catch (e) {
    yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}


/*
 Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
 Allows concurrent fetches of user.
 */

function* watchGetAllBooks() {
  yield takeEvery(GET_ALL_BOOKS, getAllBooks);
}

function* watchFetchBooks() {
  yield takeEvery(SEARCH_BOOKS, fetchBooks);
}

function* watchUpdateBook() {
  yield takeEvery(BOOK_UPDATED, updateBook);
}


/*
 Alternatively you may use takeLatest.
 
 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
 */
function* mySaga() {
  yield fork(watchGetAllBooks);
  yield fork(watchFetchBooks);
  yield fork(watchUpdateBook);
}

export default mySaga;