import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Book extends Component {

    /* 
	    BookShelf.js
	    React component for bookshelf in myReads Book Tracker App
    */

    static propType ={
        bookItem : PropTypes.object.isRequired,
        UpdateShelf : PropTypes.func.isRequired
    }

    render() {
        const {bookItem , UpdateShelf} = this.props
        
        return (
            
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: ((bookItem.imageLinks && bookItem.imageLinks.smallThumbnail) ? 
                                                                                                                `url(${bookItem.imageLinks.smallThumbnail})` : "none")}}></div>
                    <div className="book-shelf-changer">
                    <select onChange={(event) => UpdateShelf(bookItem ,event.target.value)} value={bookItem.shelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                    </div>
                </div>
                <div className="book-title">{bookItem.title}</div>
                <div className="book-authors">
                    {(bookItem.authors && bookItem.authors.length > 1) ? 
                        bookItem.authors.join(", ") :
                        bookItem.authors
                    }
                </div>
            </div>
        )
    }
}

export default Book
