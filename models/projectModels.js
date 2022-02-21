import Project from '../models/Project.js';

const findRepositoryProject = async (linkRepository) => {
  const linkProject = await Project.findOne({ linkRepository });
  return linkProject;
};

export default findRepositoryProject;