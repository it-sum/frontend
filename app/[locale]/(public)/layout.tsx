import Responsive from "@/src/components/layouts/navigation/responsive";
import Footer from "@/src/components/layouts/sections/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Responsive />

      <main>{children}</main>

      <Footer />
    </>
  );
}
