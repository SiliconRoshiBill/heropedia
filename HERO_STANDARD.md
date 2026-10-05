# Hero standard (v2)

Every hero file is a persona that an AI agent loads to hold an **office hour**: the hero asks
the user hard questions one at a time, challenges the premise, and leaves one thing to do this
week. A file is good when it makes that session accurate, specific and useful.

This standard is enforced by `scripts/validate-hero.mjs` and followed by the automated upkeep
that adds new heroes and enriches existing ones every week.

## File layout

```
<profession>/<role-slug>/<hero-slug>.md            the persona (served by the site)
<profession>/<role-slug>/<hero-slug>.sources.json  its sources (not served; for verification)
```

The site indexes only `.md` files, so the sources file never appears as a hero.

## Frontmatter

Flat `key: value` lines between `---` markers.

| Key | Rule |
| --- | --- |
| `hero` | The person's name as commonly written. |
| `role` | The role this file plays (CEO Advisor, Product Critic, ...). |
| `profession` | The folder it lives in. |
| `author` | The original author. **Never changed by upkeep.** |
| `created` | `YYYY-MM-DD`, never changed. |
| `updated` | `YYYY-MM-DD` of the last content change. |
| `upkeep` | `YYYY-MM-DD` of the last automated review (optional). |
| `description` | One line, 200 characters or fewer. |

## Body

The author's own sections come first and keep the author's voice. Upkeep may correct a factual
error in them (with a source) but does not rewrite them. Three sections follow, in this order:

1. **`## Office Hour Questions`**: 5 or 6 numbered questions in the hero's diagnostic voice,
   reflecting this person's documented methods. Each question has two sub-bullets that the
   office-hour skill reads:
   ```
   1. What is the requirement, and who exactly set it?
      - Push until: a named person and their reason.
      - Red flags: "it's standard"; "legal requires it" with no citation.
   ```
2. **`## Grounding`**: the person's documented frameworks and facts the persona relies on.
   Every bullet ends with source tags such as `[S1]`. Direct quotes are 25 words or fewer and
   must appear in the cited source.
3. **`## Sources`**: one line per source, `[S1] Author or speaker, *Title*, venue, year`.
   **No URLs in the body**: the site's editor rejects definitions with more than one link, so
   links live in the sources file.

End with the line: *AI persona based on public writing and interviews; not affiliated with or
endorsed by <hero>.*

## Sources file

```json
{
  "hero": "Elon Musk",
  "role": "CEO Advisor",
  "checked": "2026-10-05",
  "sources": [
    { "id": "S1", "type": "book", "title": "Elon Musk", "by": "Walter Isaacson",
      "venue": "Simon & Schuster", "year": 2023, "url": "https://..." }
  ]
}
```

`type` is one of `book`, `interview`, `talk`, `letter`, `article`, `video`, `paper`. Every `[Sn]`
tag in the body must exist here, and every source here must be cited in the body.

## Content rules

- Public figures with a substantial public record only. Never private individuals.
- Nothing is invented: no made-up quotes, numbers or events. Unsourced claims are removed.
- No private information about anyone. Living people: their documented work and stated
  positions only.
- Health and medical heroes help users prepare questions for their doctor; they never diagnose
  or prescribe, and say so.
- Prefer primary sources (the person's own books, letters, talks, interviews) over summaries.
