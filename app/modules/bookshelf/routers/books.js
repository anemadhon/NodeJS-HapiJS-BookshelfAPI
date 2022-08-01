'use strict'

import bookShelfController from '../controllers/bookController.js'

export default [
	{
		method: 'GET',
		path: '/books',
		handler: bookShelfController.index
	},
	{
		method: 'POST',
		path: '/books',
		handler: bookShelfController.store
	},
	{
		method: 'GET',
		path: '/books/{id}',
		handler: bookShelfController.show
	},
	{
		method: ['PUT', 'PATCH'],
		path: '/books/{id}',
		handler: bookShelfController.update
	},
	{
		method: 'DELETE',
		path: '/books/{id}',
		handler: bookShelfController.remove
	},
]