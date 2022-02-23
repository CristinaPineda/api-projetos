import StatusCodes from "http-status-codes";
import { findRepositoryProject, findIdProject } from '../models/projectModels.js';

const validEntries = async (req, res, next) => {
  const {
    titleProject,
    descriptionProject,
    linkApp,
    linkRepository,
    imageProject,
  } = req.body;
  if (
    !titleProject ||
    !descriptionProject ||
    !linkApp ||
    !linkRepository ||
    !imageProject
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "Todos os campos são obrigatórios" });
  }
  next();
};

const matchProject = async (req, res, next) => {
  const { linkRepository } = req.body;
  const findProjectMatch = await findRepositoryProject(linkRepository)
  if (findProjectMatch) {
    return res
    .status(StatusCodes.CONFLICT)
    .send({ message: 'Projeto já existe no banco de dados'});
  }
  next();
}

const validId = async (req, res, next) => {
  const { idProject } = req.params;
  const idProjectMatch = await findIdProject(idProject);
  if(!idProjectMatch) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ message: 'Projeto não encontrado!' });
  }
  next();
}

export { validEntries, matchProject, validId };
