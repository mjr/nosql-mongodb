const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://emerald:pM2LwW96knq5Hoy6@cluster0.vpnba.mongodb.net/health-system?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Creating collections and indexes...");
    const db = client.db("health-system");

    // Create collenctions
    await db.createCollection("professionals");
    await db.createCollection("patients");
    await db.createCollection("hospitals");
    await db.collection("hospitals").createIndex({ location: "2dsphere" });
    console.log("Successfully created collections and indexes!");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
