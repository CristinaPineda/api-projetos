import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.mjs';
import mongoose from '../database/connection.js';
import StatusCodes from 'http-status-codes';
import { ID } from './helpers.js';

chai.use(chaiHttp);
const { expect } = chai;

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

    it('1.5 - Deve retornar um objeto com todas as propriedades de um projeto válido', () => {
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
  describe('2 - Requisição de busca por ID de projeto já incluso no banco de dados.', () => {
    let response = {};

    before(async () => {
      mongoose.connect();
      response = await chai
        .request(app)
        .get(`/portfolio/project/${ID.mockId}`)
        .send();
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

    it('2.4 - Deve retornar um objeto com todas as propriedades de um projeto válido', () => {
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('titleProject');
      expect(response.body).to.have.property('descriptionProject');
      expect(response.body).to.have.property('linkApp');
      expect(response.body).to.have.property('linkRepository');
      expect(response.body).to.have.property('imageProject');
    });
  });
});

describe('[GET-ERROR] - Teste da rota /project/:id com GET ', () => {
  describe('3 - Erro na requisição de busca por ID de projeto já incluso no banco de dados.', () => {
    let response = {};

    before(async () => {
      mongoose.connect();
      response = await chai
        .request(app)
        .get(`/portfolio/project/${ID.mockIdErr}`)
        .send();
    });

    it('3.1 - Requisição "GET" retorna um erro', () => {
      expect(response).to.have.status(StatusCodes.NOT_FOUND);
    });

    it('3.2 - Deve retornar um object', () => {
      expect(response.body).to.be.a('object');
    });

    it('3.3 - Deve retornar um objeto com a propriedade "message" com o erro da requisição', () => {
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Projeto não encontrado');
    });
  });
});
