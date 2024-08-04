import { auth } from "@/auth";
import { work } from "@/font";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (session?.user.role !== "ADMIN") {
    redirect("/");
    return null;
  }

  return (
    <section className={cn(work.className)}>
      {children}
    </section>
  );
}
