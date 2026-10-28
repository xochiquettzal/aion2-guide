# Research record

Snapshot: 2026-10-27. Source registry: `src/data/sources.ts`; public view: `/sources/`.

## Reference document

Read all 1,296 extracted blocks from **Kanon’s Aion 2 Bible.docx**, covering chapters 1–12, hyperlinks and chapter references. The document has no native OOXML tables; relevant tables are embedded images. All 90 media files were inventoried in contact sheets and relevant images inspected at larger size. This is a text-and-image review, not a claim that a Word page renderer was available. Chapter 12 links to NotMeter; its accessible setup shell did not expose usable cached builds.

Used the document for slot-specific Soul Binding shortlists, rarity versus damage distinctions, transfer losses, Sync/Reset/Bind, Arcana structure, skill specialty breakpoints, progression principles, currencies, Daevanion, Pantheon, pets and Genus. Its KR material was kept separate. Image 51 shows an older KR board arrangement and was not used as the Global slot map.

## Evidence hierarchy applied

1. The rendered official October 21 Global patch confirms 2600 Hard Krao Cave/Draupnir, four-minute Frenzy, three revives, Ariel Fragments, and Sorcerer/Chanter fixes.
2. Published client-data tables provide provisional card and board facts; this project did not independently extract the game client.
3. Eight individual Aion2Data class guides provide differentiated skill/build direction. Their October 22 metadata and version distinctions are retained.
4. Kanon and other documented community advice guide resource ordering. These do not become verified DPS rankings merely because multiple pages repeat them.

The official Ludra announcement title was found; November 4 and reported 2800/3000 gates were cross-referenced with the community update index. The whole notice body was not independently verified, so the source remains Community. Ludra rewards are excluded from present farming instructions.

## Arcana pool normalization

Extracted skill names and pool memberships from the public Egor Slutskiy calculator dataset without executing its JavaScript. Compared against RaidRelay’s Global pool reference. Corrections:

| Class     | Card pool | Missing skill restored |
| --------- | --------- | ---------------------- |
| Gladiator | Compass   | Defiance               |
| Sorcerer  | Compass   | Frost                  |
| Assassin  | Mirror    | Defense Break          |
| Chanter   | Mirror    | Impact Hit             |

Each class has 12 active and 10 passive skills. Chalice accepts all 22; Parchment/Compass accept six each, Bell/Mirror five each. Unit tests validate pool sizes, distinctness and suggestions. Stigmas are excluded. Suggested four-line combinations intersect the class priorities with the legal pool, then fill remaining positions from legal alternatives. These fallback lines are explicitly **not a verified four-line BiS ranking**.

## Disagreements retained in the product

- Genus optimization begins at level 9 in Kanon’s route versus 10 in other guides.
- Published Genus cost tables disagree on base, per-slot and lock charges. No cost/expected-attempt calculator is enabled.
- Max Attack versus PvE/Boss Attack, and specialized versus general PvE slot-4 multipliers, depend on assumptions and differ across sources.
- Arcana EXP recovery and same-type feeding bonuses conflict between the reference document and newer Global material.
- KR-only later systems, wing rankings, extra Arcana types and level-25 Stigmas are excluded from Global recommendations.

The slot selectors expose documented relevant options, not a guaranteed exhaustive in-game roll database. The limited Heroic slot-4 ranges are labelled community client tables; all other exact Genus values are withheld.

## Content inventory and update procedure

The app contains eight researched class entries, 18 equipment categories, five Arcana types, 32 class-specific non-Chalice pools (40 class/card combinations including Chalice), 45 board-slot views, eight milestones, 14 system guides and 21 source records. Shared mechanics are intentionally reused; class skills, descriptions, rotation loops and build variants differ.

To update: read the official Global patch first, record its date and scope, compare affected community tables, update typed facts and their source IDs, preserve disagreements, then run data invariants and browser checks. Do not infer Global availability from a KR database or a high item level. Full current item BiS, independently tested rotations, comprehensive specialization choices, calibrated support variants and exact upgrade economics remain research gaps.
