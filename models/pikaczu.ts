import * as mongoose from "mongoose";

const connectionString = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/27017';

mongoose.connect(connectionString);

const db = mongoose.connection;

db.on('open', ()=> console.log('I am happy'));

console.log('pikaczu')