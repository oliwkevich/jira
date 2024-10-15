import { Loader } from "lucide-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-y-2">
      <Loader className="animate-spin text-muted-foreground" />
      <span>Майже готово...</span>
    </div>
  );
};

export default LoadingPage;
