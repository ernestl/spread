import { v4 as uuid } from "uuid";
import type { Plan } from "./types";

export function createSamplePlan(): Plan {
  return {
    id: uuid(),
    title: "Ship Plan Canvas",
    updatedAt: Date.now(),
    blocks: [
      {
        id: uuid(),
        type: "heading",
        level: 1,
        text: "Ship Plan Canvas",
      },
      {
        id: uuid(),
        type: "paragraph",
        text: "A standalone planning surface inspired by Cursor Canvas — flat, minimal, and meant to live outside the chat transcript.",
      },
      {
        id: uuid(),
        type: "callout",
        tone: "info",
        text: "This is a recreation of the Canvas planning experience, not an official Cursor product. Plans save in this browser.",
      },
      {
        id: uuid(),
        type: "heading",
        level: 2,
        text: "Goals",
      },
      {
        id: uuid(),
        type: "todos",
        title: "Launch checklist",
        items: [
          {
            id: uuid(),
            content: "Recreate Canvas layout primitives",
            status: "completed",
          },
          {
            id: uuid(),
            content: "Support editable plan blocks and todos",
            status: "in_progress",
          },
          {
            id: uuid(),
            content: "Persist plans locally across reloads",
            status: "pending",
          },
          {
            id: uuid(),
            content: "Publish a shareable preview",
            status: "pending",
          },
        ],
      },
      {
        id: uuid(),
        type: "divider",
      },
      {
        id: uuid(),
        type: "heading",
        level: 2,
        text: "Notes",
      },
      {
        id: uuid(),
        type: "paragraph",
        text: "Keep each section focused. Prefer short supporting sentences over dense prose. Use callouts for risks and todos for actionable work.",
      },
      {
        id: uuid(),
        type: "callout",
        tone: "warning",
        text: "Canvas in Cursor is host-integrated. This app approximates the authoring surface for planning only.",
      },
    ],
  };
}

export function createEmptyPlan(title = "Untitled plan"): Plan {
  return {
    id: uuid(),
    title,
    updatedAt: Date.now(),
    blocks: [
      { id: uuid(), type: "heading", level: 1, text: title },
      {
        id: uuid(),
        type: "paragraph",
        text: "Describe the outcome you want.",
      },
      {
        id: uuid(),
        type: "todos",
        title: "Next steps",
        items: [
          { id: uuid(), content: "First action", status: "pending" },
          { id: uuid(), content: "Second action", status: "pending" },
        ],
      },
    ],
  };
}
