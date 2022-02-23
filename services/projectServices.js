import { ObjectId } from 'mongodb';
import {
  getAllProjects, findIdProject, postNewProject, updateProject, delProject,
} from '../models/projectModels.js';

export async function allProjects() {
  const searchAll = await getAllProjects();
  return searchAll;
}

export async function idProjects(idProject) {
  if (!ObjectId.isValid(idProject)) {
    return false;
  }
  const idSearch = await findIdProject(idProject);
  if (!idSearch) {
    return false;
  }
  return idSearch;
}

export async function newProject(project) {
  const postProject = await postNewProject(project);
  return postProject;
}

export async function upProject(idProject, project) {
  const upProjects = await updateProject(idProject, project);
  return upProjects;
}

export async function delDataProject(idProject) {
  const deleteData = await delProject(idProject);
  return deleteData;
}
