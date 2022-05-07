import { useCallback, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "succes";
}
const defualtInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};
const defualtConfig = {
  throwOnError: false,
};
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defualtConfig
) => {
  const [state, setState] = useState<State<D>>({
    ...defualtInitialState,
    ...initialState,
  });
  const mountedRef = useMountedRef();
  const [retry, setRetry] = useState(() => () => {});
  const config = { ...defualtConfig, ...initialConfig };

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: "succes",
        error: null,
      }),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        data: null,
        stat: "error",
        error,
      }),
    []
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入Promise类型数据!");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      setState((state) => ({
        ...state,
        stat: "loading",
      }));
      return promise
        .then((res) => {
          if (mountedRef.current) {
            setData(res);
            return res;
          }
        })
        .catch((e) => {
          setError(e);
          if (config.throwOnError) return Promise.reject(e);
          return e;
        });
    },
    [config.throwOnError, mountedRef, setData, setError]
  );

  return {
    isloading: state.stat === "loading",
    isIdle: state.stat === "idle",
    isError: state.stat === "error",
    isSucces: state.stat === "succes",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
