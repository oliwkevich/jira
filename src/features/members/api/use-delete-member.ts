import { $server } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof $server.api.members)[":memberId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof $server.api.members)[":memberId"]["$delete"]
>;

export const useDeleteMember = () => {
  const qClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await $server.api.members[":memberId"]["$delete"]({
        param,
      });

      if (!res.ok) throw Error("Помилка при видаленні учасника");

      return await res.json();
    },
    onSuccess: () => {
      qClient.invalidateQueries({ queryKey: ["members"] });

      toast.success("Учасник успішно видалений!");
    },
    onError: () => toast.error("Помилка при видаленні учасника!"),
  });

  return mutation;
};
