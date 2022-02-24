import mongoose from '../database/connection.js';

const schemaProject = new mongoose.Schema({
  titleProject: {
    type: String,
    required: true,
  },
  descriptionProject: {
    type: String,
    required: true,
  },
  linkApp: {
    type: String,
    required: true,
  },
  linkRepository: {
    type: String,
    required: true,
  },
  imageProject: {
    type: String,
    required: true,
  },
});

const projects = mongoose.model('Project', schemaProject);

export default projects;
