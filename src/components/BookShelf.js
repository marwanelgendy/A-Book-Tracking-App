import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

export class BookShelf extends Component {

    /* BookShelf required props */
    static propType ={
        title : PropTypes.string.isRequired,
        books : PropTypes.array.isRequired
    }
    render() {
        const {title , books ,UpdateShelf} = this.props
       
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.map((book) => (
                            <li key={book.id}>
                                <Book 
                                     bookItem={book}
                                     UpdateShelf = {UpdateShelf}/> 
                            </li>            
                        ))}  
                    </ol>
                </div>
             </div>
        )
    }
}

export default BookShelf
