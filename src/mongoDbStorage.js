const { MongoClient } = require('mongodb');
const mongoDbConfig = require('./mongoDbConfig');

async function mongoDbStorage() {

	const config = mongoDbConfig();
	const mongoClient = await MongoClient.connect(config.url);
	const db = mongoClient.db(config.dbName);

	async function findAsync(reqQuery) {

		const query = {};
		if (reqQuery.genre) {
			query.genre = reqQuery.genre;
		}
		const results = await db.collection(config.collectionName).find(query).toArray();
		return results;
	}

	async function findByIdAsync(id) {

		const results = await db.collection(config.collectionName).findOne({}, id);
		return results;
	}

	async function postAsync(book) {

		const result = await db.collection(config.collectionName).insertOne(book);
		return result;
	}

	function close(){
		mongoClient.close();
	}

	return {
		findAsync,
		findByIdAsync,
		postAsync,
		close
	}
}

module.exports = mongoDbStorage;