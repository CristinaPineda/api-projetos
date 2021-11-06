const router = require("express").Router();
const Project = require('../models/Project');

router.post('/', async (req, res) => {
  const { titleProject, descriptionProject, linkApp, linkRepository, imageProject } = req.body;

  if(!titleProject || !descriptionProject || !linkApp || !linkRepository || !imageProject) {
    res.status(422).json({ error: 'Todos os campos são obrigatórios'});
    return;
  };

  const project = {
    titleProject,
    descriptionProject,
    linkApp,
    linkRepository,
    imageProject,
  };

  try {
    await Project.create(project);
    res.status(201).json({ message: 'Projeto inserido no banco com sucesso'});

  } catch (error) {
    res.status(500).json({ error: error });
  };
});

router.get("/", async (_req, res) => {
  try {
    res.status(200).json({ message: "Tudo funcionando" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
