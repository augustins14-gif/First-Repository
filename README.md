# First Repository

Setup for the [`@linkedapi/linkedin-cli`](https://www.npmjs.com/package/@linkedapi/linkedin-cli) package — an AI-agent-friendly CLI for controlling LinkedIn accounts and retrieving real-time data via [Linked API](https://linkedapi.io).

## Install

```bash
./setup.sh
```

This runs `npm install -g @linkedapi/linkedin-cli`. Requires [Node.js](https://nodejs.org/) (npm) to already be installed.

Alternatively, install directly:

```bash
npm install -g @linkedapi/linkedin-cli
```

## Authenticate

The CLI needs Linked API tokens (from your [linkedapi.io](https://linkedapi.io) account) before it can run any commands:

```bash
linkedin setup
```

Or non-interactively:

```bash
linkedin setup --linked-api-token=<token> --identification-token=<token>
```

Remove stored tokens at any time with `linkedin reset`.

## Usage

```bash
linkedin --help
```

Key command groups:

| Topic | Description |
|---|---|
| `account` | Manage connected LinkedIn accounts |
| `person` | Fetch and search LinkedIn profiles |
| `company` | Fetch and search LinkedIn companies |
| `connection` | Manage LinkedIn connections |
| `message` | Send and retrieve LinkedIn messages |
| `post` | Manage LinkedIn posts |
| `comment` | React to and reply to LinkedIn comments |
| `feed` | Retrieve posts from your LinkedIn home feed |
| `inbox` | Get messages from the monitored inbox across all conversations |
| `network` | Get connection events from the monitored network |
| `jobs` | Fetch and search LinkedIn jobs |
| `navigator` | Sales Navigator operations |
| `stats` | Retrieve LinkedIn statistics |
| `workflow` | Execute custom workflows |
| `admin` | Manage subscription, accounts, and limits |

Run `linkedin <topic> --help` for the commands available under each topic.

## Apify LinkedIn Jobs MCP Server

This repo also wires up the [LinkedIn Jobs MCP Server](https://apify.com/shahidirfan/linkedin-jobs-mcp-server) — an Apify Actor that exposes LinkedIn job search (title, location, remote/experience filters, salary, etc.) as MCP tools, so any MCP client (Claude Code, Claude Desktop, ...) can query live LinkedIn job postings.

### Configure

1. Get an API token from your [Apify Console](https://console.apify.com/settings/integrations) account (the actor's free tier includes a limited number of searches/month; usage beyond that is billed through your Apify account).
2. Export it as an environment variable before starting your MCP client:

   ```bash
   export APIFY_API_TOKEN=<your-apify-token>
   ```

3. Both servers are already registered for this project in [`.mcp.json`](./.mcp.json):

   ```json
   {
     "mcpServers": {
       "linkedin-jobs": {
         "type": "http",
         "url": "https://shahidirfan--linkedin-jobs-mcp-server.apify.actor/mcp?token=${APIFY_API_TOKEN}"
       },
       "linkedin-jobs-advanced": {
         "type": "http",
         "url": "https://mcp.apify.com/?tools=curious_coder/linkedin-jobs-search-scraper&token=${APIFY_API_TOKEN}"
       }
     }
   }
   ```

   Claude Code picks these up automatically for the project once `APIFY_API_TOKEN` is set. For Claude Desktop or other clients, copy the same `mcpServers` entries into their config file, substituting your token directly if the client doesn't support `${VAR}` expansion.

### Use

Once connected, ask your MCP client to search LinkedIn jobs in natural language (e.g. "find remote senior backend engineer roles posted this week"); the client calls the actor's MCP tools to fetch and filter live listings.

### `linkedin-jobs-advanced`

[Advanced Linkedin Job Scraper](https://apify.com/curious_coder/linkedin-jobs-search-scraper) (`curious_coder/linkedin-jobs-search-scraper`) is a second Apify Actor for LinkedIn job search, wired up via Apify's universal MCP gateway ([`mcp.apify.com`](https://mcp.apify.com)) rather than a dedicated MCP actor. The `tools=` query param pins the gateway to just this actor. It uses the same `APIFY_API_TOKEN` as `linkedin-jobs` above — no separate setup needed — but runs are billed separately per the actor's own pricing on your Apify account.
