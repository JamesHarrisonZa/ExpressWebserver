const express = require('express');

const app = express();
const port = process.env.PORT || 42420;

app.get('/', (req, res) => {
	res.send('welcome to my API!');
});

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
});