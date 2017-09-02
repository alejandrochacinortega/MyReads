import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { RingLoader } from 'halogen';
import _ from 'lodash';
import { List } from 'immutable';

import SingleBook from '../../components/SingleBook';
import '../../App.css';
import '../../index.css';
import { connect } from 'react-redux';
import { fetchBooks, addBookTo, resetFetchBooks, updateBook } from '../../actions/index';

class SearchBooks extends Component {
  state = {
    query: '',
    isFetchingData: false,
    finalSearch: '',
    searchBooks: this.props.searchBooks,
  };
  
  /**
   * @description Submit search
   * @constructor
   * @param event of the form
   * @returns
   */
  onSubmitForm = () => {
    const { query } = this.state;
    const { fetchBooks } = this.props;
    if (query.length === 0) {
      this.setState({ searchBooks: List() })
      return
    }
    this.setState({ isFetchingData: true, finalSearch: query });
    fetchBooks(query, () => {
      this.setState({ isFetchingData: false })
    });
  };
  
  /**
   * @description Set the select default value for book
   * @constructor
   * @param {Map} book - Immutable Map of the book
   * @returns {string} Select value for the book
   */
  getDefaultSelected = book => {
    const { allBooks } = this.props;
    const bookSaved = allBooks.find(b => b.get('id') === book.get('id'));
    return bookSaved ? bookSaved.get('shelf') : 'none';
  };
  
  addToShelf = (book, shelf) => {
    const { updateBook } = this.props;
    updateBook(book, shelf)
  };
  
  /**
   * @description Render books from the search
   * @constructor
   * @param none
   * @returns XML
   */
  renderBooks = () => {
    const { finalSearch } = this.state;
    const {
      searchBooks,
    } = this.state;

    if (searchBooks.get('error')) {
      return (
        <div style={{ color: '#26a65b' }}>
          <h2>
            {
              `No results for '${finalSearch}' :( But wait... How about some HTML knowledge? Search HTML`
            }
          </h2>
        </div>
      );
    }
    
    return (
      <ol className="books-grid">
        {searchBooks
          .map(book => (
            <SingleBook
              book={book}
              key={book.get('id')}
              addBookTo={row => this.addToShelf(book.toJS(), row)}
              defaultSelected={this.getDefaultSelected(book)}
            />
          ))
          .toArray()}
      </ol>
    );
  };
  
  search = _.debounce(event => this.onSubmitForm(event), 500);
  
  onChangeInput = event => {
    this.search(event);
    this.setState({ query: event.target.value })
  };
  
  componentWillMount() {
    
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(' nextProps ', nextProps);
    this.setState({ searchBooks: nextProps.searchBooks})
  }

  render() {
    const { query, isFetchingData } = this.state;
    const { resetFetchBooks } = this.props;
    const { searchBooks } = this.state;
    console.log(' search books  ', searchBooks);
    if (isFetchingData) {
      return (
        <div className="center-text">
          <RingLoader color="#26a65b" size="96px" margin="4px" />;
        </div>
      );
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
            onClick={() => resetFetchBooks()}
          />
          <div className="search-books-input-wrapper">
            <form onSubmit={this.onSubmitForm}>
              <input
                type="text"
                value={query}
                placeholder="Search by title or author"
                onChange={event => this.onChangeInput(event)}
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          {searchBooks.size > 0 && this.renderBooks()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ books }) {
  return {
    searchBooks: books.get('searchBooks'),
    booksPosition: books.get('booksPosition'),
    allBooks: books.get('allBooks'),
  };
}

export default connect(mapStateToProps, {
  fetchBooks,
  addBookTo,
  resetFetchBooks,
  updateBook,
})(SearchBooks);
