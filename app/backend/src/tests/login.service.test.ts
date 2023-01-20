import * as sinon from 'sinon';
import * as chai from 'chai';

import LoginServices from '../services/LoginServices';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa services de login', () => {
  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  it('Testa se existe uma classe LoginServices', async () => {
    const loginService = new LoginServices();

    expect(loginService).to.be.instanceOf(LoginServices);

  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
