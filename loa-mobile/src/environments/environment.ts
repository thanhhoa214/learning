declare const process: { env: Environment };
interface Environment {
  API_URL: string;
  production: boolean;
}
export const environment: Environment = {
  production: process.env.production || false,
  API_URL: process.env.API_URL || 'https://b2b.abc.com'
};
