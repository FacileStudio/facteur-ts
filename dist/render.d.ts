import * as React from "react";
import { type TemplateName, type TemplateProps } from "./templates/index.js";
export interface RenderedEmail {
    html: string;
    text: string;
}
export declare function renderComponent(element: React.ReactElement): Promise<RenderedEmail>;
export declare function renderTemplate<T extends TemplateName>(name: T, props: TemplateProps[T]): Promise<RenderedEmail>;
