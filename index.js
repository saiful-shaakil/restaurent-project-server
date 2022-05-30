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
