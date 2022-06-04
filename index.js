const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

//connecting database

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@redonion.uipb9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const foodCollection = client.db("RedOnion").collection("food");
    const orderCollection = client.db("RedOnion").collection("order");
    const customerCollection = client.db("RedOnion").collection("customer");

    //to get all breakfast
    app.get("/breakfast", async (req, res) => {
      const result = await foodCollection.find({ type: "breakfast" }).toArray();
      res.send(result);
    });
    //to get all lunch
    app.get("/lunch", async (req, res) => {
      const result = await foodCollection.find({ type: "lunch" }).toArray();
      res.send(result);
    });
    //to get all dinner
    app.get("/dinner", async (req, res) => {
      const result = await foodCollection.find({ type: "dinner" }).toArray();
      res.send(result);
    });
    //to get single food details
    app.get("/food/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await foodCollection.findOne(query);
      res.send(result);
    });
    //to post a single order
    app.post("/orders", async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.send(result);
    });
    //to update order quantity
    app.put("/update-order/:id", async (req, res) => {
      const id = req.params.id;
      const updateDocu = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity: updateDocu.quantity,
          total: updateDocu.total,
        },
      };
      const result = await orderCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });
    //to get Orders
    app.get("/orders/:email", async (req, res) => {
      const email = req.params.email;
      const query = { OrderMail: email };
      const result = await orderCollection.find(query).toArray();
      res.send(result);
    });
    //to remove Orders
    app.delete("/remove-order/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
    });
    //to save customar details
    app.post("/customer-details", async (req, res) => {
      const details = req.body;
      const result = await customerCollection.insertOne(details);
      res.send(result);
    });
  } finally {
    //
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Red Onion Server is running");
});
app.listen(port, () => {
  console.log("Red Onion running port", port);
});
