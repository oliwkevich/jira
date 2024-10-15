"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-y-2">
      <AlertTriangle className="" />
      <p className="text-sm text-muted-foreground">Упс... Щось пішло не так!</p>
      <div className="space-x-2">
        <Button variant="secondary" asChild>
          <Link href="/">Повернутись назад</Link>
        </Button>
        <Button variant="secondary" onClick={() => location.reload()}>
          Перезавантажити
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
