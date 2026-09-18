import * as React from "react";
import { Button, Text } from "@react-email/components";
import { Layout } from "../components/layout.js";

export interface MagicLinkProps {
  magicLink: string;
}

export function MagicLinkEmail({ magicLink }: MagicLinkProps): React.JSX.Element {
  return (
    <Layout>
      <Text className="text-xl font-bold text-primary mb-4">Sign in to Facile</Text>
      <Text className="text-base text-text mb-6">
        Click the button below to sign in securely with your magic link.
      </Text>
      <Button
        href={magicLink}
        className="bg-primary text-white px-6 py-2 rounded font-semibold shadow transition mb-6"
      >
        Sign in
      </Button>
      <Text className="text-xs text-secondary">
        If you did not request this, you can safely ignore this email.
      </Text>
    </Layout>
  );
}
