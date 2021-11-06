const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const hbs = exphbs.create();
const PORT_URL = 5000;


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static('public'));

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

const projectRoutes = require('./routes/projectRoutes');

app.use('/project', projectRoutes);

app.get("/", (_req, res) => {
  const name = "Projeto API";
  res.render("home", { name });
});

app.listen(PORT_URL, () => {
  console.log(`listening on port ${PORT_URL}`);
});
