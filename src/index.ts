import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { setupApiClient } from "./api/client.js";
import { setupApiIntegrations } from "./api/integrations";

class SeoAnalyticsServer {
  private server: McpServer;
  private apiClient: any;

  constructor() {
    this.server = new McpServer({
      name: "SEO Analytics Platform",
      version: "1.0.0",
    });
  }

  private async configureApiClient() {
    const credentials = {
      username: process.env.DATAFORSEO_USERNAME || "vecif47502@cxnlab.com",
      password: process.env.DATAFORSEO_PASSWORD || "a8eb463220faf069"
    };

    if (!credentials.username || !credentials.password) {
      throw new Error("API credentials are required");
    }

    this.apiClient = setupApiClient(credentials.username, credentials.password);
  }

  private async setupThirdPartyIntegrations() {
    const localFalconConfig = {
      apiKey: process.env.LOCALFALCON_API_KEY,
      baseUrl: process.env.LOCALFALCON_API_URL
    };

    if (typeof localFalconConfig.apiKey === 'string') {
      console.log("Initializing Local Falcon integration");
      await setupApiIntegrations(this.server, {
        localFalcon: {
          apiKey: localFalconConfig.apiKey,
          baseUrl: localFalconConfig.baseUrl
        },
        apiClient: this.apiClient
      });
    } else {
      console.log("Local Falcon integration skipped - API key not provided");
    }
  }

  async start() {
    try {
      await this.configureApiClient();
      await this.setupThirdPartyIntegrations();
      
      const transport = new StdioServerTransport();
      console.log("SEO Analytics Platform starting...");
      
      await this.server.connect(transport);
      console.log("SEO Analytics Platform connected successfully");
    } catch (error) {
      console.error("Failed to start SEO Analytics Platform:", error);
      process.exit(1);
    }
  }
}

async function bootstrap() {
  const server = new SeoAnalyticsServer();
  await server.start();
}

bootstrap().catch((error) => {
  console.error("Fatal error in SEO Analytics Platform:", error);
  process.exit(1);
});