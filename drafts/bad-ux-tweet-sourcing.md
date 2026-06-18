# Tweet sourcing — "Bad UX Is Technical Debt"

Working doc (NOT published — lives outside `content/`, so it's never built into the site). Fill these slots with **real** tweets you find. Do not invent tweets or URLs; a dead/fake link costs the whole post credibility.

## How to embed once you have a real tweet

Match the pattern already used in `content/blog/state-of-coding-june-2026.md` (lines ~35 / ~68): a screenshot/SVG card that links to the actual status.

```markdown
[![<handle> on X: "<verbatim tweet text>"](/some-tweet.svg)](https://x.com/<handle>/status/<id>)
```

- Drop the image asset in `public/` (SVG card or a `.jpg` screenshot — both are used already).
- Alt text = the real, verbatim tweet text, prefixed with the handle. Keep it accurate.
- The link must be the real `x.com/.../status/...` URL.
- Send me the tweet(s) and I'll render the card + wire it in.

## Best slots in the post (in order of impact)

1. **"I made the tree unnecessary" — deletion payoff.**
   Reinforce: less code is the win; deleting beats optimizing. Currently anchored by the Jeff Atwood "best code is no code" quote — a tweet echoing it would pair well, not duplicate.
   Search leads: "best code is no code", "deleted code is debugged code", "the best line of code is the one you didn't write", Jeff Atwood / @codinghorror.

2. **"The dev's bill" — the causal chain.**
   Reinforce: UI/UX constraints leaking into architecture; perf hacks (virtualization, fixed heights) as a smell. A gripe-tweet about treeviews / list virtualization / fixed-height rows would land right under the causal-chain diagram.
   Search leads: "list virtualization fixed height", "treeview is the wrong component", "react-window fixed row height pain".

3. **"Bad UX is technical debt" — the close.**
   Reinforce: UX decisions are architecture decisions / Conway's-Law-for-interfaces. Already anchored by the Conway's Law citation; a sharp tweet stating "UX is engineering" or "your UI shapes your data model" would be a strong final beat.
   Search leads: "UX is engineering", "the interface shapes the data model", "frontend is not just styling", Conway's Law threads.

## Notes

- The post already carries 2 GIFs, 2 SVG diagrams, and 3 attributed quotes (Jobs, Atwood, Conway). It does **not** need a tweet to be complete — only add ones that genuinely sharpen a beat. One or two, max.
- If you'd rather not chase tweets, the post stands on its own; this is purely optional enrichment.
