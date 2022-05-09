import { useUrlQueryParam } from "utils/url";
import { useMemo } from "react";

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectModal] = useUrlQueryParam([
    "projectCreate",
  ]);
  const open = () => setProjectModal({ projectCreate: true });
  const close = () => setProjectModal({ projectCreate: undefined });
  return { projectMoadlOpen: projectCreate === "true", open, close } as const;
};
