const MongoClient = require('mongodb').MongoClient;
const mongoDbConfig = require('./mongoDbConfig');

const config = mongoDbConfig();

MongoClient.connect(config.url, function (err, db) {
	if (err) throw err;

	const dbo = db.db(config.dbName);

	dbo.createCollection(config.collectionName, function (err, res) {
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
	dbo.collection(config.collectionName).insertOne(myobj, function (err, res) {
		if (err) throw err;
		console.log("1 document inserted");
		db.close();
	});
});