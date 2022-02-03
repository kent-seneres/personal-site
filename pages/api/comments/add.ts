import type { NextApiRequest, NextApiResponse } from "next";
import { createComment } from "@lib/redis";

export default async function handler(
  req: NextApiRequest,
  resp: NextApiResponse
) {
  const id = await createComment(req.body);
  resp.status(200).json({ id });
}
