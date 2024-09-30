import Header from "@/components/ui/header";

import NextTopLoader from "nextjs-toploader";
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NextTopLoader color="#000000" showSpinner={false} />
      <Header />
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
