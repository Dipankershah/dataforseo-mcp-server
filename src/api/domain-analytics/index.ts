import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { DataForSeoClient } from "../client.js";
import { registerTool } from "../tools.js";
import { DataForSeoResponse } from "../types.js";

export function registerDomainAnalyticsTools(server: McpServer, apiClient: DataForSeoClient) {
  // Technologies Summary
  registerTool(
    server,
    "domain_analytics_technologies_summary",
    {
      technology_name: z.string().optional().describe("Filter results by technology name"),
      technology_group: z.string().optional().describe("Filter results by technology group"),
      category: z.string().optional().describe("Filter results by category")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/domain_analytics/technologies/summary/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Technologies Technologies
  registerTool(
    server,
    "domain_analytics_technologies_technologies",
    {
      technology_name: z.string().optional().describe("Filter results by technology name"),
      technology_group: z.string().optional().describe("Filter results by technology group"),
      category: z.string().optional().describe("Filter results by category")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/domain_analytics/technologies/technologies/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Technologies Domains by Technology
  registerTool(
    server,
    "domain_analytics_technologies_domains_by_technology",
    {
      technology_name: z.string().describe("Technology name to search for"),
      technology_group: z.string().optional().describe("Filter results by technology group"),
      category: z.string().optional().describe("Filter results by category"),
      limit: z.number().optional().describe("Maximum number of results to return"),
      offset: z.number().optional().describe("Offset for pagination")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/domain_analytics/technologies/domains_by_technology/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Technologies Domain Technologies
  registerTool(
    server,
    "domain_analytics_technologies_domain_technologies",
    {
      target: z.string().describe("Target domain to analyze"),
      limit: z.number().optional().describe("Maximum number of results to return"),
      offset: z.number().optional().describe("Offset for pagination")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/domain_analytics/technologies/domain_technologies/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Technologies Technology Stats
  registerTool(
    server,
    "domain_analytics_technologies_technology_stats",
    {
      technology_name: z.string().describe("Technology name to get stats for"),
      limit: z.number().optional().describe("Maximum number of results to return"),
      offset: z.number().optional().describe("Offset for pagination")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/domain_analytics/technologies/technology_stats/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Technologies Domains by HTML Terms
  registerTool(
    server,
    "domain_analytics_technologies_domains_by_html_terms",
    {
      terms: z.array(z.string()).describe("HTML terms to search for"),
      intersection_mode: z.enum(["and", "or"]).optional().describe("Intersection mode"),
      limit: z.number().optional().describe("Maximum number of results to return"),
      offset: z.number().optional().describe("Offset for pagination")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/domain_analytics/technologies/domains_by_html_terms/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Whois Overview
  registerTool(
    server,
    "domain_analytics_whois_overview",
    {
      domain: z.string().describe("Domain to get WHOIS information for")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/domain_analytics/whois/overview/live",
        [params]
      );
      
      return response;
    }
  );
}