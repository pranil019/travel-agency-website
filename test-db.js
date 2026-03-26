const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
    const db = client.db('travel-agency');
    // You can now use `db` to read/write data
    console.log('Database:', db.databaseName);
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

connectDB();