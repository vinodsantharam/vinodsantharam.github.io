---
title: A shared React component library
summary: A Tailwind CSS and shadcn/ui component library, published as a registry so every app in the monorepo builds from the same pieces.
kind: case-study
org: 2C2P (Ant Group)
period: 2025 – 2026
role: Team Lead
stack: [React, Tailwind CSS, shadcn/ui, Turborepo, Next.js]
highlights: [Design system, Publishing pipeline]
order: 2
---

<!-- Add later: screenshots of the components and of the registry. -->

## The problem

Several Next.js apps lived in Turborepo monorepos. Without a shared library, each one would rebuild the same UI and drift apart.

## What I built

A React UI component library on Tailwind CSS and shadcn/ui, with its own publishing pipeline as a registry, so teams install components the same way they install shadcn/ui.

<!-- Add later: a "## Process" section (how components were chosen, reviewed and documented) and an "## Outcome" section (adoption across apps and teams). -->
