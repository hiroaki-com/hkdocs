---
title: "Why Obsidian × Claude Code / Codex Keeps Going Viral — Reading Through the Popular Posts of 2026"
authors: [hk]
tags: [claude-code, llm, markdown]
description: "Turning an Obsidian Vault into a working directory for Claude Code / Codex keeps going viral on X. Before trying it myself, I read through the popular posts from January to September 2026 and mapped out where the technique actually stands."
image: /img/obsidian-x-viral-map_01_cover.webp
---

import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';
import XPost from '@site/src/components/XPost';

<GitHubStarLink repo="hiroaki-com/hkdocs" showSupportButton />

I use Obsidian, so posts about Obsidian × Claude Code / Codex catch my eye when they come across my timeline. And since the start of this year they have gone viral again and again, every few months. No single new app is at the center of it, yet the same theme keeps taking off.

I wanted to try it in my own Vault, but each post says something slightly different. Some are only about folder structure, some tell you to install the official skills, and some bring in MCP. Reading them piecemeal, I could not tell what to start with, or even whether these were competing approaches at all.

So before starting, I read straight through the posts that took off between January and September 2026 and put them back in chronological order. The conclusion: they are not competing. The core idea has not changed once since January. What changes is only which layer is put in front — the compilation rules, the official skills, Codex, MCP, the CLI. What follows is that map.

![Title image reading Obsidian×Claude Code, Codex](/img/obsidian-x-viral-map_01_cover.webp)

{/* truncate */}

## How I scoped this

I looked at X posts from January to September 2026 that cover Obsidian × Claude Code / Codex and roughly cleared 100k impressions. Posts about a different stack are excluded. Reposts with the same skeleton are out of scope as a rule, but I kept one as an example of the same content recirculating at a later date.

## The overall arc

There are five waves, and the content is additive rather than a replacement: layers keep getting stacked on the same skeleton.

| Period | What got added |
| --- | --- |
| Wave 0 (Jan–Feb) | The idea gets fixed: make the Vault a working directory |
| Wave 1 (Mar–Apr) | The Karpathy Wiki (raw / wiki / rules) becomes a procedure, in Japanese |
| Wave 2 (May) | Extension into a daily OS, and running Codex alongside |
| Wave 3 (Jun–Jul) | Official skills resurface in Japanese, plus a maturity model |
| Wave 4 (Aug–Sep) | Implementations get cataloged, and the CLI is repackaged |

## Wave 0 (Jan–Feb): the Vault as a working directory

Heinrich was the first to lay out the pattern: treat a knowledge base exactly as you treat a codebase. Folders, conventions, relationships, an agent that can navigate. The human owns direction and quality judgment rather than the implementation (writing notes).

<XPost url="https://x.com/arscontexta/status/2013045749580259680">Post by Heinrich (@arscontexta)</XPost>

The writing rules were concrete.

- Do not push links into footnotes. Weave `[[claims]]` into the sentences so the agent can follow the path of the thinking.
- Make each note stand on its own. If understanding a note requires reading five linked notes, split it.
- Title notes with a claim, not a topic. `quality is the hard part`, not `thoughts on ai slop`. The moment you link it, the title becomes part of a sentence.
- Value notes with many inbound links over orphans. Knowledge is the network, not the node.

On the agent side, the flow is: show the folder structure at startup; use an index with one-line descriptions so candidates can be narrowed without opening every file; read the map-of-content page first, and have the agent append "how to walk this area" to it as breadcrumbs for the next session; always gather context before changing anything; create a new note when an insight falls out of the intersection of two notes; and on every new capture, search for related notes and link them with a stated reason.

`CLAUDE.md` is the philosophy for that specific Vault, with different rules for thinking, work, research, and creative Vaults. Heinrich says his own thinking Vault's file has grown to around 2,000 lines. Markdown is the substance; Obsidian is the window. The human's job is judgment — deciding what survives.

What spread this to the English-speaking side was a single line from Morgan. Not a how-to, just the observation that Claude Code + Obsidian is strong and that you cannot do the same thing in Notion or a notes app. The reason is that the agent can read local, plain Markdown as files.

