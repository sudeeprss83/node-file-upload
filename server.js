const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//creating express app
const app = express();
app.use(express.json());

let filepath;

//multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now());
  },
});

const upload = multer({ storage }).single("fileUpload");

app.use(express.static("public"));

//Fetching the home page
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.sendFile(__dirname + "/public/preview.html");
  });
});

app.get("/upload/preview", (req, res) => {
  images = [];

  fs.readdir(`${__dirname}/uploads`, (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach((file) => {
      images.push(file);
    });
    const filepath = path.join(__dirname, `/uploads/${images[0]}`);
    const readstream = fs.createReadStream(filepath);
    readstream.on("open", () => {
      readstream.pipe(res);
    });
  });
});

//connecting to the server port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`connected to port ${port}...`);
});
