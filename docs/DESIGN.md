# Design system

The interface uses deep navy `#0c1016`, charcoal panels `#121820`, borders `#26303b`, restrained gold `#d4b582` and aether teal `#7cbdb5`. Georgia display headings contrast with a system sans-serif reading/UI face. No remote font or asset service is needed.

The desktop shell has a 228px sidebar, sticky search header and persistent class context. At narrow widths the sidebar becomes a dismissible drawer. Dense data tables and the five-card deck scroll within their own regions. Panels, field labels, badges, evidence disclosures, native controls and visible focus rings are shared throughout.

Gold identifies suggested choices; teal identifies saved/contextual states. Evidence labels remain textual rather than relying on color. Motion is subtle and respects reduced-motion preferences. Neutral category symbols and schematic boards avoid pretending to be original game icons or exact game-interface reproductions.

Figma was discovered and its creation skill consulted. Two accounts required an account choice before any file creation; no choice was received during implementation. The design was implemented in code, as the brief permits. No Figma document was created or claimed.

Turkish is the default language for the interface, explanatory content, metadata and planner feedback. Stable game identifiers and original skill/stat/card names remain unchanged. Shared Turkish messages and search normalization live in `src/i18n/`; there is no language toggle.
