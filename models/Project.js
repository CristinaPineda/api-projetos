const mongoose = require('mongoose');

const Project = mongoose.model('Project', {
  titleProject: string,
  descriptionProject: string,
  linkApp: string,
  linkRepository: string,
  imageProject: image,
});

module.exports = Project;