/* eslint-disable no-unused-vars */
'use strict'

import Bookshelf from '../../../src/bookshelf.js'

const getAllBooks = ({ name, reading, finished }) => {
	return new Promise((resolve, reject) => {
		let formattedBooks

		if (name !== 'empty') {
			formattedBooks = Bookshelf.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
				.map(({ id, name, publisher }) => ({ id, name, publisher }))
                                    
			resolve(formattedBooks)
		}
        
		if (reading !== 'empty') {
			formattedBooks = Bookshelf.filter((book) => book.reading == reading)
				.map(({ id, name, publisher }) => ({ id, name, publisher }))

			resolve(formattedBooks)
		}
        
		if (finished !== 'empty') {
			formattedBooks = Bookshelf.filter((book) => book.finished == finished)
				.map(({ id, name, publisher }) => ({ id, name, publisher }))

			resolve(formattedBooks)
		}

		formattedBooks = Bookshelf.map(({ id, name, publisher }) => ({ id, name, publisher }))

		resolve(formattedBooks)
	})
}

const getSingleBookById = (id) => {
	return new Promise((resolve, reject) => {
		resolve(Bookshelf.filter((book) => book.id === id))
	})
}

const store = (newBook) => {
	return new Promise((resolve, reject) => {
		Bookshelf.push(newBook)
		resolve()
	})
}

const update = (id, bookToUpdate) => {
	return new Promise((resolve, reject) => {
		const bookIndex = Bookshelf.findIndex((book) => book.id === id)

		Bookshelf[bookIndex] = bookToUpdate

		resolve()
	})
}

const remove = (id) => {
	return new Promise((resolve, reject) => {
		const bookIndex = Bookshelf.findIndex((book) => book.id === id)
        
		Bookshelf.splice(bookIndex, 1)

		resolve()
	})
}

export default { getAllBooks, getSingleBookById, store, update, remove }