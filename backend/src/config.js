module.exports = {
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pwd: process.env.DB_PWD,
    auth: process.env.DB_AUTH_SOURCE
  }
}