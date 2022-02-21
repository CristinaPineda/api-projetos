import Project from '../models/Project.js';
import StatusCodes from 'http-status-codes';

const getAllProjects = async (req, res) => {
  try {
    const project = await Project.find();
    res.status(StatusCodes.OK).json(project);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
}

const getProjectsId = async (req, res) => {
  try {
    const { idProject } = req.params;
    const projectId = await Project.findOne({ _id: idProject });
    if (!projectId) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: 'Projeto não encontrado!' });
      return;
    }
    res.status(StatusCodes.OK).json(projectId);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
}

const postProject = async (req, res) => {  
  try {
    let project = req.body;
    await Project.create(project);
    res.status(StatusCodes.CREATED).json({ message: 'Projeto inserido no banco com sucesso' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
}

const patchProjectId = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titleProject,
      descriptionProject,
      linkApp,
      linkRepository,
      imageProject,
    } = req.body;

    const upDateProject = await Project.updateOne();
    if (upDateProject.matchedCount === 0) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: 'Projeto não encontrado!' });
      return;
    }
    res.status(StatusCodes.OK).json({ message: 'Projeto atualizado com sucesso!' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
}

const deleteProject = async (req, res) => {
  const id = req.params.idProject;
  const projectDel = await Project.findOne({ _id: id });

  if (!projectDel) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: 'Projeto não encontrado!' });
    return;
  }

  try {
    await Project.deleteOne({ _id: id });
    res.status(StatusCodes.OK).json({ message: 'Projeto removido com sucesso!' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
}

export {
  getAllProjects,
  getProjectsId,
  postProject,
  patchProjectId,
  deleteProject
}; 
