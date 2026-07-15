import z from 'zod';

export const createTaskSchema = z.object({
  name: z.string().min(1, 'É necessário definir o nome da tarefa'),
  isCompleted: z.boolean().default(false),
});

export const tasksFiltersSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1, 'Página deve ser no mínimo 1')
    .optional(),
  limit: z.coerce
    .number()
    .int()
    .min(1, 'Limite deve ser no mínimo 1')
    .optional(),
  search: z.string().optional(),
});