<XPost url="https://x.com/morganlinton/status/2022156484264833537">Post by Morgan (@morganlinton)</XPost>

The invention at this stage is not a plugin. It is abandoning the chat window and making the Vault the working directory — that is all.

## Wave 1 (Mar–Apr): it becomes something you can build over a weekend

Once Karpathy's LLM Wiki (raw / wiki / rules) is layered on, the idea turns into a procedure. Ryu's post is the Japanese keeper version that reduced it to eight steps.

<XPost url="https://x.com/obsidianstudio9/status/2043873607731024164">Post by Ryu (@obsidianstudio9)</XPost>

1. Create only `raw/`, `wiki/`, and `outputs/` under `my-knowledge-base/`. Do not design a taxonomy up front.
2. Dump articles, screenshots, notes, bookmarks, and PDFs into raw. Quantity over quality; tidy up later.
3. Collect by hand or with a browser agent. Neither is required.
4. Put `CLAUDE.md` at the root. Wiki format, categories, tone, source URLs required, a summary section required, related links at the end — that is enough. No elaborate prompt needed.
5. Launch Claude Code in that folder and have it read raw and write `INDEX.md` plus per-topic pages into wiki. The goal is not tidy copy-paste but building connections between sources.
6. The actual operating loop is "ask a question, then write the answer back into wiki." Do not use chat history as your store.
7. Run a health check monthly. Look for contradictions, missing key topics, and claims without sources.
8. Obsidian is optional. But if you open the generated `.md` files as a Vault, you get the graph and backlinks.

The core claim is that a second brain maintained by a human will inevitably rot. Hand the classification work itself to the agent.

That same month, the UT Claude Code Lab bundled Heinrich, Karpathy, sourfraser, defileo, and kepano into something a beginner could start in 20 minutes.

<XPost url="https://x.com/ClaudeCode_UT/status/2046930094695043199">Post by UT Claude Code Lab (@ClaudeCode_UT)</XPost>

It splits memory into three kinds and puts ① at the center. ① The LLM Wiki (Obsidian × Claude Code) compounds the more you use it, but tokens grow easily. ② NotebookLM is fast but is consumed per project and carries nothing forward. ③ `CLAUDE.md` alone can fix "how to behave" without a Vault.

Setup: create the Vault and first write `Memory.md` (work, projects, tools, goals, decision criteria) and `Home.md` (a table of contents). Folders follow Karpathy's `.raw/` plus wiki; humans do the input, the agent does the structuring. The base layer is `kepano/obsidian-skills` (syntax, CLI, web cleanup) and the applied layer is `AgriciDaniel/claude-obsidian` (`/wiki`, `/ingest`, `/save`, `/autoresearch`, `/canvas`, lint).

Daily use comes down to three moves.

- Put in: drop into raw and ingest. The figures given are 8–15 wiki pages per source and about 12 links per page (self-reported by the poster, not verified).
- Ask: read only the short `hot.md` (about 500 words of recent context) and `index.md` first. Because you never read every page, question cost stays close to constant even with thousands of pages.
- Grow: use `/save` to return conversations to wiki. Lint every 10–15 ingests, or monthly, for broken links, orphans, contradictions, and unsourced claims.

The failure modes are listed too: collecting plugins, designing the perfect folder tree, and fussing over the quality of the first note. On top of that, saving answers also accumulates the wrong ones — which is exactly what lint is positioned to counter.

This is the wave where the unit of virality shifted from a short post to "a long post you save and work through on the weekend." Note that the official pieces did not debut in this wave: the Obsidian CLI shipped in 1.12 at the end of February, and the official Skills already existed at the start of the year. The order is that April's Japanese long-form folded existing parts into a procedure — and not every later post cites them.

## Wave 2 (May): a life OS, and running Codex alongside

Defileo widened PKM into a life OS. The tools do not increase.

<XPost url="https://x.com/defileo/status/2050656413006053793">Post by Defileo (@defileo)</XPost>

Keep everything in one Vault. Cross-link work, finances, health, studies, contacts, investments, goals, projects, dailies, and brand. In the morning, Claude reads the overnight diff and produces changes, priorities, next actions, and draft replies. No parallel calendar, Notion, CRM, journal, habit tracker, and budgeting app. The optimization here is less about folder design than about unifying context — the value is in not re-explaining your premises with every question.

