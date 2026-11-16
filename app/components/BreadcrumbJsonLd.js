import JsonLd from "./JsonLd";
import { createBreadcrumbSchema } from "../structured-data";

export default function BreadcrumbJsonLd({ items }) {
  return <JsonLd data={createBreadcrumbSchema(items)} />;
}
