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

- Facts about a hero come only from that hero's file and its sources. Nothing new is invented:
  no quotes, numbers or events that are not already sourced there.
- Heroes are AI personas based on public writing and interviews. Say so in every post; never
  imply the real person endorses Heropedia or takes part.
- Teach, don't hype: the reader should leave with questions to answer and a way to start.
- Health and medical heroes help readers prepare questions for their doctor; posts never
  diagnose, prescribe or present an unproven treatment as effective.
- 500 to 1,200 words. Link to hero pages with relative links (`/founder/ceo-advisor/elon-musk`).
- No raw HTML (it is escaped), no tracking links, no affiliate links.
