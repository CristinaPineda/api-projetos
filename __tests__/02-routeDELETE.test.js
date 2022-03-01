import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.mjs';
import mongoose from '../database/connection.js';
import StatusCodes from 'http-status-codes';
import { ID, MOCKDATADEL } from './helpers.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('[DELETE] - Teste da rota /project/:id com DELETE', () => {
  describe('1 - Requisição para deletar projeto do banco de dados.', () => {
    let response = {};
    
    before(async () => {
      mongoose.connect();
      const idDel = await chai.request(app).post('/portfolio/project').send(MOCKDATADEL);
      const deleted = await idDel.body._id;
      response = await chai.request(app).delete(`/portfolio/project/${deleted}`).send();
    });

    it('1.1 - Requisição "DELETE" é feita com sucesso', () => {
      expect(response).to.have.status(StatusCodes.OK);
    });

    it('1.2 - Deve retornar um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('1.3 - Deve retornar um objeto não vazio', () => {
      expect(response.body).to.be.not.empty;
    });

    it('1.4 - Deve retornar um objeto a propriedade "message" e a mensagem de confirmação de exclusão', () => {
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Projeto removido com sucesso!');
    });
  });
});

describe('[DELETE-ERROR] - Teste da rota /project/:id com DELETE', () => {
  describe('1 - Erro na requisição para deletar projeto do banco de dados.', () => {
    let response = {};

    before(async () => {
      mongoose.connect();
      response = await chai.request(app).delete(`/portfolio/project/${ID.mockIdErr}`).send();
    });

    it('1.1 - Erro na requisição "DELETE"', () => {
      expect(response).to.have.status(StatusCodes.NOT_FOUND);
    });

    it('1.2 - Deve retornar um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('1.3 - Deve retornar um objeto não vazio', () => {
      expect(response.body).to.be.not.empty;
    });

    it('1.4 - Deve retornar um objeto com a propriedade "message" com o erro da requisição', () => {
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Projeto não encontrado!');
    });
  });
});
