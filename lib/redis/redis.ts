import { Client } from "redis-om";

const client = new Client();

export const connect = async (): Promise<Client> => {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }

  return client;
};
