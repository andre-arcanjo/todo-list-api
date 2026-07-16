export interface CreateTask {
  name: string;
  isCompleted?: boolean;
}

export interface TasksFilters {
  page?: number;
  limit?: number;
  search?: string;
}
