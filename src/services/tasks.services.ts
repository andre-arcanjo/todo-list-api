import { CreateTask, TasksFilters } from '../types';
import { prisma } from '../utils/prisma';

export const getTasks = async (filter: TasksFilters) => {
  const { search, page = 1, limit = 10 } = filter;

  const where: any = {};

  if (search && search.trim()) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  try {
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
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

export const createNewTask = async (data: CreateTask) => {
  const existingNewTask = await prisma.task.findUnique({
    where: { name: data.name },
  });

  if (existingNewTask) {
    throw new Error('Essa tarefa já existe.');
  }

  const newTask = await prisma.task.create({ data });
  return newTask;
};

export const updateExistingTask = async (id: number) => {
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

export const deleteExistingTask = async (id: number) => {
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
