const mongoose = require('mongoose');

const Project = mongoose.model('Project', {
  titleProject: String,
  descriptionProject: String,
  linkApp: String,
  idUserApi: String,
  passUserApi: String,
});

module.exports = Project;
