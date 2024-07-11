import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/homepage.scss";
import { ConfigProvider } from "antd";
export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "#ed6436",
              // defaultHoverBg: "#ed6436",
              primaryShadow: "#ed6436",
              defaultHoverBg: "#ed6436",
              defaultActiveColor: "#ed6436",
              // defaultHoverBorderColor: "#ed6436",
            },
          },
        }}
      >
        <section>{children}</section>
      </ConfigProvider>
    </>
  );
}
