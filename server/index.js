const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const db = require("../database/postgres.js");
const messageRoutes = require("./routes/messageRoutes.js");

const app = express();
const PORT = process.env.PORT || 5000;

db.connect(function (err) {
  console.log("here");
  if (err) {
    console.log(err);
  } else {
    console.log("DB connected");
  }
});
app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist")));

app.use("/api/message", messageRoutes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

//example query:
//app.get('some endpoint', async (req, res) => {
// const yourData = await.process.postgresql.query(
// 'Your query here;'
// )
// res.status(200).send(JSON.stringify(yourData))
// })
