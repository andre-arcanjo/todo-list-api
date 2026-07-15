import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateTask, TasksFilters } from '../types';
import { createTaskSchema, tasksFiltersSchema } from '../utils/validator';
import { createNewTask, getTasks } from '../services/tasks.services';

export const listTasks = async (
  request: FastifyRequest<{ Querystring: TasksFilters }>,
  reply: FastifyReply,
) => {
  const filters = tasksFiltersSchema.parse(request.query);
  const result = await getTasks(filters as TasksFilters);
  reply.status(200).send(result);
};

export const createTask = async (
  request: FastifyRequest<{ Body: CreateTask }>,
  reply: FastifyReply,
) => {
  const data = createTaskSchema.parse(request.body as CreateTask);
  const task = await createNewTask(data);

  reply.status(201).send({
    message: 'Tarefa criada com sucesso!',
    task: task,
  });
};
