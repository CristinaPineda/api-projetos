import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.mjs';
import mongoose from '../database/connection.js';
// import { describe } from 'mocha';

chai.use(chaiHttp);
const { expect } = chai;

// const mockData = {
//   titleProject: 'titleTeste',
//   descriptionProject: 'descrição de teste',
//   linkApp: 'http://linkTest',
//   linkRepository: 'http://repositoryTest', 
//   imageProject: 'https://imageTest',
// };

describe('[GET] - Teste da rota /project com GET', () => {
  describe('1 - Quando as requisições são realizadas com sucesso.', () => {
    let response = {};
    
    before(async () => {
      mongoose.connect();
      response = await chai.request(app).get('/portfolio/project').send();
    });
    
    after(async () => {
      mongoose.disconnect();
    });
    
    it('1.1 - Requisição "GET" é feita com sucesso', () => {
      expect(response).to.have.status(200);
    });
    
    it('1.2 - Deve retornar um array', () => {
      expect(response.body).to.be.a('array');
    });

    it('1.3 - Deve retornar um array de objetos', () => {
      expect(response.body[0]).to.be.a('object');
    });
  });
});
