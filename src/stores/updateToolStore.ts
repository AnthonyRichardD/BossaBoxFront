import { create } from "zustand";
import { Tool } from "../types/tool";

interface UpdateToolState {
  toolData: Tool;
  setTool: (tool: Tool) => void;
}

export const useUpdateToolStore = create<UpdateToolState>((set) => ({
  toolData: {} as Tool,
  setTool: (tool: Tool) => set({ toolData: tool }),
}));