Two posts involving Codex appeared the same month. Ryu's second post describes where Claude Code alone gets stuck, then runs Codex alongside it.

<XPost url="https://x.com/obsidianstudio9/status/2054849745248776318">Post by Ryu (@obsidianstudio9)</XPost>

The sticking points listed are context consumption, usage limits, unreliable skill triggering, and the code-first assumptions. Setup is `codex mcp add obsidian-mcp-tools`, and the division of labor is Codex for lightweight ingests and overnight processing, Claude Code for cross-cutting contradiction detection and Japanese prose, with the official `obsidian-skills` called from both. It is not an argument for dropping either one. This is also the post that frames a year of the author's own operation as Raw / Wiki / Schema (`CLAUDE.md` for Claude, `AGENTS.md` for Codex).

The post from UT Obsidian Otaku is about a different problem: a tidy Vault where the thinking still does not move.

<XPost url="https://x.com/ObsidianOtaku/status/2058665087876165671">Post by UT Obsidian Otaku (@ObsidianOtaku)</XPost>

It is mainly a translation of an overseas article, and it splits the revival procedure into four layers: the entrance (mechanize capture), the night machine (scheduled runs of Codex and the like), the memory layer (Obsidian), and the thinking partner (`CLAUDE.md` and how you ask). Codex here is less a compilation engine than the thing that sorts while you sleep.

This wave split the theme in two: compiling (growing the wiki) and putting it on your daily rails (morning briefings, overnight automation). At the same time it opened up from a Claude-specific topic to local agents in general.

## Wave 3 (Jun–Jul): the official skills resurface, plus a maturity model

Taiyaki's post is not about second-brain philosophy; it is the version that re-spread in Japanese as an installation procedure for the official skills. Its place is in re-delivering them as steps, not in introducing the skills.

<XPost url="https://x.com/taiyaki_ai3/status/2069366310832836683">Post by Taiyaki (@taiyaki_ai3)</XPost>

There are five to install.

| Skill | Role |
| --- | --- |
| `obsidian-markdown` | wikilinks, embeds, callouts, properties |
| `obsidian-bases` | `.base` views, filters, computed fields |
| `json-canvas` | `.canvas` |
| `obsidian-cli` | Vault operations from the terminal |
| `defuddle` | Turn web pages into clean Markdown and cut tokens |

They support Claude Code / Codex / OpenCode. These are Agent Skills (a bundle of `SKILL.md`), not plugins. The point is to keep the agent from breaking the Vault as plain text, moving search, creation, organization, and link repair to the agent side. The "no signup, no API key, MIT licensed" part applies to the skills alone — Claude Code or Codex still needs its own subscription.

Chesny's post, by contrast, is valuable for cutting the condition of how far a plain setup is sufficient. It is also the biggest post in this whole set.

<XPost url="https://x.com/chesny/status/2077344214493319484">Post by Chesny (@chesny)</XPost>

It splits maturity into three stages.

- Stage 0: paste notes into chat. When the conversation ends, so does the memory.
- Stage 1: make the Vault folder the working directory for Claude Code. No plugins, no database, no API. The agent looks at the folder structure, searches with grep / glob, and writes Markdown that follows the frontmatter, wikilink, and folder conventions. The worked example: 180 wiki pages from 78 raw items (papers, articles, docs), of which 83 are concepts and the rest are tools, people, comparisons, and source summaries. On each new input the agent updates references in existing pages, and no wiki page is written by hand.
- Stage 2: MCP. It turns the Vault from "a folder you described" into "a server that declares its own capabilities on connection." Three kinds of things: resources (read note bodies, search results, the backlink graph), tools (create, update tags, structured queries), and prompts (turn "summarize this source and create a wiki page" into a named operation).

The ceiling of the middle stage is spelled out too: rewriting the conventions into the system prompt every time the Vault changes, and rebuilding orphan detection or Dataview equivalents from scratch each time. For a single Vault with a single agent, that stage is enough; move up to MCP when you need multiple agents, multiple Vaults, or operations beyond the level of individual files. It is not a rejection of MCP itself.

