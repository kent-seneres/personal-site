import { Entity, Schema, Repository } from "redis-om";
import { connect } from "../redis";

export type CommentType = {
  entityId?: string;
  name: string;
  content: string;
  createdAt: number;
};

// TODO: figure out how to clean up type definitions
interface Comment {
  name: string;
  content: string;
  createdAt: number;
}
class Comment extends Entity {}
const schema = new Schema(Comment, {
  name: { type: "string" },
  content: { type: "string" },
  createdAt: { type: "number" },
});

const getRepository = async () => {
  const client = await connect();
  const repository = new Repository(schema, client);

  return repository;
};

export async function createIndex() {
  const repository = await getRepository();
  await repository.createIndex();
}

export const getComments = async () => {
  const repository = await getRepository();
  const comments = await repository.search().returnAll();

  return comments;
};

export const createComment = async (data: CommentType) => {
  const repository = await getRepository();

  const comment = repository.createEntity(data);
  const id = await repository.save(comment);

  return id;
};
