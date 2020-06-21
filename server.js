const express = require("express");

//creating express app
const app = express();
app.use(express.json());

//Fetching the home page
app.get("/", (req, res) => {
  res.send("home");
});

//connecting to the server port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`connected to port ${port}...`);
});
