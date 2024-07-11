import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/homepage.scss";
import { ConfigProvider } from "antd";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              colorError: "#fff",
            },
          },
        }}
      >
        <section>{children}</section>
      </ConfigProvider>
    </>
  );
}
