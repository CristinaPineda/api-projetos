require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const SECRET = process.env.SECRET;

const app = express();
const hbs = exphbs.create();
const PORT_URL = process.env.PORT || 5000;

app.use(session({ secret: SECRET }));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(cors());

const projectRoutes = require("./routes/projectRoutes");

app.use("/project", projectRoutes);

const Database = require("./database");

const projectRoutesRoot = require("./routes/projectRoutesRoot");

// app.use("/", projectRoutesRoot);

const ADMIN = process.env.ADMIN;
const LOG = process.env.LOG;

app.get("/", (_req, res) => {
    const name = "API projetos pessoais";
    res.render("home", { name });
    return
});

app.post("/", (req, res) => {
  if (req.body.id == ADMIN && req.body.pass == LOG) {
    req.session.id = ADMIN;
    const system = "API Projetos de portifólio"
    res.render("admin", { system })
  } else {
    const name = "É necessário ter autorização para entrar!";
    res.render("home", { name })
  }
  return
})

app.listen(PORT_URL, () => {
  console.log("Servidor rodando");
});