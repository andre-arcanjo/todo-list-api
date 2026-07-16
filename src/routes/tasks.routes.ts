import { FastifyInstance } from 'fastify';
import { CreateTask, TasksFilters } from '../types';
import {
  createTask,
  deleteTask,
  listTasks,
  updateTask,
} from '../controllers/tasks.controller';

export const tasksRoutes = async (fastify: FastifyInstance) => {
  fastify.get<{ Querystring: TasksFilters }>(
    '/',
    {
      schema: {
        tags: ['Tasks'],
        description: 'Buscar tarefas',
        querystring: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              minimum: 1,
              description: 'Página atual',
            },
            limit: {
              type: 'number',
              minimum: 1,
              description: 'Quantidade de tarefas por página',
            },
            search: {
              type: 'string',
              description: 'Texto para busca no nome da tarefa',
            },
          },
        },
        response: {
          200: {
            description: 'Lista de tarefas retornada com sucesso',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    isCompleted: { type: 'boolean' },
                    createdAt: { type: 'string', format: 'date-time' },
                  },
                },
              },
              total: { type: 'number' },
              page: { type: 'number' },
              limit: { type: 'number' },
              totalPages: { type: 'number' },
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
    listTasks,
  );

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
              name: { type: 'string' },
              isCompleted: { type: 'boolean' },
              createdAt: { type: 'string', format: 'date-time' },
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

  fastify.put<{ Params: { id: string } }>(
    '/:id',
    {
      schema: {
        tags: ['Tasks'],
        description: 'Alterar o status de conclusão de uma tarefa',
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'ID da tarefa' },
          },
        },
        response: {
          200: {
            description: 'Tarefa atualizada com sucesso',
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              isCompleted: { type: 'boolean' },
              createdAt: { type: 'string', format: 'date-time' },
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
    updateTask,
  );

  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    {
      schema: {
        tags: ['Tasks'],
        description: 'Deletar uma tarefa existente',
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'ID da tarefa' },
          },
        },
        response: {
          200: {
            description: 'Tarefa removida com sucesso',
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              isCompleted: { type: 'boolean' },
              createdAt: { type: 'string', format: 'date-time' },
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
    deleteTask,
  );
};
