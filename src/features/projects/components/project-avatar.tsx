import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectAvatarProps {
  name: string;
  image?: string;
  classname?: string;
  fallbackClassname?: string;
}

export const ProjectAvatar = ({
  name,
  classname,
  image,
  fallbackClassname,
}: ProjectAvatarProps) => {
  if (image) {
    return (
      <div
        className={cn("size-5 relative rounded-md overflow-hidden", classname)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-5 rounded-md", classname)}>
      <AvatarFallback
        className={cn(
          "text-white bg-blue-600 font-semibold text-sm uppercase rounded-md",
          fallbackClassname
        )}
      >
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};
