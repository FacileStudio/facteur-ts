import * as React from "react";
import { Text } from "@react-email/components";
import { Layout } from "../components/layout.js";

export interface WelcomeProps {
  name: string;
}

export function WelcomeEmail({ name }: WelcomeProps): React.JSX.Element {
  return (
    <Layout>
      <Text className="text-2xl font-bold text-primary mb-2">Welcome to Facile</Text>
      <Text className="text-base text-secondary mb-4">Hi, {name}</Text>
      <Text className="text-base text-text mb-6">
        Thank you for registering. We are excited to have you on board.
      </Text>
      <Text className="text-sm text-secondary">
        If you have any questions, just reply to this email.
      </Text>
    </Layout>
  );
}
