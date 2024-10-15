import { $server } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaces = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await $server.api.workspaces.$get();

      if (!response.ok) {
        throw new Error("Error to fetch workspaces");
      }

      return (await response.json()).data;
    },
  });

  return query;
};
