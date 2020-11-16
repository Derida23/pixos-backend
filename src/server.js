import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

let corsOptions = {
  origin: "http://localhost: 8081",
};

app.use(cors(corsOptions));

// parse request of content type application/json
app.use(bodyParser.json());

// parse request of content type form urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to PIXOS - point of sale application....." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`PIXOS Server is Running on port : ${PORT}.....`);
});
