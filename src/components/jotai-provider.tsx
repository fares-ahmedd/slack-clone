"use client";

import { Provider } from "jotai";

type Props = {
  children: React.ReactNode;
};

function JotaiProvider({ children }: Props) {
  return <Provider>{children}</Provider>;
}

export default JotaiProvider;
