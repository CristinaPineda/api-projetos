const routerRoot = require("express").Router();
require("dotenv").config();

const ADMIN = process.env.ADMIN;
const LOG = process.env.LOG;

routerRoot.post("/", (req, res) => {
  if (req.body.id == ADMIN && req.body.pass == LOG) {
    req.session.id = ADMIN;
    const system = "API Projetos de portifólio"
    res.render("admin", { system })
  } else {
    const name = "É necessário ter autorização para entrar!";
    res.render("home", { name })
  }
})

routerRoot.get("/", (req, res) => {
    const name = "API projetos pessoais";
    res.render("home", { name });
});

module.exports = routerRoot;