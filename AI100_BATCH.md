One-off job: add these AI figures to Heropedia (https://www.heropedia.org), a public library of AI expert personas that hold "office hours": the hero asks the user hard questions one at a time and leaves one thing to do by Friday. You are one of 13 parallel batches in a push to cover the 100 most prominent people in AI. Your batch number N and your names are given in the task message.

The checked-out repo is the content repo SiliconRoshiBill/heropedia. You only write hero files in this repo, open one pull request, merge it when the validator passes, and notify the owner. Never post, comment, reply or submit anything on any other website, forum or social network. Write only your own names; other batches run in parallel on the other names.

## 1. Learn the standard
Read HERO_STANDARD.md fully, then the reference files founder/ceo-advisor/elon-musk.md, founder/ceo-advisor/jensen-huang.md, founder/ai-leader/ilya-sutskever.md and their .sources.json. Match their structure and tone exactly: **Phenomenon.** / **Essence.** / **Philosophy.** paragraphs; How they think / What they ask / What they push back on; ## Office Hour Questions (5 or 6, each with "- Push until:" and "- Red flags:"); ## Grounding (every bullet ends with [Sn]); ## Sources (no URLs in the body); the disclaimer line.

## 2. Skip duplicates
Run grep -rhi '^hero:' --include='*.md' . | sort -u and ls -R. If one of your names already has a file under any spelling (including group files), skip it and list it in the PR body.

## 3. Write each hero
- Folder: an existing profession/role folder. Defaults: founder/ai-leader for AI lab founders and AI company builders; founder/ceo-advisor for CEOs of large companies; science/research-scientist for researchers and professors; finance/investor for investors; politics/policy-advisor for policy and government figures; writing/writer for authors, critics and podcasters.
- Files: <profession>/<role>/<first-last>.md (lowercase ASCII, hyphens) and the matching .sources.json. Frontmatter: hero, role, profession, author: SiliconRoshiBill, created/updated/upkeep: today's UTC date, description one line of at most 200 characters.
- Research with WebSearch and WebFetch. Prefer primary sources (their own papers, essays, books, talks, long interviews, official transcripts) plus reputable outlets. Every fact and every quote must be confirmed in a page you actually fetched; drop anything you cannot confirm. Direct quotes are at most 25 words and appear verbatim in the cited source. Non-English sources may be used as paraphrase without quote marks unless an official English text exists. Use each person's current role as of today.
- Be factual and neutral about controversies, legal cases, criticism and AI-safety debates: state only what reputable sources say, with sources. No private information about anyone, including family members. Political and policy figures: never campaign or tell the user how to vote.
- At least 3 sources (aim for 5 or 6), each with id, type (book|interview|talk|letter|article|video|paper), title, by, venue, year, https url. Every source cited, every tag defined.
- If a person's public record is too thin to reach 3 confirmed sources, skip them and say so in the PR body.
- If WebFetch is blocked by the network for most source sites, stop and notify the owner: "Heropedia AI-100 batch N: needs Full network access."

## 4. Validate
Run node scripts/validate-hero.mjs on every new file. Fix failures; if a hero still fails, delete its files rather than weaken the content.

## 5. Pull request and merge
- git checkout -b claude/ai100-batch-N; commit "feat(heroes): AI-100 batch N — <names>"; push. If the push or merge conflicts because other batches merged first, git pull --rebase origin main and retry.
- Open a pull request against main with gh pr create (if gh is unavailable or unauthenticated, use the GitHub REST API with any available token). Body: a table of hero, folder, sources, plus anyone skipped and why.
- If node scripts/validate-hero.mjs passes for every file in the PR, squash-merge and delete the branch. Otherwise leave it open.

## 6. Notify the owner
One push notification with the PushNotification tool: "Heropedia AI-100 batch N: added <K> (<names>). <merged | PR open: link>."

Finish with a one-line summary.
