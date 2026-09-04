---
name: system-handbook
description: Write a system handbook — the end-to-end operating doc for one engineering system — as a single self-contained HTML page with a paged sidebar, worked table rows, one-pass dry runs, and guard rails. Triggers on "system handbook", "write a handbook", "document this system", "create system docs".
argument-hint: "<system name, e.g. billing, ingestion, route-catalog>"
---

# System Handbook

Produce `docs/<system>/index.html` in this repo: one self-contained HTML page
documenting one system so a new engineer can read it end to end. Model it on
`docs/billing/index.html` — copy its CSS/typography/pagination verbatim and
replace the content.

## Ground rules

- **Real rows or nothing.** Every schema table is followed by worked example
  rows pulled from a real (test) tenant, with real ids. Include the tenant/chain
  id column — readers should never wonder what a row is linked to.
- **Name the table on every write.** Any step that mutates state starts with
  "— table: `<name>`". If a step is a no-op in the worked example, say so and
  point at the Before table that proves it.
- **Every rule carries its scar.** A guard, cap, or ordering rule is explained
  by the shipped bug it prevents ("this 409'd on acme_14 when…"), not by
  assertion. If you can't name the scar, question the rule.
- **Plain sentences. No em dashes in customer-facing copy quotes; quote UI copy
  verbatim.**
- **Raw sketches ride along.** When a whiteboard/Excalidraw sketch exists,
  redraw it cleanly AND attach the original as a click-to-open lightbox
  thumbnail ("Raw sketch — click to review"), credited to its author.

## Structure (sidebar groups, one page per link)

1. **The system**: Mental model (glossary tiles: each noun, one sentence, the
   backing table/identifier in mono) · Tables & data model (mermaid ER + the
   division-of-labor bullets) · vendor/dependency quirks · any parent/child or
   ownership concept gets its own page with the WHY (the original bug that
   forced the design).
2. **Core lifecycle** (e.g. invoicing): the end-to-end happy path as a numbered
   list, then the guard(s) that protect it.
3. **History/versioning** (if the system has it): the tables with worked
   before/after rows across one real transition; how "current" is computed.
4. **One-pass dry runs**: the house diagram. Header = the user action + the
   exact API call with its real payload. BEFORE = every affected table's rows.
   STEPS = ordered mutations, each naming its table, with row-level diffs
   (green insert / yellow update / red delete) and cascades called out
   ("Cascade: nightly cron X now…"). AFTER = the resulting rows plus what the
   user sees next.
5. **Deep dives**: state machines, resolvers, async verifications — full depth,
   every edge case annotated with its scar.
6. **Product surfaces**: what the customer sees, with the read-path vs
   write-path data flow diagrams (fetch-once-filter-locally vs
   invalidate-and-rebuild, if applicable).
7. **Reference**: numbered guard rails · API table (method, what it does, what
   it refuses) · runbooks & gotchas (local stack, seeding, env keys) · build
   history timeline.

## Mechanics

- Copy the `<style>`, sidebar/pagination script, lightbox, and one-pass CSS
  from `docs/billing/index.html`. IBM Plex Sans/Mono; light+dark tokens.
- Diagrams are mermaid in `<pre class="mermaid">`; keep nodes SHORT and put
  lists (endpoints, transaction steps) as tables/lists UNDER the diagram, one
  per line — never five endpoints crammed into one node.
- The pagination script waits for mermaid to render before hiding pages; keep
  that ordering or diagrams collapse to zero width.
- Add the new handbook's card to the repo root `index.html`.
- Verify every fact against the code, not memory; where the handbook summarizes
  a spec, link the spec file path.
