const express = require('express');
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(express.json())
app.use(cors());



const uri = "mongodb+srv://assignment-11:cNQwwIL4JTqdlwYN@cluster0.qcnne9d.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    client.connect();

    const db = client.db('assignment-11').collection('collection0')


    app.get('/' , async(req,res) => {
        const result = await db.find().toArray()
        res.send(result)
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);






app.listen(process.env.PORT || 3000, () => {console.log('listening')})
