import { Router } from 'express';

import {
  create, findOne, find, updateOne, deleteOne,
} from '../models/Project';

const router = Router();

router.post('/', async (req, res) => {
  const {
    titleProject,
    descriptionProject,
    imageProject,
    linkApp,
    linkRepository,
  } = req.body;

  if (
    !titleProject
    || !descriptionProject
    || !linkApp
    || !linkRepository
    || !imageProject
  ) {
    res.status(422).json({ error: 'Todos os campos são obrigatórios' });
    return;
  }

  const project = {
    titleProject,
    descriptionProject,
    linkApp,
    linkRepository,
  };

  try {
    await create(project);
    res.status(201).json({ message: 'Projeto inserido no banco com sucesso' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/:idProject', async (req, res) => {
  try {
    const { idProject } = req.params;
    const projectId = await findOne({ _id: idProject });
    if (!projectId) {
      res.status(422).json({ message: 'Projeto não encontrado!' });
      return;
    }
    res.status(200).json(projectId);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/', async (req, res) => {
  try {
    const project = await find();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.patch('/:idProjec', async (req, res) => {
  const idProject = req.params.idProjec;
  const {
    titleProject,
    descriptionProject,
    linkApp,
    linkRepository,
  } = req.body;

  const project = {
    titleProject,
    descriptionProject,
    linkApp,
    linkRepository,
  };

  try {
    const upDateProject = await updateOne(
      { idProjec: idProject },
      project,
    );
    if (upDateProject.matchedCount === 0) {
      res.status(422).json({ message: 'Projeto não encontrado!' });
      return;
    }
    res.status(200).json({ message: 'Projeto atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/:idProject', async (req, res) => {
  const id = req.params.idProject;
  const projectDel = await findOne({ _id: id });

  if (!projectDel) {
    res.status(422).json({ message: 'Projeto não encontrado!' });
    return;
  }

  try {
    await deleteOne({ _id: id });
    res.status(200).json({ message: 'Projeto removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/user', async (req, res) => {
  const { idUserApi, passUserApi } = req.body;

  if (!idUserApi || !passUserApi) {
    res.status(422).json({ message: 'Todos campos são obrigatórios' });
    return;
  }

  const user = {
    idUserApi,
    passUserApi,
  };

  try {
    await create(user);
    res.status(201).json({ message: 'Usuário inserido no banco com sucesso' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
