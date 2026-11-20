---
title: Redis Pane
summary: An open-source terminal UI that makes digging into Redis data easy — browse the keyspace, watch a key change live, edit it safely.
kind: open-source
org: Open source
period: 2026 – present
role: Creator & maintainer
stack: [Terminal UI, Redis, Claude Code]
highlights: [Keyboard-first, Safe by default]
order: 4
links:
  - label: GitHub
    href: https://github.com/redis-pane/redis-pane
  - label: Documentation
    href: https://redis-pane.github.io/redis-pane/
---

<!-- Add later: a GIF of the UI. -->

## Why

redis-cli runs commands. Redis Pane is for exploring data.

## Designing the experience

- Keys stream in and stay usable while they load, in a tree or flat view with filter and sort, and a dedicated view for each Redis type.
- Keyboard-first and at home in any terminal: works over SSH, fits down to 80×24, and brings back your layout and selected key on relaunch.

## Safety rules

Every write shows its exact command before it runs, and production targets open read-only. Live updates are pushed by the server, with a visible warning if they ever stop.

## How it was built

I directed the build with Claude Code, with CI, a million-key performance test and beta releases keeping it honest, and wrote the documentation site and the guides for beta testers.
