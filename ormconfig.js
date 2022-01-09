module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    'src/infra/postgres/entities/index.ts',
    'dist/infra/postgres/entities/index.js'
  ],
  migrations: [
    'src/infra/postgres/migrations/*.ts',
    'dist/infra/postgres/migrations/*.js'
  ],
  cli: {
    migrationsDir: [
      'src/infra/postgres/migrations',
      'dist/infra/postgres/migrations'
    ]
  }
}
