import Fastify from 'fastify';
import 'dotenv/config';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { timeStamp } from 'node:console';

const PORT = parseInt(process.env.PORT ?? '3000');

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: true,
  credentials: true,
});

fastify.register(helmet, {
  contentSecurityPolicy: false,
});

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

fastify.listen({ port: PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});

export default fastify;
