import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
]

const teamMock = {
  "id": 1,
  "teamName": "Avaí/Kindermann"
}

describe('Teste de integração da rota de teams.', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(teamsMock as Team[]);

    sinon
      .stub(Team, "findOne")
      .resolves(teamMock as Team);
  });

  afterEach(()=>{
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findOne as sinon.SinonStub).restore();
  })

  it('Testa resposta da rota GET /teams em caso de sucesso.', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams')

    expect(chaiHttpResponse.status).to.have.equal(200);
  });

  it('Testa resposta da rota GET /teams/:id em caso de sucesso.', async () => {


    chaiHttpResponse = await chai
       .request(app).get('/teams/1')

    expect(chaiHttpResponse.status).to.have.equal(200);
  });
});