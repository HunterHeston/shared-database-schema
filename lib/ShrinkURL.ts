import { ErrorStatus } from "../types/ErrorStatus";
import { GetClient } from "./client";
import { ShrinkURL } from "@prisma/client";

type NewShrinkURLParams = {
  slug: string;
  url: string;
};

/**
 * Creates a new row in the shrinkURL table.
 *
 * @param NewShrinkURLParams.slug  - unique slug for a given url
 * @param NewShrinkURLParams.url - non-unique url mapped to by slug
 * @returns Error or ShrinkURL
 */
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

type GetShrinkURLBySlugResult = {
  error?: Error;
  status: ErrorStatus;
  url?: string;
};

/**
 * Gets a row from the shrinkURL table by slug.
 *
 * @param slug - unique slug for a given url
 * @returns Error or string
 */
export async function getShrinkURLBySlug(
  slug: string
): Promise<GetShrinkURLBySlugResult> {
  const prisma = GetClient();

  try {
    const result = await prisma.shrinkURL.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!result) {
      return {
        error: new Error("No url found for slug."),
        status: ErrorStatus.NOT_FOUND,
      };
    }

    // increment visit counter, don't block on this
    // it's okay if this fails, it's not a critical operation
    // just log the error and continue
    prisma.shrinkURL
      .update({
        where: {
          slug: slug,
        },
        data: {
          visits: result.visits + 1,
        },
      })
      .catch((error) => {
        console.error("Error incrementing visit counter: ", error);
      });

    return {
      status: ErrorStatus.OK,
      url: result.url,
    };
  } catch (error) {
    console.error("Error getting shrinkURL by slug: ", error);
    return {
      error: new Error("Error getting shrinkURL by slug."),
      status: ErrorStatus.INTERNAL,
    };
  }
}
