module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '123456',
  database: 'aamt',
  define: {
    timestamps: true, // -> Toda tabela criada no banco contera os campos "created_at" e "updated_at"
    underscored: true, // -> formato de escrita na base por underline: UserGroup -> user_group
  }
}