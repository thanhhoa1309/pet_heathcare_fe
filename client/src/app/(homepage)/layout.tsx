import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/homepage.scss";
export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Header />
      </header>
      <section>{children}</section>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
