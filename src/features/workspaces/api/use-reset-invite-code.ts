import { $server } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof $server.api.workspaces)[":workspaceId"]["reset-invite-code"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof $server.api.workspaces)[":workspaceId"]["reset-invite-code"]["$post"]
>;

export const useResetInviteCode = () => {
  const qClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await $server.api.workspaces[":workspaceId"][
        "reset-invite-code"
      ]["$post"]({
        param,
      });

      if (!res.ok) throw Error("Помилка при ревалідації коду");

      return await res.json();
    },
    onSuccess: ({ data }) => {
      qClient.invalidateQueries({ queryKey: ["workspaces"] });
      qClient.invalidateQueries({ queryKey: ["workspace", data.$id] });

      toast.success("Реферальний код було ревалідовано!");
    },
    onError: () => toast.error("Помилка при ревалідації коду!"),
  });

  return mutation;
};
