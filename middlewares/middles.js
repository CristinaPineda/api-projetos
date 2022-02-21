import StatusCodes from "http-status-codes";
import findRepositoryProject from '../models/projectModels.js';

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
  if (findRepositoryProject) {
    return res
      .status(StatusCodes.CONFLICT)
      .send({ message: 'Projeto já existe no banco de dados'});
  }
  next();
};

export default validEntries;