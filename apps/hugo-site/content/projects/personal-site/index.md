---
title: 'Project: Personal Website Re-architecture'
date: 2026-04-01
categories: ['engineering', 'webdev']
caption: 'From Jekyll to Hugo and monorepos'
description: 'A technical showcase of migrating a legacy Jekyll site to a modern, Nx-orchestrated Hugo monorepo.'
links:
  - title: Repository
    url: https://github.com/iboutsikas/iboutsikas.github.io
---

## Overview

This project represents a complete architectural overhaul of my personal
website. The goal was to migrate away from a legacy, plugin-dependent Jekyll
setup toward a high-performance, modular system built on modern web primitives.

By leveraging a monorepo structure, I have unified a heterogeneous stack of
technologies (ranging from Go-based static site generation to TypeScript-based
Web Components) into a single, cohesive development workflow.

## The Catalyst: Moving Beyond Legacy Constraints

My previous site was built on Jekyll, utilizing a premium theme. While the theme
worked and was aesthetically pleasing, Jekyll quickly became a bottleneck for
development. As the ecosystem aged, the friction grew:

- **Rigid Tooling**: Integrating custom logic required navigating legacy code
  and complex plugin architectures.
- **Plugin Fragility**: Relying on a web of outdated or unsupported plugins (why
  do I need to mess with plugins for pagination in 2026?) created a fragile
  build environment.
- **Developer Experience**: The lack of granular control over the build process
  made experimentation difficult and slow.

I set out to build a system where I owned the entire stack, prioritizing speed,
modularity, and the ability to experiment with emerging web standards without
compromising the stability of the site.

## The Architectural Stack

The new architecture is built upon four core pillars:

1. **[Hugo](https://gohugo.io/)**: Chosen as the engine for its industry-leading
   build performance and robust handling of content relations and pagination out
   of the box.
2. **[Web
   Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)**:
   Used to encapsulate complex UI logic into framework-agnostic, reusable
   modules that exist independently of the site generator.
3. **[View
   Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)**:
   Implemented to bridge the gap between Multi-Page Applications (MPA) and
   Single-Page Applications (SPA), providing seamless, high-fidelity navigation
   animations.
4. **[Agentic Coding](https://opencode.ai/)**: Utilizing a local deployment of
   LLMs to assist with planning and implementation.

## Engineering Deep Dives

The following technical deep dives explore the implementation details of the
core modules developed for this project.

### [The Custom Router (`@iboutsikas/router`)]({{< ref "posts/website/seamless-spa-router-lit-view-transitions" >}})

To achieve SPA-like fluidity within a Hugo-generated MPA, I developed a custom
router using Web Components. The router intercepts same-page navigation
requests, performs an asynchronous content swap, and leverages the **View
Transition API** to animate the transition between states. This allows for a
highly interactive user experience while maintaining the SEO and performance
benefits of a static site.

You can read more in [this deep dive]({{< ref "posts/website/seamless-spa-router-lit-view-transitions" >}}).

### [The Interactive Coverpage (`@iboutsikas/coverpage`)]({{< ref "posts/website/gesture-driven-web-components-lit-rxjs" >}})

This module demonstrates the power of encapsulated Web Components. The
`@iboutsikas/coverpage` component allows for the placement of interactive,
draggable UI elements on any side of the viewport. It handles its own state,
lifecycle, and event orchestration, providing a highly polished user interface
that remains completely decoupled from the site's core HTML structure.

You can read more in [this deep dive]({{< ref "posts/website/gesture-driven-web-components-lit-rxjs" >}}).

## Orchestration: The Nx Monorepo

A key technical challenge was managing a heterogeneous environment. I chose
**Nx** to orchestrate the entire lifecycle of the project.

While typically used for JavaScript/TypeScript ecosystems, I utilized Nx to
bridge the gap between the Go-based Hugo build and the Vite-driven Web Component
builds. This setup provides:

- **Unified Workflow**: A single command (`nx build site`) orchestrates the
  entire dependency graph, building the Web Components before triggering the
  Hugo site generation.
- **Modular Dependency Management**: Shared logic is housed in specialized
  packages, allowing the website to treat its UI components as versioned,
  reusable modules.
- **Optimized Execution**: Nx manages the task execution, ensuring that only
  affected projects are rebuilt, significantly reducing iteration time.

## Agentic Workflow: Local LLM Integration

To augment the development process, I utilized a local LLM deployment. This
allowed for iterative development and code reviews without relying on external
APIs.

**Technical Stack:**

- **Models**: Gemma 4 (26B-A4B, 4-bit quant) and Qwen 3.6 (35B-A3B, 4-bit quant).
  Models are from Unsloth. Using MoE architectures for better local performance.
- **Inference Server**: [llama.cpp](https://github.com/ggml-org/llama.cpp)
- **Development Harness**: [Opencode](https://opencode.ai/)

{{< note >}} This repository contains `AGENTS.md` files in respective
directories to provide context to local agents. `CLAUDE.md` files are also
present as entry points to these agent instructions.{{</ note >}}

### Technical Observations

- **Model Specialization**: Gemma 4 proved highly effective for high-level
  planning and long-form technical documentation, though it occasionally
  demonstrated overconfidence in coding tasks by bypassing necessary context
  gathering. Qwen 3.6 showed superior consistency in executing specific
  implementations and following well-defined technical specifications.
- **Context Management**: Maintaining a high-fidelity context window was
  critical. Success relied on aggressive context compaction (both manual and
  automatic) and ensuring task granularity was kept to small, contained steps.
- **Human-in-the-Loop**: The most efficient workflow involved a hybrid approach:
  manual implementation of complex logic followed by agent-driven review and
  polishing phases.

I cannot confidently say that, this agentic setup accelerated the development of
this repo. However, it most certainly allowed me to tackle this project on the
side lines while focusing on my daily tasks.

## Performance Validation

The results of this architecture are best seen in the build metrics. Even with
the overhead of compiling multiple TypeScript packages and running the Hugo
engine, the entire pipeline remains incredibly fast.

```
❯ npx nx build site

> nx run @iboutsikas/router:build

> nx run @iboutsikas/router:build

vite v8.0.10 building client environment for production...
✓ 22 modules transformed.
computing gzip size...
packages/router/dist/router.js  26.34 kB │ gzip: 8.28 kB

✓ built in 60ms

> nx run @iboutsikas/coverpage:build

> nx run @iboutsikas/coverpage:build

vite v8.0.10 building client environment for production...
✓ 256 modules transformed.
computing gzip size...
packages/coverpage/dist/coverpage.js  82.24 kB │ gzip: 22.15 kB

✓ built in 81ms

> nx run @iboutsikas/site:build

> hugo

Start building sites …
hugo v0.160.1+extended+withdeploy linux/amd64 BuildDate=2026-04-08T14:02:42Z VendorInfo=Homebrew


                  │ EN
──────────────────┼────
 Pages            │ 38
 Paginator pages  │  0
 Non-page files   │ 61
 Static files     │  5
 Processed images │  0
 Aliases          │  0
 Cleaned          │  0

Total in 353 ms

————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

 NX   Successfully ran target build for project @iboutsikas/site and 2 tasks it depends on (3s)
```

{{< figcaption >}}Building the entire monorepo from a clean state{{< /figcaption >}}
