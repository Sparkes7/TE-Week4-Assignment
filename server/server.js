import express from "express";
import cors from "cors";
import { db } from "./dbConnection.js"; //importing the db pool

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8080;
app.listen(PORT, function (request, response) {
  console.log(`Server running on port: ${PORT}`);
});

app.get("/", (request, response) => {
  response.json({ message: "Welcome to the server" });
});

app.get("/reviews", async (request, response) => {
  const query = await db.query(`SELECT * FROM reviews`);
  response.json(query.rows);
});

app.post("/add-review", express.json(), (request, response) => {
  const newReview = request.body;
  const query = db.query(
    `INSERT INTO reviews (name, email, message, locationscore, valuescore, facilitiesscore, cleanlinessscore, servicescore)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      newReview.formValues.name,
      newReview.formValues.email,
      newReview.formValues.message,

      newReview.formValues.locationscore,
      newReview.formValues.valuescore,
      newReview.formValues.facilitiesscore,
      newReview.formValues.cleanlinessscore,
      newReview.formValues.servicescore,
    ]
  );
  response.json(query);
});

app.delete("/delete-review", express.json(), (request, response) => {
  db.query(`DELETE FROM reviews WHERE id = $1`, [request.body.id]);
});

app.put("/like-review", express.json(), (request, response) => {
  db.query(`UPDATE reviews SET reviewlikes = reviewlikes + $1 WHERE id = $2`, [
    request.body.num,
    request.body.id,
  ]);
});
