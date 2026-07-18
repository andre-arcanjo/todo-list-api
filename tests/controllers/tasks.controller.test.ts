import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as controllers from '../../src/controllers/tasks.controller';

vi.mock('../../src/services/tasks.services', () => ({
  getTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
  deleteCompletedTasks: vi.fn(),
}));

const createReply = () => {
  const send = vi.fn();
  const status = vi.fn(() => ({ send }));
  return { status, send } as any;
};

describe('tasks.controller', () => {
  beforeEach(async () => {
    const svc = await import('../../src/services/tasks.services') as any;
    Object.values(svc).forEach((fn: any) => fn.mockClear());
  });

  it('getTasksController calls getTasks and replies', async () => {
    const svc = await import('../../src/services/tasks.services') as any;
    svc.getTasks.mockResolvedValue({ data: [], total: 0, page: 1, limit: 10, totalPages: 0 });

    const req = { query: { page: 1, limit: 10 } } as any;
    const reply = createReply();

    await controllers.getTasksController(req, reply);

    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.status().send).toHaveBeenCalledWith(expect.any(Object));
  });

  it('createTaskController validates body and replies 201', async () => {
    const svc = await import('../../src/services/tasks.services') as any;
    svc.createTask.mockResolvedValue({ id: 5, name: 'Nova', isCompleted: false, createdAt: new Date().toISOString() });

    const req = { body: { name: 'Nova' } } as any;
    const reply = createReply();

    await controllers.createTaskController(req, reply);

    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.status().send).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String), task: expect.any(Object) }));
  });

  it('updateTaskController calls service and replies 200', async () => {
    const svc = await import('../../src/services/tasks.services') as any;
    svc.updateTask.mockResolvedValue({ id: 6, isCompleted: true });

    const req = { params: { id: 6 } } as any;
    const reply = createReply();

    await controllers.updateTaskController(req, reply);

    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.status().send).toHaveBeenCalledWith(expect.any(Object));
  });

  it('deleteTaskController calls service and replies 204', async () => {
    const svc = await import('../../src/services/tasks.services') as any;
    svc.deleteTask.mockResolvedValue({ id: 7 });

    const req = { params: { id: 7 } } as any;
    const reply = createReply();

    await controllers.deleteTaskController(req, reply);

    expect(reply.status).toHaveBeenCalledWith(204);
    expect(reply.status().send).toHaveBeenCalled();
  });

  it('deleteCompletedTasksController deletes completed tasks and replies 204', async () => {
    const svc = await import('../../src/services/tasks.services') as any;
    svc.deleteCompletedTasks.mockResolvedValue({ count: 2 });

    const req = {} as any;
    const reply = createReply();

    await controllers.deleteCompletedTasksController(req, reply);

    expect(reply.status).toHaveBeenCalledWith(204);
    expect(reply.status().send).toHaveBeenCalledWith();
  });
});
