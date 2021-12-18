module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    `${!process.env.TS_NODE_DEV ? 'dist' : 'src'}/infra/postgres/entities/index.{js,ts}`
  ],
  migrations: [
    `${!process.env.TS_NODE_DEV ? 'dist' : 'src'}/infra/postgres/migrations/*.ts`
  ],
  cli: {
    migrationsDir: `${!process.env.TS_NODE_DEV ? 'dist' : 'src'}/infra/postgres/migrations`
  }
}
