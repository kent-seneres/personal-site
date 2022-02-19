import type { NextApiRequest, NextApiResponse } from "next";
import { getWord } from "@lib/redis";

export default async function handler(
  req: NextApiRequest,
  resp: NextApiResponse
) {
  const word = await getWord();
  resp.status(200).json({ word });
}
