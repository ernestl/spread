import {
  type CSSProperties,
  type ReactNode,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { typography, type CanvasPalette } from "./theme";
import type { TodoItem, TodoStatus } from "./types";

export function mergeStyle(
  base: CSSProperties,
  override?: CSSProperties,
): CSSProperties {
  return { ...base, ...override };
}

export function Stack({
  children,
  gap = 12,
  style,
}: {
  children?: ReactNode;
  gap?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={mergeStyle(
        { display: "flex", flexDirection: "column", gap },
        style,
      )}
    >
      {children}
    </div>
  );
}

export function Row({
  children,
  gap = 8,
  align = "center",
  justify = "start",
  wrap = false,
  style,
}: {
  children?: ReactNode;
  gap?: number;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "space-between";
  wrap?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={mergeStyle(
        {
          display: "flex",
          flexDirection: "row",
          gap,
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap ? "wrap" : "nowrap",
        },
        style,
      )}
    >
      {children}
    </div>
  );
}

export function Spacer() {
  return <div style={{ flex: 1 }} />;
}

export function Divider({
  palette,
  style,
}: {
  palette: CanvasPalette;
  style?: CSSProperties;
}) {
  return (
    <div
      style={mergeStyle(
        {
          height: 1,
          background: palette.strokeTertiary,
          width: "100%",
        },
        style,
      )}
    />
  );
}

export function H1({
  children,
  palette,
  style,
}: {
  children?: ReactNode;
  palette: CanvasPalette;
  style?: CSSProperties;
}) {
  return (
    <h1
      style={mergeStyle(
        {
          margin: 0,
          color: palette.foreground,
          fontFamily: typography.fontFamily,
          ...typography.h1,
        },
        style,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  palette,
  style,
}: {
  children?: ReactNode;
  palette: CanvasPalette;
  style?: CSSProperties;
}) {
  return (
    <h2
      style={mergeStyle(
        {
          margin: 0,
          color: palette.foreground,
          fontFamily: typography.fontFamily,
          ...typography.h2,
        },
        style,
      )}
    >
      {children}
    </h2>
  );
}

export function H3({
  children,
  palette,
  style,
}: {
  children?: ReactNode;
  palette: CanvasPalette;
  style?: CSSProperties;
}) {
  return (
    <h3
      style={mergeStyle(
        {
          margin: 0,
          color: palette.foreground,
          fontFamily: typography.fontFamily,
          ...typography.h3,
        },
        style,
      )}
    >
      {children}
    </h3>
  );
}

export function Text({
  children,
  palette,
  tone = "primary",
  size = "body",
  weight,
  style,
}: {
  children?: ReactNode;
  palette: CanvasPalette;
  tone?: "primary" | "secondary" | "tertiary" | "quaternary";
  size?: "body" | "small";
  weight?: number;
  style?: CSSProperties;
}) {
  const color =
    tone === "secondary"
      ? palette.foregroundSecondary
      : tone === "tertiary"
        ? palette.foregroundTertiary
        : tone === "quaternary"
          ? palette.foregroundQuaternary
          : palette.foreground;
  return (
    <span
      style={mergeStyle(
        {
          color,
          fontFamily: typography.fontFamily,
          ...(size === "small" ? typography.small : typography.body),
          fontWeight: weight,
        },
        style,
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  palette,
  style,
}: {
  children?: ReactNode;
  palette: CanvasPalette;
  style?: CSSProperties;
}) {
  return (
    <div
      style={mergeStyle(
        {
          background: palette.elevated,
          border: `1px solid ${palette.strokeTertiary}`,
          borderRadius: 8,
          overflow: "hidden",
        },
        style,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  palette,
  style,
}: {
  children?: ReactNode;
  palette: CanvasPalette;
  style?: CSSProperties;
}) {
  return (
    <div
      style={mergeStyle(
        {
          padding: "12px 14px",
          borderBottom: `1px solid ${palette.strokeTertiary}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        },
        style,
      )}
    >
      {children}
    </div>
  );
}

export function CardBody({
  children,
  style,
}: {
  children?: ReactNode;
  style?: CSSProperties;
}) {
  return <div style={mergeStyle({ padding: 14 }, style)}>{children}</div>;
}

export function Button({
  children,
  palette,
  variant = "primary",
  style,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  palette: CanvasPalette;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const base: CSSProperties = {
    fontFamily: typography.fontFamily,
    ...typography.small,
    fontWeight: 560,
    borderRadius: 6,
    border: "1px solid transparent",
    padding: "7px 12px",
    cursor: rest.disabled ? "not-allowed" : "pointer",
    opacity: rest.disabled ? 0.5 : 1,
  };
  const variants: Record<string, CSSProperties> = {
    primary: {
      background: palette.buttonBackground,
      color: palette.buttonForeground,
    },
    secondary: {
      background: palette.fillTertiary,
      color: palette.foreground,
      borderColor: palette.strokeSecondary,
    },
    ghost: {
      background: "transparent",
      color: palette.foregroundSecondary,
    },
  };
  return (
    <button style={mergeStyle({ ...base, ...variants[variant] }, style)} {...rest}>
      {children}
    </button>
  );
}

export function Pill({
  children,
  palette,
  tone = "neutral",
  style,
}: {
  children?: ReactNode;
  palette: CanvasPalette;
  tone?: "neutral" | "info" | "success" | "warning" | "danger";
  style?: CSSProperties;
}) {
  const colors: Record<string, string> = {
    neutral: palette.foregroundTertiary,
    info: palette.info,
    success: palette.success,
    warning: palette.warning,
    danger: palette.danger,
  };
  return (
    <span
      style={mergeStyle(
        {
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          borderRadius: 999,
          border: `1px solid ${palette.strokeSecondary}`,
          background: palette.fillQuaternary,
          color: colors[tone],
          padding: "2px 8px",
          fontFamily: typography.fontFamily,
          ...typography.small,
        },
        style,
      )}
    >
      {children}
    </span>
  );
}

export function Callout({
  children,
  palette,
  tone = "info",
  style,
}: {
  children?: ReactNode;
  palette: CanvasPalette;
  tone?: "info" | "success" | "warning" | "danger";
  style?: CSSProperties;
}) {
  const accent =
    tone === "success"
      ? palette.success
      : tone === "warning"
        ? palette.warning
        : tone === "danger"
          ? palette.danger
          : palette.info;
  return (
    <div
      style={mergeStyle(
        {
          border: `1px solid ${palette.strokeSecondary}`,
          borderLeft: `3px solid ${accent}`,
          background: palette.fillQuaternary,
          borderRadius: 6,
          padding: "10px 12px",
          color: palette.foregroundSecondary,
          fontFamily: typography.fontFamily,
          ...typography.body,
        },
        style,
      )}
    >
      {children}
    </div>
  );
}

export function TextInput({
  palette,
  style,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { palette: CanvasPalette }) {
  return (
    <input
      {...rest}
      style={mergeStyle(
        {
          width: "100%",
          boxSizing: "border-box",
          background: palette.fillQuaternary,
          border: `1px solid ${palette.strokeSecondary}`,
          borderRadius: 6,
          color: palette.foreground,
          padding: "8px 10px",
          fontFamily: typography.fontFamily,
          ...typography.body,
          outline: "none",
        },
        style,
      )}
    />
  );
}

export function TextArea({
  palette,
  style,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { palette: CanvasPalette }) {
  return (
    <textarea
      {...rest}
      style={mergeStyle(
        {
          width: "100%",
          boxSizing: "border-box",
          background: palette.fillQuaternary,
          border: `1px solid ${palette.strokeSecondary}`,
          borderRadius: 6,
          color: palette.foreground,
          padding: "8px 10px",
          fontFamily: typography.fontFamily,
          ...typography.body,
          outline: "none",
          resize: "vertical",
          minHeight: 72,
        },
        style,
      )}
    />
  );
}

const statusMeta: Record<
  TodoStatus,
  { label: string; mark: string; dim?: boolean }
> = {
  pending: { label: "Pending", mark: "○" },
  in_progress: { label: "In progress", mark: "◉" },
  completed: { label: "Done", mark: "●", dim: true },
  cancelled: { label: "Cancelled", mark: "◌", dim: true },
};

export function TodoList({
  todos,
  palette,
  onCycleStatus,
  onChangeContent,
  onRemove,
}: {
  todos: TodoItem[];
  palette: CanvasPalette;
  onCycleStatus: (id: string) => void;
  onChangeContent: (id: string, content: string) => void;
  onRemove: (id: string) => void;
}) {
  if (todos.length === 0) return null;
  return (
    <Stack gap={4}>
      {todos.map((todo) => {
        const meta = statusMeta[todo.status];
        const color =
          todo.status === "completed"
            ? palette.success
            : todo.status === "in_progress"
              ? palette.info
              : todo.status === "cancelled"
                ? palette.foregroundQuaternary
                : palette.foregroundSecondary;
        return (
          <Row
            key={todo.id}
            gap={8}
            align="start"
            style={{
              padding: "6px 8px",
              borderRadius: 6,
              background: palette.fillQuaternary,
            }}
          >
            <button
              type="button"
              title={`${meta.label} — click to cycle`}
              onClick={() => onCycleStatus(todo.id)}
              style={{
                border: "none",
                background: "transparent",
                color,
                cursor: "pointer",
                padding: 0,
                fontSize: 14,
                lineHeight: "20px",
                width: 18,
              }}
            >
              {meta.mark}
            </button>
            <input
              value={todo.content}
              onChange={(e) => onChangeContent(todo.id, e.target.value)}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                color: meta.dim
                  ? palette.foregroundTertiary
                  : palette.foreground,
                textDecoration:
                  todo.status === "cancelled" ? "line-through" : "none",
                fontFamily: typography.fontFamily,
                ...typography.body,
                outline: "none",
              }}
            />
            <button
              type="button"
              onClick={() => onRemove(todo.id)}
              style={{
                border: "none",
                background: "transparent",
                color: palette.foregroundQuaternary,
                cursor: "pointer",
                padding: 0,
                fontSize: 12,
              }}
            >
              Remove
            </button>
          </Row>
        );
      })}
    </Stack>
  );
}
