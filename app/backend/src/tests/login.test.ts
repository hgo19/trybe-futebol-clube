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
  password: 'testuser13',
}

describe('Seu teste', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Testa Login em caso de sucesso.', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        email: 'test.user@test.com',
        password: 'testuser13'
       })

    expect(chaiHttpResponse).to.have.statusCode(200);
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});