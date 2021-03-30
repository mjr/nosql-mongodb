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
    console.log("Loading data...");
    const db = client.db("health-system");

    // Add hospitals
    const hospitalHapvida = await db.collection("hospitals").insertOne({
      name: "Hapvida Zona Norte",
      address: "Av. Bacharel Tomaz Landim, 1022 - Igapó, Natal - RN, 59290-000",
      location: { type: "Point", coordinates: [-5.776978, -35.251476] },
      quantityBeds: 22,
    });
    const hospitalWalfredo = await db.collection("hospitals").insertOne({
      name: "Hospital Monsenhor Walfredo Gurgel",
      address: "Av. Hermes da Fonseca, s/n - Tirol, Natal - RN, 59015-000",
      location: { type: "Point", coordinates: [-5.809959, -35.203634] },
      quantityBeds: 38,
    });

    // Add patients
    const patientMaria = await db.collection("patients").insertOne({
      name: "Maria da Silva",
      cpf: "784.656.580-05",
      dateOfBirth: "1982-02-12",
      comorbidities: ["Hipertensão Arterial Resistentes"],
    });
    const patientJoao = await db.collection("patients").insertOne({
      name: "João da Silva",
      cpf: "646.422.020-99",
      dateOfBirth: "1979-09-27",
      comorbidities: ["Diabetes", "Pneumopatias crônicas graves"],
    });

    // Add professionals
    await db.collection("professionals").insertMany([
      {
        name: "Dr. Marcos dos Santos",
        cpf: "479.295.350-29",
        role: "Médico",
        hospital: hospitalWalfredo.insertedId,
      },
      {
        name: "Dr. Two",
        cpf: "479.295.350-29",
        role: "Médico",
        hospital: hospitalWalfredo.insertedId,
      },
      {
        name: "Dr. Three",
        cpf: "479.295.350-29",
        role: "Médico",
        hospital: hospitalHapvida.insertedId,
      },
      {
        name: "Enfermeira",
        cpf: "479.295.350-29",
        role: "Enfermeiro",
        hospital: hospitalWalfredo.insertedId,
      },
      {
        name: "Enfermeiro",
        cpf: "479.295.350-29",
        role: "Enfermeiro",
        hospital: hospitalWalfredo.insertedId,
      },
      {
        name: "Enfermeira Two",
        cpf: "479.295.350-29",
        role: "Enfermeiro",
        hospital: hospitalWalfredo.insertedId,
      },
      {
        name: "Enfermeiro Two",
        cpf: "479.295.350-29",
        role: "Enfermeiro",
        hospital: hospitalHapvida.insertedId,
      },
      {
        name: "Enfermeira Three",
        cpf: "479.295.350-29",
        role: "Enfermeiro",
        hospital: hospitalHapvida.insertedId,
      },
      {
        name: "Técnico",
        cpf: "479.295.350-29",
        role: "Técnico de enfermagem",
        hospital: hospitalWalfredo.insertedId,
      },
      {
        name: "Técnica",
        cpf: "479.295.350-29",
        role: "Técnico de enfermagem",
        hospital: hospitalWalfredo.insertedId,
      },
      {
        name: "Técnica Two",
        cpf: "479.295.350-29",
        role: "Técnico de enfermagem",
        hospital: hospitalHapvida.insertedId,
      },
      {
        name: "Técnico Two",
        cpf: "479.295.350-29",
        role: "Técnico de enfermagem",
        hospital: hospitalHapvida.insertedId,
      },
    ]);

    // Add relationship
    await db.collection("hospitals").updateOne(
      { _id: hospitalHapvida.insertedId },
      {
        $push: {
          hospitalizations: {
            pacient: patientMaria.insertedId,
            entryDate: new Date("2021-03-27 03:10:54"),
            departureDate: null,
          },
        },
      }
    );
    await db.collection("hospitals").updateOne(
      { _id: hospitalWalfredo.insertedId },
      {
        $push: {
          hospitalizations: {
            pacient: patientJoao.insertedId,
            entryDate: new Date("2021-03-25 10:23:01"),
            departureDate: new Date("2021-03-25 18:02:29"),
          },
        },
      }
    );
    console.log("Data loaded successfully!");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
