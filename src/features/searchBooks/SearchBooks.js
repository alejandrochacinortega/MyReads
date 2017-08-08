import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../../BooksAPI'
import SingleBook from './components/SingleBook';
import '../../App.css';

class SearchBooks extends Component {
  state = {
    query: '',
    books: null
  };
  
  constructor (props) {
    super(props);
  }
  
  onSubmitForm = event => {
    const { query } = this.state;
    event.preventDefault();
    BooksAPI
      .search(query, 20)
      .then(books => this.setState({ books }))
  };
  
  renderBooks = () => {
    const { books } = this.state;
    return (
      <ol className="books-grid">
        {books.map(book => <SingleBook book={book} key={book.title} />)}
      </ol>
    )
  };
  
  render() {
    const { query, books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
          </Link>
          <div className="search-books-input-wrapper">
            {/*
             NOTES: The search from BooksAPI is limited to a particular set of search terms.
             You can find these search terms here:
             https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
         
             However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
             you don't find a specific author or title. Every search is limited by search terms.
             */}
            <form onSubmit={this.onSubmitForm}>
              <input type="text" value={query} placeholder="Search by title or author" onChange={event => this.setState({ query: event.target.value})} />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          { books && this.renderBooks()}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
