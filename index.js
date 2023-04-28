const express = require('express')
const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
app.use(express.json());
app.use(cors())


// jUWk8Fjxf3UAqusZ
const uri = 'mongodb+srv://mohid10587:jUWk8Fjxf3UAqusZ@cluster0.aqkhuox.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect()
        console.log('connected')
        const productsCollection = client.db('ayshi').collection('products');


        app.post("/addProduct", async (req, res) => {
            const product = req.body
            const result = await productsCollection.insertOne(product)
            console.log(result)
        });


        app.get('/getProduct', async (req, res) => {
            console.log('hit')
            const result = await productsCollection.find({}).toArray()

            res.send(result)
        })


        app.get('/productDetails/:productId', async (req, res) => {
            const productId = req.params.productId;
            const result = await productsCollection.findOne({ _id:new ObjectId(productId) });
          
            if (result) {
              // Product found
              res.status(200).json(result);
            } else {
              // Product not found
              res.status(404).json({ message: `Product with id ${productId} not found` });
            }
          });
          

    } finally {

    }

}

run().catch(console.dir)


app.get('/', async (req, res) => {
    res.send('This is  deployment in render')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
