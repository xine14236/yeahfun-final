import mysql from 'mysql2/promise.js'
const {
  DB_HOST,

  DB_USERNAME,

  DB_PASSWORD,

  DB_DATABASE,
  DB_PORT,
} = process.env
console.log({
  DB_HOST,

  DB_USERNAME,

  DB_PASSWORD,

  DB_DATABASE,
  DB_PORT,
})

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USERNAME,

  password: DB_PASSWORD,
  database: DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 8,
  queueLimit: 0,
})

export default db
