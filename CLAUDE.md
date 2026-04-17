<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end -->
---

# Repository Overview

Personal website monorepo. Package manager: **npm**. Build system: **Nx 22.6.5**.

## Stack

| Layer | Tech |
|-------|------|
| Nx plugin | `@nx/vite` (inferred targets via `vite.config.ts` detection) |
| Language | TypeScript 5.x, strict mode, `nodenext` modules |
| Component framework | Lit 3.x (web components) |
| Reactive | RxJS 7.x |
| Test runner | Vitest 4.x, jsdom environment |
| Build tool | Vite 8.x |

## Projects

### `@iboutsikas/coverpage` — `packages/coverpage/`

Lit web component: swipeable cover/drawer panel with pointer gesture support.

**Custom element:** `<ib-coverpage>`

**Public API:**
- Properties: `side` (`'left'|'right'|'top'|'bottom'`), `range`, `movementThreshold` (default 10), `speedThreshold` (default 1), `peekSize` (default 0), `animationDuration` (default 300ms)
- CSS custom properties: `--cover-width`, `--cover-height`, `--cover-peek-size`
- Methods: `open()`, `close()`
- Events: `cover-progress`, `scrim-change`, `peek-mode-change`

**Key internals:**
- `GestureController` — RxJS-based pointer event stream → `state$` / `position$` / `gesture$` observables
- `CoverMath` — static helpers: `clamp`, `distanceSq`, `magnitudeSq`
- `observeSize` / `observeWidth` — `ResizeObserver` wrapped as RxJS observables

**Nx targets (inferred by `@nx/vite`):**
| Target | Command | Notes |
|--------|---------|-------|
| `build` | `nx build coverpage` | `tsc` (type declarations) |
| `build:lib` | `vite build --config vite.lib.config.ts` | Bundles ES module to `dist/` |
| `vite:test` | `nx vite:test coverpage` | Vitest, jsdom |
| `dev` | `nx dev coverpage` | Serves `test-page/` on 0.0.0.0 |
| `vite:typecheck` | `nx vite:typecheck coverpage` | `tsc --noEmit` |

**Build output:** `packages/coverpage/dist/` — ES module, `coverpage.js` + `.d.ts`

**Entry point:** `packages/coverpage/src/index.ts` → re-exports from `coverpage.ts`

## Source layout

```
packages/coverpage/
  src/
    coverpage.ts                  # IbCoverpage LitElement
    index.ts                      # public re-export
    controllers/
      gesture-controller.ts       # RxJS pointer→gesture pipeline
      gesture-controller.spec.ts
    types/
      definitions.ts              # Side, CoverConfig, Vec2
      gesture.ts                  # InteractionState, GestureEvent, helpers
    utils/
      cover-math.ts               # CoverMath static utils
      observe.ts                  # ResizeObserver → Observable
  test-page/                      # manual dev harness (not published)
  vite.lib.config.ts              # library bundle config (ES, outDir=dist)
  vitest.config.ts                # jsdom, disableConsoleIntercept
  tsconfig.json                   # nodenext, strict, experimentalDecorators
  package.json                    # name: @iboutsikas/coverpage v0.1.0
```

## Conventions

- All imports use `.js` extension (nodenext module resolution)
- `useDefineForClassFields: false` — required for Lit decorators
- `verbatimModuleSyntax: true` — use `import type` for type-only imports
- Tests co-located with source (`*.spec.ts`)
- No global Nx cloud (`neverConnectToCloud: true`)
- Lit accessor pattern: `@property() accessor foo` (not legacy `get/set`)