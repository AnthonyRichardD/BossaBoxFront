import api from "./api";
import { Tool } from "../types/tool";

export const ToolService = {
  async getAllTools(): Promise<{ response: Tool[]; is_error: string }> {
    const response = await api.get("/tools");
    return response.data;
  },
};
