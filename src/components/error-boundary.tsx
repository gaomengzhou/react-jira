import React, { ReactElement } from "react";
type FallbackRender = (props: { error: Error | null }) => ReactElement;
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ FallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  static getDerivedStateFromError(error: Error) {
    return error;
  }
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
    };
  }
  render() {
    const { error } = this.state;
    const { FallbackRender, children } = this.props;
    if (error) {
      return FallbackRender({ error });
    }
    return children;
  }
}
