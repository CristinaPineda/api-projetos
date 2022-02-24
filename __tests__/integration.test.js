import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../index.mjs';
import Project from '../models/Project.js';

chai.use(chaihttp);
const { expect } = chai;

const mockData = {
  titleProject: 'titleTeste',
  descriptionProject: 'descrição de teste',
  linkApp: 'http://linkTest',
  linkRepository: 'http://repositoryTest', 
  imageProject: 'https://imageTest',
};

describe('[POST] - Teste da rota /project com post', () => {
  let response = {};
  
  before(async () => {
    Project.dropCollection('projects');
    
    response = await chai.request(app).post('/project').send(mockData);
  });

  it('Requisição "POST" é feita com sucesso', () => {
    expect(response).to.have.status(201);
  });
});
