import { PrismaClient } from '@prisma/client';
import { createDatabaseUrl } from './database-url';

export const prisma = new PrismaClient({ datasourceUrl: createDatabaseUrl() });