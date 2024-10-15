import { $server } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof $server.api.auth.logout.$post>;

export const useLogout = () => {
  const router = useRouter();
  const qClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const res = await $server.api.auth.logout.$post();
      return await res.json();
    },
    onSuccess: () => {
      qClient.invalidateQueries({ queryKey: ["workspaces"] });
      router.refresh();
    },
  });

  return mutation;
};
