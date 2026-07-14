import { FastifyInstance } from 'fastify';
import { CreateTask } from '../types';
import { createTask } from '../controllers/tasks.controller';

export const tasksRoutes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: CreateTask }>(
    '/',
    {
      schema: {
        tags: ['Tasks'],
        description: 'Criar uma nova tarefa',
        body: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', description: 'Nome da tarefa' },
          },
        },
        response: {
          201: {
            description: 'Tarefa criada com sucesso',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          400: {
            description: 'Erro de validação',
            type: 'object',
            properties: {
              message: { type: 'string' },
              errors: {
                type: 'object',
                additionalProperties: true,
              },
            },
          },
          500: {
            description: 'Erro interno do servidor',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    createTask,
  );
};
