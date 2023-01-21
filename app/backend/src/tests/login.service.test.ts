import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Example, "findOne")
      .resolves({
        ...<Seu mock>
      } as Example);
  });

  after(()=>{
    (Example.findOne as sinon.SinonStub).restore();
  })

  it('Testa Login em caso de sucesso.', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        email: 'hasuoidhu9i',
        password: 'hjasiudhsa'
       })

    expect(chaiHttpResponse).to.have.statusCode(200);
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});