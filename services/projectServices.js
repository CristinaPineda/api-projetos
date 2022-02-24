import { ObjectId } from 'mongodb';
import projects from '../models/projectModels.js';

export async function getAllProjects() {
  const searchProject = await projects.find();
  return searchProject;
}

export async function findIdProject(idProject) {
  if (!ObjectId.isValid(idProject)) return null;
  const searchId = await projects.findOne({ _id: ObjectId(idProject) });
  return searchId;
}

export async function findRepositoryProject(linkRepository) {
  const linkProject = await projects.findOne({ linkRepository });
  return linkProject;
}

export async function postNewProject(project) {
  const dataProject = await projects.create(project);
  return dataProject;
}

export async function updateProject(idProject, project) {
  const update = await projects.updateOne(
    { _id: ObjectId(idProject) },
    project
  );
  return update;
}

export async function delProject(idProject) {
  if (!ObjectId.isValid(idProject)) return null;
  const searchId = await projects.deleteOne({ _id: ObjectId(idProject) });
  return searchId;
}
