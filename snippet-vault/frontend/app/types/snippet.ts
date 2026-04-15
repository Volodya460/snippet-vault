export type Snippet = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: "link" | "note" | "command";
  createdAt: string;
  updatedAt: string;
};

export type FormValues = {
  title: string;
  content: string;
  tags?: string;
  type: "link" | "note" | "command";
};
