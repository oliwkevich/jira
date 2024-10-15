"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
  initialValues: { name: string };
}

export const JoinWorkspaceForm = ({
  initialValues,
}: JoinWorkspaceFormProps) => {
  const router = useRouter();
  const inviteCode = useInviteCode();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useJoinWorkspace();

  const onSubmit = () =>
    mutate(
      { param: { workspaceId }, json: { code: inviteCode } },
      { onSuccess: ({ data }) => router.push(`/workspaces/${data.$id}`) }
    );

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">
          Запрошення до робочого середовища
        </CardTitle>
        <CardDescription>
          Після підтвердження, Ви будете додані до робочого середовища{" "}
          <strong>{initialValues.name}</strong>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col gap-y-2 lg:flex-row items-center justify-between">
          <Button
            className="w-full lg:w-fit"
            variant="secondary"
            type="button"
            size="lg"
            disabled={isPending}
            asChild
          >
            <Link href="/">Відмінити</Link>
          </Button>
          <Button
            className="w-full lg:w-fit"
            disabled={isPending}
            onClick={onSubmit}
            size="lg"
          >
            Приєднатись
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
