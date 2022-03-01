import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.mjs';
import mongoose from '../database/connection.js';
import StatusCodes from 'http-status-codes';
import { MOCKDATAPOST } from './helpers.js';
import { afterEach } from 'mocha';

chai.use(chaiHttp);
const { expect } = chai;

describe('[POST] - Teste da rota /project com POST', () => {
  describe('1 - Requisição para incluir projeto no banco de dados.', () => {
    let response = {};

    before(async () => {
      mongoose.connect();
      response = await chai.request(app).post('/portfolio/project').send(MOCKDATAPOST); 
    });

    afterEach(async () => {
      const del = await response.body._id;
      await chai.request(app).delete(`/portfolio/project/${del}`).send();
    });

    it('1.1 - Requisição "POST" é feita com sucesso', () => {
      expect(response).to.have.status(StatusCodes.CREATED);
    });

    it('1.2 - Deve retornar um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('1.3 - Deve retornar um objeto não vazio', () => {
      expect(response.body).to.be.not.empty;
    });

    it('1.4 - Deve retornar um objeto com todas as propriedades de um projeto válido', () => {
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Projeto inserido no banco com sucesso!');
    });
  });
});

describe('[POST-ERROR] - Teste da rota /project/ com POST ', () => {
  describe('2 - Erro na requisição de inclusão de projeto no banco de dados. Projeto já incluso', () => {
    let response0 = {};
    
    let response1 = {};

    before(async () => {
      mongoose.connect();
      response0 = await chai
        .request(app)
        .post('/portfolio/project')
        .send(MOCKDATAPOST);
      response1 = await chai
        .request(app)
        .post('/portfolio/project')
        .send(MOCKDATAPOST);
    });

    afterEach(async () => {
      const del = await response0.body._id;
      await chai.request(app).delete(`/portfolio/project/${del}`).send();
    });

    it('2.1 - Requisição "POST" retorna um erro', () => {
      expect(response1).to.have.status(StatusCodes.CONFLICT);
    });

    it('2.2 - Deve retornar um object', () => {
      expect(response1.body).to.be.a('object');
    });

    it('2.3 - Deve retornar um objeto não vazio', () => {
      expect(response1.body).to.be.not.empty;
    });

    it('2.4 - Deve retornar um objeto com a propriedade "message" com o erro da requisição', () => {
      expect(response1.body).to.have.property('message');
      expect(response1.body.message).to.be.equal('Projeto já existe no banco de dados!');
    });
  });
});

// describe('[POST-ERROR] - Teste da rota /project/ com POST ', () => {
//   describe('3 - Erro na requisição de inclusão de projeto no banco de dados. Projeto sem título', () => {
//     let response = {};

//     const ERRMOCK = { 
//       descriptionProject: MOCKDATAPOST.descriptionProject,
//       linkApp: MOCKDATAPOST.linkApp,
//       linkRepository: MOCKDATAPOST.linkRepository,
//       imageProject: MOCKDATAPOST.imageProject,
//     };

//     before(async () => {
//       mongoose.connect();
//       response = await chai
//         .request(app)
//         .post('/portfolio/project')
//         .send(ERRMOCK);
//     });

//     it('3.1 - Requisição "POST" retorna um erro', () => {
//       expect(response).to.have.status(StatusCodes.BAD_REQUEST);
//     });

//     it('3.2 - Deve retornar um object', () => {
//       expect(response.body).to.be.a('object');
//     });

//     it('3.3 - Deve retornar um objeto não vazio', () => {
//       expect(response.body).to.be.not.empty;
//     });

//     it('3.4 - Deve retornar um objeto com a propriedade "message" com o erro da requisição', () => {
//       expect(response.body).to.have.property('message');
//       expect(response.body.message).to.be.equal('Todos os campos são obrigatórios!');
//     });
//   });
// });


