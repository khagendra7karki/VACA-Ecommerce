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
        pl={0}
        pr={0}
        ml={0}
        mr = {0}
        
          style={{
            marginTop: "5rem",
            maxWidth: "2400px",
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
