/* eslint-disable no-console */
import mongoDB from 'mongodb';

const url = 'mongodb://localhost:27017';

const testPerson = {
  name: 'noobmaster69',
  age: 10,
  isAlive: true,
};

const testConnectDB = async () => {
  try {
    const connectDB = await mongoDB.connect(url, { useNewUrlParser: true });
    const database = connectDB.db('mydb');
    database.collection('testpeople').insertOne(testPerson);
    connectDB.close();
  } catch (error) {
    console.log(error);
  }
};

testConnectDB();
