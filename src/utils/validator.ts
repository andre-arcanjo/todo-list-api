import z from "zod";

export const createTaskSchema = z.object({
    name: z.string().min(1, 'É necessário definir o nome da tarefa')
})