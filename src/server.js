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

		const mongoClient = await MongoClient.connect(config.url);
		const db = mongoClient.db(config.dbName);
		const results = await db.collection(config.collectionName).find({}).toArray();
		mongoClient.close();
		res.json(results);
	});

app.use('/api', router);

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`);
	console.log(`API running at http://localhost:${port}/api/books`);
});