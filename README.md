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
