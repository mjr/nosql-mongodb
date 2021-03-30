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
    const db = client.db("health-system");

    // Question A
    // const result = db.collection("hospitals").aggregate([
    //   {
    //     $project: {
    //       name: 1,
    //       professionals: 1,
    //       hospitalizations: {
    //         $filter: {
    //           input: "$hospitalizations",
    //           as: "hospitalization",
    //           cond: { $eq: ["$$hospitalization.departureDate", null] },
    //         },
    //       },
    //     },
    //   },
    // ]);
    // await result.forEach(console.dir);

    // Question B
    // const result = db.collection("hospitals").aggregate([
    //   {
    //     $project: {
    //       name: 1,
    //       quantityBeds: 1,
    //     },
    //   },
    // ]);
    // await result.forEach(console.dir);

    // Question C
    // const result = db.collection("hospitals").aggregate([
    //   {
    //     $project: {
    //       name: 1,
    //       hospitalizations: {
    //         $filter: {
    //           input: "$hospitalizations",
    //           as: "hospitalization",
    //           cond: { $eq: ["$$hospitalization.departureDate", null] },
    //         },
    //       },
    //     },
    //   },
    // ]);
    // await result.forEach(console.dir);

    // Question D
    // TODO

    // Question E
    // const result = db.collection("professionals").aggregate(
    //   {
    //     $group: {
    //       _id: {
    //         role: "$role",
    //         hospital: "$hospital",
    //       },
    //       count: { $sum: 1 },
    //     },
    //   },
    //   { $project: { role: "$_id", count: 1 } }
    // );
    // await result.forEach(console.dir);

    // Question F
    // const result = db.collection("patients").find({
    //   comorbidities: { $all: ["Hipertensão Arterial Resistentes"] },
    // });
    // await result.forEach(console.dir);

    // Question G
    // const result = db.collection("hospitals").find({
    //   location: {
    //     $near: {
    //       $geometry: { type: "Point", coordinates: [-5.916234, -35.169056] },
    //       $maxDistance: 10000,
    //     },
    //   },
    // });
    // await result.forEach(console.dir);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
