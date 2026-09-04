# Loop Handbooks

System handbooks for Loop's engineering systems — the doc a new engineer reads
end to end before touching a system. One handbook per system, published as a
single self-contained HTML page with a paged sidebar.

**Live site:** deployed on Vercel; each handbook lives at `/docs/<system>/`.

## What a handbook is

Not an API reference and not a design doc — the operating manual between them.
Every handbook follows the same skeleton (see the bundled skill):

1. **Mental model** — the system's nouns, as glossary tiles.
2. **Tables & data model** — schemas AND worked example rows from a real chain.
3. **Vendor / dependency quirks** — the facts that cost real hours.
4. **Flows** — reading vs changing, as diagrams; raw whiteboard sketches attach
   as click-to-open originals next to the redrawn version.
5. **One-pass dry runs** — the house diagram style: one real operation, the
   BEFORE tables, every mutation step naming the table it writes, the AFTER
   tables, with row-level diffs highlighted.
6. **Deep dives** — the state machines and edge cases, each rule annotated with
   the shipped bug it prevents.
7. **Guard rails** — the numbered never-break list.
8. **API reference, runbooks, build history.**

## Add your handbook

1. Open this repo in Claude Code and run `/system-handbook <your system>` —
   the skill walks the structure above and produces `docs/<system>/index.html`.
2. Add a card for it in `index.html`.
3. PR to `main`; Vercel deploys on merge.

## Authors

Created and maintained by **Sanshray Langeh** ([@sansh72](https://github.com/sansh72)).
First handbook: Self-serve Billing, Invoicing & Era History.
