
import 'dotenv/config';
import { defineConfig } from 'prisma/config';
import { createDatabaseUrl } from './src/db/database-url';

const databaseUrl = createDatabaseUrl();

// Hacer que DATABASE_URL esté disponible para Prisma
process.env.DATABASE_URL = databaseUrl;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: databaseUrl
  }
});
