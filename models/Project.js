const mongoose = require('mongoose');

const Project = mongoose.model('Project', {
  titleProject: String,
  descriptionProject: String,
  linkApp: String,
  linkRepository: String,
  imageProject: String,
});

module.exports = Project;
