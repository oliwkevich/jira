import { $server } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof $server.api.workspaces.$post>;
type RequestType = InferRequestType<typeof $server.api.workspaces.$post>;

export const useCreateWorkspace = () => {
  const qClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const res = await $server.api.workspaces.$post({ form });
      if (!res.ok) throw Error("Помилка створення робочого простіру");
      return await res.json();
    },
    onSuccess: () => {
      qClient.invalidateQueries({ queryKey: ["workspaces"] });
      toast.success("Робочий простір успішно створено!");
    },
    onError: () => toast.error("Помилка створення робочого простіру!"),
  });

  return mutation;
};
