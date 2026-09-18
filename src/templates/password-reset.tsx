import * as React from "react";
import { Button, Text } from "@react-email/components";
import { Layout } from "../components/layout.js";

export interface PasswordResetProps {
  resetLink: string;
}

export function PasswordResetEmail({ resetLink }: PasswordResetProps): React.JSX.Element {
  return (
    <Layout>
      <Text className="text-xl font-bold text-primary mb-4">Reset your password</Text>
      <Text className="text-base text-text mb-6">
        Click the button below to reset your password. If you did not request a password reset, you can ignore this email.
      </Text>
      <Button
        href={resetLink}
        className="bg-primary text-white px-6 py-2 rounded font-semibold shadow transition mb-6"
      >
        Reset Password
      </Button>
      <Text className="text-xs text-secondary">
        This link will expire in 1 hour for your security.
      </Text>
    </Layout>
  );
}
