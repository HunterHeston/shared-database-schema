import { GetClient } from "./client";
import { ShrinkURL } from "@prisma/client";

type NewShrinkURLParams = {
  slug: string;
  url: string;
};

export async function newShrinkURL({
  slug,
  url,
}: NewShrinkURLParams): Promise<Error | ShrinkURL> {
  const prisma = GetClient();

  try {
    const result = await prisma.shrinkURL.create({
      data: {
        url: url as string,
        slug: slug,
      },
    });

    return result;
  } catch (error) {
    console.error("Error creating new shrinkURL: ", error);
    return new Error("Error creating new shrunk url.");
  }
}
