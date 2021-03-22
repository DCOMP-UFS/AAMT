# Sumário

- [Sumário](#sumário)
- [Iniciando o banco](#iniciando-o-banco)
- [Documentação da API](#documentação-da-api)
  - [Atividades](#atividades)
    - [Atividades de Responsabilidade do supervisor](#atividades-de-responsabilidade-do-supervisor)
    - [Consultar Localidades](#consultar-localidades)
  - [Auth](#auth)
    - [Autenticação](#autenticação)
      - [*Request*](#request)
      - [*Response*](#response)
  - [Usuário](#usuário)
    - [Consultar usuários](#consultar-usuários)
      - [*Request*](#request-1)
      - [*Response*](#response-1)
    - [Consultar por ID](#consultar-por-id)
      - [*Request*](#request-2)
      - [*Response*](#response-2)
  - [Rotas](#rotas)
    - [Planejar Rota de um Agente](#planejar-rota-de-um-agente)
    - [Check Rota Iniciada](#check-rota-iniciada)
      - [*Request*](#request-3)
      - [*Response*](#response-3)
    - [Iniciar Rota](#iniciar-rota)
      - [*Request*](#request-4)
      - [*Response*](#response-4)
    - [Finalizar Rota](#finalizar-rota)
      - [*Request*](#request-5)
      - [*Response*](#response-5)

# Iniciando o banco

Github exemplo da Rocketseat
https://github.com/Rocketseat/masterclass-nodejs-sql

Criando a base de dados
$ yarn sequelize db:create

Criando uma migration
$ yarn sequelize migration:create --name=create-users

Criando as tabelas
yarn sequelize db:migrate

Desfazendo a última migrate executada
yarn sequelize db:migrate:undo

Métodos do sequelize para auxiliar em relacionamentos N - N
https://sequelize.org/v5/manual/associations.html#belongs-to-many-associations

# Documentação da API

A documentação foi dividida por controladores, cara seção da documentação representa um arquivo dentro da pasta *controllers* onde são configuradas as rotas da API.

## Atividades

Controladora das rotas de consulta de atividades;

### Atividades de Responsabilidade do supervisor

(/atividades/supervisor/:user_id/responsavel/:cycle_id/ciclos)

Esta rota retorna todas as atividades em que o supervisor contém pelo menos uma equipe em sua responsabilidade.

*Request*
```
curl --request GET \
  --url __BASE_URL__/atividades/supervisor/:user_id/responsavel/:cycle_id/ciclos \
  --header 'Authorization:  Bearer __TOKEN__
```

*Response*
```
[
  {
    "id": 21,
    "objetivoAtividade": "Objetivo de uma atividade PNCD",
    "abrangencia": 1,
    "situacao": 1,
    "responsabilidade": 1,
    "flTodosImoveis": true,
    "municipio_id": 1,
    "ciclo_id": 2,
    "metodologia_id": 2,
    "objetivo_id": 2,
    "equipes": [
      {
        "id": 9,
        "atividade_id": 21,
        "membros": [
          {
            "id": 18,
            "tipoPerfil": 3,
            "equipe_id": 9,
            "usuario_id": 10,
            "usuario": {
              "id": 10,
              "nome": "Roseli La Corte",
              "cpf": "08750241818",
              "rg": "183284987",
              "email": "rlacorte@ufs.br",
              "usuario": "rlacorte",
              "senha": "$2a$10$dnku6Q9Q/VUasgWfPYil3.4napuGrRSPcq5GIwlHWvCXOXo.ytQn2",
              "ativo": 1
            }
          },
          ...
        ]
      },
      ...
    ]
  },
  ...
]
```

### Consultar Localidades

(/atividades/locais/:abrangencia_enum/abrangencia/:municipio_id/municipios)

Esta rota retorna todas as localidades de um município de acordo com a abrangencia (1 - Localidade, 2 - Zona ou 3 - Quarteirão).

*Request*

```
curl --request GET \
  --url __BASE_URL__/atividades/locais/:abrangencia_enum/abrangencia/:municipio_id/municipios \
  --header 'Authorization:  Bearer __TOKEN__
```

*Response*

```
[
  {
    "id": 2,
    "nome": 1,
    "tipo": "quarteirao"
  },
  ...
]
```

## Auth

Controladora responsável pelo login e retorno do *token* de acesso à API.

### Autenticação

(/auth/authenticate)

Rota de login, ao fazer requisição nesta rota à API irá verificar o usuário e retonar as suas informações e o *token* de acesso para futuras requisições à API.
Os *tokens* possuem prazo para expirar, atualmente o prazo é de um dia, pois a aplicação está em desenvolvimento.

#### *Request*

```
curl --request POST \
--url https://aamt-backend.herokuapp.com/auth/authenticate \
--header 'Content-Type: application/json' \
--data '{
  "usuario": "agente15",
  "senha": "123456"
}'
```

#### *Response*

```
{
  "user": {
    "id": 4,
    "nome": "Agente",
    "cpf": "000.000.000-03",
    "rg": "0.000.000-3",
    "email": "agente@aamt.com",
    "usuario": "agente",
    "ativo": 1,
    "municipio": {
      "id": 1,
      "nome": "Simão Dias",
      "codigo": 2807105,
      "regional": {
        "id": 1,
        "nome": "Secretaria de Estado da Saúde - SES",
        "estado": {
          "id": 25,
          "nome": "Sergipe",
          "regiao": {
            "id": 2,
            "nome": "Nordeste",
            "sigla": "NE",
            "pais": {
              "id": 30,
              "nome": "Brasil",
              "sigla": "BR"
            }
          }
        }
      }
    },
    "createdAt": "2020-10-15T05:17:20.781Z",
    "updatedAt": "2020-10-15T05:17:20.781Z",
    "atuacoes": [
      {
        "id": 4,
        "tipoPerfil": 4,
        "escopo": 2,
        "local_id": 1
      }
    ],
    "permissoes": [
      {
        "id": 14,
        "nome": "realizar_vistoria"
      },
      {
        "id": 13,
        "nome": "trabalho_diario"
      }
    ]
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjA2MTM3NjAwLCJleHAiOjE2MDYyMjQwMDB9.frHWuo8Wdz6D2o89TRXZTlmRt0k4JOPI7EEKURgLU2Y"
}
```

## Usuário

Controladora das requisições referentes aos usuários.

### Consultar usuários

(/usuarios)

Rota de consulta dos usuários, os perfis que contém permissão para esta rota são os coordenadores gerais e municipais. O coordenador geral pode visualizar todos os usuários de sua regional operacional enquanto o municipal recebe somente as listas de usuários do seu município.

#### *Request*

Requisição de Exemplo:

```
curl --request GET \
  --url __BASE_URL__/usuarios/ \
  --header 'Authorization:  Bearer __TOKEN__
```

Requisição real com token retornado no login:

```
curl --request GET \
  --url https://aamt-backend.herokuapp.com/usuarios/ \
  --header 'Authorization:  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA2MTQwNzQxLCJleHAiOjE2MDYyMjcxNDF9.cAJIAdJkhHhrRWODC5yeS0rPsMlqf3Bi6LF4KxYwL0Q'
```

#### *Response*

```
[
  {
    "id": 4,
    "nome": "Agente",
    "cpf": "000.000.000-03",
    "rg": "0.000.000-3",
    "email": "agente@aamt.com",
    "usuario": "agente",
    "senha": "$2a$10$eSuLYudsF4C1WIrlYXiZt.p26ctl77ALaCLnzH/DSJmY8w3nkelei",
    "ativo": 1,
    "createdAt": "2020-10-15T05:17:20.781Z",
    "updatedAt": "2020-10-15T05:17:20.781Z",
    "atuacoes": [
      {
        "id": 4,
        "tipoPerfil": 4,
        "escopo": 2,
        "local_id": 1
      }
    ]
  },
  {
    "id": 5,
    "nome": "Agente",
    "cpf": "000.000.000-04",
    "rg": "0.000.000-4",
    "email": "lab@aamt.com",
    "usuario": "lab",
    "senha": "$2a$10$u3F6C2NMMTvtFL0/SHwje.RrfO2vie9iCNJwWErOEHlbhPvbe2WTy",
    "ativo": 1,
    "createdAt": "2020-10-15T05:17:20.844Z",
    "updatedAt": "2020-10-15T05:17:20.844Z",
    "atuacoes": [
      {
        "id": 5,
        "tipoPerfil": 5,
        "escopo": 3,
        "local_id": 1
      }
    ]
  },
  {
    "id": 2,
    "nome": "Coordenador",
    "cpf": "000.000.000-01",
    "rg": "0.000.000-1",
    "email": "coord@aamt.com",
    "usuario": "coord",
    "senha": "$2a$10$bGQ17DLKCKO.ku6zte7nBeT.vxWR7OQng.xN1u9TnVpy/PwLtdeNG",
    "ativo": 1,
    "createdAt": "2020-10-15T05:17:20.654Z",
    "updatedAt": "2020-10-15T05:17:20.654Z",
    "atuacoes": [
      {
        "id": 2,
        "tipoPerfil": 2,
        "escopo": 2,
        "local_id": 1
      }
    ]
  },
  {
    "id": 1,
    "nome": "Coordenador Geral",
    "cpf": "000.000.000-00",
    "rg": "0.000.000-0",
    "email": "coordGeral@aamt.com",
    "usuario": "coordGeral",
    "senha": "$2a$10$3ulq/V84DLegYLXgzhnzJOUWFCceuQKKieSFmwn6iF2eCAxQulHFe",
    "ativo": 1,
    "createdAt": "2020-10-15T05:17:20.591Z",
    "updatedAt": "2020-10-15T05:17:20.591Z",
    "atuacoes": [
      {
        "id": 1,
        "tipoPerfil": 1,
        "escopo": 1,
        "local_id": 1
      }
    ]
  },
  {
    "id": 3,
    "nome": "Supervisor",
    "cpf": "000.000.000-02",
    "rg": "0.000.000-2",
    "email": "sup@aamt.com",
    "usuario": "sup",
    "senha": "$2a$10$3.wkj6QaNLByGpauATxXBuzG/XEZZzO5uBYrhBHG1B4OEe7LrzeIO",
    "ativo": 1,
    "createdAt": "2020-10-15T05:17:20.717Z",
    "updatedAt": "2020-10-15T05:17:20.717Z",
    "atuacoes": [
      {
        "id": 3,
        "tipoPerfil": 3,
        "escopo": 2,
        "local_id": 1
      }
    ]
  }
]
```

### Consultar por ID

(/usuarios/:id)

Consultar usuários por seu ID, esta rota é permitido para os coordenadores gerais, municipais ou caso um usuário queira ver suas próprias informações.

#### *Request*

```
curl --request GET \
  --url https://aamt-backend.herokuapp.com/usuarios/4 \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjA2MTQxMjUyLCJleHAiOjE2MDYyMjc2NTJ9.Vnx5iNWlSnhG0rSdYi4B0t1ae1q_yF3ZdeuQbG6kkgU'
```

#### *Response*

```
{
  "id": 4,
  "nome": "Agente",
  "cpf": "000.000.000-03",
  "rg": "0.000.000-3",
  "email": "agente@aamt.com",
  "usuario": "agente",
  "ativo": 1,
  "municipio": {
    "id": 1,
    "nome": "Simão Dias",
    "codigo": 2807105,
    "regional": {
      "id": 1,
      "nome": "Secretaria de Estado da Saúde - SES",
      "estado": {
        "id": 25,
        "nome": "Sergipe",
        "regiao": {
          "id": 2,
          "nome": "Nordeste",
          "sigla": "NE",
          "pais": {
            "id": 30,
            "nome": "Brasil",
            "sigla": "BR"
          }
        }
      }
    }
  },
  "createdAt": "2020-10-15T05:17:20.781Z",
  "updatedAt": "2020-10-15T05:17:20.781Z",
  "atuacoes": [
    {
      "id": 4,
      "tipoPerfil": 4,
      "escopo": 2,
      "local_id": 1
    }
  ]
}
```

## Rotas

Controladora das rotas dos usuários, um tempo associado a rota é o termo trabalho diário, usado no frontend da aplicação. Uma rota representa os quarteirões e lados que um determinado agente irá trabalhar ou trabalhou em um determinado dia. As rotas são planejadas pelos supervisores e consumidas pelos agentes.

### Planejar Rota de um Agente

Esta rota recebe um conjunto de lados e dados da equipe, supervisor e agente para planejar uma rota de trabalho individual.

*Request*

```
curl --request POST \
  --url __base_URL__/rotas/planejamento \
  --header 'Authorization: Bearer __TOKEN__' \
  --header 'Content-Type: application/json' \
  --data '{
    "equipe_id": 9,
    "supervisor_id": 3,
    "usuario_id": 10,
    "lados": [ 4, 3, 2, 1, 8, 7, 10, 9 ]
  }'
```

*Response*
```
{
  "id": 35,
  "data": "2021-03-22",
  "supervisor_id": 3,
  "usuario_id": 10,
  "equipe_id": 9,
  "updatedAt": "2021-03-22T22:05:15.360Z",
  "createdAt": "2021-03-22T22:05:15.360Z",
  "horaInicio": null,
  "horaFim": null
}
```

### Check Rota Iniciada 

(/check/:trabalhoDiario_id/trabalhoDiario)

Verifica se a rota com o id "trabalhoDiario_id" está iniciada ou não.

#### *Request*

```
curl --request GET \
  --url https://aamt-backend.herokuapp.com/rotas/check/3/trabalhoDiario \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA2MTkwNDY4LCJleHAiOjE2MDYyNzY4Njh9.zs62_kKQ0fOZVA_heBNc-izXr8a8PmxHn3TBUbtjpDk'
```

#### *Response*

```
true
```

### Iniciar Rota

(/rotas/iniciar)

Iniciar a rota planejada pelo supervisor. A resposta desta requisição é uma lista de quarteirões com os lados e imóveis planejados para o agente.

#### *Request*

```
curl --request POST \
  --url https://aamt-backend.herokuapp.com/rotas/iniciar \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjA2MTkwNzEyLCJleHAiOjE2MDYyNzcxMTJ9.8stAMVnsjcOOD_LBcTg0jiXOxWsaLXzhcPRqiCb5obk' \
  --header 'Content-Type: application/json' \
  --data '{
    "trabalhoDiario_id": 3,
    "horaInicio": "08:00"
  }'
```

#### *Response*

```
[
  {
    "id": 1,
    "numero": 1,
    "ativo": 1,
    "createdAt": "2020-11-12T12:12:25.849Z",
    "updatedAt": "2020-11-12T12:12:25.849Z",
    "localidade_id": 1,
    "zona_id": 2,
    "quarteirao_id": null,
    "lados": [
      {
        "id": 2,
        "numero": 2,
        "createdAt": "2020-11-12T12:12:25.935Z",
        "updatedAt": "2020-11-12T12:12:25.935Z",
        "rua_id": 2,
        "quarteirao_id": 1,
        "imoveis": [
          {
            "id": 3,
            "numero": 3,
            "sequencia": null,
            "responsavel": "Guilherme",
            "complemento": "Complemento 3",
            "tipoImovel": null,
            "createdAt": "2020-11-23T14:47:37.012Z",
            "updatedAt": "2020-11-23T14:47:37.012Z",
            "lado_id": 2
          },
          {
            "id": 4,
            "numero": 4,
            "sequencia": null,
            "responsavel": "João",
            "complemento": "Complemento 4",
            "tipoImovel": null,
            "createdAt": "2020-11-23T14:48:11.215Z",
            "updatedAt": "2020-11-23T14:48:11.215Z",
            "lado_id": 2
          }
        ],
        "rota": [
          {
            "id": 3,
            "data": "2020-11-24T03:00:00.000Z",
            "horaInicio": "08:00:00",
            "horaFim": null,
            "createdAt": "2020-11-24T03:23:15.421Z",
            "updatedAt": "2020-11-24T04:07:06.233Z",
            "usuario_id": 4,
            "supervisor_id": 3,
            "equipe_id": 1,
            "rotas": {
              "createdAt": "2020-11-24T03:23:15.430Z",
              "updatedAt": "2020-11-24T03:23:15.430Z",
              "lado_id": 2,
              "trabalho_diario_id": 3
            }
          }
        ],
        "rua": {
          "id": 2,
          "nome": "Rua B",
          "cep": "49000-160",
          "createdAt": "2020-11-12T12:12:25.906Z",
          "updatedAt": "2020-11-12T12:12:25.906Z",
          "localidade_id": 1
        }
      },
      ...
    ]
  },
  ...
]
```

### Finalizar Rota

(/rotas/iniciar)

Finalizar a rota de um agente, essa rota recebe uma lista de vistorias realizadas do agente e salva na base.

#### *Request*

```
curl --request POST \
  --url https://aamt-backend.herokuapp.com/rotas/iniciar \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjA2MTkwNzEyLCJleHAiOjE2MDYyNzcxMTJ9.8stAMVnsjcOOD_LBcTg0jiXOxWsaLXzhcPRqiCb5obk' \
  --header 'Content-Type: application/json' \
  --data '{
	"trabalhoDiario_id": 3,
	"horaFim": "18:00",
	"vistorias": [
		{
			"situacaoVistoria": "N",
			"horaEntrada": "08:10",
			"sequencia": 1,
			"imovel": {
				"id": 1,
				"numero": 1,
				"sequencia": null,
				"responsavel": "Maria",
				"complemento": "Complemento 1",
				"tipoImovel": 1,
				"createdAt": "2020-11-23T14:46:55.856Z",
				"updatedAt": "2020-11-23T14:46:55.856Z",
				"lado_id": 1,
				"numeroQuarteirao": 1,
				"logradouro": "Rua A"
			},
			"recipientes":[
				{
					"fl_comFoco": true,
					"fl_tratado": null,
					"fl_eliminado": null,
					"tipoRecipiente": "A1",
					"sequencia": 1,
					"tratamento": {
						"quantidade": 0,
						"tecnica": 1
					},
					"amostras":[
						{
							"idUnidade": "3.1.1.1", 
							"sequencia": 1,
							"situacao": 1
						}
					]
				}
			],
			"trabalhoDiario_id": 3
		},
		...
	]
}'
```

#### *Response*

```
{
  "status": "success",
  "mensage": "Vistorias registradas com sucesso!"
}
```