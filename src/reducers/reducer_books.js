import {
  RESET_FETCH_BOOKS,
  GET_ALL_BOOKS_SUCCESS,
  SEARCH_BOOKS_SUCCESS,
  BOOK_UPDATED_SUCCESS
} from '../actions';

import { Map, List, fromJS } from 'immutable';

const initialState = Map({
  searchBooks: List(),
  allBooks: List(),
});

export default function(state = initialState, action) {
  switch (action.type) {
    case BOOK_UPDATED_SUCCESS:
      return state.setIn(['allBooks'], fromJS(action.payload));
    case SEARCH_BOOKS_SUCCESS:
      return state.setIn(['searchBooks'], fromJS(action.payload));
    case GET_ALL_BOOKS_SUCCESS:
      return state.setIn(['allBooks'], fromJS(action.payload));
    case RESET_FETCH_BOOKS:
      return state.setIn(['searchBooks'], List());
    default:
      return state;
  }
}
