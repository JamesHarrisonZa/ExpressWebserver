const express = require('express');
const bodyParser = require('body-parser');

const mongoDbStorage = require('./mongoDbStorage');
const Book = require('./book');

(async ()=> {

	const app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	const port = process.env.PORT || 42420;
	const router = express.Router();
	const storage = await mongoDbStorage();

	app.get('/', (req, res) => {
		res.send('welcome to my API!');
	});

	router.route('/Books')
		.get((req, res, next) => {

			storage.findAsync(req.query)
				.then((results) => res.json(results))
				.catch((error) => next(error));
		});

	router.route('/Books/:id')
		.get((req, res, next) => {

			storage.findByIdAsync(req.params.id)
				.then((results) => res.json(results))
				.catch((error) => next(error));
		});

	router.route('/Books')
		.post((req, res, next) => {

			const book = new Book(req.body.title, req.body.genre, req.body.author, req.body.read);
			storage.postAsync(book)
				.then((result) => res.send(`Inserted book: ${JSON.stringify(book)}`))
				.catch((error) => next(error));
		});

	app.use('/api', router);

	app.listen(port, () => {
		console.log(`Listening on http://localhost:${port}`);
		console.log(`API running at http://localhost:${port}/api/books`);
		console.log(`Filtering should be working http://localhost:${port}/api/books?genre=Science%20Fiction`);
		console.log(`Should return an object for a given id http://localhost:${port}/api/books/5af009a7af425630a8d7e82c`);
	});

})().catch((error) => {
	console.log(error);
});