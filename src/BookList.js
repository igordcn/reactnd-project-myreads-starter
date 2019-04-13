import React, {Component} from 'react';
import Book from './Book';

class BookList extends Component{
    
    state = {
      
    }
    

    render(){
      return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {
                this.props.books.map(book => (
                  <li key={'book-'+book.id}>
                    <Book book={book}/>
                  </li>
                ))
              }
            </ol>
          </div>
        </div>
      )
    }
}

export default BookList;