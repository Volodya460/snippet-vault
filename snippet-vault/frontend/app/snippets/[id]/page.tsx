"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  deleteSnippet,
  getSnippet,
  updateSnippet,
} from "@/services/snippet.service";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FormValues, Snippet } from "@/app/types/snippet";

export default function EditPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const { data, isLoading } = useQuery<Snippet>({
    queryKey: ["snippet", id],
    queryFn: () => getSnippet(id),
  });

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const mutation = useMutation({
    mutationFn: (data: Partial<Snippet>) => updateSnippet(id, data),
    onSuccess: () => router.push(`/snippets/${id}`),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSnippet,
    onSuccess: () => {
      router.push("/"); 
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        tags: data.tags?.join(","),
      });
    }
  }, [data, reset]);

  const onSubmit = (form: FormValues) => {
    mutation.mutate({
      ...form,
      tags: form.tags ? form.tags.split(",").map((t: string) => t.trim()) : [],
    });
  };
  const handleDelete = () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this snippet?"
    );

    if (confirmDelete) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <p>Loading...</p>;

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
        className="p-4 max-w-xl mx-auto flex flex-col gap-2"
      >
        <h1 className="text-xl font-bold">Edit Snippet</h1>

        <input
          {...register("title", { required: true })}
          className="border p-2"
        />

        <textarea
          {...register("content", { required: true })}
          className="border p-2"
        />

        <input
          {...register("tags")}
          className="border p-2"
          placeholder="tag1, tag2"
        />

        <select {...register("type")} className="border p-2">
          <option value="note">Note</option>
          <option value="link">Link</option>
          <option value="command">Command</option>
        </select>

        <button
          disabled={mutation.isPending}
          className="bg-blue-500 text-white p-2"
        >
          {mutation.isPending ? "Updating..." : "Update"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="bg-red-500 text-white p-2"
        >
          {deleteMutation.isPending ? "Deleting..." : "Delete"}
        </button>
      </form>
    </div>
  );
}
