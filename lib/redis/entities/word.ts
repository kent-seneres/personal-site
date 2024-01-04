import { connect } from "../redis";

const WORD_OF_THE_DAY_KEY = "word-of-the-day";

export const getWord = async () => {
  const client = await connect();
  const response = await client.get(WORD_OF_THE_DAY_KEY);

  return response;
};
