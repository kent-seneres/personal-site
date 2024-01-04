import type { NextApiRequest, NextApiResponse } from "next";
import { createIndex } from "@lib/redis";

/**
 * This endpoint must be visited before search functionality can work.
 */
export default async function handler(
  req: NextApiRequest,
  resp: NextApiResponse
) {
  await createIndex();
  resp.status(200).send("ok");
}
