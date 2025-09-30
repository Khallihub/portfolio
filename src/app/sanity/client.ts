import { createClient } from "@sanity/client";

export const sanityClient =  createClient({
  projectId: "4f6yywt0",
  dataset: "production",
  useCdn: true,
});