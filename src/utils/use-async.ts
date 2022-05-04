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
export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defualtInitialState,
    ...initialState,
  });

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

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入Promise类型数据!");
    }
    setState({
      ...state,
      stat: "loading",
    });
    return promise.then(setData).catch(setError);
  };
  return {
    isloading: state.stat === "loading",
    isIdle: state.stat === "idle",
    isError: state.stat === "error",
    isSucces: state.stat === "succes",
    run,
    setData,
    setError,
    ...state,
  };
};
