const MongoClient = require('mongodb').MongoClient;
const mongoDbConfig = require('./mongoDbConfig');

const config = mongoDbConfig();

MongoClient.connect(config.url, function (err, db) {
	if (err) throw err;

	const dbo = db.db(config.dbName);

	dbo.createCollection(config.collectionName, function (err, res) {
		if (err) throw err;
		console.log('Collection created!');
		db.close();
	});

	dbo.collection(config.collectionName).insertMany(data, function (err, res) {
		if (err) throw err;
		console.log(`${data.length} documents inserted`);
		db.close();
	});
});

const data = [
	{
		title: 'War and Peace',
		genre: 'Historical Fiction',
		author: 'Lev Nikolayevich Tolstoy',
		read: false
	},
	{
		title: 'Les Misérables',
		genre: 'Historical Fiction',
		author: 'Victor Hugo',
		read: false
	},
	{
		title: 'The Time Machine',
		genre: 'Science Fiction',
		author: 'H. G. Wells',
		read: false
	},
	{
		title: 'A Journey into the Center of the Earth',
		genre: 'Science Fiction',
		author: 'Jules Verne',
		read: false
	},
	{
		title: 'The Dark World',
		genre: 'Fantasy',
		author: 'Henry Kuttner',
		read: false
	},
	{
		title: 'The Wind in the Willows',
		genre: 'Fantasy',
		author: 'Kenneth Grahame',
		read: false
	},
	{
		title: 'Life On The Mississippi',
		genre: 'History',
		author: 'Mark Twain',
		read: false
	},
	{
		title: 'Childhood',
		genre: 'Biography',
		author: 'Lev Nikolayevich Tolstoy',
		read: false
	}
];