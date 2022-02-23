import { ObjectId } from 'mongodb';
import {
  getAllProjects, findIdProject, postNewProject, updateProject, delProject,
} from '../models/projectModels.js';

async function allProjects() {
  const searchAll = await getAllProjects();
  return searchAll;
}

async function idProjects(idProject) {
  if (!ObjectId.isValid(idProject)) {
    return false;
  }
  const idSearch = await findIdProject(idProject);
  if (!idSearch) {
    return false;
  }
  return idSearch;
}

async function newProject({
  titleProject, descriptionProject, linkApp, linkRepository, imageProject,
}) {
  const postProject = await postNewProject({
    titleProject,
    descriptionProject,
    linkApp,
    linkRepository,
    imageProject,
  });
  return { postProject };
}

async function upProject(idProject, project) {
  const upProjects = await updateProject(idProject, project);
  return upProjects;
}

const delDataProject = async (idProject) => {
  const deleteData = await delProject(idProject);
  return deleteData;
};

export {
  allProjects, idProjects, newProject, upProject, delDataProject,
};
