const { MongoClient, ObjectID } = require('mongodb');

const mongoDbConfig = require('./mongoDbConfig');
const Book = require('./book');

async function mongoDbStorage() {

	const config = mongoDbConfig();
	const mongoClient = await MongoClient.connect(config.url);
	const db = mongoClient.db(config.dbName);

	async function findAsync(reqQuery) {

		const query = {};
		if (reqQuery.title) query.title = reqQuery.title;
		if (reqQuery.genre) query.genre = reqQuery.genre;
		if (reqQuery.author) query.author = reqQuery.author;
		if (reqQuery.read) query.read = reqQuery.read;

		const results = await db.collection(config.collectionName).find(query).toArray();
		return results;
	}

	async function findByIdAsync(id) {

		const query = { _id: new ObjectID(id) };
		const result = await db.collection(config.collectionName).findOne(query);
		return result;
	}

	async function insertAsync(book) {

		const result = await db.collection(config.collectionName).insertOne(book);
		return result;
	}

	async function updateAsync(id, book) {

		const query = { _id: new ObjectID(id) };
		const values = { $set: { title: book.title, genre: book.genre, author: book.author, read: book.read }};
		const result = await db.collection(config.collectionName).updateOne(query, values);
		return result;
	}

	async function updateFieldsAsync(id, fields) {

		const query = { _id: new ObjectID(id) };
		const values = { $set: fields };
		const result = await db.collection(config.collectionName).updateOne(query, values);
		return result;
	}

	async function deleteAsync(id) {

		const query = { _id: new ObjectID(id) };
		const result = await db.collection(config.collectionName).deleteOne(query);
		return result;
	}

	return {
		findAsync,
		findByIdAsync,
		insertAsync,
		updateAsync,
		updateFieldsAsync,
		deleteAsync
	}
}

module.exports = mongoDbStorage;