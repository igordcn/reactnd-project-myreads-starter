import React, {Component} from 'react'
import BookList from './BookList'
import {Link} from 'react-router-dom'

/**
 * Classe que representa todas as listas
 * de livros.
 * @extends Component
 */
class AllListsBooks extends Component{

  /**
   * Método chamado logo após a inicialização do
   * componente. 
   */
  componentDidMount(){
    this.props.init();
  }

  /**
   * Método que renderiza e define a estrutura visual
   * da classe que encapsula todas as listas de livros.
   */
  render(){
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              /**
               * Atribui a cada lista de livros:
               * um título, uma função de atualização
               * para o livro quando for mudar de estante
               * e os livros filtrados por estante.
               */
            }
            <BookList title='Currently Read' update={this.props.update} books={this.props.books.filter(book => book.shelf === 'currentlyReading')}/>
            <BookList title='Want To Read' update={this.props.update} books={this.props.books.filter(book => book.shelf === 'wantToRead')}/>
            <BookList title='Read' update={this.props.update} books={this.props.books.filter(book => book.shelf === 'read')}/>
          </div>
        </div>
        <div className="open-search">
          {
            /**
             * Link para página de busca.
             */
          }
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default AllListsBooks;