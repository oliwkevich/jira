import { $server } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof $server.api.workspaces)[":workspaceId"]["join"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof $server.api.workspaces)[":workspaceId"]["join"]["$post"]
>;

export const useJoinWorkspace = () => {
  const qClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const res = await $server.api.workspaces[":workspaceId"]["join"]["$post"](
        { param, json }
      );

      if (!res.ok) throw Error("Помилка при приєднанні до робочого простору");

      return await res.json();
    },
    onSuccess: ({ data }) => {
      qClient.invalidateQueries({ queryKey: ["workspaces"] });
      qClient.invalidateQueries({ queryKey: ["workspace", data.$id] });

      toast.success(
        `Ви успішно приєднались до робочого простору '${data.name}'!`
      );
    },
    onError: () => toast.error("Помилка при приєднанні до робочого простору!"),
  });

  return mutation;
};
