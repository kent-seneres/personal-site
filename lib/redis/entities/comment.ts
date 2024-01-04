import { Schema, Repository } from "redis-om";
import { connect } from "../redis";

export type CommentType = {
  entityId?: string;
  name: string;
  content: string;
  createdAt: number;
};

const schema = new Schema("comment", {
  name: { type: "string" },
  content: { type: "string" },
  createdAt: { type: "number", sortable: true },
});

const getRepository = async () => {
  const client = await connect();
  const repository = new Repository(schema, client);

  return repository;
};

export async function createIndex() {
  const repository = await getRepository();
  console.log('create')
  await repository.createIndex();
}

export const getComments = async () => {
  const repository = await getRepository();
  const comments = await repository.search().sortDescending('createdAt').returnAll();
  
  return comments;
};

export const createComment = async (data: CommentType) => {
  const repository = await getRepository();
  const id = await repository.save(data);

  return id;
};
