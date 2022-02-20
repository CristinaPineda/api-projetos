import { model } from 'mongoose';

const Project = model('Project', {
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
  imageProject: {
    type: String,
    required: true,
  },
});

export default Project;
