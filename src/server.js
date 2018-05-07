const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoDbConfig = require('./mongoDbConfig');

const app = express();
const port = process.env.PORT || 42420;
const router = express.Router();

const config = mongoDbConfig();

app.get('/', (req, res) => {
	res.send('welcome to my API!');
});

router.route('/Books')
	.get(async (req, res) => {

		const query = {};
		if (req.query.genre) {
			query.genre = req.query.genre;
		}

		const mongoClient = await MongoClient.connect(config.url);
		const db = mongoClient.db(config.dbName);
		const results = await db.collection(config.collectionName).find(query).toArray();
		mongoClient.close();
		res.json(results);
	});

router.route('/Books/:bookId')
	.get(async (req, res) => {

		const mongoClient = await MongoClient.connect(config.url);
		const db = mongoClient.db(config.dbName);
		const results = await db.collection(config.collectionName).findOne({}, req.params.bookId);
		mongoClient.close();
		res.json(results);
	});

app.use('/api', router);

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`);
	console.log(`API running at http://localhost:${port}/api/books`);
	console.log(`Filtering should be working http://localhost:${port}/api/books?genre=Science%20Fiction`);
	console.log(`Should return an object for a given id http://localhost:${port}/api/books/5af009a7af425630a8d7e82c`);
});