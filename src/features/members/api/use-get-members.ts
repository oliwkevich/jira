import { $server } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetMembers = ({ workspaceId }: { workspaceId: string }) => {
  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const response = await $server.api.members.$get({
        query: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Error to fetch members");
      }

      return (await response.json()).data;
    },
  });

  return query;
};
