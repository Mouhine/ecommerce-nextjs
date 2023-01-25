import { createClient } from "next-sanity";
export const client = createClient({
  projectId: "g889x0fe",
  dataset: "products",
  apiVersion: new Date().toISOString().slice(0, 10),
  useCdn: false,
});

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
