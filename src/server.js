const express = require('express');
const mongoDbStorage = require('./mongoDbStorage');

(async ()=> {

	const app = express();
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

	router.route('/Books/:bookId')
		.get((req, res, next) => {

			storage.findByIdAsync(req.params.bookId)
				.then((results) => res.json(results))
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