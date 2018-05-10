const express = require('express');
const bodyParser = require('body-parser');

const mongoDbStorage = require('./mongoDbStorage');
const bookRoute = require('./bookRoute');

(async ()=> {

	const app = express();
	app.use(bodyParser.json()); //Needed for Post requests
	app.use(bodyParser.urlencoded({ extended: true })); //Needed for Post requests
	const port = process.env.PORT || 42420;
	const storage = await mongoDbStorage();
	const bookRouter = bookRoute(storage);

	app.get('/', (req, res) => {
		res.send('welcome to my API!');
	});

	app.use('/api/books', bookRouter);

	app.listen(port, () => {
		console.log(`Listening on http://localhost:${port}`);
		console.log(`API running at http://localhost:${port}/api/books`);
		console.log(`Filtering should be working http://localhost:${port}/api/books?genre=Science%20Fiction`);
		console.log(`Should return an object for a given id http://localhost:${port}/api/books/5af009a7af425630a8d7e82c`);
	});

})().catch((error) => {
	console.log(error);
});