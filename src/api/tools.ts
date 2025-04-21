import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { DataForSeoClient } from "./client.js";

/**
 * Base helper function to register an MCP tool for DataForSEO API
 */
export function registerTool<T extends z.ZodRawShape>(
  server: McpServer,
  name: string,
  schema: T,
  handler: (params: z.infer<z.ZodObject<T>>) => Promise<any>
) {
  server.tool(
    name,
    "",
    async (params) => {
      try {
        // We get the apiClient from the closure, not from context
        const result = await handler(params as z.infer<z.ZodObject<T>>);
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      } catch (error) {
        console.error(`Error in ${name} tool:`, error);
        
        if (error instanceof Error) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  error: error.message,
                  stack: error.stack
                }, null, 2)
              }
            ]
          };
        }
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error: "Unknown error occurred",
                details: error
              }, null, 2)
            }
          ]
        };
      }
    }
  );
}

/**
 * Helper for registering a task-based tool (POST, READY, GET pattern)
 */
export function registerTaskTool<PostT extends z.ZodRawShape>(
  server: McpServer,
  baseName: string,
  postSchema: PostT,
  postHandler: (params: z.infer<z.ZodObject<PostT>>) => Promise<any>,
  readyHandler: () => Promise<any>,
  getHandler: (id: string) => Promise<any>
) {
  // Register POST tool
  registerTool(
    server,
    `${baseName}_post`,
    postSchema,
    postHandler
  );
  
  // Register READY tool
  registerTool(
    server,
    `${baseName}_ready`,
    {},
    (_params) => readyHandler()
  );
  
  // Register GET tool
  registerTool(
    server,
    `${baseName}_get`,
    { id: z.string() },
    (params) => getHandler(params.id)
  );
}