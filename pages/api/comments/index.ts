import type { NextApiRequest, NextApiResponse } from "next";
import { getComments } from "@lib/redis";

export default async function handler(
  req: NextApiRequest,
  resp: NextApiResponse
) {
  const comments = await getComments();
  comments.sort((a, b) => b.createdAt - a.createdAt);

  resp.status(200).json({ comments });
}
