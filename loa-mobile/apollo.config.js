module.exports = {
  client: {
    service: {
      name: 'LOA',
      url: 'https://notavailable/api/graphql/'
    },
    skipSSLValidation: true,
    excludes: ['node_modules/**/*', 'dist/**/*', '**/*.g.ts'],
    includes: ['src/**/*.{ts,gql,tsx,graphql}']
  }
};
