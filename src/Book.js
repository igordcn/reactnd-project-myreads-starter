import React, {Component} from 'react'

/**
 * Classe que representa um livro.
 * @extends Component
 */
class Book extends Component{

  /**
   * Muda a prateleira do livro.
   * @param {string} newShelf - A nova prateleira.
   */
  changeShelf = (newShelf) => {
    // Verifica se a função de atualização está definida e se houve
    // realmente uma atualização na prateleira do livro.
    if(this.props.update && this.props.book.shelf !== newShelf)
      this.props.update(this.props.book, newShelf)
  }

  /**
   * Define a prateleira atual do livro para o dropdown 
   * de seleção de prateleira.
   * @param {Object} book - Objeto vindo da API com
   * todas as informações do livro.
   */
  selectInitialShelfValue(book){
    let index;
    // Realiza a correspondência entre
    // o valor da opção e o índice.
    switch(book.shelf){
      case 'currentlyReading':
        index = 1;
        break;
      case 'wantToRead':
        index = 2;
        break;
      case 'read':
        index = 3;
        break;
      default:
        // None
        index = 4;
    }
    // Busca o elemento select do componente e define
    // a opção selecionada pelo índice.
    document.getElementById(`shelfSelect-${book.id}`).selectedIndex = index;
  }

  /**
   * Método chamado logo após a inicialização do
   * componente. 
   */
  componentDidMount(){
    this.selectInitialShelfValue(this.props.book);
  }

  /**
   * Método que renderiza e define a estrutura visual
   * do livro.
   */
  render(){
    return (
      <div className="book">
        <div className="book-top">
          {
            /**
             * Verifica se o livro possui uma imagem
             * (thumbnail). Se tiver, a imagem se torna
             * a imagem do livro. Senão atribui string
             * vazia.
             */
          }
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(this.props.book.imageLinks?this.props.book.imageLinks.thumbnail:'')})` }}></div>
          <div className="book-shelf-changer">
            {
              /**
               * Define o id do select com base no
               * id do livro mais uma string fixa.
               * Chama a função de changeShelf quando
               * um evento onChange ocorre.
               */
            }
            <select id={`shelfSelect-${this.props.book.id}`} onChange={(e) => this.changeShelf(e.target.value)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        {
          /**
           * Verifica o livro tem autores. Se tiver apresenta-os
           * mapeando cada autor a uma div.
           */
        }
        { this.props.book.authors &&
          (this.props.book.authors.map((author,index) => (
            <div key={index} className="book-authors">{author}</div>
          )))
        }
      </div>
    );
  }

}

export default Book;