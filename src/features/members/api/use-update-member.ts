import { $server } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof $server.api.members)[":memberId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof $server.api.members)[":memberId"]["$patch"]
>;

export const useUpdateMember = () => {
  const qClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const res = await $server.api.members[":memberId"]["$patch"]({
        param,
        json,
      });

      if (!res.ok) throw Error("Помилка при зміні ролі учасника");

      return await res.json();
    },
    onSuccess: () => {
      qClient.invalidateQueries({ queryKey: ["members"] });

      toast.success("Ви успішно змінили роль учасника!");
    },
    onError: () => toast.error("Помилка при зміні ролі учасника!"),
  });

  return mutation;
};
