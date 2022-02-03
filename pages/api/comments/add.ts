import type { NextApiRequest, NextApiResponse } from "next";
import { createComment } from "@lib/redis";
import {
  CommentType,
  NAME_CHAR_LIMIT,
  CONTENT_CHAR_LIMIT,
} from "@lib/redis/constants";

export default async function handler(
  req: NextApiRequest,
  resp: NextApiResponse
) {
  const data: CommentType = {
    ...req.body,
    name: req.body.name.substring(0, NAME_CHAR_LIMIT),
    content: req.body.content.substring(0, CONTENT_CHAR_LIMIT),
  };

  const id = await createComment(data);
  resp.status(200).json({ id });
}
