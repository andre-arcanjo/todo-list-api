import { describe, it, expect } from 'vitest';
import { createTaskSchema, tasksFiltersSchema } from '../../src/utils/validator';

describe('validator schemas', () => {
  it('createTaskSchema accepts valid payload', () => {
    const input = { name: 'Comprar pão' };
    const parsed = createTaskSchema.parse(input);
    expect(parsed.name).toBe('Comprar pão');
    expect(parsed.isCompleted).toBe(false);
  });

  it('createTaskSchema rejects empty name', () => {
    expect(() => createTaskSchema.parse({ name: '' })).toThrow();
  });

  it('tasksFiltersSchema coerces and validates page/limit', () => {
    const input = { page: '2', limit: '5', search: 'leite' };
    const parsed = tasksFiltersSchema.parse(input as any);
    expect(parsed.page).toBe(2);
    expect(parsed.limit).toBe(5);
    expect(parsed.search).toBe('leite');
  });
});
