# First Repository

Setup for two CLI npm packages:

- [`@linkedapi/linkedin-cli`](https://www.npmjs.com/package/@linkedapi/linkedin-cli) — an AI-agent-friendly CLI for controlling LinkedIn accounts and retrieving real-time data via [Linked API](https://linkedapi.io).
- [`@p1va/ashby`](https://www.npmjs.com/package/@p1va/ashby) — a CLI for browsing open positions on job boards hosted via [Ashby](https://www.ashbyhq.com/).

## `@linkedapi/linkedin-cli`

### Install

```bash
./setup.sh
```

This runs `npm install -g @linkedapi/linkedin-cli`. Requires [Node.js](https://nodejs.org/) (npm) to already be installed.

Alternatively, install directly:

```bash
npm install -g @linkedapi/linkedin-cli
```

### Authenticate

The CLI needs Linked API tokens (from your [linkedapi.io](https://linkedapi.io) account) before it can run any commands:

```bash
linkedin setup
```

Or non-interactively:

```bash
linkedin setup --linked-api-token=<token> --identification-token=<token>
```

Remove stored tokens at any time with `linkedin reset`.

### Usage

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

## `@p1va/ashby`

### Install

```bash
./setup.sh
```

This installs both packages listed above, including `@p1va/ashby`. To install just this one:

```bash
npm install -g @p1va/ashby
```

No installation is required to try it — it can also be run directly via `npx`:

```bash
npx -y @p1va/ashby <company-slug-or-board-url>
```

### Usage

List all openings on a company's Ashby job board, using either the company slug or the full board URL:

```bash
ashby lovable
ashby https://jobs.ashbyhq.com/lovable
```

View details for a specific job by providing its ID or URL alongside the board:

```bash
ashby lovable 99f4963e7-be14-4dd9-99ce-05df2f06e22d
ashby https://jobs.ashbyhq.com/lovable/99f4963e7-be14-4dd9-99ce-05df2f06e22d
```

Output is human-readable markdown by default. Pass `--json` for machine-parseable output, e.g. to pipe into `jq`:

```bash
ashby lovable --json | jq .
```
