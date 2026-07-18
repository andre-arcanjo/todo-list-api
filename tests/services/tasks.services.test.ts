import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as services from '../../src/services/tasks.services';

vi.mock('../../src/utils/prisma', () => ({
  prisma: {
    task: {
      findMany: vi.fn(),
      count: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}));

describe('tasks.services', () => {
  beforeEach(async () => {
    const mod = await import('../../src/utils/prisma');
    const { prisma } = mod as any;
    Object.values(prisma.task).forEach((fn: any) => fn.mockClear());
  });

  it('getTasks returns paginated data', async () => {
    const mod = await import('../../src/utils/prisma');
    const { prisma } = mod as any;
    prisma.task.findMany.mockResolvedValue([
      { id: 1, name: 'Tarefa A', isCompleted: false, createdAt: new Date().toISOString() },
    ]);
    prisma.task.count.mockResolvedValue(1);

    const result = await services.getTasks({ page: 1, limit: 10 });

    expect(result.total).toBe(1);
    expect(result.data).toHaveLength(1);
    expect(result.page).toBe(1);
  });

  it('createTask throws if task exists', async () => {
    const mod = await import('../../src/utils/prisma');
    const { prisma } = mod as any;
    prisma.task.findUnique.mockResolvedValue({ id: 1, name: 'Tarefa A' });

    await expect(services.createTask({ name: 'Tarefa A' } as any)).rejects.toThrow();
  });

  it('createTask creates task when not exists', async () => {
    const mod = await import('../../src/utils/prisma');
    const { prisma } = mod as any;
    prisma.task.findUnique.mockResolvedValue(null);
    prisma.task.create.mockResolvedValue({ id: 2, name: 'Tarefa B', isCompleted: false, createdAt: new Date().toISOString() });

    const task = await services.createTask({ name: 'Tarefa B' } as any);
    expect(task.id).toBe(2);
    expect(task.name).toBe('Tarefa B');
  });

  it('updateTask throws when not found', async () => {
    const mod = await import('../../src/utils/prisma');
    const { prisma } = mod as any;
    prisma.task.findUnique.mockResolvedValue(null);

    await expect(services.updateTask(99)).rejects.toThrow();
  });

  it('updateTask toggles isCompleted', async () => {
    const mod = await import('../../src/utils/prisma');
    const { prisma } = mod as any;
    prisma.task.findUnique.mockResolvedValue({ id: 3, isCompleted: false });
    prisma.task.update.mockResolvedValue({ id: 3, isCompleted: true });

    const updated = await services.updateTask(3);
    expect(updated.isCompleted).toBe(true);
  });

  it('deleteTask throws when not found', async () => {
    const mod = await import('../../src/utils/prisma');
    const { prisma } = mod as any;
    prisma.task.findUnique.mockResolvedValue(null);

    await expect(services.deleteTask(999)).rejects.toThrow();
  });

  it('deleteTask deletes when exists', async () => {
    const mod = await import('../../src/utils/prisma');
    const { prisma } = mod as any;
    prisma.task.findUnique.mockResolvedValue({ id: 4 });
    prisma.task.delete.mockResolvedValue({ id: 4, name: 'X' });

    const deleted = await services.deleteTask(4);
    expect(deleted.id).toBe(4);
  });

  it('deleteCompletedTasks removes completed tasks', async () => {
    const mod = await import('../../src/utils/prisma');
    const { prisma } = mod as any;
    prisma.task.deleteMany.mockResolvedValue({ count: 3 });

    const result = await services.deleteCompletedTasks();

    expect(result.count).toBe(3);
  });
});
