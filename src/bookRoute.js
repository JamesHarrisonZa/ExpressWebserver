const express = require('express');

const Book = require('./book');

function bookRoute(storage) {

	const router = express.Router();

	router.route('/')
		.get((req, res, next) => {

			storage.findAsync(req.query)
				.then((results) => res.json(results))
				.catch((error) => next(error));
		})
		.post((req, res, next) => {

			const book = new Book(req.body.title, req.body.genre, req.body.author, req.body.read);
			storage.insertAsync(book)
				.then((result) => res.send(`Inserted book: ${JSON.stringify(book)}`))
				.catch((error) => next(error));
		});

	router.route('/:id')
		.get((req, res, next) => {

			storage.findByIdAsync(req.params.id)
				.then((results) => res.json(results))
				.catch((error) => next(error));
		})
		.put((req, res, next) => {

			const book = new Book(req.body.title, req.body.genre, req.body.author, req.body.read);
			storage.updateAsync(req.params.id, book)
				.then((results) => res.send(`Updated book: ${JSON.stringify(book)}`))
				.catch((error) => next(error));
		})
		.patch((req, res, next) => {

			if (req.body._id) delete req.body._id;

			storage.updateFieldsAsync(req.params.id, req.body)
				.then((results) => res.send(`Patched book: ${JSON.stringify(req.body)}`))
				.catch((error) => next(error));
		});

	return router;
}

module.exports = bookRoute;