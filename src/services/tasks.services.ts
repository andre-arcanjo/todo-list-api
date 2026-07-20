import { CreateTask, TasksFilters } from '../types';
import { prisma } from '../utils/prisma';

export const getTasks = async (filter: TasksFilters) => {
  const { search, page = 1, limit = 50, isCompleted } = filter;

  const where: any = {};

  if (search && search.trim()) {
    where.name = {
      contains: search,
      mode: 'insensitive',
    };
  }

  if (isCompleted !== undefined) {
    where.isCompleted = isCompleted;
  }

  const skip = (page - 1) * limit;
  const take = limit;

  try {
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where,
        skip,
        take,
      }),
      prisma.task.count({ where }),
    ]);

    return {
      data: tasks,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    throw error;
  }
};

export const createTask = async (data: CreateTask) => {
  const existingTask = await prisma.task.findUnique({
    where: { name: data.name },
  });

  if (existingTask) {
    throw new Error('Essa tarefa já existe.');
  }

  const newTask = await prisma.task.create({ data });
  return newTask;
};

export const updateTask = async (id: number) => {
  const existingTask = await prisma.task.findUnique({
    where: { id },
  });

  if (!existingTask) {
    throw new Error('Tarefa não encontrada');
  }

  const updatedTask = await prisma.task.update({
    where: { id },
    data: { isCompleted: !existingTask.isCompleted },
  });

  return updatedTask;
};

export const deleteTask = async (id: number) => {
  const existingTask = await prisma.task.findUnique({
    where: { id },
  });

  if (!existingTask) {
    throw new Error('Tarefa não encontrada');
  }

  const deleteTask = await prisma.task.delete({
    where: { id },
  });

  return deleteTask;
};

export const deleteCompletedTasks = async () => {
  const deleteCompletedTasks = await prisma.task.deleteMany({
    where: {
      isCompleted: true,
    },
  });

  return deleteCompletedTasks;
};
