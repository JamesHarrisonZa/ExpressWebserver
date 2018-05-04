const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const dbName = 'bookAPI';
const collectionName = 'books';
const url = `mongodb://localhost:27017/${dbName}`;

// ----------------------------------------------------------------------------------------------------------------------------------
// Creating some records
MongoClient.connect(url, function (err, db) {
	if (err) throw err;

	const dbo = db.db(dbName);

	dbo.createCollection(collectionName, function (err, res) {
		if (err) throw err;
		console.log("Collection created!");
		db.close();
	});

	var myobj = {
		title: 'War and Peace',
		genre: 'Historical Fiction',
		author: 'Lev Nikolayevich Tolstoy',
		read: false
	};
	dbo.collection(collectionName).insertOne(myobj, function (err, res) {
		if (err) throw err;
		console.log("1 document inserted");
		db.close();
	});
});
// ----------------------------------------------------------------------------------------------------------------------------------

const app = express();
const port = process.env.PORT || 42420;
const router = express.Router();

app.get('/', (req, res) => {
	res.send('welcome to my API!');
});

router.route('/Books')
	.get(async (req, res) => {

		const mongoClient = await MongoClient.connect(url);
		const db = mongoClient.db(dbName);
		const results = await db.collection(collectionName).find({}).toArray();
		mongoClient.close();
		res.json(results);
	});

app.use('/api', router);

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`);
	console.log(`API running at http://localhost:${port}/api/books`);
});