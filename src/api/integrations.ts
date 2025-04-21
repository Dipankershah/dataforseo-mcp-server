import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerSerpTools } from "./serp/index.js";
import { registerKeywordsTools } from "./keywords/index.js";
import { registerLabsTools } from "./labs/index.js";
import { registerBacklinksTools } from "./backlinks/index.js";
import { registerOnPageTools } from "./onpage/index.js";
import { registerDomainAnalyticsTools } from "./domain-analytics/index.js";
import { registerContentAnalysisTools } from "./content-analysis/index.js";
import { registerContentGenerationTools } from "./content-generation/index.js";
import { registerMerchantTools } from "./merchant/index.js";
import { registerAppDataTools } from "./app-data/index.js";
import { registerBusinessDataTools } from "./business-data/index.js";
import { registerLocalFalconTools } from "./localfalcon/index.js";

interface IntegrationConfig {
  localFalcon?: {
    apiKey: string;
    baseUrl?: string;
  };
  apiClient: any;
}

export async function setupApiIntegrations(server: McpServer, config: IntegrationConfig) {
  // Register all DataForSEO API tools
  const tools = [
    registerSerpTools,
    registerKeywordsTools,
    registerLabsTools,
    registerBacklinksTools,
    registerOnPageTools,
    registerDomainAnalyticsTools,
    registerContentAnalysisTools,
    registerContentGenerationTools,
    registerMerchantTools,
    registerAppDataTools,
    registerBusinessDataTools
  ];

  for (const registerTool of tools) {
    await registerTool(server, config.apiClient);
  }

  // Setup Local Falcon integration if configured
  if (config.localFalcon?.apiKey) {
    await registerLocalFalconTools(server, {
      apiKey: config.localFalcon.apiKey,
      baseUrl: config.localFalcon.baseUrl
    });
  }
} 