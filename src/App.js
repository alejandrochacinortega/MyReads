import React from 'react'
import { Route } from 'react-router-dom';

import './App.css'
import MyReads from './features/myReads';
import SearchBooks from './features/searchBooks';


class BooksApp extends React.Component {
  render() {
    return (
      <div className="App">
        <Route
          path={'/'}
          exact
          render={() => (
            <MyReads/>
          )}
        >
        </Route>
        <Route
          path={'/search'}
        exact
          render={() => (
            <SearchBooks/>
          )}
        >
        </Route>
      </div>
    )
  }
}

export default BooksApp
