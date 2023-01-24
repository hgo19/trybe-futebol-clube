import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  id: 1,
  username: 'Test User',
  role: 'admin',
  email: 'test.user@test.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

describe('Teste de integração da rota de login.', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Testa resposta do login em caso de sucesso.', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        email: 'test.user@test.com',
        password: 'secret_user'
       })

    expect(chaiHttpResponse.status).to.have.equal(200);
  });

  it('Testa resposta do login em caso de falha ao passar senha diferente do banco de dados.', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        email: 'test.user@test.com',
        password: 'adsadsad'
       })

    expect(chaiHttpResponse.status).to.have.equal(401);
  });

  it('Testa resposta do login em caso de falha ao não passar senha.', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        email: 'test.user@test.com',
        password: ''
       })

    expect(chaiHttpResponse.status).to.have.equal(400);
  });

  it('Testa resposta do login em caso de falha ao não passar email.', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        email: '',
        password: 'secret_user'
       })

    expect(chaiHttpResponse.status).to.have.equal(400);
  });
});