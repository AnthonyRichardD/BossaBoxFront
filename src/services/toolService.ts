// src/services/toolService.ts
import api from "./api";
import { Tool } from "../types/tool";

export const ToolService = {
  async getAllTools(): Promise<Tool[]> {
    const response = await api.get("/tools");
    return response.data as Tool[];
  },
};
