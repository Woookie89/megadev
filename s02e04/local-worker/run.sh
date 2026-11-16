#!/usr/bin/env bash
# Local worker for job 2 (voice-to-memo): a headless Claude Code session whose only
# tools are the job's MCP server and the Skill tool. The job link stays in a
# git-ignored file.
set -euo pipefail
cd "$(dirname "$0")"
node -e '
  const s = require("../secrets.local.json")["job-2"];
  require("fs").writeFileSync("mcp.secrets.local.json",
    JSON.stringify({ mcpServers: { job: { type: "http", url: s.url } } }, null, 2));
'
CLIP=$(node -e 'console.log(require("../secrets.local.json")["job-2"].clip)')
claude -p "$(sed "s|{{CLIP}}|$CLIP|" prompt.md)" \
  --mcp-config mcp.secrets.local.json --strict-mcp-config \
  --tools "Skill" --allowedTools "mcp__job" "Skill" \
  --output-format stream-json --verbose > transcript.local.jsonl
node -e '
  const lines = require("fs").readFileSync("transcript.local.jsonl","utf8").trim().split("\n");
  const last = JSON.parse(lines[lines.length-1]);
  console.log(last.result ?? JSON.stringify(last));
'
