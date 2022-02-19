import useSWR from "swr";

const DEFAULT_WORD = "tortle";

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init)
    .then((res) => res.json())
    .then((data) => data.word);

const useGetWord = () => {
  const { data, error } = useSWR<string>("/api/reveal/word", fetcher);

  const word = error ? DEFAULT_WORD : data ? data.trim() : DEFAULT_WORD;
  const loading = !data;

  return { data: word, loading, error };
};

export default useGetWord;
