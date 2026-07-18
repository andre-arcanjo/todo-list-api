import Fastify from 'fastify';
import 'dotenv/config';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import swagger from '@fastify/swagger';
import scalar from '@scalar/fastify-api-reference';
import { tasksRoutes } from './routes/tasks.routes';
import { errorHandler } from './middlewares/error.middleware';

const PORT = parseInt(process.env.PORT ?? '3000');

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

fastify.register(helmet, {
  contentSecurityPolicy: false,
});

fastify.register(swagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'TO DO List API',
      description: 'API para o projeto TO DO List',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
});

fastify.register(scalar, {
  routePrefix: '/api-docs',
  configuration: {
    theme: 'default',
  },
});

fastify.register(tasksRoutes, { prefix: '/tasks' });

fastify.get('/', async (request, reply) => {
  return {
    message: 'TO DO List API',
    version: '1.0.0',
    status: 'running',
  };
});

fastify.get('/health', async (request, reply) => {
  return {
    status: 'ok',
    timeStamp: new Date().toISOString(),
  };
});

fastify.setErrorHandler(errorHandler);

fastify.listen({ port: PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Servidor em execução em ${address}`);
});

export default fastify;
