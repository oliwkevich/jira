import { $server } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useCurrent = () => {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await $server.api.auth.current.$get();
      if (!response.ok) return null;

      return (await response.json()).data;
    },
  });

  return query;
};