I think the numbers peaked here not because it presented a new setup procedure, but because it gave people words for which stage they are currently at. For my own case, this is where it became clear that starting at that first rung is enough.

## Wave 4 (Aug–Sep): cataloging, and repackaging the CLI

Kai's post is a catalog sorting the GitHub implementations into three families.

<XPost url="https://x.com/0xkkai/status/2085838657068347401">Post by kai (@0xkkai)</XPost>

1. Karpathy Wiki: read raw exactly once in its lifetime. Write the extraction into wiki and have every later question look only at wiki. The repos claim a 70–90% cut in re-search tokens. Representative implementations are `AgriciDaniel/claude-obsidian` and the more purist `ekadetov/llm-wiki`.
2. Skills: read only the description at startup and the body only when triggered. The official one is `kepano/obsidian-skills` (Claude Code / Codex / OpenCode).
3. MCP: a live bridge. Separate read-only (safe, search) from read-write (overnight maintenance). If it depends on an Obsidian plugin, go through the API (`iansinnott/obsidian-claude-code-mcp`); with plain Markdown, reading files directly is enough.

The conclusion is: do not install ten of them. One compiler (the wiki family), one bridge (the MCP family). The branches: if you have 500+ existing notes and maintenance is not happening, take a heavier one with a scheduler; for a precious archive, a write-blocked MCP; for a new, empty Vault, the fastest path is claude-obsidian, ingesting one file and looking at the graph. As a footnote, it separates out plugins that layer AI on top of existing workflows (Smart Connections and the like), and setups that merely RAG over raw without compiling it.

Machina specialized the personal wiki into GTM knowledge for a business.

<XPost url="https://x.com/EXM7777/status/2089714608244457543">Post by Machina (@EXM7777)</XPost>

- Make folders the units the business already knows: offer, buyer, voice, market map, workflow, prospect, signal, message, metric, and so on.
- One fact per note, 50–150 words. Titles are sentences you can say out loud. Frontmatter is four fields: type / tags / created / status.
- Every note links to its folder hub, two siblings, and one note in another folder. No islands.
- Keep corrections to the agent in `rulings/`, one dated line each, and make it read them before the next draft. Do not repeat the same correction out loud.
- Claude Code reads the hub first and greps rulings before writing. Lessons go back into notes the same day.

The operational touch I liked: color the graph by folder, and treat pale clusters around a white hub as the area that will break next.

The UT Claude Code Lab reposted April's skeleton. The picture is a six-year, 4,000-note Vault run overnight: 340 orphans connected, 18 contradictions found, 6 drafts produced, and nightly tagging from then on. That said, this is not the Lab's own experiment — it is presented secondhand, as something someone did. Preparation is just a path and a `CLAUDE.md` of about 400 words.

<XPost url="https://x.com/ClaudeCode_UT/status/2093564303484039505">Post by UT Claude Code Lab (@ClaudeCode_UT)</XPost>

Most recently, 0xMarioNawfal repackaged the Obsidian CLI as a short video.

<XPost url="https://x.com/RoundtableSpace/status/2094723185904365880">Post by 0xMarioNawfal (@RoundtableSpace)</XPost>

Create, search, and update from the terminal without opening the app UI. The official skills handle correct syntax and the CLI reaches app features, which puts this on the execution layer of kepano's four-piece set (app / Web Clipper / CLI / Skills). Since late August, the short posts have felt less like new ideas and more like repackaging of the official Skills plus the CLI.

## The four layers that remain

Read end to end, it is clear the substance is not a new app. Put local Markdown at the center of your store and hand its organization and re-reading to Claude Code / Codex. Take classification, upkeep, and re-explaining your premises off the human's plate, and leave only what to feed in, what to keep, and how not to write errors back.

Stacking the posts together, the design that remains comes out as four layers. Not all twelve take this shape — Heinrich and Defileo do not require the raw / wiki split.

