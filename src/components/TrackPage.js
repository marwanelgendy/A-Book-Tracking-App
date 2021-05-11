import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class TrackPage extends Component {

    /* Main Page required props */
    static propTypes ={
        books : PropTypes.array.isRequired,
        UpdateShelf : PropTypes.func.isRequired
    }

    render() {
        const {books , UpdateShelf } = this.props
        console.log(UpdateShelf)
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads - A Book Tracking App</h1>
                </div>
                 <div className="list-books-content">
                    <div>
                        <BookShelf 
                            title = "Currently Reading"
                            books = {books.filter((book) => book.shelf === "currentlyReading")}
                            UpdateShelf = {UpdateShelf}
                        />
                        <BookShelf
                            title = "Want to Read"
                            books = {books.filter((book) => book.shelf === "wantToRead")}
                            UpdateShelf = {UpdateShelf}
                        />
                        <BookShelf
                            title = "Read"
                            books = {books.filter((book) => book.shelf === "read")}
                            UpdateShelf = {UpdateShelf}
                        />
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
          </div>
        )
    }
}

export default TrackPage
