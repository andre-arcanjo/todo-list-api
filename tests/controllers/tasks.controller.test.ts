import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as controllers from '../../src/controllers/tasks.controller';

vi.mock('../../src/services/tasks.services', () => ({
  getTasks: vi.fn(),
  createNewTask: vi.fn(),
  updateExistingTask: vi.fn(),
  deleteExistingTask: vi.fn(),
}));

const createReply = () => {
  const send = vi.fn();
  const status = vi.fn(() => ({ send }));
  return { status, send } as any;
};

describe('tasks.controller', () => {
  beforeEach(async () => {
    const svc = await import('../../src/services/tasks.services');
    Object.values(svc).forEach((fn: any) => fn.mockClear());
  });

  it('listTasks calls getTasks and replies', async () => {
    const svc = await import('../../src/services/tasks.services');
    svc.getTasks.mockResolvedValue({ data: [], total: 0, page: 1, limit: 10, totalPages: 0 });

    const req = { query: { page: 1, limit: 10 } } as any;
    const reply = createReply();

    await controllers.listTasks(req, reply);

    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.status().send).toHaveBeenCalled();
  });

  it('createTask validates body and replies 201', async () => {
    const svc = await import('../../src/services/tasks.services');
    svc.createNewTask.mockResolvedValue({ id: 5, name: 'Nova', isCompleted: false, createdAt: new Date().toISOString() });

    const req = { body: { name: 'Nova' } } as any;
    const reply = createReply();

    await controllers.createTask(req, reply);

    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.status().send).toHaveBeenCalled();
  });

  it('updateTask calls service and replies 200', async () => {
    const svc = await import('../../src/services/tasks.services');
    svc.updateExistingTask.mockResolvedValue({ id: 6, isCompleted: true });

    const req = { params: { id: 6 } } as any;
    const reply = createReply();

    await controllers.updateTask(req, reply);

    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.status().send).toHaveBeenCalledWith(expect.any(Object));
  });

  it('deleteTask calls service and replies 204', async () => {
    const svc = await import('../../src/services/tasks.services');
    svc.deleteExistingTask.mockResolvedValue({ id: 7 });

    const req = { params: { id: 7 } } as any;
    const reply = createReply();

    await controllers.deleteTask(req, reply);

    expect(reply.status).toHaveBeenCalledWith(204);
    expect(reply.status().send).toHaveBeenCalled();
  });
});
