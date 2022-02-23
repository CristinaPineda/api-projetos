import Project from '../models/Project.js';
import StatusCodes from 'http-status-codes';
import { allProjects, idProjects, newProject, upProject, delDataProject } from '../services/projectServices.js';

const getAllProjects = async (_req, res) => {
  try {
    const project = await allProjects();
    res.status(StatusCodes.OK).json(project);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
}

const getProjectsId = async (req, res) => {
  try {
    const { idProject } = req.params;
    const projectId = await idProjects(idProject);
    if (!projectId) {
      return res.status(StatusCodes.NOT_FOUND).json({message: 'Projeto não encontrado'});
    }
    res.status(StatusCodes.OK).json(projectId);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
}

const postProject = async (req, res) => {  
  try {
    const {
      titleProject,
      descriptionProject,
      linkApp,
      linkRepository,
      imageProject,
    } = req.body;
    await newProject({
      titleProject,
      descriptionProject,
      linkApp,
      linkRepository,
      imageProject,
    });
    res.status(StatusCodes.CREATED).json({ message: 'Projeto inserido no banco com sucesso' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
}

const patchProjectId = async (req, res) => {
  try {
    const { idProject } = req.params;
    const {
      titleProject,
      descriptionProject,
      linkApp,
      linkRepository,
      imageProject,
    } = req.body;

    const project = {
      titleProject,
      descriptionProject,
      linkApp,
      linkRepository,
      imageProject,
    }

    await upProject(idProject, project);
    res.status(StatusCodes.OK).json({ message: 'Projeto atualizado com sucesso!', ...project });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
}

const deleteProject = async (req, res) => {
  const { idProject} = req.params;
  try {
    await delDataProject(idProject);
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
  deleteProject,
}; 
