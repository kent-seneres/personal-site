import React from "react";
import { useSWRConfig } from "swr";
import { CommentType } from "@lib/redis";
import { FormData } from "./types";

const useSubmit = () => {
  const { mutate } = useSWRConfig();

  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();

  const submit = async (event: FormData) => {
    setLoading(true);
    setSuccess(false);
    setError(undefined);

    const comment: CommentType = {
      name: event.name,
      content: event.content,
      createdAt: Date.now(),
    };

    await fetch("/api/comments/add", {
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(async (res) => {
        await res.json();
        setSuccess(true);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));

    await mutate("/api/comments");
  };

  return {
    submit,
    loading,
    success,
    error,
  };
};

export { useSubmit };
