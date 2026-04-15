import { Snippet } from "@/app/types/snippet";
import { api } from "./api";

export const getSnippets = async (
  q = "",
  tag = "",
  page = 1,
  limit = 10
): Promise<Snippet[]> => {
  const res = await api.get("/snippets", {
    params: { q, tag, page, limit },
  });

  return res.data;
};

export const getSnippet = async (id: string) => {
  const res = await api.get(`/snippets/${id}`);
  return res.data;
};

export const createSnippet = async (data: {
  title: string;
  content: string;
  tags?: string[];
  type: "link" | "note" | "command";
}) => {
  const res = await api.post("/snippets", data);
  return res.data;
};

export const updateSnippet = async (
  id: string,
  data: Partial<{
    title: string;
    content: string;
    tags: string[];
    type: "link" | "note" | "command";
  }>
) => {
  const res = await api.patch(`/snippets/${id}`, data);
  return res.data;
};

export const deleteSnippet = async (id: string) => {
  const res = await api.delete(`/snippets/${id}`);
  return res.data;
};
