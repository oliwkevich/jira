import { $server } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof $server.api.workspaces)[":workspaceId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof $server.api.workspaces)[":workspaceId"]["$patch"]
>;

export const useUpdateWorkspace = () => {
  const qClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const res = await $server.api.workspaces[":workspaceId"]["$patch"]({
        form,
        param,
      });

      if (!res.ok) throw Error("Помилка редагуванні робочого простіру");

      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Робочий простір успішно змінено!");
      qClient.invalidateQueries({ queryKey: ["workspaces"] });
      qClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
    },
    onError: () => toast.error("Помилка редагуванні робочого простіру!"),
  });

  return mutation;
};
