# Microfrontend Shop — Home & Cart

A small, production-minded microfrontend demo that feels like one site while running two independent Next.js apps in separate Docker containers.

[Live Preview](https://kayra-export-task3-rkt6.vercel.app/)

## Overview

Home is the shell and entry point; Cart is a fully standalone app that lives under /cart inside Home and can also be visited directly. Each app ships, scales, and fails independently—yet users get a seamless experience.

## Architecture at a Glance

Pattern: Multi-Zone composition (Home forwards /cart/** to the Cart service; Cart serves under a basePath).

Runtime: Two containers, one per app, on the same Docker network (service-name discovery).

UX: Clean, stable URLs (deep links like /cart/product/42 work both directly and through Home).

Builds: Next.js “standalone” output for lean images and fast cold starts.

## Why This Approach

Team autonomy: Deploy Cart without touching Home (and vice versa).

Resilience: An issue in one app doesn’t take the whole site down.

Clear ownership: Each domain team owns code, runtime, and release cadence.

Predictable URLs: Server-side integration—no brittle client hacks.

## What You’ll See

Home (shell): http://localhost:3000

Cart (direct): http://localhost:3001

Cart via Home: http://localhost:3000/cart

Behavior: Navigating to /cart inside Home transparently reaches the Cart service over the internal Docker network.

## Developer Experience

Independent lifecycles: Separate logs, health checks, and scaling knobs per app.

Simple composition: One reverse-proxy rule in Home; one basePath in Cart.

Ready for CI/CD: Per-service pipelines; safe, incremental rollouts.

## What’s Included

Two Next.js apps (Home, Cart) configured for microfrontend composition.

Image host allow-listing (e.g., Fake Store API) to avoid runtime image errors.

Containerized setup for consistent local and CI environments.

## When to Use It

You want decoupled deployments across teams without sacrificing URL coherence.

You need fault isolation and simpler incident response.

You’re preparing for more MFEs (e.g., /checkout, /profile) with the same pattern.

## Extend It

Add a new microfrontend with its own container and route (e.g., /checkout), wire it into Home’s routing, and ship on its own schedule—no monorepo gymnastics required.

## Tech Stack

Next.js (standalone output)

Docker / Docker Compose

TypeScript