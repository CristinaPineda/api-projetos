const express = require("express");
const exphbs = require("express-handlebars");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

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

const Database = require("./database");

const projectRoutes = require("./routes/projectRoutes");

app.use("/project", projectRoutes);

app.get("/", (_req, res) => {
  const name = "API projetos pessoais";
  res.render("home", { name });
});

app.listen(PORT_URL, () => {
  console.log("Servidor online")
});