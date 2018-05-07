function mongoDbConfig() {

	const mongodbPort = 27017;
	const dbName = 'bookAPI';

	return {
		dbName: dbName,
		collectionName: 'books',
		url: `mongodb://localhost:${mongodbPort}/${dbName}`
	};
}

module.exports = mongoDbConfig;