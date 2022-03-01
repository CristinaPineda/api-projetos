import StatusCodes from 'http-status-codes';
import {
  getAllProjects, findIdProject, postNewProject, updateProject, delProject
} from '../services/projectServices.js';

async function body(req) {
  const {
    titleProject, descriptionProject, linkApp, linkRepository, imageProject,
  } = req.body;
  return {
    titleProject,
    descriptionProject,
    linkApp,
    linkRepository,
    imageProject,
  };
}

export async function getProjects(_req, res) {
  try {
    const project = await getAllProjects();
    return res.status(StatusCodes.OK).json(project);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}

export async function getProjectsId(req, res) {
  try {
    const { idProject } = req.params;
    const projectId = await findIdProject(idProject);
    if (!projectId) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Projeto não encontrado' });
    }
    return res.status(StatusCodes.OK).json(projectId);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message});
  }
}

export async function postProject(req, res) {
  try {
    const project = await body(req);
    const id = await postNewProject(project);
    const _id = id._id;
    return res.status(StatusCodes.CREATED).json({ message: 'Projeto inserido no banco com sucesso!', _id, ...project });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}

export async function patchProjectId(req, res) {
  try {
    const { idProject } = req.params;
    const project = await body(req);
    await updateProject(idProject, project);
    const _id = idProject;
    return res.status(StatusCodes.OK).json({ message: 'Projeto atualizado com sucesso!', _id,  ...project });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}

export async function deleteProject(req, res) {
  const { idProject } = req.params;
  try {
    await delProject(idProject);
    return res.status(StatusCodes.OK).json({ message: 'Projeto removido com sucesso!' });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
