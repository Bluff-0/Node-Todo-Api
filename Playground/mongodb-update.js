// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
  if(err){
    return console.log(`Unable to connect to MongoDB server`);
  }
  console.log('Connected to MongoDB Server');
 const db= client.db('TodoApp');
 // db.collection('Todos').findOneAndUpdate({
 //   _id: new ObjectID('5d31dfcb4e612a36c8a8efcf')
 // },{
 //   $set: {
 //     completed: true
 //   }
 // }, {
 //   returnOriginal: false
 // }).then((result) => {
 //   console.log(result);
 // });
 db.collection('Users').findOneAndUpdate({
   _id: new ObjectID('5d31e452a57bd436c8cad331')
 },{
   $set: {
     name: "Saptarshi"
   },
   $inc: {
     age: 1
   }
 }, {
   returnOriginal: false
 }).then((result) => {
   console.log(result);
 });
 db.close();
});
