import { $server } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof $server.api.workspaces)[":workspaceId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof $server.api.workspaces)[":workspaceId"]["$delete"]
>;

export const useDeleteWorkspace = () => {
  const qClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await $server.api.workspaces[":workspaceId"]["$delete"]({
        param,
      });

      if (!res.ok) throw Error("Помилка при видаленні робочого простіру");

      return await res.json();
    },
    onSuccess: ({ data }) => {
      qClient.invalidateQueries({ queryKey: ["workspaces"] });
      qClient.invalidateQueries({ queryKey: ["workspace", data.$id] });

      toast.success("Робочий простір успішно видалено!");
    },
    onError: () => toast.error("Помилка при видаленні робочого простіру!"),
  });

  return mutation;
};
