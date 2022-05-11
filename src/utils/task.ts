import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "utils/use-optimistic-options";
import { Project } from "types/project";
import { useDebounce } from "utils";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  const debouncedName = { ...param, name: useDebounce(param?.name, 1000) };
  return useQuery<Task[]>(["tasks", debouncedName], () => {
    return client("tasks", { data: debouncedName });
  });
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
