import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateTask, TasksFilters } from '../types';
import { createTaskSchema, tasksFiltersSchema } from '../utils/validator';
import {
  createTask,
  deleteCompletedTasks,
  deleteTask,
  getTasks,
  updateTask,
} from '../services/tasks.services';

export const getTasksController = async (
  request: FastifyRequest<{ Querystring: TasksFilters }>,
  reply: FastifyReply,
) => {
  const filters = tasksFiltersSchema.parse(request.query);
  const result = await getTasks(filters as TasksFilters);
  reply.status(200).send(result);
};

export const createTaskController = async (
  request: FastifyRequest<{ Body: CreateTask }>,
  reply: FastifyReply,
) => {
  const data = createTaskSchema.parse(request.body as CreateTask);
  const task = await createTask(data);

  reply.status(201).send({
    message: 'Tarefa criada com sucesso!',
    task: task,
  });
};

export const updateTaskController = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;

  const task = await updateTask(Number(id));
  reply.status(200).send(task);
};

export const deleteTaskController = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;

  await deleteTask(Number(id));

  reply.status(204).send();
};

export const deleteCompletedTasksController = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  await deleteCompletedTasks();

  return reply.status(204).send();
};
