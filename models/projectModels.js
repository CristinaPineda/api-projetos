import { ObjectId } from 'mongodb';
import Project from './Project.js';

export async function getAllProjects() {
  const searchProject = await Project.find();
  return searchProject;
}

export async function findIdProject(idProject) {
  if (!ObjectId.isValid(idProject)) return null;
  const searchId = await Project.findOne({ _id: ObjectId(idProject) });
  return searchId;
}

export async function findRepositoryProject(linkRepository) {
  const linkProject = await Project.findOne({ linkRepository });
  return linkProject;
}

export async function postNewProject(project) {
  const dataProject = await Project.create(project);
  return dataProject;
}

export async function updateProject(idProject, project) {
  const update = await Project.updateOne({ _id: ObjectId(idProject) }, project);
  return update;
}

export async function delProject(idProject) {
  if (!ObjectId.isValid(idProject)) return null;
  const searchId = await Project.deleteOne({ _id: ObjectId(idProject) });
  return searchId;
}
