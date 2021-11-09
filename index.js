const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// const Login = require('./controllers/Users/Login');
// const Logged = require('./controllers/Users/Logged');
// const Logoff = require('./controllers/Users/Logoff');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
const hbs = exphbs.create();
const KEY = process.env.KEY;
const PORT_URL = 5000;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const projectRoutes = require("./routes/projectRoutes");

app.use("/project", projectRoutes);

app.get("/", (_req, res) => {
  const name = "API projetos pessoais";
  res.render("home", { name });
});

mongoose
  .connect(
    `mongodb+srv://projectsCris:${KEY}@apicluster.ue08x.mongodb.net/bancoProjetos?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("MongodbAtlas connect");
    app.listen(PORT_URL);
  })
  .catch((err) => console.log(err));
