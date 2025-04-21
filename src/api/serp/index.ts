import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { DataForSeoClient } from "../client.js";
import { registerTool, registerTaskTool } from "../tools.js";
import { 
  DataForSeoResponse, 
  TaskPostResponse, 
  TaskReadyResponse,
  TaskGetResponse
} from "../types.js";

// SERP Google Organic API schemas
const googleOrganicLiveSchema = {
  keyword: z.string().describe("The search query or keyword"),
  location_code: z.number().describe("The location code for the search"),
  language_code: z.string().describe("The language code for the search"),
  device: z.enum(["desktop", "mobile", "tablet"]).optional().describe("The device type for the search"),
  os: z.enum(["windows", "macos", "ios", "android"]).optional().describe("The operating system for the search"),
  depth: z.number().optional().describe("Maximum number of results to return"),
  se_domain: z.string().optional().describe("Search engine domain (e.g., google.com)")
};

const googleOrganicTaskSchema = {
  ...googleOrganicLiveSchema,
  priority: z.number().min(1).max(2).optional().describe("Task priority: 1 (normal) or 2 (high)"),
  tag: z.string().optional().describe("Custom identifier for the task"),
  postback_url: z.string().optional().describe("URL to receive a callback when the task is completed"),
  postback_data: z.string().optional().describe("Custom data to be passed in the callback")
}

// Google Organic Types
interface GoogleOrganicLiveResult {
  keyword: string;
  type: string;
  se_domain: string;
  location_code: number;
  language_code: string;
  items: any[];
  // ... other fields
}

interface GoogleOrganicTaskResult {
  keyword: string;
  se_domain: string;
  check_url: string;
  datetime: string;
  items: any[];
  // ... other fields
}

export function registerSerpTools(server: McpServer, apiClient: DataForSeoClient) {
  // Google Organic Live
  registerTool(
    server,
    "serp_google_organic_live",
    googleOrganicLiveSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<GoogleOrganicLiveResult>>(
        "/serp/google/organic/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Google Organic Task-based (POST, READY, GET)
  registerTaskTool(
    server,
    "serp_google_organic_task",
    googleOrganicTaskSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<TaskPostResponse>>(
        "/serp/google/organic/task_post",
        [params]
      );
      
      return response;
    },
    async () => {
      const response = await apiClient.get<DataForSeoResponse<TaskReadyResponse>>(
        "/serp/google/organic/tasks_ready"
      );
      
      return response;
    },
    async (id) => {
      const response = await apiClient.get<DataForSeoResponse<TaskGetResponse<GoogleOrganicTaskResult>>>(
        `/serp/google/organic/task_get/${id}`
      );
      
      return response;
    }
  );
  
  // Google Maps Live
  registerTool(
    server,
    "serp_google_maps_live",
    {
      ...googleOrganicLiveSchema,
      local_pack_type: z.enum(["maps", "local_pack"]).optional().describe("Type of local pack results"),
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/serp/google/maps/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Google Images Live
  registerTool(
    server,
    "serp_google_images_live",
    googleOrganicLiveSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/serp/google/images/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Google News Live
  registerTool(
    server,
    "serp_google_news_live",
    googleOrganicLiveSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/serp/google/news/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Google Jobs Live
  registerTool(
    server,
    "serp_google_jobs_live",
    googleOrganicLiveSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/serp/google/jobs/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Google Shopping Live
  registerTool(
    server,
    "serp_google_shopping_live",
    googleOrganicLiveSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/serp/google/shopping/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Bing Organic Live
  registerTool(
    server,
    "serp_bing_organic_live",
    googleOrganicLiveSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/serp/bing/organic/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Yahoo Organic Live
  registerTool(
    server,
    "serp_yahoo_organic_live",
    googleOrganicLiveSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/serp/yahoo/organic/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Baidu Organic Live
  registerTool(
    server,
    "serp_baidu_organic_live",
    googleOrganicLiveSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/serp/baidu/organic/live",
        [params]
      );
      
      return response;
    }
  );
  
  // YouTube Organic Live
  registerTool(
    server,
    "serp_youtube_organic_live",
    googleOrganicLiveSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/serp/youtube/organic/live",
        [params]
      );
      
      return response;
    }
  );
  
  // SERP API Locations
  registerTool(
    server,
    "serp_google_locations",
    {
      country: z.string().optional().describe("Filter locations by country name")
    },
    async (params) => {
      const url = params.country 
        ? `/serp/google/locations?country=${encodeURIComponent(params.country)}`
        : "/serp/google/locations";
        
      const response = await apiClient.get<DataForSeoResponse<any>>(url);
      
      return response;
    }
  );
  
  // SERP API Languages
  registerTool(
    server,
    "serp_google_languages",
    {},
    async (_params) => {
      const response = await apiClient.get<DataForSeoResponse<any>>("/serp/google/languages");
      
      return response;
    }
  );
}