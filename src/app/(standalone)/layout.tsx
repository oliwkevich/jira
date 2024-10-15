import { UserButton } from "@/features/auth/components/user-button";
import Image from "next/image";
import Link from "next/link";

const StandaloneLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center h-[73px]">
          <Link href="/">
            <div className="flex items-center justify-center gap-1">
              <Image src="/logo.svg" height={44} width={44} alt="logo" />
              <span className="text-xl font-extrabold uppercase">Jira</span>
            </div>
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
};

export default StandaloneLayout;
