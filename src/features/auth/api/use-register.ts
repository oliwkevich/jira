import { $server } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof $server.api.auth.register.$post>;
type RequestType = InferRequestType<typeof $server.api.auth.register.$post>;

export const useRegister = () => {
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await $server.api.auth.register.$post({ json });
      if (!res.ok) throw Error("");
      return await res.json();
    },
    onSuccess: () => router.refresh(),
    onError: () => toast.error("Упс... щось пішло не так"),
  });

  return mutation;
};
