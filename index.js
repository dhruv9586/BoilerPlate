import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes";
import mongoose from 'mongoose'

const app = express(),
	db_url = 'mongodb://localhost/mern'

mongoose.connect(db_url, { useNewUrlParser: true }, () => {
	console.log("MongoDb:27017 connected -------------------");
})
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);

app.listen(8000, () => {
	console.log("Localhost:8000 connected -------------------");
})