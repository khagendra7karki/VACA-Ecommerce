import React, { PropsWithChildren } from "react";
import { Container } from "@mantine/core";
import { Header } from "../Header";
import { Footer } from "../Footer";

interface LayoutProps {
  children: any;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ children }) => {

  return (
    <div>
      <Header />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "90vh",
        }}
      >
        <Container
          style={{
            marginTop: "5rem",
            maxWidth: "1620px",
            width: "100%",
          }}
        >
          {children}
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
