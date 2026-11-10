---
name: github-cli-routine
description: 'Use when preparing a GitHub repository, creating quantified issues, and publishing files with gh and git. Requires human approval before public changes.'
---

# GitHub CLI Publishing Routine

Use this workflow for a new repository with issues and files that need to be published. Follow the installed `gh` version's help; do not guess flags.

## Safety and approval

- Before creating a repository, issue, or public commit, tell the human the exact owner/repository, what will be published, who can see it, and how it can be undone. Wait for explicit approval.
- Treat a public repository and its issues as visible to everyone. Do not copy raw reports, credentials, or personal data into issue bodies unless the human explicitly approves that disclosure and it is necessary.
- Never print or copy authentication tokens. Use `gh auth status` only to confirm sign-in.

## Routine

1. Check the installed CLI and sign-in state:
   - `gh --version`
   - `gh auth status`
2. Read the relevant command help before using flags:
   - `gh repo create --help`
   - `gh issue create --help`
3. Check whether the planned repository name is already in use:
   - `gh repo view OWNER/REPO --json nameWithOwner,visibility,url`
4. After the human approves a public repository, create it:
   - `gh repo create OWNER/REPO --public --description "..."`
5. Create one issue per distinct problem. Include the evidence, a reproducible problem summary, and the number of unique reports it covers; avoid reporter-identifying text:
   - `gh issue create --repo OWNER/REPO --title "..." --body-file -`
   - Pass the body through standard input, then save the returned issue URL.
6. Verify what GitHub accepted:
   - `gh repo view OWNER/REPO --json nameWithOwner,visibility,url`
   - `gh issue list --repo OWNER/REPO --state open --json number,title,url`
7. After local files are ready, stage and commit only the intended deliverables, add the approved remote, push, and verify the repository and issue URLs again. Do not use global Git identity settings for a one-repository task.
8. Close issues only when the task says the work is done. Read `gh issue close --help` and `gh issue reopen --help` first. Use `completed` for a fix that shipped and `not planned` for a decision not to fix; verify each state with `gh issue view`.
9. Record the repository URL, issue URLs, and any local preview path in the handoff. If the course accepts the work, the human may delete the repository; closing an issue is not the same as erasing its public history.
