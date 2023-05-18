const express = require('express');
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


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
[]
async function run() {
  try {
    client.connect();

    const db = client.db('assignment-11').collection('collection0')


    app.get('/' , async(req,res) => {
        const result = await db.find().limit(20).toArray()
        res.send(result)
    })

    app.get('/my-toys' , async(req,res) => {

    
            let query = {} ;

            // console.log(req.query.email)

            query = {sellerEmail : req.query.email}
            const result = await db.find(query).toArray()
            res.send(result)
            console.log(result)
            // console.log(req.query.email)

    })

    app.put('/' , async(req,res) => {
        const filter = {_id : new ObjectId(req.body.id)}
        const options = { upsert : true }
        const update = {
          $set: {
            name : req.body.name ,
            price : req.body.price,
            quantity : req.body.quantity,
            description :req.body.description ,
            rating : req.body.rating
          }
        }
        const result = await db.updateOne(filter,update,options)
        res.send(result)
      })
  

    
    app.post('/addtoys' , async(req,res) => {
        

        const result =await db.insertOne(req.body)
        console.log(result)
    })





    app.delete('/my-toys' , async(req,res) => {
        const query = {_id : new ObjectId(req.body.data)}
        const result = await db.deleteOne(query)
        res.send(result)
    })

    // app.post('/' , async(req,res) => {
    //     console.log('called')
    //     const result = await db.find().limit(20+Number(req.body.value)).toArray()
    //     res.send(result)
    //     // console.log(result)
    // })

    app.get('/all-toys/:id' , async(req,res) => {

        const query = {_id : new ObjectId(req.params.id)}
        const result = await db.find(query).toArray()

        console.log(result)
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
