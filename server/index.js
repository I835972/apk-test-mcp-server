import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from './streamableHttp.js';
import express from 'express';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

function loadSkill() {
  const content = readFileSync(join(__dirname, '../SKILL.md'), 'utf-8');
  // parses name & version from SKILL.md frontmatter
  return { name, version, content };
}
const SKILL = loadSkill(); // loaded ONCE at startup — served from memory

// ★ CHANGE 1 — your server name
const server = new McpServer({ name: 'apk-test-mcp-server', version:'1.0.0' });

server.tool(
  'get_details',              // ★ CHANGE 2 — tool name (underscores only)
  'this is a test function for testing skills via MCP calls',    // ★ CHANGE 3 — Joule uses this for trigger matching
  {},
  async () => ({ content: [{ type:'text', text: SKILL.content }] })
);

app.post('/mcp', async (req, res) => { /* MCP handler */ });
app.get('/health', (req, res) => res.json({ status:'ok', skill: SKILL.name }));
app.listen(PORT);
