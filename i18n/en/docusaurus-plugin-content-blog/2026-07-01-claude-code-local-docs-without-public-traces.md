---
title: "Keeping Claude Code Docs Out of the Public Repo with .git/info/exclude — A Design Log on Exclusion and History Management"
authors: [hk]
tags: [claude-code, llm, git, 個人開発, 運用]
---

import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<GitHubStarLink repo="hiroaki-com/hkdocs" showSupportButton />


When I introduced Claude Code into a personal OSS repository I develop and maintain on my own, a requirement emerged: I wanted to keep the AI-related settings and documentation out of the public repository and operate them locally only. In this post, I focus on the two topics I spent the most time considering — the use cases for exclusion settings, and the design of history management, which tends to become scattered in AI-assisted workflows.

:::info[Context and Assumptions]
The target is a solo-developed (personal OSS) repository, with branch protection requiring PRs and CI already configured on `main` / `develop`. Claude Code is used from within the editor, and the main tasks are refactoring, writing articles, and improving features — repetitive work that mostly stays local.
:::

<!-- truncate -->

### 1. Exclusion Settings and a Look at Their Use Cases

In modern software development that assumes the use of LLMs, there is an active debate about whether the system specification and the specs/context an LLM references during implementation should be managed separately. The idea is to treat the system specification as the single source of truth that defines "what to build" (requirements, design, behavior), while treating the LLM-facing specification as auxiliary context that organizes "how to interpret and implement it" (implementation rules, constraints, naming conventions, prohibitions, and so on). It has not yet become an industry standard, but at development sites that make use of AI agents, a document design that separates roles between human-facing and LLM-facing material is drawing attention as a promising approach.

Given this separation, LLM-facing auxiliary context such as `CLAUDE.md` does not necessarily have to live alongside the repository, which is the source of truth for the system. For personal development, it felt natural to keep this locally while leaving no trace of it in the public repository. The question was which mechanism to use to achieve that "leaving no trace."

Git has several mechanisms for ignoring files, each with a different scope.

- `.gitignore` applies to the whole repository and is committed and shared with everyone. It is the place to list things everyone should ignore, such as build artifacts and dependencies.
- `.git/info/exclude` applies only to this clone and is not committed. Use it for files you alone want to ignore, or that you do not want to make public.
- `core.excludesFile` (global setting) applies to every repository on the machine. It is meant for OS- or environment-specific files such as `.DS_Store` and editor settings.
- `git update-index --skip-worktree` is used when you want to ignore local changes to a file that is already tracked (it cannot be used for untracked files).

When I broke down this requirement into "want to ignore," "do not want to make public," "specific to this repository (not to be spread globally)," and "the target is a still-untracked file," the only mechanism that satisfies all of them at once was `.git/info/exclude`. `.gitignore` is ruled out because it gets published, `core.excludesFile` because it spreads to every repository, and `skip-worktree` because it cannot be used for untracked files.

As a side note, one option is to write `CLAUDE.md` or `.claude/` into `.gitignore`, but that exclusion setting itself remains in the public repository and becomes a trace that says "this repository uses AI tools." Not wanting to publish the ignore setting itself was the deciding factor here.

`.git/info/exclude` is a local-only exclusion setting that uses the same syntax as `.gitignore` but, because it lives inside `.git/`, is never committed or pushed. I targeted the convention files of the major AI tools together.

```gitignore title=".git/info/exclude"
# --- AI tooling (local only, never committed) ---
CLAUDE.md
CLAUDE.local.md
.claude/
AGENTS.md
GEMINI.md
COPILOT.md
.cursor/
.github/copilot-instructions.md
```

With this, the files above become both untracked and ignored, and even running `git add .` will not stage them by mistake. Being able to prevent contamination at the Git layer is the advantage of this approach.

On the other hand, because `.git/info/exclude` is a setting inside `.git/`, it is not included in clones of the repository. When working on another machine or after a fresh clone, this setting has to be re-created by hand. That is a trade-off to accept as the flip side of it not being public.

### 2. Designing History Management

In AI-assisted development, history — what was changed, what conversations took place, what the AI learned, and why decisions were made — tends to become scattered across Git, session logs, memory, and notes at hand. I split this into four layers and assigned each to an existing mechanism, minimizing what had to be newly built.

Layer A is code and content changes. It is the single source of truth for what was changed, and Git's commit history serves as its substance directly. I keep the granularity and intent aligned with Conventional Commits (`feat:`, `fix:`, `docs:`, and so on) so it is easy to trace later. This is the only history that gets published.

Layer B is conversational continuity. I leave this to Claude Code's native session features (`--resume`, `--continue`, `/export`, and so on). Session logs are stored locally under `~/.claude/projects/<proj>/` and retained for a set period by default. The retention period can be extended in the settings, and giving a session a topic name at startup makes it easier to find later.

Layer C is learning and preferences. This too is left to Claude Code's native auto memory. Preferences and recurring conventions are automatically recorded and referenced by the AI, so there is no need to manage them explicitly — being able to audit the contents is enough.

Layer D is the trail of decisions and work. This is the only layer that the existing mechanisms cannot capture, so I curate it by hand. Even so, I keep it lightweight: the rationale for design decisions (ADRs) is collected in the "Design Decisions" chapter of the design specification, and day-to-day work is recorded as a single entry per session appended to an append-only log file. The granularity of the work log is three items: "Work / Verification / Next time."

```markdown title="worklog.md (format of a single entry)"
## YYYY-MM-DD  <session-name>
- Work: what was done (target, scope)
- Verification: typecheck / build / git status, etc.
- Next time: follow-ups (or "none")
```

Of the four layers, A through C can use existing mechanisms as they are, so the only thing I newly prepared was the single work-log file in D. My conclusion this time was that history management for AI-assisted work is less likely to break down when you assign roles to layers that already exist than when you add new mechanisms. Note that the D-layer files are also included in the exclusion settings; they are not tracked by Git and do not propagate to clones, so if long-term preservation is needed, I consider a separate backup.

### Summary

For exclusion settings, I arrived at the conclusion that the only mechanism satisfying "ignore it / do not publish it / specific to this repository / untracked" all at once is `.git/info/exclude`, and that its role differs from `.gitignore` and the global setting. I think it also meshes naturally with the recent trend of separating the system specification from the LLM-facing specification.

For history management, I split history into four layers, assigned A through C to the native features of Claude Code and Git, and narrowed the newly prepared part down to a single work-log file in layer D. By assigning to existing layers rather than adding new mechanisms, I feel I was able to settle on a minimal setup that fits personal development.

---

#### References | Sources

The design in this article draws on the ideas and formats of the following documents and articles.

- [gitignore - Git Documentation](https://git-scm.com/docs/gitignore) — The official reference that, in addition to the `.gitignore` syntax, lays out the precedence of ignore mechanisms such as `$GIT_DIR/info/exclude` and `core.excludesFile`.
- [Pro Git - Ignoring Files](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository) — The relevant chapter of the official book, which explains how to use ignore settings (shared / local / global) with concrete examples.
- [Claude Code settings](https://docs.claude.com/en/docs/claude-code/settings) — The official settings documentation that underpins local operation, covering the placement of `CLAUDE.md` / `.claude/`, sessions, memory, and more.
- [Conventional Commits](https://www.conventionalcommits.org/en/) — The specification of the commit message convention adopted in layer A.
- [Architecture Decision Records (adr.github.io)](https://adr.github.io/) — The ideas and template collection for lightweight recording of design decisions, referenced in layer D.


<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" showSupportButton />
