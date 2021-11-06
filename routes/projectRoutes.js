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

router.get('/:idProject', async (req, res) => {
  try {
    const idProject = req.params.idProject;
    const projectId = await Project.findOne({ _id: idProject });
    if(!projectId) {
      res.status(422).json({ message: 'Projeto não encontrado!'});
      return;
    }
    res.status(200).json(projectId);
  } catch (error) {
    res.status(500).json({ error: error });
  };
});

router.get('/', async (req, res) => {
  try {
    const project = await Project.find();
    res.status(200).json(project);
    
  } catch (error) {
    res.status(500).json({ error: error });
  };
});

router.patch('/:idProjec', async (req, res) => {
  const idProject = req.params.idProjec;
  const { idProjec, titleProject, descriptionProject, linkApp, linkRepository, imageProject } = req.body;

  const project = {
    titleProject,
    descriptionProject,
    linkApp,
    linkRepository,
    imageProject,
  };

  try {
    const upDateProject = await Project.updateOne({ idProjec: idProject }, project);
    if(upDateProject.matchedCount === 0) {
      res.status(422).json({ message: 'Projeto não encontrado!'});
      return;
    }
    res.status(200).json({ message: `Projeto ${project.titleProject} atualizado com sucesso!`});
  } catch (error) {
    res.status(500).json({ error: error });
  };
});

module.exports = router;
