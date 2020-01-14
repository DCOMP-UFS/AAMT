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

