# Blog standard

Posts in `blog/` are served at https://www.heropedia.org/blog/<slug>. Each post helps a reader do
one thing: hold a useful office hour with a hero in their own AI.

## File

`blog/<slug>.md`, slug in lowercase words joined by hyphens. Flat frontmatter:

| Key | Rule |
| --- | --- |
| `title` | Plain, specific, under 70 characters. Name the hero when the post is about one. |
| `description` | One sentence, under 160 characters. Shown in search results. |
| `date` | `YYYY-MM-DD`. Posts dated in the future stay hidden until that day. |
| `author` | `Heropedia`. |
| `hero` | Optional hero id, e.g. `founder/ceo-advisor/elon-musk`. The post ends with that hero's office-hour block. |

No `# H1` in the body (the page renders the title). Use `##` sections.

## Content rules

- Facts about a hero come from that hero's file and its sources, or from news you link in the
  post. Nothing is invented: no quotes, numbers or events without a source.
- Link the news. When a post says why someone matters now (a launch, a deal, a new role, a
  speech), link the sentence to the original reporting or announcement: a reputable outlet or
  the company's or person's own page, not an aggregator. Only link pages you actually opened,
  and only state what that page says.
- Link people to LinkedIn. The first time the post names a real person who has a public
  LinkedIn profile, link the name to it (`https://www.linkedin.com/in/...`). Link only a profile
  you are sure is theirs: name and current role match, ideally reached from their official site
  or company page. If unsure, leave the name unlinked; never guess a URL.
- Heroes are AI personas based on public writing and interviews. Say so in every post; never
  imply the real person endorses Heropedia or takes part.
- Teach, don't hype: the reader should leave with questions to answer and a way to start.
- Health and medical heroes help readers prepare questions for their doctor; posts never
  diagnose, prescribe or present an unproven treatment as effective.
- 500 to 1,200 words. Link to hero pages with relative links (`/founder/ceo-advisor/elon-musk`).
- External links are https and point at the source itself. No raw HTML (it is escaped), no
  tracking parameters (strip `utm_*` and similar), no affiliate links.
