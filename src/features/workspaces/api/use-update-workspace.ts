import { useMutation } from "convex/react";
import { useCallback, useMemo, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { id: Id<"workspaces">; name: string };
type ResponseType = Id<"workspaces">;

type Options = {
  onSuccess: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: VoidFunction;
  throwError?: boolean;
};

type StatusType = "success" | "error" | "settled" | "pending" | "idle";

export const useUpdateWorkspace = () => {
  const [data, setData] = useState<ResponseType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<StatusType>("idle");

  const isPending = useMemo(() => status === "pending", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const mutation = useMutation(api.workspaces.update);

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        setData(null);
        setError(null);
        setStatus("pending");
        const response = await mutation(values);
        options?.onSuccess?.(response);
        setStatus("success");
        return response;
      } catch (error) {
        setStatus("error");
        options?.onError?.(error as Error);
        setError(error as Error);
        if (options?.throwError) {
          throw error;
        }
      } finally {
        options?.onSettled?.();
        setStatus("settled");
      }
    },
    [mutation]
  );

  return {
    mutate,
    data,
    error,
    isError,
    isSettled,
    isPending,
    isSuccess,
  };
};
