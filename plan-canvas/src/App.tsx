import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { createEmptyPlan } from "./sample";
import { loadStore, saveStore } from "./storage";
import { paletteDark, paletteLight, typography } from "./theme";
import type { Block, Plan, TodoItem, TodoStatus } from "./types";
import {
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Spacer,
  Stack,
  Text,
  TextArea,
  TextInput,
  TodoList,
} from "./ui";

const TODO_CYCLE: TodoStatus[] = [
  "pending",
  "in_progress",
  "completed",
  "cancelled",
];

function formatUpdated(ts: number) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(ts));
}

export default function App() {
  const [dark, setDark] = useState(true);
  const palette = dark ? paletteDark : paletteLight;
  const [store, setStore] = useState(() => loadStore());

  useEffect(() => {
    saveStore(store);
  }, [store]);

  useEffect(() => {
    document.documentElement.style.background = palette.chrome;
    document.body.style.background = palette.chrome;
    document.body.style.color = palette.foreground;
    document.body.style.margin = "0";
    document.body.style.fontFamily = typography.fontFamily;
  }, [palette]);

  const active = useMemo(
    () => store.plans.find((p) => p.id === store.activePlanId) ?? null,
    [store],
  );

  function updatePlans(updater: (plans: Plan[]) => Plan[]) {
    setStore((prev) => ({
      ...prev,
      plans: updater(prev.plans),
    }));
  }

  function patchActive(patch: (plan: Plan) => Plan) {
    if (!active) return;
    updatePlans((plans) =>
      plans.map((p) =>
        p.id === active.id ? { ...patch(p), updatedAt: Date.now() } : p,
      ),
    );
  }

  function createPlan() {
    const plan = createEmptyPlan();
    setStore((prev) => ({
      plans: [plan, ...prev.plans],
      activePlanId: plan.id,
    }));
  }

  function deletePlan(id: string) {
    setStore((prev) => {
      const plans = prev.plans.filter((p) => p.id !== id);
      const activePlanId =
        prev.activePlanId === id ? (plans[0]?.id ?? null) : prev.activePlanId;
      return { plans, activePlanId };
    });
  }

  function addBlock(type: Block["type"]) {
    const block: Block =
      type === "heading"
        ? { id: uuid(), type, level: 2, text: "New section" }
        : type === "paragraph"
          ? { id: uuid(), type, text: "Write something useful." }
          : type === "callout"
            ? {
                id: uuid(),
                type,
                tone: "info",
                text: "Call out a risk, constraint, or decision.",
              }
            : type === "todos"
              ? {
                  id: uuid(),
                  type,
                  title: "Tasks",
                  items: [
                    { id: uuid(), content: "New task", status: "pending" },
                  ],
                }
              : { id: uuid(), type: "divider" };
    patchActive((plan) => ({ ...plan, blocks: [...plan.blocks, block] }));
  }

  function updateBlock(id: string, next: Block) {
    patchActive((plan) => ({
      ...plan,
      blocks: plan.blocks.map((b) => (b.id === id ? next : b)),
    }));
  }

  function removeBlock(id: string) {
    patchActive((plan) => ({
      ...plan,
      blocks: plan.blocks.filter((b) => b.id !== id),
    }));
  }

  function cycleTodo(blockId: string, todoId: string) {
    patchActive((plan) => ({
      ...plan,
      blocks: plan.blocks.map((b) => {
        if (b.id !== blockId || b.type !== "todos") return b;
        return {
          ...b,
          items: b.items.map((t) => {
            if (t.id !== todoId) return t;
            const idx = TODO_CYCLE.indexOf(t.status);
            return { ...t, status: TODO_CYCLE[(idx + 1) % TODO_CYCLE.length] };
          }),
        };
      }),
    }));
  }

  function changeTodo(blockId: string, todoId: string, content: string) {
    patchActive((plan) => ({
      ...plan,
      blocks: plan.blocks.map((b) => {
        if (b.id !== blockId || b.type !== "todos") return b;
        return {
          ...b,
          items: b.items.map((t) => (t.id === todoId ? { ...t, content } : t)),
        };
      }),
    }));
  }

  function removeTodo(blockId: string, todoId: string) {
    patchActive((plan) => ({
      ...plan,
      blocks: plan.blocks.map((b) => {
        if (b.id !== blockId || b.type !== "todos") return b;
        return { ...b, items: b.items.filter((t) => t.id !== todoId) };
      }),
    }));
  }

  function addTodo(blockId: string) {
    const item: TodoItem = {
      id: uuid(),
      content: "New task",
      status: "pending",
    };
    patchActive((plan) => ({
      ...plan,
      blocks: plan.blocks.map((b) => {
        if (b.id !== blockId || b.type !== "todos") return b;
        return { ...b, items: [...b.items, item] };
      }),
    }));
  }

  return (
    <div
      className="plan-shell"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "280px minmax(0, 1fr)",
        background: palette.chrome,
      }}
    >
      <aside
        className="plan-sidebar"
        style={{
          background: palette.sidebar,
          borderRight: `1px solid ${palette.strokeTertiary}`,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          minHeight: "100vh",
        }}
      >
        <Stack gap={6}>
          <Text palette={palette} size="small" tone="tertiary">
            PLAN CANVAS
          </Text>
          <H2 palette={palette}>Plans</H2>
          <Text palette={palette} tone="secondary" size="small">
            A Cursor Canvas–style planning surface that runs on its own.
          </Text>
        </Stack>

        <Button palette={palette} onClick={createPlan}>
          New plan
        </Button>

        <Stack gap={6} style={{ overflow: "auto", flex: 1 }}>
          {store.plans.map((plan) => {
            const selected = plan.id === store.activePlanId;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() =>
                  setStore((prev) => ({ ...prev, activePlanId: plan.id }))
                }
                style={{
                  textAlign: "left",
                  border: `1px solid ${
                    selected ? palette.strokeFocused : palette.strokeTertiary
                  }`,
                  background: selected
                    ? palette.fillSecondary
                    : palette.fillQuaternary,
                  borderRadius: 8,
                  padding: "10px 12px",
                  cursor: "pointer",
                  color: palette.foreground,
                }}
              >
                <Stack gap={4}>
                  <Text palette={palette} weight={560}>
                    {plan.title || "Untitled plan"}
                  </Text>
                  <Text palette={palette} size="small" tone="tertiary">
                    {formatUpdated(plan.updatedAt)}
                  </Text>
                </Stack>
              </button>
            );
          })}
        </Stack>

        <Row gap={8}>
          <Button
            palette={palette}
            variant="secondary"
            onClick={() => setDark((v) => !v)}
          >
            {dark ? "Light" : "Dark"}
          </Button>
          {active ? (
            <Button
              palette={palette}
              variant="ghost"
              onClick={() => deletePlan(active.id)}
            >
              Delete
            </Button>
          ) : null}
        </Row>
      </aside>

      <main
        style={{
          background: palette.editor,
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        {!active ? (
          <Stack
            gap={12}
            style={{
              maxWidth: 720,
              margin: "0 auto",
              padding: "64px 32px",
            }}
          >
            <H1 palette={palette}>No plan selected</H1>
            <Text palette={palette} tone="secondary">
              Create a plan to start outlining goals, risks, and next steps.
            </Text>
            <Button palette={palette} onClick={createPlan} style={{ width: 140 }}>
              New plan
            </Button>
          </Stack>
        ) : (
          <Stack
            gap={20}
            style={{
              maxWidth: 820,
              margin: "0 auto",
              padding: "40px 32px 80px",
            }}
          >
            <Stack gap={10}>
              <Row gap={8} wrap>
                <Pill palette={palette} tone="info">
                  Standalone recreation
                </Pill>
                <Pill palette={palette}>Saved locally</Pill>
                <Spacer />
                <Text palette={palette} size="small" tone="tertiary">
                  Updated {formatUpdated(active.updatedAt)}
                </Text>
              </Row>
              <TextInput
                palette={palette}
                value={active.title}
                onChange={(e) => {
                  const title = e.target.value;
                  patchActive((plan) => ({
                    ...plan,
                    title,
                    blocks: plan.blocks.map((b, i) =>
                      i === 0 && b.type === "heading" && b.level === 1
                        ? { ...b, text: title }
                        : b,
                    ),
                  }));
                }}
                style={{
                  fontSize: 24,
                  lineHeight: "30px",
                  fontWeight: 590,
                  background: "transparent",
                  borderColor: "transparent",
                  paddingLeft: 0,
                }}
              />
              <Text palette={palette} tone="secondary">
                Edit blocks below. Click a todo marker to cycle status.
              </Text>
            </Stack>

            <Card palette={palette}>
              <CardHeader palette={palette}>
                <Text palette={palette} weight={560}>
                  Add block
                </Text>
                <Spacer />
                <Row gap={6} wrap>
                  <Button
                    palette={palette}
                    variant="secondary"
                    onClick={() => addBlock("heading")}
                  >
                    Heading
                  </Button>
                  <Button
                    palette={palette}
                    variant="secondary"
                    onClick={() => addBlock("paragraph")}
                  >
                    Text
                  </Button>
                  <Button
                    palette={palette}
                    variant="secondary"
                    onClick={() => addBlock("todos")}
                  >
                    Todos
                  </Button>
                  <Button
                    palette={palette}
                    variant="secondary"
                    onClick={() => addBlock("callout")}
                  >
                    Callout
                  </Button>
                  <Button
                    palette={palette}
                    variant="secondary"
                    onClick={() => addBlock("divider")}
                  >
                    Divider
                  </Button>
                </Row>
              </CardHeader>
              <CardBody>
                <Text palette={palette} size="small" tone="tertiary">
                  Composition mirrors Cursor Canvas: open sections, sparse
                  cards, no decorative chrome.
                </Text>
              </CardBody>
            </Card>

            <Stack gap={18}>
              {active.blocks.map((block) => (
                <BlockView
                  key={block.id}
                  block={block}
                  palette={palette}
                  onChange={(next) => updateBlock(block.id, next)}
                  onRemove={() => removeBlock(block.id)}
                  onCycleTodo={(todoId) => cycleTodo(block.id, todoId)}
                  onChangeTodo={(todoId, content) =>
                    changeTodo(block.id, todoId, content)
                  }
                  onRemoveTodo={(todoId) => removeTodo(block.id, todoId)}
                  onAddTodo={() => addTodo(block.id)}
                />
              ))}
            </Stack>
          </Stack>
        )}
      </main>
    </div>
  );
}

