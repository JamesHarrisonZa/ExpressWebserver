const MongoClient = require('mongodb').MongoClient;
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

	function close(){
		mongoClient.close();
	}

	return {
		findAsync,
		findByIdAsync,
		close
	}
}

module.exports = mongoDbStorage;