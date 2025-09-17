export const EnvConfiguration = () => ({
  ENVIRONMENT: process.env.NODE_ENV ?? 'production',
  SERVER_PORT: process.env.PORT ?? 3000,
});
