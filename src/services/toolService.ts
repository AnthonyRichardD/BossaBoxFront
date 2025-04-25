import api from "./api";
import { CreateToolData, Tool } from "../types/tool";

export const ToolService = {
  async getAllTools(): Promise<{ response: Tool[]; is_error: string }> {
    const response = await api.get("/tools");
    return response.data;
  },

  async createTool(
    tool: CreateToolData,
  ): Promise<{ response: Tool; is_error: string }> {
    const response = await api.post("/tools", tool);
    return response.data;
  },

  async deleteTool(
    toolId: string,
  ): Promise<{ response: Tool; is_error: string }> {
    const response = await api.delete(`/tools/${toolId}`);
    return response.data;
  },

  async updateTool(
    toolId: string,
    tool: CreateToolData,
  ): Promise<{ response: Tool; is_error: string }> {
    const response = await api.patch(`/tools/${toolId}`, tool);
    return response.data;
  },
};
