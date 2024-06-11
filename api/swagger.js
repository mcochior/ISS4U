import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:1001'
};

const outputFile = './swagger-output.json';
const routes = ['src/router/authentication.ts', 'src/router/index.ts', 'src/router/tasks.ts', 'src/router/users.ts'];


swaggerAutogen()(outputFile, routes, doc).then(async () => {
    await import('./src/index.ts');
  });