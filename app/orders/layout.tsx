
import { work } from "@/font";
import { cn } from "@/lib/utils";


export default async function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <section className={cn(work.className)}>
      {children}
    </section>
  );
}
