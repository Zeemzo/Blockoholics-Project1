const MongoClient = require('mongodb').MongoClient;

// const mongoUser = 'dbUser';
// const mongoDbName = 'test';
// const mongoPass = 'root';
// const mongoConnStr = `mongodb+srv://${mongoUser}:${mongoPass}@sls-mongo-example-tdoka.mongodb.net/${mongoDbName}?retryWrites=true`;
// const mongoConnStr = `mongodb+srv://${mongoUser}:${mongoPass}@post-rrxsl.mongodb.net/${mongoDbName}?retryWrites=true&w=majority`;
// const mongoConnStr = `mongodb+srv://dbUser:root@post-rrxsl.mongodb.net/test?retryWrites=true&w=majority`;
const mongoConnStr =  process.env.DB_URI;
// console.log('mongoConnStr', mongoConnStr)


export const client = new MongoClient(mongoConnStr, { 
  useNewUrlParser: true,
});
let db;

export const createConn = async () => {
  await client.connect();
  // return db = client.db('test');
};
