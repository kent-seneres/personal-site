import useSWR from "swr";

const DEFAULT_WORD = "tortle";

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init)
    .then((res) => res.json())
    .then((data) => data.word);

const useGetWord = () => {
  const { data, error } = useSWR<string>("/api/reveal/word", fetcher, {
    fallbackData: DEFAULT_WORD,
  });

  return { data: data?.trim() ?? DEFAULT_WORD, error };
};

export default useGetWord;
