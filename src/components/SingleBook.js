import React from 'react';

const SingleBook = ({ book, addBookTo, defaultSelected }) => {
  const thumbnail = book.get('imageLinks')
    ? book.getIn(['imageLinks', 'thumbnail'])
    : 'http://books.google.com/books/content?id=blCyf8XF41sC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api';
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${thumbnail})`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={defaultSelected}
              onChange={event => addBookTo(event.target.value, book)}
            >
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">
                Currently Reading
              </option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.get('title')}</div>
        <div className="book-authors">{book.get('authors')}</div>
      </div>
    </li>
  );
};

export default SingleBook;
