"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { ArrowLeft, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useGetMembers } from "../api/use-get-members";
import { Fragment } from "react";
import { MemberAvatar } from "./member-avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMember } from "../api/use-delete-member";
import { useUpdateMember } from "../api/use-update-member";
import { MemberRole } from "../types";
import { useConfirm } from "@/hooks/use-confirm";

export const MemberList = () => {
  const { ConfirmationModal, confirm } = useConfirm();
  const workspaceId = useWorkspaceId();

  const { data, isPending: isPendingGetMembers } = useGetMembers({
    workspaceId,
  });
  const { mutate: deleteMember, isPending: isPendingDeleteMember } =
    useDeleteMember();
  const { mutate: updateMember, isPending: isPendingUpdateMember } =
    useUpdateMember();

  const isPending =
    isPendingDeleteMember || isPendingGetMembers || isPendingUpdateMember;

  const handleUpdateMember = (memberId: string, role: MemberRole) => {
    updateMember({ json: { role }, param: { memberId } });
  };

  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirm();
    if (!ok) return;
    deleteMember({ param: { memberId } });
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <ConfirmationModal />
      <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
        <Button variant="secondary" size="sm" asChild>
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeft className="size-4 mr-2" />
            Назад
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">Список учасників</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        {data?.documents.map((item, index) => (
          <Fragment key={item.$id}>
            <div className="flex items-center gap-2">
              <MemberAvatar
                classname="size-10"
                fallbackClassname="text-lg"
                name={item.name}
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.email}</p>
              </div>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button className="ml-auto" variant="secondary" size="icon">
                    <MoreVertical className="size-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem
                    className="font-medium"
                    onClick={() =>
                      handleUpdateMember(item.$id, MemberRole.ADMIN)
                    }
                    disabled={isPending}
                  >
                    Зробити адміністратором
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium"
                    onClick={() =>
                      handleUpdateMember(item.$id, MemberRole.MEMBER)
                    }
                    disabled={isPending}
                  >
                    Зробити користувачем
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium text-emerald-700"
                    onClick={() => handleDeleteMember(item.$id)}
                    disabled={isPending}
                  >
                    Видалити з простору
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {index < data.documents.length - 1 && (
              <Separator className="my-2.5" />
            )}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
};
