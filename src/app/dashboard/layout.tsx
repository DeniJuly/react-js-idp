import Header from "@/components/ui/header";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
