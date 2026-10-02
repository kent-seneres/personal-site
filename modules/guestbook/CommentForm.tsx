import React from "react";
import { useForm } from "react-hook-form";
import { CONTENT_CHAR_LIMIT, NAME_CHAR_LIMIT } from "@lib/redis/constants";
import { useLocalStorage } from "@lib/hooks/useLocalStorage";
import { FormData } from "./types";
import { useSubmit } from "./useSubmit";
import ErrorMessage from "./ErrorMessage";

type CommentFormProps = {};

const CommentForm: React.FC<CommentFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const { submit, loading, success, error } = useSubmit();
  const [name, setName] = useLocalStorage("name", "");

  const onSubmit = (data: FormData) => {
    setName(data.name);
    submit(data);
  };

  React.useEffect(() => {
    if (success) {
      reset();
    }
  }, [success]);

  return (
    <div className="self-center max-w-xl w-full">
      <form
        className="flex flex-col space-y-4 items-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-start space-y-1 w-full">
          <label
            className={`font-semibold text-sm ${
              errors.name ? "text-red-400" : ""
            }`}
          >
            Name
          </label>
          <input
            type="text"
            maxLength={NAME_CHAR_LIMIT}
            defaultValue={name}
            {...register("name", {
              required: true,
              maxLength: NAME_CHAR_LIMIT,
            })}
            className={`p-2 focus:ring-2 focus:ring-sky-600 bg-white rounded-lg border focus:outline-hidden w-full ${
              errors.name ? "border-red-200" : ""
            }`}
          />
        </div>
        <div className="flex flex-col items-start space-y-1 w-full">
          <label
            className={`font-semibold text-sm ${
              errors.content ? "text-red-400" : ""
            }`}
          >
            Message
          </label>
          <textarea
            maxLength={CONTENT_CHAR_LIMIT}
            {...register("content", {
              required: true,
              maxLength: CONTENT_CHAR_LIMIT,
            })}
            className={`p-2 bg-white focus:ring-2 focus:ring-sky-600 rounded-lg border focus:outline-hidden w-full ${
              errors.content ? "border-red-200" : ""
            }`}
          />
        </div>
        <button
          className="rounded-xl p-2 w-24 bg-sky-600 hover:bg-sky-400 space-x-2 text-slate-50 disabled:opacity-80"
          type="submit"
          disabled={loading}
        >
          <span>{loading ? "Sending" : "Send"}</span>
        </button>
      </form>
      {error && (
        <ErrorMessage
          title="Failed to save message"
          subtitle="Sorry, please try again!"
        />
      )}
    </div>
  );
};

export default CommentForm;
