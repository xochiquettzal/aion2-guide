# Delivery report

> Historical report of the initial English delivery. The subsequent Turkish localization and GitHub Pages preparation supersede the language and hosting statements below. Current setup: [README](../README.md) and [Turkish publication instructions](GITHUB-PAGES.md). Earlier performance measurements and screenshots describe the initial delivery, not the updated build.

Delivered 27 October 2026 as a local Next.js project. The application was built, run and exercised in real Chrome browsers. No remote deployment or Git push was performed.

## Completed product

| Module       | Delivered behavior                                                                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Overview     | Persistent class selection, class-specific skill priority, profile-based next actions, patch notes and tool entry points                                                             |
| Classes      | Eight unique class routes; role/variant, early/mid/endgame guidance, rotations, filtered active/passive/Stigma priorities, specialty breakpoints and linked equipment/planner advice |
| Soul Binding | 18 equipment categories; relevant stat shortlists, passive/active class targets, stage-aware keep/reroll advice, bonus-line transfer notes and availability restrictions             |
| Arcana       | Five visual cards, legal class pools, four distinct lines per card, set selection/effects, planned base skill totals and separate local saves per class                              |
| Genus        | Five named boards, all nine slots, board/class-dependent targets, accuracy context, level controls, saved locks and qualitative roll advice                                          |
| Progression  | Eight GS stages, ten requested guidance dimensions, editable profile, contextual upgrade queue and persisted class checklists                                                        |
| Library      | Fourteen substantive system guides with search, category filters and empty state                                                                                                     |
| Sources      | 21 records with URLs/document references, region, patch, checked date, confidence, corrections and unresolved conflicts                                                              |
| Interface    | Responsive navigation, global search, keyboard shortcut, breadcrumbs, native labelled controls, focus states, reduced motion and error/loading handling                              |

Shared English messages and stable content identifiers provide an initial localization seam. Turkish content is not translated and no language toggle is shown. PvP recommendations are not enabled.

## Research coverage and limits

Read the entire extracted reference document, inventoried 90 images and inspected relevant image tables; compared official Global patch notes and eight community class guides. The official October 21 patch is verified. Other mechanics are carefully attributed community evidence, not independent game-client extraction.

The following remain deliberately incomplete rather than fabricated:

- Full current item-by-item BiS and independently measured per-class damage rankings.
- Complete four-line optimal Arcana combinations: the builder provides legal, priority-aware starting points and marks unverified rankings.
- Exhaustive current stat pools and exact roll rarities for every equipment/Genus slot.
- Genus cost/probability estimates and Arcana EXP-transfer formulas where sources conflict.
- Complete perk-by-perk, support-variant and encounter-specific optimization.
- Direct verification of the entire Ludra announcement body; it remains upcoming content based on the located official title and a cross-referenced update index.

The app explicitly distinguishes Global from KR, rarity from DPS, board leveling from reroll optimization, and Item Level from Combat Power. It calculates no unsupported GS gain or DPS score.

## Tools actually used

- **Documents workflow:** local DOCX XML/hyperlink/image extraction and visual inspection. The reference is excluded from the public app.
- **Web research:** official NC pages and the source registry’s community references. Official patch content was read in a rendered browser when the web reader could not expose it.
- **Context7 MCP:** Next.js App Router/static routes, React client persistence and Tailwind 4 PostCSS documentation.
- **Figma MCP discovery:** available but two accounts required a choice before creating a file. The choice remained unanswered. No file was created; design was implemented in code under the brief’s fallback.
- **Playwright MCP:** opened the running app, selected a class, navigated to Arcana, edited a card, inspected local storage, resized the viewport and captured desktop/mobile images.
- **Local Playwright Test:** repeatable production browser suite across all 16 content routes and representative interactions.
- **Chrome DevTools MCP:** console, network, DOM/timing inspection and a recorded Arcana performance trace.

## Validation

- Production build: passed on Next.js 16.4.2, including prerendering all content routes and the favicon.
- TypeScript: passed.
- ESLint: passed with no warnings.
- Unit/data tests: **7 passed**. Cover 8 classes/40 card combinations, invalid/duplicate skills, 45 Genus slot views, milestone boundaries, advisor behavior, source references and malformed saved data.
- Browser tests: **7 passed**. Cover class/route switching, skill filters, Soul Binding search/advice, Arcana validity and persistence, Genus lock gating and persistence, progression inputs/checklists, library/source filters, mobile navigation, all-route loading and overflow.
- Tested route layouts at **1440px and 390px**; no document-level horizontal overflow. The card deck and large tables intentionally have internal scrolling.
- Final representative Chrome DevTools inspection: no console warnings/errors; all 30 observed Arcana/navigation asset requests returned HTTP 200.
- Local unthrottled Arcana trace: **LCP 134 ms; CLS 0.00**. This is one local laboratory observation, not a public-host performance guarantee or field measurement.
- Dependency installation audit after the final dependency change: **0 reported vulnerabilities**.

Corrections made during QA include stale Soul Binding inputs after a class switch, equipment search deep links on the same route, malformed saved Arcana pools, deterministic English number formatting, missing favicon, and Windows static-export prefetch failures. The production configuration now uses the standard Next.js server. Browser tests target visible controls because streamed/retained framework markup can temporarily contain hidden copies.

The older framework version used briefly to diagnose the native compiler was replaced. The delivered version and lockfile are the patched, tested 16.4.2 installation.

## Handoff

Run `npm ci`, then `npm run dev` for editing, or `npm run build` and `npm run start` for production preview. See the README for Vercel deployment and browser test setup. Local preview servers are stopped after QA; no background service is installed.

Screenshots in `reports/` document the implemented layout. The source registry and `docs/RESEARCH.md` explain how to maintain the content without treating this dated snapshot as automatically current.
