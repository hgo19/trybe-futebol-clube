
# Trybe Futebol Clube

Site informativo sobre partidas e classificações de futebol.
Nessa aplicação fui responsável pela parte de backend, desenvolver uma API e também integrar as aplicações, através do docker-compose, para que funcionem consumindo um banco de dados.

## Tecnologias Utilizadas


<br />
<br />

## Rodando a aplicação

> **Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**

1. Clone o repositório:

```bash
git clone git@github.com:hgo19/trybe-futebol-clube.git
```

2.  Instale as dependências na pasta raíz da aplicação:

```bash
npm run install:apps
```

3.  Suba os containers através do seguinte comando na raiz da aplicação:

```bash
npm run compose:up
```

4.  A aplicação backend estará rodando na porta 3001, e o front-end está rodando na porta 3000. Sendo assim, utilize o endereço: http://localhost:3000 para acessar o site, e caso queira checar informações do backend utilize o endereço: http://localhost:3001.

<br />
<br />


# Backend Documentação:

  <summary><strong>Tecnologias utilizadas:</strong></summary>

Nesse projeto para construção do projeto foram usadas as seguintes tecnologias:

- Docker
- Node.js
- Express.js
- MySQL
- Typescript
- Sequelize
- JWT
- Bcrypt
- Mocha

Além disso, o código foi baseado em alguns príncipios de organização e de construção de código, como:

- Arquitetura MSC (Models, Services e Controllers)
- POO
- SOLID

<details>
  <summary><strong>Rotas e retornos esperados do backend:</strong></summary>

### Na aplicação foram usados os seguintes endpoints:
<br />

>**Alguns endpoints necessitam um TOKEN na sua requisição, o token é gerado a partir do endpoint POST /login e sempre que for necessário será informado na descrição do endpoint.**

### Login
- POST `/login` retornará um `TOKEN` com o status `200` em caso de login bem sucedido(usuário presente no banco de dados com a senha correta). Usuário já cadastrado no Banco de Dados para testes:
```json
  {
    "email": "user@user.com",
    "password": "secret_user"
  }
```

>**Outros usuários para testes estão em src/database/seeders no arquivo com a palavra 'user' no nome.**

- GET `/login/validate` retornará a role que o usuário tem no sistema. Nessa requisição é necessário que um token seja mandado através do header Authorization. Exemplo de resposta do endpoint com o status `200`:
```json
  { "role": "admin" }
```

### Teams
- GET `/teams` esse endpoint retornará todos os times cadastrados no banco de dados com suas devidas informações. Exemplo de retorno da requisição com o status `200`:
```json
[
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
  ...
]
```

- GET `/teams/:id` esse endpoint retornará apenas um time, em que ele é encontrado no banco de dados a partir do 'id' passado no params da requisição. Exemplo de retorno da requisição com o status `200`:
```json
{
  "id": 5,
  "teamName": "Cruzeiro"
}
```

### Matches
- GET `/matches` esse endpoint possui 2 casos. O primeiro é: não é passado nenhuma query para fazer a requisição, sendo assim retornará todas as partidas do sistema. O segundo é utilizando uma query ao fazer a requisição, em que a mesma deve se encaixar em uma das opções: ```matches?inProgress=true``` ou ```matches?inProgress=false```. Quando true retornará as partidas que estão em progresso, quando false retornará as partidas já terminadas. Em todos os casos, de sucesso da requisição, o retorno será com o status `200` no seguinte formato:

```json
[
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  ...
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
]
```



- POST `/matches` cadastra uma nova partida no sistema. Nessa rota é necessário que seja passado um token no header da sua requisição, e o body seguindo o padrão de atributos da seguinte maneira:
```json
{
  "homeTeamId": 16, // O valor deve ser o id do time
  "awayTeamId": 8, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}
```
Em caso de sucesso a requisição terá o status `201` com o seguinte retorno:
```json
{
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
}
```

- PATCH `/matches/:id/finish` esse endpoint é responsável por finalizar uma partida que esteja em andamento. Nele também é necessário a utilização de um token no seu header ao fazer a requisição, e que seja passada uma id válida em seu parametro. Exemplo de retorno da requisição com status `200`:
```json
{ "message": "Finished" }
```

- PATCH `/matches/:id` nesse endpoint é possível atualizar os dados de uma partida em andamento. Mais precisamente atualizar a quantidade de gols da partida. O body da requisição deve ser preenchido da seguinte maneira:
```json
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```
A requisição responderá com um status `200` e o seguinte body:
```json
{
  "message": "OLHUGOL!!"
}
```

### Leaderboard

- GET `/leaderboard/home` o endpoint retornará uma tabela com o resultado de pontuação, gols feitos, gols sorfridos, vitórias, entre outras, de um time quando for time da casa. Exemplo de retorno com status `200`:
```json
[
  {
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  },
  {
    "name": "Palmeiras",
    "totalPoints": 7,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 10,
    "goalsOwn": 5,
    "goalsBalance": 5,
    "efficiency": "77.78"
  },
  ...
  {
    "name": "Bahia",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 0,
    "goalsOwn": 4,
    "goalsBalance": -4,
    "efficiency": "0.00"
  }
]
```

- GET `/leaderboard/away` o endpoint retornará uma tabela com o resultado de pontuação, gols feitos, gols sorfridos, vitórias, entre outras, de um time quando for time visitante. Exemplo de retorno com status `200`:
```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 7,
    "goalsOwn": 0,
    "goalsBalance": 7,
    "efficiency": "100.00"
  },
  {
    "name": "Corinthians",
    "totalPoints": 6,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 6,
    "goalsOwn": 2,
    "goalsBalance": 4,
    "efficiency": "66.67"
  },
  ...
  {
    "name": "Napoli-SC",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 1,
    "goalsOwn": 10,
    "goalsBalance": -9,
    "efficiency": "0.00"
  }
]
```

- GET `/leaderboard` o endpoint retornará uma tabela com o resultado de pontuação, gols feitos, gols sorfridos, vitórias, entre outras. Diferentemente das anteriores, agora a tabela retornará a soma dos atributos presentes em cada leaderbord, para assim definir uma pontuação final de cada time. Exemplo de retorno com status `200`:
```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": "86.67"
  },
  {
    "name": "Corinthians",
    "totalPoints": 12,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 12,
    "goalsOwn": 3,
    "goalsBalance": 9,
    "efficiency": "80.00"
  },
  ...
  {
    "name": "Napoli-SC",
    "totalPoints": 2,
    "totalGames": 5,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 3,
    "goalsFavor": 3,
    "goalsOwn": 12,
    "goalsBalance": -9,
    "efficiency": "13.33"
  }
]
```

# Lidando com erros:

- Todos endpoint necessitam que os body informados em cada rota sejam passados, e quanto necessário também o token. É presente no projeto uma middleware de erro responsável por lidar e tratar todos os erros. Essa middleware de erro funciona, na maior parte do tempo, alinhada ao Httpexception também criado na aplicação e presente na pasta app/backend/src/utils. Para maiores duvidas dê uma olhada no arquivo.
</details>

Backend desenvolvido por: [Hugo Leonardo](https://www.linkedin.com/in/hugo-leop/).

