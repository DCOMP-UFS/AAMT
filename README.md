# Sumário

- [Sumário](#sumário)
- [Iniciando o banco](#iniciando-o-banco)
- [Documentação da API](#documentação-da-api)
  - [Auth](#auth)
    - [Autenticação (/auth/authenticate)](#autenticação-authauthenticate)
      - [*Request*](#request)
      - [*Response*](#response)
  - [Usuário](#usuário)
    - [Consultar usuários (/usuarios)](#consultar-usuários-usuarios)
      - [*Request*](#request-1)
      - [*Response*](#response-1)
    - [Consultar por ID (/usuarios/:id)](#consultar-por-id-usuariosid)
      - [*Request*](#request-2)
      - [*Response*](#response-2)
  - [Rotas](#rotas)
    - [Check Rota Iniciada (/check/:trabalhoDiario_id/trabalhoDiario)](#check-rota-iniciada-checktrabalhodiario_idtrabalhodiario)

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

## Auth

Controladora responsável pelo login e retorno do *token* de acesso à API.

### Autenticação (/auth/authenticate)

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

### Consultar usuários (/usuarios)

Rota de consulta dos usuários, os perfis que contém permissão para esta rota são os coordenadores gerais e municipais. O coordenador geral pode visualizar todos os usuários de sua regional operacional enquanto o municipal recebe somente as listas de usuários do seu município.

#### *Request*

Requisição de Exemplo:

```
curl --request GET \
  --url __BASE_URL__/usuarios/ \
  --header 'Authorization:  Bearer __TOKEN__'
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

### Consultar por ID (/usuarios/:id)

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

### Check Rota Iniciada (/check/:trabalhoDiario_id/trabalhoDiario)

Verifica se a rota com o id "trabalhoDiario_id" está iniciada ou não.