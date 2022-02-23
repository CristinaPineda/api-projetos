import { ObjectId } from 'mongodb';
import Project from './Project.js';

async function getAllProjects() {
  const searchProject = await Project.find();
  return searchProject;
}

async function findIdProject(idProject) {
  if (!ObjectId.isValid(idProject)) return null;
  const searchId = await Project.findOne({ _id: ObjectId(idProject) });
  return searchId;
}

async function findRepositoryProject(linkRepository) {
  const linkProject = await Project.findOne({ linkRepository });
  return linkProject;
}

async function postNewProject({
  titleProject, descriptionProject, linkApp, linkRepository, imageProject,
}) {
  const dataProject = await Project.create({
    titleProject,
    descriptionProject,
    linkApp,
    linkRepository,
    imageProject,
  });
  return dataProject;
}

async function updateProject(idProject, project) {
  const update = await Project.updateOne({ _id: ObjectId(idProject) }, project);
  return update;
}

async function delProject(idProject) {
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
