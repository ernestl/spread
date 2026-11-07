export type TodoStatus = "pending" | "in_progress" | "completed" | "cancelled";

export type TodoItem = {
  id: string;
  content: string;
  status: TodoStatus;
};

export type Block =
  | { id: string; type: "heading"; level: 1 | 2 | 3; text: string }
  | { id: string; type: "paragraph"; text: string }
  | { id: string; type: "callout"; tone: "info" | "success" | "warning" | "danger"; text: string }
  | { id: string; type: "todos"; title?: string; items: TodoItem[] }
  | { id: string; type: "divider" };

export type Plan = {
  id: string;
  title: string;
  updatedAt: number;
  blocks: Block[];
};

export type Store = {
  plans: Plan[];
  activePlanId: string | null;
};
