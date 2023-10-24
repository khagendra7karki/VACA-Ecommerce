import React, { PropsWithChildren } from 'react'

import { Container } from '@mantine/core';
import { HeaderSearch } from '../components/Header';
import { Footer } from '../components/Footer';


interface LayoutProps {
    children: any;
  }
  
const Layout : React.FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
  return (
    <div>
        <HeaderSearch/>
        <div
            style={{
              display: "flex",
              justifyContent: "center",
              minHeight: "90vh",
            }}
          >
            <Container
              style={{
                marginTop: "7rem",
                maxWidth: "1620px",
                width: "100%",
              }}
            >
              {children}
            </Container>
          </div>
          <Footer/>
    </div>
  )
}

export default Layout