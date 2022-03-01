import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import mongoose from '../database/connection.js';
import StatusCodes from 'http-status-codes';
import { MOCKDATAPOST, ID } from './helpers.js';
import { afterEach } from 'mocha';

chai.use(chaiHttp);
const { expect } = chai;

describe('[PATCH] - Teste da rota /project com PATCH', () => {
  describe('1 - Requisição para atualizar projeto no banco de dados.', () => {
    let response = {};
    let id = '';

    before(async () => {
      mongoose.connect();
      const idPatch = await chai.request(app).post('/portfolio/project').send(MOCKDATAPOST); 
      id = await idPatch.body._id;
      response = await chai.request(app).patch(`/portfolio/project/${id}`).send({ titleProject: 'testandoPatch' });
    });

    afterEach(async () => {
      const del = id;
      await chai.request(app).delete(`/portfolio/project/${del}`).send();
    });

    it('1.1 - Requisição "PATCH" é feita com sucesso', () => {
      expect(response).to.have.status(StatusCodes.OK);
    });

    it('1.2 - Deve retornar um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('1.3 - Deve retornar um objeto não vazio', () => {
      expect(response.body).to.be.not.empty;
    });

    it('1.4 - Deve retornar um objeto com as propriedades de um projeto atualizado', () => {
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Projeto atualizado com sucesso!');
    });
  });
});

describe('[PATCH-ERROR] - Teste da rota /project/ com PATCH ', () => {
  describe('2 - Erro na requisição de atualização de projeto no banco de dados. Projeto não encontrado', () => {
    let response1 = {};

    before(async () => {
      mongoose.connect();
      response1 = await chai
        .request(app)
        .get(`/portfolio/project/${ID.mockIdErr}`)
        .send();
    });

    afterEach(async () => {
      const del = await response1.body._id;
      await chai.request(app).delete(`/portfolio/project/${del}`).send();
    });

    it('2.1 - Requisição "PATCH" retorna um erro', () => {
      expect(response1).to.have.status(StatusCodes.NOT_FOUND);
    });

    it('2.2 - Deve retornar um object', () => {
      expect(response1.body).to.be.a('object');
    });

    it('2.3 - Deve retornar um objeto não vazio', () => {
      expect(response1.body).to.be.not.empty;
    });

    it('2.4 - Deve retornar um objeto com a propriedade "message" com o erro da requisição', () => {
      expect(response1.body).to.have.property('message');
      expect(response1.body.message).to.be.equal('Projeto não encontrado');
    });
  });
});
