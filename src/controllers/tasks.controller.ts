import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateTask } from '../types';
import { createTaskSchema } from '../utils/validator';
import { createNewTask } from '../services/tasks.services';

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
