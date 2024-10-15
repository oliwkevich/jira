import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { getMember } from "../members/utils";
import { createSessionClient } from "@/lib/appwrite";
import { Project } from "./types";

// export const getProjects = async () => {
//   try {
//     const { account, databases } = await createSessionClient();
//     const user = await account.get();

//     const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
//       Query.equal("userId", user.$id),
//     ]);

//     if (members.total === 0) return { documents: [], total: 0 };

//     const workspaceIds = members.documents.map((member) => member.workspaceId);

//     const workspaces = await databases.listDocuments(
//       DATABASE_ID,
//       WORKSPACES_ID,
//       [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
//     );

//     return workspaces;
//   } catch (error) {
//     console.log("getWorkspaces action error", error);
//     return { documents: [], total: 0 };
//   }
// };

export const getProject = async ({ projectId }: { projectId: string }) => {
  const { account, databases } = await createSessionClient();
  const user = await account.get();

  const project = await databases.getDocument<Project>(
    DATABASE_ID,
    PROJECTS_ID,
    projectId
  );

  const member = await getMember({
    databases,
    userId: user.$id,
    workspaceId: project.workspaceId,
  });

  if (!member) throw new Error("Not allowed");

  return project;
};

// export const getWorkspaceInfo = async ({
//   workspaceId,
// }: {
//   workspaceId: string;
// }) => {
//   try {
//     const { databases } = await createSessionClient();

//     const workspace = await databases.getDocument<Workspace>(
//       DATABASE_ID,
//       WORKSPACES_ID,
//       workspaceId
//     );

//     return { name: workspace.name };
//   } catch (error) {
//     console.log("getWorkspace action error", error);
//     return null;
//   }
// };
