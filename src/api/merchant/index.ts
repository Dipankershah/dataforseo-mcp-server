import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { DataForSeoClient } from "../client.js";
import { registerTool } from "../tools.js";
import { DataForSeoResponse } from "../types.js";

export function registerMerchantTools(server: McpServer, apiClient: DataForSeoClient) {
  // Merchant Google Search
  registerTool(
    server,
    "merchant_google_search",
    {
      keyword: z.string().describe("Product name or related keyword"),
      location_name: z.string().optional().describe("Location name"),
      location_code: z.number().optional().describe("Location code"),
      language_name: z.string().optional().describe("Language name"),
      language_code: z.string().optional().describe("Language code"),
      depth: z.number().optional().describe("Number of results to return"),
      limit: z.number().optional().describe("Maximum number of results to return per page"),
      offset: z.number().optional().describe("Offset for pagination")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/merchant/google/search/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Merchant Google Product Specs
  registerTool(
    server,
    "merchant_google_product_specs",
    {
      product_id: z.string().describe("Google Shopping Product ID"),
      location_name: z.string().optional().describe("Location name"),
      location_code: z.number().optional().describe("Location code"),
      language_name: z.string().optional().describe("Language name"),
      language_code: z.string().optional().describe("Language code")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/merchant/google/product_specs/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Merchant Google Product Info
  registerTool(
    server,
    "merchant_google_product_info",
    {
      product_id: z.string().describe("Google Shopping Product ID"),
      location_name: z.string().optional().describe("Location name"),
      location_code: z.number().optional().describe("Location code"),
      language_name: z.string().optional().describe("Language name"),
      language_code: z.string().optional().describe("Language code")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/merchant/google/product_info/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Merchant Google Sellers
  registerTool(
    server,
    "merchant_google_sellers",
    {
      product_id: z.string().describe("Google Shopping Product ID"),
      location_name: z.string().optional().describe("Location name"),
      location_code: z.number().optional().describe("Location code"),
      language_name: z.string().optional().describe("Language name"),
      language_code: z.string().optional().describe("Language code")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/merchant/google/sellers/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Merchant Google Reviews
  registerTool(
    server,
    "merchant_google_reviews",
    {
      product_id: z.string().describe("Google Shopping Product ID"),
      location_name: z.string().optional().describe("Location name"),
      location_code: z.number().optional().describe("Location code"),
      language_name: z.string().optional().describe("Language name"),
      language_code: z.string().optional().describe("Language code"),
      depth: z.number().optional().describe("Number of reviews to retrieve"),
      offset: z.number().optional().describe("Offset for pagination")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/merchant/google/reviews/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Merchant Google Locations
  registerTool(
    server,
    "merchant_google_locations",
    {
      country: z.string().optional().describe("Filter locations by country name")
    },
    async (params) => {
      const url = params.country 
        ? `/merchant/google/locations?country=${encodeURIComponent(params.country)}`
        : "/merchant/google/locations";
        
      const response = await apiClient.get<DataForSeoResponse<any>>(url);
      
      return response;
    }
  );
  
  // Merchant Google Languages
  registerTool(
    server,
    "merchant_google_languages",
    {},
    async (_params) => {
      const response = await apiClient.get<DataForSeoResponse<any>>("/merchant/google/languages");
      
      return response;
    }
  );
  
  // Merchant Amazon Search
  registerTool(
    server,
    "merchant_amazon_search",
    {
      keyword: z.string().describe("Product name or related keyword"),
      location_name: z.string().optional().describe("Location name"),
      location_code: z.number().optional().describe("Location code"),
      language_name: z.string().optional().describe("Language name"),
      language_code: z.string().optional().describe("Language code"),
      depth: z.number().optional().describe("Number of results to return"),
      limit: z.number().optional().describe("Maximum number of results to return per page"),
      offset: z.number().optional().describe("Offset for pagination")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/merchant/amazon/search/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Merchant Amazon Product Info
  registerTool(
    server,
    "merchant_amazon_product_info",
    {
      asin: z.string().describe("Amazon ASIN"),
      location_name: z.string().optional().describe("Location name"),
      location_code: z.number().optional().describe("Location code"),
      language_name: z.string().optional().describe("Language name"),
      language_code: z.string().optional().describe("Language code")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/merchant/amazon/product_info/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Merchant Amazon Reviews
  registerTool(
    server,
    "merchant_amazon_reviews",
    {
      asin: z.string().describe("Amazon ASIN"),
      location_name: z.string().optional().describe("Location name"),
      location_code: z.number().optional().describe("Location code"),
      language_name: z.string().optional().describe("Language name"),
      language_code: z.string().optional().describe("Language code"),
      depth: z.number().optional().describe("Number of reviews to retrieve"),
      offset: z.number().optional().describe("Offset for pagination")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/merchant/amazon/reviews/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Merchant Amazon Locations
  registerTool(
    server,
    "merchant_amazon_locations",
    {
      country: z.string().optional().describe("Filter locations by country name")
    },
    async (params) => {
      const url = params.country 
        ? `/merchant/amazon/locations?country=${encodeURIComponent(params.country)}`
        : "/merchant/amazon/locations";
        
      const response = await apiClient.get<DataForSeoResponse<any>>(url);
      
      return response;
    }
  );
  
  // Merchant Amazon Languages
  registerTool(
    server,
    "merchant_amazon_languages",
    {},
    async (_params) => {
      const response = await apiClient.get<DataForSeoResponse<any>>("/merchant/amazon/languages");
      
      return response;
    }
  );
}