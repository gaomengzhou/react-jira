import { useQuery } from "react-query";
import { Task } from "types/task";
import { useDebounce } from "utils";
import { useHttp } from "./http";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  const debouncedParam = { ...param, name: useDebounce(param?.name, 1000) };
  return useQuery<Task[]>(["tasks", debouncedParam], () => {
    return client("tasks", { data: debouncedParam });
  });
};
