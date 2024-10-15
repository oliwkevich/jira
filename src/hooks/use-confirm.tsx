import { ResponsiveModal } from "@/components/responsive-modal";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

interface ReturnType {
  ConfirmationModal: () => JSX.Element;
  confirm: () => Promise<unknown>;
}

export const useConfirm = (
  variant: ButtonProps["variant"] = "primary"
): ReturnType => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => new Promise((resolve) => setPromise({ resolve }));

  const handleClose = () => setPromise(null);

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationModal = () => (
    <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="pt-8">
          <CardHeader>
            <CardTitle>Ви впевнені?</CardTitle>
            <CardDescription>Цю дію неможливо буде скасувати!</CardDescription>
          </CardHeader>
          <div className="pt-4 w-full flex flex-col gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="w-full lg:w-auto"
            >
              Скасувати
            </Button>
            <Button
              variant={variant}
              onClick={handleConfirm}
              className="w-full lg:w-auto"
            >
              Продовжити
            </Button>
          </div>
        </CardContent>
      </Card>
    </ResponsiveModal>
  );

  return { ConfirmationModal, confirm };
};
