import { ObjectId } from 'mongodb';
import { getAllProjects, findIdProject, postNewProject, updateProject, delProject } from '../models/projectModels.js';

const allProjects = async () => {
  const searchAll = await getAllProjects();
  return searchAll;
};

const idProjects = async (idProject) => {
  if (!ObjectId.isValid(idProject)) {
    return false;
  }
  const idSearch = await findIdProject(idProject);
  if (!idSearch) {
    return false;
  }
  return idSearch;
};

const newProject = async ({
  titleProject,
  descriptionProject,
  linkApp,
  linkRepository,
  imageProject,
}) => {
  const postProject = await postNewProject({
    titleProject,
    descriptionProject,
    linkApp,
    linkRepository,
    imageProject,
  });
  return { postProject };
}

const upProject = async (idProject, project) => {
  const upProject = await updateProject(idProject, project);
  return upProject;
}

const delDataProject = async (idProject) => {
  const deleteData = await delProject(idProject);
    return deleteData;
}

export { allProjects, idProjects, newProject, upProject, delDataProject };
