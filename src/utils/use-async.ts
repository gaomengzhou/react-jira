import { useState } from "react";

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
  const [retry, setRetry] = useState(() => () => {});
  const config = { ...defualtConfig, ...initialConfig };

  const setData = (data: D) =>
    setState({
      data,
      stat: "succes",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      data: null,
      stat: "error",
      error,
    });

  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入Promise类型数据!");
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });
    setState({
      ...state,
      stat: "loading",
    });
    return promise
      .then((res) => setData(res))
      .catch((e) => {
        setError(e);
        if (config.throwOnError) return Promise.reject(e);
        return e;
      });
  };

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
