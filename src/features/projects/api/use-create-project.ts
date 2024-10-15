import { $server } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof $server.api.projects.$post, 200>;
type RequestType = InferRequestType<typeof $server.api.projects.$post>;

export const useCreateProject = () => {
  const qClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const res = await $server.api.projects.$post({ form });
      if (!res.ok) throw Error("Помилка створення проекту");
      return await res.json();
    },
    onSuccess: () => {
      qClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Проект успішно створено!");
    },
    onError: () => toast.error("Помилка створення проекту!"),
  });

  return mutation;
};
