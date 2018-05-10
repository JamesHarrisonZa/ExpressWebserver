const express = require('express');

const Book = require('./book');

function bookRoute(storage) {

	const router = express.Router();

	router.route('/')
		.get((req, res, next) => {

			storage.findAsync(req.query)
				.then((results) => res.json(results))
				.catch((error) => next(error));
		});

	router.route('/:id')
		.get((req, res, next) => {

			storage.findByIdAsync(req.params.id)
				.then((results) => res.json(results))
				.catch((error) => next(error));
		});

	router.route('/')
		.post((req, res, next) => {

			const book = new Book(req.body.title, req.body.genre, req.body.author, req.body.read);
			storage.postAsync(book)
				.then((result) => res.send(`Inserted book: ${JSON.stringify(book)}`))
				.catch((error) => next(error));
		});

	return router;
}

module.exports = bookRoute;