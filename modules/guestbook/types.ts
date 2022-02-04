import { CommentType } from "@lib/redis";

export type FormData = Pick<CommentType, "name" | "content">;
