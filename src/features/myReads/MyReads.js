import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../App.css';
import SingleBook from '../../components/SingleBook';
import { addBookTo } from '../../actions';

class MyReads extends Component {
  render() {
    const { wantToReadBooks, currentlyReadingBooks, readBooks } = this.props;
    const { addBookTo } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReadingBooks.size > 0 &&
                    currentlyReadingBooks.map(book => (
                      <SingleBook
                        key={book.get('id')}
                        book={book}
                        addBookTo={row => addBookTo(row, book)}
                        defaultSelected="currentlyReading"
                      />
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadBooks.size > 0 &&
                    wantToReadBooks.map(book => (
                      <SingleBook
                        key={book.get('id')}
                        book={book}
                        addBookTo={row => addBookTo(row, book)}
                        defaultSelected="wantToRead"
                      />
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readBooks.size > 0 &&
                    readBooks.map(book => (
                      <SingleBook
                        key={book.get('id')}
                        book={book}
                        addBookTo={row => addBookTo(row, book)}
                        defaultSelected="read"
                      />
                    ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ books }) {
  return {
    wantToReadBooks: books.get('wantToReadBooks'),
    currentlyReadingBooks: books.get('currentlyReadingBooks'),
    readBooks: books.get('readBooks'),
  };
}

export default connect(mapStateToProps, { addBookTo })(MyReads);
