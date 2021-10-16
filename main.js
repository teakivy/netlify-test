const Express = require('express');
const BodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const CONNECTION_URL = 'mongodb+srv://enigma-admin:THXqq83YNZP4ickC@cluster0.leksr.mongodb.net';
const DATABASE_NAME = 'Content';

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(5134, () => {
	MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
		if (error) {
			throw error;
		}
		database = client.db(DATABASE_NAME);
		collection = database.collection('videos');
		console.log('Connected to `' + DATABASE_NAME + '`!');
	});
});

app.post('/videos', (request, response) => {
	return response.status(403).send('No access');
});

app.get('/videos', (request, response) => {
	collection.find({}).toArray((error, result) => {
		if (error) {
			return response.status(500).send(error);
		}
		response.send(JSON.stringify(result, '\t'));
	});
});

app.get('/personnel/:id', (request, response) => {
	collection.findOne({ _id: new ObjectId(request.params.id) }, (error, result) => {
		if (error) {
			return response.status(500).send(error);
		}
		response.send(result);
	});
});
