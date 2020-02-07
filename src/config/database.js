require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // host: 'localhost',
  // username: 'postgres',
  // password: '123456',
  // database: 'aamt',
  define: {
    timestamps: true, // -> Toda tabela criada no banco contera os campos "created_at" e "updated_at"
    underscored: true, // -> formato de escrita na base por underline: UserGroup -> user_group
  }
}