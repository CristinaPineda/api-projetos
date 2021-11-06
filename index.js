const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();
const hbs = exphbs.create();
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
  const name = "Projeto API";
  res.render("home", { name });
});

mongoose
  .connect(
    "mongodb+srv://projectsCris:O9DAZan5EUtgjl5n@apicluster.ue08x.mongodb.net/bancoProjetos?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongodbAtlas connect");
    app.listen(PORT_URL);
  })
  .catch((err) => console.log(err));
