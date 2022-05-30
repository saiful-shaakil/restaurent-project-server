const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

//connecting database

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@redonion.uipb9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const breakfastCollection = client.db("RedOnion").collection("breakfast");
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
