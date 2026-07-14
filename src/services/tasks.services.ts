import { CreateTask } from '../types';
import { prisma } from '../utils/prisma';

export const createNewTask = async (data: CreateTask) => {

  const existingNewTask = await prisma.task.findUnique({
    where: { name: data.name }
  })

  if(existingNewTask) {
    throw new Error ('Essa tarefa já existe.')
  }

  const newTask = await prisma.task.create({ data });
  return newTask;
};
