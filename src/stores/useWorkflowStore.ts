import { create } from "zustand";

export type WorkflowStep =
  | "idle"
  | "uploaded"
  | "summarized"
  | "flashcards"
  | "task_added";

type WorkflowState = {
  step: WorkflowStep;
  resourceName: string | null;
  streak: number;
  setStep: (step: WorkflowStep, resourceName?: string) => void;
  addStreak: () => void;
  reset: () => void;
};

export const useWorkflowStore = create<WorkflowState>((set) => ({
  step: "idle",
  resourceName: null,
  streak: 12,
  setStep: (step, resourceName) =>
    set((s) => ({
      step,
      resourceName: resourceName ?? s.resourceName,
    })),
  addStreak: () => set((s) => ({ streak: s.streak + 1 })),
  reset: () => set({ step: "idle", resourceName: null }),
}));
