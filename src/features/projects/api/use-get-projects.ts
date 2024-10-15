import { $server } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetProjects = ({ workspaceId }: { workspaceId: string }) => {
  const query = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const response = await $server.api.projects.$get({
        query: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Error to fetch projects");
      }

      return (await response.json()).data;
    },
  });

  return query;
};
