const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


//midleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xgxwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
    const servicesCollection = client.db("Hospital-Services").collection("allServices");
    const usersCollection = client.db("Toyoya-car").collection("users");
    
    //get allServices
    app.get("/allServices", async (req, res) => {
        const result = await servicesCollection.find({}).toArray();
        res.send(result);
      });

      app.use('/users', async (req, res) => {
        console.log(req.body);
        const result = await usersCollection.find({}).toArray();
        console.log(result);
        res.send(result);
    })

  });

console.log(uri);

app.get('/', (req, res) => {
  res.send('Hospital services server')
})

app.listen(port, () => {
  console.log('running the server',port);
})