| Layer | Role |
| --- | --- |
| Rules | `CLAUDE.md` / `AGENTS.md`. Per-Vault policy and prohibitions |
| Material | `raw/`. Dump-only, read-only in principle |
| Knowledge | `wiki/`. Linked pages. Answers to questions get written back here |
| Tools | Official Skills (syntax) → reading files directly → CLI / MCP if that is not enough |

What actually makes the difference is not the tool names but three things: not making the agent re-read raw (kai's claimed 70–90% cut in re-search tokens), not leaving wrong answers in wiki (the Lab's lint, Machina's rulings), and fixing syntax with the official skills (the `obsidian-skills` Taiyaki covered).

## Conclusion: the design worth adopting right now

The bigger a post got, the more it was a restatement of an existing idea rather than a new technique. Heinrich, Karpathy, and kepano put out the parts; Japanese long-form turned them into procedures; and since summer it has reignited through repo comparisons and the CLI. Because the center — treat Markdown as the agent's working directory — has never once changed, it keeps reaching new readers and going viral again.

With that in mind, if I were starting today, it comes down to three choices.

First, start by having the agent open the Vault folder as it is. No plugins and no MCP to begin with. As long as one person is using one Vault, letting it read the folder structure and search with `grep` is enough. Adding configuration can wait until you want to work across several agents or several Vaults.

Second, do not let it re-read the material you have ingested. Separate where the source documents live from the knowledge pages written up from them, and point every later question only at the latter. If you skip the split and have everything read every time, each question gets heavier as the Vault grows. Over the long run, this structure — cutting re-reads of raw material — is what pays off most.

Third, put the mechanisms that keep errors from being written back in place before you start operating. Storing conversational answers into pages accumulates the wrong ones just as fast as the right ones. A periodic sweep for broken links, orphans, contradictions, and unsourced claims, plus a record of corrections to the agent, one line each, read before the next task. These two are the ones you cannot catch up on once the pages pile up.

The flip side is equally clear about what can wait: the perfect folder design, the quality of the first note, and the number of tools. The finer points of syntax can be left to the official skills, and MCP can be added when it is actually needed.

Based on this survey, I plan to work it down into a design that fits me.

---

#### References | Sources

This article organizes the content of the X posts below.

- [Heinrich (@arscontexta)](https://x.com/arscontexta/status/2013045749580259680) — the origin of treating a knowledge base as a codebase.
- [Morgan (@morganlinton)](https://x.com/morganlinton/status/2022156484264833537) — the trigger for the spread into English.
- [Ryu (@obsidianstudio9)](https://x.com/obsidianstudio9/status/2043873607731024164) — the Karpathy Wiki in eight weekend steps.
- [UT Claude Code Lab (@ClaudeCode_UT)](https://x.com/ClaudeCode_UT/status/2046930094695043199) — a 20-minute starter manual, and lint.
- [Defileo (@defileo)](https://x.com/defileo/status/2050656413006053793) — a life OS consolidated into one Vault.
- [Ryu (@obsidianstudio9)](https://x.com/obsidianstudio9/status/2054849745248776318) — dividing work between Claude Code and Codex, and Raw / Wiki / Schema.
- [UT Obsidian Otaku (@ObsidianOtaku)](https://x.com/ObsidianOtaku/status/2058665087876165671) — the entrance / night machine / memory layer / thinking partner — four layers.
- [Taiyaki (@taiyaki_ai3)](https://x.com/taiyaki_ai3/status/2069366310832836683) — installing the five official Agent Skills.
- [Chesny (@chesny)](https://x.com/chesny/status/2077344214493319484) — the stage 0 / 1 / 2 maturity model and when to move to MCP.
- [kai (@0xkkai)](https://x.com/0xkkai/status/2085838657068347401) — comparing the Wiki / Skills / MCP architectures.
- [Machina (@EXM7777)](https://x.com/EXM7777/status/2089714608244457543) — specializing into GTM knowledge, and `rulings/`.
- [UT Claude Code Lab (@ClaudeCode_UT)](https://x.com/ClaudeCode_UT/status/2093564303484039505) — the repost: 4,000 notes organized overnight.
- [0xMarioNawfal (@RoundtableSpace)](https://x.com/RoundtableSpace/status/2094723185904365880) — repackaging the Obsidian CLI.


<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" showSupportButton />
