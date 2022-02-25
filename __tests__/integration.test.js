import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.mjs';
import mongoose from '../database/connection.js';
import StatusCodes from 'http-status-codes';
chai.use(chaiHttp);
const { expect } = chai;

const mockId = '6191461043d905b174409e7e';

const mockData = {
  titleProject: 'titleTeste',
  descriptionProject: 'descrição de teste',
  linkApp: 'http://linkTest',
  linkRepository: 'http://repositoryTest',
  imageProject: 'https://imageTest',
};

describe('[GET] - Teste da rota /project com GET', () => {
  describe('1 - Requisição de busca à todos os projetos já inclusos no banco de dados.', () => {
    let response = {};

    before(async () => {
      mongoose.connect();
      response = await chai.request(app).get('/portfolio/project').send();
    });

    it('1.1 - Requisição "GET" é feita com sucesso', () => {
      expect(response).to.have.status(StatusCodes.OK);
    });

    it('1.2 - Deve retornar um array', () => {
      expect(response.body).to.be.a('array');
    });

    it('1.3 - Deve retornar um array de objetos', () => {
      expect(response.body[0]).to.be.a('object');
    });

    it('1.4 - Deve retornar um array de objetos não vazio', () => {
      expect(response.body[0]).to.be.not.empty;
    });

    it('1.5 - Deve retornar um objeto com todas as propriedades de um projeto', () => {
      expect(response.body[0]).to.have.property('_id');
      expect(response.body[0]).to.have.property('titleProject');
      expect(response.body[0]).to.have.property('descriptionProject');
      expect(response.body[0]).to.have.property('linkApp');
      expect(response.body[0]).to.have.property('linkRepository');
      expect(response.body[0]).to.have.property('imageProject');
    });
  });
});

describe('[GET] - Teste da rota /project/:id com GET', () => {
  describe('2 - Requisição de busca de projeto já incluso no banco de dados pelo seu ID.', () => {
    let response = {};

    before(async () => {
      mongoose.connect();
      response = await chai.request(app).get(`/portfolio/project/${mockId}`).send();
    });

    it('2.1 - Requisição "GET" é feita com sucesso', () => {
      expect(response).to.have.status(StatusCodes.OK);
    });

    it('2.2 - Deve retornar um object', () => {
      expect(response.body).to.be.a('object');
    });

    it('2.3 - Deve retornar um array de objetos não vazio', () => {
      expect(response.body).to.be.not.empty;
    });

    it('2.4 - Deve retornar um objeto com todas as propriedades de um projeto', () => {
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('titleProject');
      expect(response.body).to.have.property('descriptionProject');
      expect(response.body).to.have.property('linkApp');
      expect(response.body).to.have.property('linkRepository');
      expect(response.body).to.have.property('imageProject');
    });
  });
});

