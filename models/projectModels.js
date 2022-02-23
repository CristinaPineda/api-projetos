import Project from '../models/Project.js';
import { ObjectId } from 'mongodb';

const getAllProjects = async () => {
  const searchProject = await Project.find();
  return searchProject;
}

const findIdProject = async (idProject) => {
  if (!ObjectId.isValid(idProject)) return null;
  const searchId = await Project.findOne({ _id: ObjectId(idProject) });
  return searchId;
};

const findRepositoryProject = async (linkRepository) => {
  const linkProject = await Project.findOne({ linkRepository });
  return linkProject;
};

const postNewProject = async ({
  titleProject,
  descriptionProject,
  linkApp,
  linkRepository,
  imageProject,
}) => {
  const dataProject = await Project.create({
    titleProject,
    descriptionProject,
    linkApp,
    linkRepository,
    imageProject,
  });
  return dataProject;
}

const updateProject = async (idProject, project) => {
  const update = await Project.updateOne({ _id: ObjectId(idProject)}, project);
  return update;
}

const delProject = async (idProject) => {
  if (!ObjectId.isValid(idProject)) return null;
  const searchId = await Project.deleteOne({ _id: ObjectId(idProject) });
  return searchId;
}

export {
  getAllProjects,
  findIdProject,
  findRepositoryProject,
  postNewProject,
  updateProject,
  delProject,
};

