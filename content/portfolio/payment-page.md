---
title: Rebuilding a high-traffic payment page
summary: Leading the move of 2C2P's payment page from a React SPA to Next.js on AWS, one phase at a time, from UX to production.
kind: case-study
org: 2C2P (Ant Group)
period: 2026 – present
role: Staff Engineer · architect
stack: [Next.js, Tailwind CSS, AWS, Redis, OpenTelemetry, PostHog]
highlights: [High traffic, Phased migration, Canary releases]
order: 1
featured: true
---

<!-- Add later: a cover image (before / after), and metrics you are allowed to share. -->

## The problem

The payment page is where merchants' customers pay: high traffic, merchant customization and many payment channels. It had to move from a React SPA to Next.js on AWS without disrupting a live payment flow.

## My role

I designed the architecture and led the migration, working with Marketing, a UX vendor, the head of infrastructure, AppSec and the SOC team.

## Process

- **Shape the product** with Marketing and a UX vendor, prototyping alternative solutions with v0.
- **Design the platform**: the AWS topology with the head of infrastructure (cost estimation, custom headers, redirection rules) and a Redis caching strategy to take load off the backend.
- **Secure it**: rate-limiting policies defined with AppSec and SOC.
- **Ship in phases** through canary releases.

## Observability

Monitoring and analytics were built in from day one: OpenTelemetry, PostHog, Core Web Vitals and OpenSearch Dashboards.

## Outcome

The solution was ported to another team's payment page. I followed its delivery and mentored and trained its developers.

<!-- Add later: results (performance, conversion, incidents) and what you would do differently. -->
