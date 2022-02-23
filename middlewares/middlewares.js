import StatusCodes from 'http-status-codes';
import { findRepositoryProject, findIdProject } from '../models/projectModels.js';

export async function validEntries(req, res, next) {
  try {
    const {
      titleProject, descriptionProject, linkApp, linkRepository, imageProject,
    } = req.body;
    if (!titleProject
      || !descriptionProject
      || !linkApp
      || !linkRepository
      || !imageProject) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: 'Todos os campos são obrigatórios' });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
  next();
}

export async function matchProject(req, res, next) {
  try {
    const { linkRepository } = req.body;
    const findProjectMatch = await findRepositoryProject(linkRepository);
    if (findProjectMatch) {
      return res
        .status(StatusCodes.CONFLICT)
        .send({ message: 'Projeto já existe no banco de dados' });
    } 
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
  next();
}

export async function validId(req, res, next) {
  try {
    const { idProject } = req.params;
    const idProjectMatch = await findIdProject(idProject);
    if (!idProjectMatch) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: 'Projeto não encontrado!' });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
  next();
}
