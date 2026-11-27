import 'dotenv/config';

export const createDatabaseUrl = (): string => {
  const required = ['PGHOST', 'PGPORT', 'PGDATABASE', 'PGUSER', 'PGPASSWORD'];
  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Faltan variables en .env: ${missing.join(', ')}`);
  }

  const encode = (key: string): string => encodeURIComponent(process.env[key] ?? '');
  const schema = encodeURIComponent(process.env.PGSCHEMA || 'public');

  return `postgresql://${encode('PGUSER')}:${encode('PGPASSWORD')}@${process.env.PGHOST}:${process.env.PGPORT}/${encode('PGDATABASE')}?schema=${schema}`;
};