function BlockView({
  block,
  palette,
  onChange,
  onRemove,
  onCycleTodo,
  onChangeTodo,
  onRemoveTodo,
  onAddTodo,
}: {
  block: Block;
  palette: typeof paletteDark;
  onChange: (block: Block) => void;
  onRemove: () => void;
  onCycleTodo: (todoId: string) => void;
  onChangeTodo: (todoId: string, content: string) => void;
  onRemoveTodo: (todoId: string) => void;
  onAddTodo: () => void;
}) {
  if (block.type === "divider") {
    return (
      <Row gap={8} align="center">
        <Divider palette={palette} style={{ flex: 1 }} />
        <Button palette={palette} variant="ghost" onClick={onRemove}>
          Remove
        </Button>
      </Row>
    );
  }

  if (block.type === "heading") {
    const Heading = block.level === 1 ? H1 : block.level === 2 ? H2 : H3;
    return (
      <Stack gap={8}>
        <Row gap={8}>
          <Heading palette={palette} style={{ flex: 1 }}>
            <input
              value={block.text}
              onChange={(e) => onChange({ ...block, text: e.target.value })}
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                color: palette.foreground,
                font: "inherit",
                outline: "none",
              }}
            />
          </Heading>
          <select
            value={block.level}
            onChange={(e) =>
              onChange({
                ...block,
                level: Number(e.target.value) as 1 | 2 | 3,
              })
            }
            style={{
              background: palette.fillQuaternary,
              color: palette.foregroundSecondary,
              border: `1px solid ${palette.strokeSecondary}`,
              borderRadius: 6,
              padding: "4px 8px",
            }}
          >
            <option value={1}>H1</option>
            <option value={2}>H2</option>
            <option value={3}>H3</option>
          </select>
          <Button palette={palette} variant="ghost" onClick={onRemove}>
            Remove
          </Button>
        </Row>
      </Stack>
    );
  }

  if (block.type === "paragraph") {
    return (
      <Stack gap={6}>
        <TextArea
          palette={palette}
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          style={{ background: "transparent", borderColor: "transparent", paddingLeft: 0 }}
        />
        <Row>
          <Spacer />
          <Button palette={palette} variant="ghost" onClick={onRemove}>
            Remove
          </Button>
        </Row>
      </Stack>
    );
  }

  if (block.type === "callout") {
    return (
      <Stack gap={8}>
        <Row gap={8}>
          <select
            value={block.tone}
            onChange={(e) =>
              onChange({
                ...block,
                tone: e.target.value as typeof block.tone,
              })
            }
            style={{
              background: palette.fillQuaternary,
              color: palette.foregroundSecondary,
              border: `1px solid ${palette.strokeSecondary}`,
              borderRadius: 6,
              padding: "4px 8px",
            }}
          >
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="danger">Danger</option>
          </select>
          <Spacer />
          <Button palette={palette} variant="ghost" onClick={onRemove}>
            Remove
          </Button>
        </Row>
        <Callout palette={palette} tone={block.tone}>
          <textarea
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              color: "inherit",
              font: "inherit",
              resize: "vertical",
              outline: "none",
              minHeight: 48,
            }}
          />
        </Callout>
      </Stack>
    );
  }

  const done = block.items.filter((t) => t.status === "completed").length;
  return (
    <Card palette={palette}>
      <CardHeader palette={palette}>
        <input
          value={block.title ?? "Tasks"}
          onChange={(e) => onChange({ ...block, title: e.target.value })}
          style={{
            border: "none",
            background: "transparent",
            color: palette.foreground,
            fontFamily: typography.fontFamily,
            fontWeight: 560,
            fontSize: 14,
            outline: "none",
            flex: 1,
          }}
        />
        <Pill palette={palette} tone="success">
          {done} of {block.items.length} done
        </Pill>
        <Button palette={palette} variant="ghost" onClick={onRemove}>
          Remove
        </Button>
      </CardHeader>
      <CardBody>
        <Stack gap={10}>
          <TodoList
            todos={block.items}
            palette={palette}
            onCycleStatus={onCycleTodo}
            onChangeContent={onChangeTodo}
            onRemove={onRemoveTodo}
          />
          <Button
            palette={palette}
            variant="secondary"
            onClick={onAddTodo}
            style={{ alignSelf: "flex-start" }}
          >
            Add task
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
}
