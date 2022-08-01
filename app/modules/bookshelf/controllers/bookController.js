'use strict'

import { nanoid } from 'nanoid'
import Bookshelf from '../models/book.js'
import apiResponse from '../../services/responseServices.js'

const index = async (req, res) => {
	const { name, reading, finished } = req.query
	const queryParams = {
		name: name ?? 'empty',
		reading: reading ?? 'empty',
		finished: finished ?? 'empty',
	}
	const books = await Bookshelf.getAllBooks(queryParams)

	return await apiResponse(res, 200, 'index', { books })
}

const store = async (req, res) => {
	const requestName = req.payload.name ?? 'empty'

	if (['', 'empty'].includes(requestName)) {
		return await apiResponse(res, 400, 'Gagal menambahkan buku. Mohon isi nama buku')
	}
    
	if (req.payload.readPage > req.payload.pageCount) {
		return await apiResponse(res, 400, 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount')
	}

	const defaultBody = {
		id: nanoid(16),
		insertedAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		finished: req.payload.pageCount === req.payload.readPage
	}

	const requestBody = {
		name: req.payload.name,
		year: req.payload.year,
		author: req.payload.author,
		summary: req.payload.summary,
		publisher: req.payload.publisher,
		pageCount: req.payload.pageCount,
		readPage: req.payload.readPage,
		reading: req.payload.reading
	}

	const newBook = {...defaultBody, ...requestBody}

	await Bookshelf.store(newBook)

	const isBookInserted = await Bookshelf.getSingleBookById(defaultBody.id)
    
	if (isBookInserted.length < 1) {
		return await apiResponse(res, 500, 'Gagal menambahkan buku')
	}

	return await apiResponse(res, 201, 'Buku berhasil ditambahkan', { bookId: defaultBody.id})
}

const show = async (req, res) => {
	const isBookExist = await Bookshelf.getSingleBookById(req.params.id)

	if (isBookExist.length < 1) {
		return await apiResponse(res, 404, 'Buku tidak ditemukan')
	}

	return await apiResponse(res, 200, 'show', { book: isBookExist[0]})
}

const update = async (req, res) => {
	const isBookExist = await Bookshelf.getSingleBookById(req.params.id)

	if (isBookExist.length < 1) {
		return await apiResponse(res, 404, 'Gagal memperbarui buku. Id tidak ditemukan')
	}

	const requestName = req.payload.name ?? 'empty'

	if (['', 'empty'].includes(requestName)) {
		return await apiResponse(res, 400, 'Gagal memperbarui buku. Mohon isi nama buku')
	}
    
	if (req.payload.readPage > req.payload.pageCount) {
		return await apiResponse(res, 400, 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount')
	}

	const bookToUpdate = {
		id: isBookExist[0].id,
		name: req.payload.name ?? isBookExist[0].name,
		year: req.payload.year ?? isBookExist[0].year,
		author: req.payload.author ?? isBookExist[0].author,
		summary: req.payload.summary ?? isBookExist[0].summary,
		publisher: req.payload.publisher ?? isBookExist[0].publisher,
		pageCount: req.payload.pageCount ?? isBookExist[0].pageCount,
		readPage: req.payload.readPage ?? isBookExist[0].readPage,
		reading: req.payload.reading ?? isBookExist[0].reading,
		finished: (req.payload.pageCount ?? isBookExist[0].pageCount) === (req.payload.readPage ?? isBookExist[0].readPage),
		insertedAt: isBookExist[0].insertedAt,
		updatedAt: new Date().toISOString()
	}

	await Bookshelf.update(req.params.id, bookToUpdate)

	return await apiResponse(res, 200, 'Buku berhasil diperbarui')
}

const remove = async (req, res) => {
	const isBookExist = await Bookshelf.getSingleBookById(req.params.id)

	if (isBookExist.length < 1) {
		return await apiResponse(res, 404, 'Buku gagal dihapus. Id tidak ditemukan')
	}

	await Bookshelf.remove(req.params.id)

	return await apiResponse(res, 200, 'Buku berhasil dihapus')
}

export default { index, store, show, update, remove }