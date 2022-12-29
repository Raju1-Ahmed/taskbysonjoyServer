const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g1j3lmr.mongodb.net/?retryWrites=true&w=majority`;
console.log("uri is connect:", uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    //Data Base File Collection
    const usersCollection = client.db('sonjotbhaitaskdata').collection('users');

    //user collect api for Get
    app.get('/user',  async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.send(users);
    });

          //user collect api for post
      app.post('/addUser', async (req, res) => {
        const review = req.body;
        const result = await usersCollection.insertOne(review);
        res.send(result);
      })

  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello From Task!')
})

app.listen(port, () => {
  console.log(`Example Task listening on port ${port}`)
})