import * as React from "react";
import { render, pretty } from "@react-email/render";
import { templates, type TemplateName, type TemplateProps } from "./templates/index.js";

export interface RenderedEmail {
  html: string;
  text: string;
}

export async function renderComponent(
  element: React.ReactElement,
): Promise<RenderedEmail> {
  const rawHtml = await render(element);
  const html = await pretty(rawHtml);
  const text = await render(element, { plainText: true });
  return { html, text };
}

export async function renderTemplate<T extends TemplateName>(
  name: T,
  props: TemplateProps[T],
): Promise<RenderedEmail> {
  const Component = templates[name] as React.ComponentType<TemplateProps[T]>;
  const element = React.createElement(Component, props);
  return renderComponent(element);
}
