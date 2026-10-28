import { test } from "node:test";
import assert from "node:assert/strict";
import { classes } from "../src/data/classes";
import { cards, equipment } from "../src/data/equipment";
import { genera, genusSlot } from "../src/data/genus";
import { milestones } from "../src/data/progression";
import { guides } from "../src/data/guides";
import { sourceById } from "../src/data/sources";
import {
  getPool,
  suggestedLines,
  validateCard,
  bindingAdvice,
  getMilestone,
  nextActions,
  defaultProfile,
} from "../src/lib/engine";
import { sanitizeSaved } from "../src/components/store";

test("every class has distinct content and all five complete legal card pools", () => {
  assert.equal(classes.length, 8);
  assert.equal(new Set(classes.map((c) => c.summary)).size, 8);
  for (const c of classes) {
    for (const card of cards) {
      const pool = getPool(c.id, card.type);
      assert.equal(
        pool.length,
        card.type === "chalice"
          ? 22
          : ["bell", "mirror"].includes(card.type)
            ? 5
            : 6,
        `${c.id} ${card.type}`,
      );
      assert.equal(new Set(pool).size, pool.length);
      assert.equal(
        validateCard(c.id, card.type, suggestedLines(c.id, card.type)),
        null,
      );
      assert.equal(suggestedLines(c.id, card.type).length, 4);
    }
    for (const skill of c.skills.filter((s) => s.kind === "Stigma"))
      assert.ok(!getPool(c.id, "chalice").includes(skill.name));
  }
});
test("invalid, duplicate and oversized Arcana line combinations are rejected", () => {
  const pool = getPool("assassin", "parchment");
  assert.ok(validateCard("assassin", "parchment", ["not a skill"]));
  assert.ok(validateCard("assassin", "parchment", [pool[0], pool[0]]));
  assert.ok(validateCard("assassin", "parchment", pool.slice(0, 5)));
  assert.equal(
    validateCard("assassin", "parchment", ["", pool[0], "", ""]),
    null,
  );
});
test("all 45 board slots have targets; class and accuracy context changes priorities", () => {
  for (const g of genera)
    for (let slot = 1; slot <= 9; slot++) {
      const data = genusSlot(g, slot, "gladiator", true);
      assert.ok(data.target && data.why && data.pool.length);
    }
  assert.notEqual(
    genusSlot("Varian", 4, "assassin", true).target,
    genusSlot("Varian", 4, "sorcerer", true).target,
  );
  assert.notEqual(
    genusSlot("Special", 3, "gladiator", true).target,
    genusSlot("Special", 3, "gladiator", false).target,
  );
});
test("progression gates use exact lower bounds and preserve all stage guidance", () => {
  for (const m of milestones) {
    assert.equal(getMilestone(m.min).min, m.min);
    if (m.max) assert.equal(getMilestone(m.max - 1).min, m.min);
    for (const k of [
      "unlock",
      "gear",
      "enhance",
      "daily",
      "weekly",
      "energy",
      "arcana",
      "horizontal",
      "avoid",
    ] as const)
      assert.ok(m[k]);
    assert.ok(m.steps.length >= 3);
  }
  assert.ok(
    nextActions({ ...defaultProfile, gs: 1600, arcana: 2 }, "ranger").some(
      (a) => a.title === "3 boş Arcana yuvasını doldur",
    ),
  );
  assert.deepEqual(
    nextActions({ ...defaultProfile, cp: 99999 }, "ranger"),
    nextActions(defaultProfile, "ranger"),
  );
});
test("binding advisor distinguishes progression and unavailable slots", () => {
  const weapon = equipment.find((s) => s.id === "weapon")!;
  assert.equal(
    bindingAdvice(weapon, weapon.stats[0], "gladiator", "Başlangıç", false)
      .status,
    "Şimdilik koru",
  );
  assert.equal(
    bindingAdvice(weapon, weapon.stats[0], "gladiator", "Son aşama", false)
      .status,
    "Koru",
  );
  assert.equal(
    bindingAdvice(weapon, "Other", "gladiator", "Son aşama", false).status,
    "İncele / yenile",
  );
  for (const slot of equipment.filter((s) => s.availability))
    assert.equal(
      bindingAdvice(slot, "Attack", "gladiator", "Son aşama", false).status,
      "Erişimi kontrol et",
    );
});
test("all source references resolve", () => {
  const ids = [
    ...classes.flatMap((c) => c.evidence.sources),
    ...guides.flatMap((g) => g.evidence.sources),
    ...milestones.flatMap((m) => m.sources),
  ];
  for (const id of ids) assert.ok(sourceById[id], id);
});
test("malformed saves are bounded and impossible card skills cannot return after reload", () => {
  const skill = getPool("gladiator", "bell")[0];
  const result = sanitizeSaved({
    classId: "invalid",
    profile: {
      gs: -50,
      cp: Infinity,
      enhance: 500,
      arcana: 80,
      genus: 0,
      tier: "Mythic",
    },
    arcana: {
      "gladiator:bell": {
        set: "Magic",
        lines: [skill, skill, "Not legal", ""],
      },
      "bad:bell": { set: "Magic", lines: ["bad"] },
    },
    genus: { "gladiator:Special": { level: 3, locks: [1, 1, 3, 4, 9] } },
  });
  assert.equal(result.classId, "gladiator");
  assert.equal(result.profile.gs, 0);
  assert.equal(result.profile.enhance, 25);
  assert.equal(result.profile.arcana, 5);
  assert.equal(result.profile.genus, 1);
  assert.deepEqual(result.arcana["gladiator:bell"].lines, [skill, "", "", ""]);
  assert.equal(result.arcana["bad:bell"], undefined);
  assert.deepEqual(result.genus["gladiator:Special"].locks, [1, 3]);
});
