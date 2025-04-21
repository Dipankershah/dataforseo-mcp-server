import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { DataForSeoClient } from "../client.js";
import { registerTool, registerTaskTool } from "../tools.js";
import { DataForSeoResponse } from "../types.js";

export function registerOnPageTools(server: McpServer, apiClient: DataForSeoClient) {
  // OnPage Task Post
  registerTool(
    server,
    "onpage_task_post",
    {
      target: z.string().describe("Target URL to analyze"),
      max_crawl_pages: z.number().optional().describe("Maximum number of pages to crawl"),
      load_resources: z.boolean().optional().describe("Load page resources"),
      enable_javascript: z.boolean().optional().describe("Enable JavaScript execution"),
      limit: z.number().optional().describe("Maximum number of results to return")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/on_page/task_post",
        [params]
      );
      
      return response;
    }
  );
  
  // OnPage Tasks Ready
  registerTool(
    server,
    "onpage_tasks_ready",
    {},
    async (_params) => {
      const response = await apiClient.get<DataForSeoResponse<any>>("/on_page/tasks_ready");
      
      return response;
    }
  );
  
  // OnPage Task Result Summary
  registerTool(
    server,
    "onpage_summary",
    {
      id: z.string().describe("Task ID")
    },
    async (params) => {
      const response = await apiClient.get<DataForSeoResponse<any>>(`/on_page/summary/${params.id}`);
      
      return response;
    }
  );
  
  // OnPage Task Result Pages
  registerTool(
    server,
    "onpage_pages",
    {
      id: z.string().describe("Task ID"),
      limit: z.number().optional().describe("Maximum number of results to return"),
      offset: z.number().optional().describe("Offset for pagination"),
      filters: z.array(z.any()).optional().describe("Array of filter objects")
    },
    async (params) => {
      const { id, ...restParams } = params;
      const response = await apiClient.post<DataForSeoResponse<any>>(
        `/on_page/pages/${id}`,
        [restParams]
      );
      
      return response;
    }
  );
  
  // OnPage Task Result Resources
  registerTool(
    server,
    "onpage_resources",
    {
      id: z.string().describe("Task ID"),
      url: z.string().describe("URL of the page to get resources for"),
      limit: z.number().optional().describe("Maximum number of results to return"),
      offset: z.number().optional().describe("Offset for pagination"),
      filters: z.array(z.any()).optional().describe("Array of filter objects")
    },
    async (params) => {
      const { id, ...restParams } = params;
      const response = await apiClient.post<DataForSeoResponse<any>>(
        `/on_page/resources/${id}`,
        [restParams]
      );
      
      return response;
    }
  );
  
  // OnPage Task Force Stop
  registerTool(
    server,
    "onpage_task_force_stop",
    {
      id: z.string().describe("Task ID")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/on_page/task_force_stop",
        [{ id: params.id }]
      );
      
      return response;
    }
  );
  
  // OnPage Duplicate Content
  registerTool(
    server,
    "onpage_duplicate_content",
    {
      id: z.string().describe("Task ID"),
      limit: z.number().optional().describe("Maximum number of results to return"),
      offset: z.number().optional().describe("Offset for pagination")
    },
    async (params) => {
      const { id, ...restParams } = params;
      const response = await apiClient.post<DataForSeoResponse<any>>(
        `/on_page/duplicate_content/${id}`,
        [restParams]
      );
      
      return response;
    }
  );
}