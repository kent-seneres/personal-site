import React from "react";
import { useForm } from "react-hook-form";
import { CONTENT_CHAR_LIMIT, NAME_CHAR_LIMIT } from "@lib/redis/constants";
import { FormData } from "./types";
import { useComments } from "./useComments";

type CommentFormProps = {};

const CommentForm: React.FC<CommentFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const { submit, submitLoading } = useComments();

  const onSubmit = (data: FormData) => {
    reset();
    submit(data);
  };

  console.log(errors);
  return (
    <form
      className="flex flex-col self-center space-y-4 items-center max-w-xl w-full"
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
          {...register("name", { required: true, maxLength: NAME_CHAR_LIMIT })}
          className={`p-2 rounded-lg border focus:outline-none w-full ${
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
          className={`p-2 rounded-lg border focus:outline-none w-full ${
            errors.content ? "border-red-200" : ""
          }`}
        />
      </div>
      <button
        className="rounded-xl p-2 w-24 bg-sky-600 hover:bg-sky-400 space-x-2 text-slate-50 disabled:opacity-80"
        type="submit"
        disabled={submitLoading}
      >
        <span>{submitLoading ? "Sending" : "Send"}</span>
      </button>
    </form>
  );
};

export default CommentForm;
