import * as React from "react";
import { Body, Container, Head, Html, Tailwind } from "@react-email/components";
import { tailwindConfig } from "../theme.js";

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-background font-sans">
          <Container className="max-w-lg mx-auto bg-white rounded shadow p-8 border-border border-8">
            {children}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
