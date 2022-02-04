import type { NextApiRequest, NextApiResponse } from "next";
import { createIndex } from "@lib/redis";

export default async function handler(
  req: NextApiRequest,
  resp: NextApiResponse
) {
  await createIndex();
  resp.status(200).send("ok");
}
