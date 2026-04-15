"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSnippet } from "@/services/snippet.service";
import { useRouter } from "next/navigation";

type FormValues = {
  title: string;
  content: string;
  tags?: string;
  type: "note" | "link" | "command";
};

export default function CreatePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createSnippet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
      router.push("/");
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate({
      ...data,
      tags: data.tags ? data.tags.split(",") : [],
    });
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-2 text-sm text-blue-500 hover:underline"
      >
        ← Back
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex flex-col gap-2 max-w-xl mx-auto"
      >
        <h1 className="text-xl font-bold mb-2">Create Snippet</h1>

        <input
          className="border p-2"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <textarea
          className="border p-2"
          placeholder="Content"
          {...register("content", { required: "Content is required" })}
        />
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}

        <input
          className="border p-2"
          placeholder="tag1,tag2"
          {...register("tags")}
        />

        <select className="border p-2" {...register("type")}>
          <option value="note">Note</option>
          <option value="link">Link</option>
          <option value="command">Command</option>
        </select>

        {mutation.isError && (
          <p className="text-red-500">Failed to create snippet</p>
        )}

        <button
          disabled={mutation.isPending}
          className="bg-blue-500 text-white p-2 disabled:opacity-50"
        >
          {mutation.isPending ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
