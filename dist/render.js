import * as React from "react";
import { render, pretty } from "@react-email/render";
import { templates } from "./templates/index.js";
export async function renderComponent(element) {
    const rawHtml = await render(element);
    const html = await pretty(rawHtml);
    const text = await render(element, { plainText: true });
    return { html, text };
}
export async function renderTemplate(name, props) {
    const Component = templates[name];
    const element = React.createElement(Component, props);
    return renderComponent(element);
}
