import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book';

/**
 * Classe que representa o componente
 * de busca de livros e seus resultados.
 * @extends Component
 */
class SearchBooks extends Component{

  /**
   * Estado do Componente. Contém a string
   * para a consulta.
   */
  state = {
    query: ''
  }

  /**
   * Modifica o estado do componente
   * (especificamente a string de consulta)
   * e realiza a consulta com a nova string.
   * @param {string} newQuery 
   */
  onChangeQuery(newQuery){
    newQuery = newQuery.trim();
    this.setState({query:newQuery})
    // Verifica se a nova query está vazia.
    if(newQuery)
      this.props.search(newQuery.trim())
  }

  /**
   * Método que renderiza e define a estrutura visual
   * da classe de busca de livros.
   */
  render(){
    return (
      <div className="search-books">
        <div className="search-books-bar">
          {
            /**
             * Link para página principal.
             */
          }
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input onChange={ (e) => this.onChangeQuery(e.target.value)} type="text" placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              /**
               * Verifica se a query não é uma string vazia e
               * se há livros. Se as duas condições forem
               * verdadeiras, apresenta todos os livros.
               * O componente livro recebe uma função de atualização
               * para mudança de prateleira e um objeto livro.
               */
            }
            {this.state.query && this.props.books.length > 0 &&(
              this.props.books.map(book => (
                <li key={'book-'+book.id}>
                  <Book update={this.props.update} book={book}/>
                </li>
              )))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;