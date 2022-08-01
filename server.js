/* eslint-disable no-undef */
'use strict'

import Hapi from '@hapi/hapi'
import bookShelfRouter from './app/modules/bookshelf/routers/books.js'

const init = async () => {
	const port = process.env.PORT ?? 5000
	const host = process.env.ENV === 'prod' ? 'yourproductionhost' : 'localhost'
	const routes = {
		cors: {
			origin: ['*']
		}
	}

	const server = Hapi.server({ port, host, routes })

	server.route(bookShelfRouter)

	await server.start()

	console.log(`server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
	console.log(err)

	process.exit(1)
})

init()