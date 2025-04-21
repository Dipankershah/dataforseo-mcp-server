import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { DataForSeoClient } from "../client.js";
import { registerTool } from "../tools.js";
import { DataForSeoResponse } from "../types.js";

// DataForSEO Labs API schemas
const keywordResearchBaseSchema = {
  keyword: z.string().describe("Keyword(s) to research"),
  location_code: z.number().optional().describe("The location code for the search"),
  language_code: z.string().optional().describe("The language code for the search"),
  limit: z.number().optional().describe("Maximum number of results to return"),
  offset: z.number().optional().describe("Offset for pagination"),
  include_seed_keyword: z.boolean().optional().describe("Include the seed keyword in the results")
};

const domainResearchBaseSchema = {
  target: z.string().describe("Target domain name"),
  location_code: z.number().optional().describe("The location code for the search"),
  language_code: z.string().optional().describe("The language code for the search"),
  limit: z.number().optional().describe("Maximum number of results to return"),
  offset: z.number().optional().describe("Offset for pagination")
};

export function registerLabsTools(server: McpServer, apiClient: DataForSeoClient) {
  // Keywords for Site
  registerTool(
    server,
    "labs_google_keywords_for_site",
    {
      ...domainResearchBaseSchema,
      include_serp_info: z.boolean().optional().describe("Include SERP information")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google/keywords_for_site/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Related Keywords
  registerTool(
    server,
    "labs_google_related_keywords",
    keywordResearchBaseSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google/related_keywords/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Keyword Suggestions
  registerTool(
    server,
    "labs_google_keyword_suggestions",
    keywordResearchBaseSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google/keyword_suggestions/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Keyword Ideas
  registerTool(
    server,
    "labs_google_keyword_ideas",
    keywordResearchBaseSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google/keyword_ideas/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Historical Search Volume
  registerTool(
    server,
    "labs_google_historical_search_volume",
    {
      keywords: z.array(z.string()).describe("Keywords to get historical search volume for"),
      location_code: z.number().optional().describe("The location code for the search"),
      language_code: z.string().optional().describe("The language code for the search"),
      include_serp_info: z.boolean().optional().describe("Include SERP information")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google/historical_search_volume/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Bulk Keyword Difficulty
  registerTool(
    server,
    "labs_google_bulk_keyword_difficulty",
    {
      keywords: z.array(z.string()).describe("Keywords to calculate difficulty for"),
      location_code: z.number().optional().describe("The location code for the search"),
      language_code: z.string().optional().describe("The language code for the search")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google/bulk_keyword_difficulty/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Search Intent
  registerTool(
    server,
    "labs_google_search_intent",
    {
      keywords: z.array(z.string()).describe("Keywords to determine search intent"),
      location_code: z.number().optional().describe("The location code for the search"),
      language_code: z.string().optional().describe("The language code for the search")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google/search_intent/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Categories for Domain
  registerTool(
    server,
    "labs_google_categories_for_domain",
    domainResearchBaseSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google/categories_for_domain/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Domain Rank Overview
  registerTool(
    server,
    "labs_google_domain_rank_overview",
    domainResearchBaseSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google/domain_rank_overview/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Ranked Keywords
  registerTool(
    server,
    "labs_google_ranked_keywords",
    {
      ...domainResearchBaseSchema,
      include_serp_info: z.boolean().optional().describe("Include SERP information"),
      filters: z.array(z.any()).optional().describe("Filters to apply to the results")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google/ranked_keywords/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Competitors Domain
  registerTool(
    server,
    "labs_google_competitors_domain",
    {
      ...domainResearchBaseSchema,
      filters: z.array(z.any()).optional().describe("Filters to apply to the results")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google/competitors_domain/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Domain Intersection
  registerTool(
    server,
    "labs_google_domain_intersection",
    {
      domains: z.array(z.string()).min(2).max(20).describe("Domains to compare"),
      location_code: z.number().optional().describe("The location code for the search"),
      language_code: z.string().optional().describe("The language code for the search"),
      limit: z.number().optional().describe("Maximum number of results to return"),
      offset: z.number().optional().describe("Offset for pagination"),
      filters: z.array(z.any()).optional().describe("Filters to apply to the results")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google/domain_intersection/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Subdomains
  registerTool(
    server,
    "labs_google_subdomains",
    {
      ...domainResearchBaseSchema,
      filters: z.array(z.any()).optional().describe("Filters to apply to the results")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google/subdomains/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Relevant Pages
  registerTool(
    server,
    "labs_google_relevant_pages",
    {
      ...domainResearchBaseSchema,
      filters: z.array(z.any()).optional().describe("Filters to apply to the results")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google/relevant_pages/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Bulk Traffic Estimation
  registerTool(
    server,
    "labs_google_bulk_traffic_estimation",
    {
      targets: z.array(z.string()).describe("Domains to estimate traffic for"),
      location_code: z.number().optional().describe("The location code for the search"),
      language_code: z.string().optional().describe("The language code for the search")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google/bulk_traffic_estimation/live",
        [params]
      );
      
      return response;
    }
  );
  
  // === AMAZON LABS API ===
  
  // Amazon Bulk Search Volume
  registerTool(
    server,
    "labs_amazon_bulk_search_volume",
    {
      keywords: z.array(z.string()).describe("Keywords to get search volume for"),
      location_code: z.number().optional().describe("The location code for the search"),
      language_code: z.string().optional().describe("The language code for the search")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/amazon/bulk_search_volume/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Amazon Related Keywords
  registerTool(
    server,
    "labs_amazon_related_keywords",
    {
      ...keywordResearchBaseSchema,
      marketplace: z.string().optional().describe("Amazon marketplace (e.g., amazon.com)")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/amazon/related_keywords/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Amazon Ranked Keywords
  registerTool(
    server,
    "labs_amazon_ranked_keywords",
    {
      target: z.string().describe("Target ASIN or Amazon domain"),
      marketplace: z.string().optional().describe("Amazon marketplace (e.g., amazon.com)"),
      location_code: z.number().optional().describe("The location code for the search"),
      language_code: z.string().optional().describe("The language code for the search"),
      limit: z.number().optional().describe("Maximum number of results to return"),
      offset: z.number().optional().describe("Offset for pagination"),
      filters: z.array(z.any()).optional().describe("Filters to apply to the results")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/amazon/ranked_keywords/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Amazon Product Competitors
  registerTool(
    server,
    "labs_amazon_product_competitors",
    {
      asin: z.string().describe("Target Amazon ASIN"),
      marketplace: z.string().optional().describe("Amazon marketplace (e.g., amazon.com)"),
      location_code: z.number().optional().describe("The location code for the search"),
      language_code: z.string().optional().describe("The language code for the search"),
      limit: z.number().optional().describe("Maximum number of results to return"),
      offset: z.number().optional().describe("Offset for pagination")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/amazon/product_competitors/live",
        [params]
      );
      
      return response;
    }
  );
  
  // === BING LABS API ===
  
  // Bing Keywords for Site
  registerTool(
    server,
    "labs_bing_keywords_for_site",
    {
      ...domainResearchBaseSchema,
      include_serp_info: z.boolean().optional().describe("Include SERP information")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/bing/keywords_for_site/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Bing Related Keywords
  registerTool(
    server,
    "labs_bing_related_keywords",
    keywordResearchBaseSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/bing/related_keywords/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Bing Domain Rank Overview
  registerTool(
    server,
    "labs_bing_domain_rank_overview",
    domainResearchBaseSchema,
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/bing/domain_rank_overview/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Bing Ranked Keywords
  registerTool(
    server,
    "labs_bing_ranked_keywords",
    {
      ...domainResearchBaseSchema,
      include_serp_info: z.boolean().optional().describe("Include SERP information"),
      filters: z.array(z.any()).optional().describe("Filters to apply to the results")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/bing/ranked_keywords/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Bing Competitors Domain
  registerTool(
    server,
    "labs_bing_competitors_domain",
    {
      ...domainResearchBaseSchema,
      filters: z.array(z.any()).optional().describe("Filters to apply to the results")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/bing/competitors_domain/live",
        [params]
      );
      
      return response;
    }
  );
  
  // === GOOGLE PLAY AND APP STORE LABS API ===
  
  // Google Play Keywords for App
  registerTool(
    server,
    "labs_google_play_keywords_for_app",
    {
      app_id: z.string().describe("Google Play app ID"),
      location_code: z.number().optional().describe("The location code for the search"),
      language_code: z.string().optional().describe("The language code for the search"),
      limit: z.number().optional().describe("Maximum number of results to return"),
      offset: z.number().optional().describe("Offset for pagination")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google_play/keywords_for_app/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Google Play Ranked Apps
  registerTool(
    server,
    "labs_google_play_ranked_apps",
    {
      ...keywordResearchBaseSchema,
      filters: z.array(z.any()).optional().describe("Filters to apply to the results")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google_play/ranked_apps/live",
        [params]
      );
      
      return response;
    }
  );
  
  // Google Play App Competitors
  registerTool(
    server,
    "labs_google_play_app_competitors",
    {
      app_id: z.string().describe("Google Play app ID"),
      location_code: z.number().optional().describe("The location code for the search"),
      language_code: z.string().optional().describe("The language code for the search"),
      limit: z.number().optional().describe("Maximum number of results to return"),
      offset: z.number().optional().describe("Offset for pagination")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/google_play/app_competitors/live",
        [params]
      );
      
      return response;
    }
  );
  
  // App Store Keywords for App
  registerTool(
    server,
    "labs_app_store_keywords_for_app",
    {
      app_id: z.string().describe("App Store app ID"),
      location_code: z.number().optional().describe("The location code for the search"),
      language_code: z.string().optional().describe("The language code for the search"),
      limit: z.number().optional().describe("Maximum number of results to return"),
      offset: z.number().optional().describe("Offset for pagination")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/app_store/keywords_for_app/live",
        [params]
      );
      
      return response;
    }
  );
  
  // App Store Ranked Apps
  registerTool(
    server,
    "labs_app_store_ranked_apps",
    {
      ...keywordResearchBaseSchema,
      filters: z.array(z.any()).optional().describe("Filters to apply to the results")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/app_store/ranked_apps/live",
        [params]
      );
      
      return response;
    }
  );
  
  // App Store App Competitors
  registerTool(
    server,
    "labs_app_store_app_competitors",
    {
      app_id: z.string().describe("App Store app ID"),
      location_code: z.number().optional().describe("The location code for the search"),
      language_code: z.string().optional().describe("The language code for the search"),
      limit: z.number().optional().describe("Maximum number of results to return"),
      offset: z.number().optional().describe("Offset for pagination")
    },
    async (params) => {
      const response = await apiClient.post<DataForSeoResponse<any>>(
        "/dataforseo_labs/app_store/app_competitors/live",
        [params]
      );
      
      return response;
    }
  );
  
  // === META ENDPOINTS FOR LABS API ===
  
  // Categories
  registerTool(
    server,
    "labs_categories",
    {
      engine: z.enum(["google", "amazon", "bing", "google_play", "app_store"]).describe("Engine to get categories for"),
      category_code: z.number().optional().describe("Parent category code"),
      language_code: z.string().optional().describe("Language code")
    },
    async (params) => {
      const url = `/dataforseo_labs/${params.engine}/categories`;
      const queryParams = [];
      
      if (params.category_code) {
        queryParams.push(`category_code=${params.category_code}`);
      }
      
      if (params.language_code) {
        queryParams.push(`language_code=${params.language_code}`);
      }
      
      const fullUrl = queryParams.length > 0 ? `${url}?${queryParams.join('&')}` : url;
      const response = await apiClient.get<DataForSeoResponse<any>>(fullUrl);
      
      return response;
    }
  );
  
  // Locations
  registerTool(
    server,
    "labs_locations",
    {
      engine: z.enum(["google", "amazon", "bing", "google_play", "app_store"]).describe("Engine to get locations for"),
      country: z.string().optional().describe("Filter locations by country name")
    },
    async (params) => {
      const url = `/dataforseo_labs/${params.engine}/locations`;
      const queryParams = [];
      
      if (params.country) {
        queryParams.push(`country=${encodeURIComponent(params.country)}`);
      }
      
      const fullUrl = queryParams.length > 0 ? `${url}?${queryParams.join('&')}` : url;
      const response = await apiClient.get<DataForSeoResponse<any>>(fullUrl);
      
      return response;
    }
  );
  
  // Languages
  registerTool(
    server,
    "labs_languages",
    {
      engine: z.enum(["google", "amazon", "bing", "google_play", "app_store"]).describe("Engine to get languages for")
    },
    async (params) => {
      const url = `/dataforseo_labs/${params.engine}/languages`;
      const response = await apiClient.get<DataForSeoResponse<any>>(url);
      
      return response;
    }
  );
  
  // Available History
  registerTool(
    server,
    "labs_available_history",
    {
      engine: z.enum(["google", "amazon", "bing", "google_play", "app_store"]).describe("Engine to get available history for"),
      function: z.string().describe("Function name (e.g., keywords_for_site, serp)")
    },
    async (params) => {
      const url = `/dataforseo_labs/${params.engine}/available_history/${params.function}`;
      const response = await apiClient.get<DataForSeoResponse<any>>(url);
      
      return response;
    }
  );
}