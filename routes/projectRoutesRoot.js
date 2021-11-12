require("dotenv").config();
const routerRoot = require("express").Router();

const ADMIN = process.env.ADMIN;
const LOG = process.env.LOG;

routerRoot.get("/", (_req, res) => {
    const name = "API projetos pessoais";
    res.render("home", { name });
    return
});

routerRoot.post("/", (req, res) => {
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

module.exports = routerRoot;