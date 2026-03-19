+++
date = '2026-03-19T11:30:00-08:00'
title = 'BracketMadness MCP Server'
summary = '''A Docker-ready TypeScript MCP server for LM Studio that generates, submits, checks, and visualizes BracketMadness tournament picks.'''
github_repo = 'https://github.com/abstractionjackson/lmstudio-bracket-agent'
[[resources]]
name = 'featured'
src = 'images/branding.png'
+++

{{< figure src="images/branding.png" alt="BracketMadness MCP Server branding" caption="BracketMadness MCP Server" >}}

I built the **BracketMadness MCP Server** to answer a practical question: what does an MCP server look like when it moves beyond a toy demo and supports a complete workflow end to end?

This project gives an AI agent in LM Studio a narrow, reliable set of tools to generate a bracket, submit it to BracketMadness.AI, check status, and visualize performance as a Mermaid chart. The result is a much better interaction loop than "make picks and hope for the best."

## What the server actually does

- Generates bracket picks from live or sample data
- Submits saved picks with authenticated API access
- Fetches current bracket status (score, rank, and pick health)
- Renders a Mermaid chart for wins, losses, and undecided picks
- Supports a one-step generate-and-submit flow for quick iteration

That sequence became the core product story for me: **generate → inspect → submit → monitor**.

## Tool surface and architecture

The server is written in TypeScript and registers each capability as a focused MCP tool. I kept the entry point explicit so the tool surface is discoverable and easy to extend:

```ts
registerGenerateTool(server);
registerBracketStatusTool(server);
registerBracketStatusChartTool(server);
registerSubmitTool(server);
registerOneAndDoneTool(server);
```

Under that, the service layer owns API I/O, local artifact persistence, and response sanitization. That split made the code easier to test and helped me keep the tool handlers thin.

## The status feature that changed the project

Initially, this repo handled generation and submission. The most valuable shift was adding observability through `bracket_status`, then turning that status into a visual artifact with `bracket_status_chart`.

Instead of returning raw data alone, the chart tool produces a Mermaid flowchart with distinct styling for:

- wins
- losses
- pending picks

This made the output dramatically more useful for blog demos, quick sharing, and debugging tournament performance over time.

## API handling and safety

Submission and status calls both require `BRACKET_API_KEY`. I intentionally fail fast when the key is missing so misconfiguration is obvious:

```ts
if (!apiKey) {
  throw new Error("API key missing from the MCP server environment. Set BRACKET_API_KEY in LM Studio mcp.json.");
}
```

I also sanitize payloads before returning them and redact key-like fields so the tool output can be safely surfaced in agent conversations.

## Why this was a useful build

I wanted a realistic MCP example that shows more than one command. This project demonstrates how a small tool suite can guide an agent through a full domain workflow while still keeping boundaries clear:

- MCP tools stay narrow and composable
- service code handles network and data concerns
- visual output (Mermaid) upgrades raw status into quick insight

That design ended up being the biggest takeaway: useful MCP servers are less about one clever tool and more about a coherent sequence of simple ones.
