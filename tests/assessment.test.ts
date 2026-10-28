import { test } from "node:test";
import assert from "node:assert/strict";
import {
  analyzeCharacter,
  blankAssessment,
  sanitizeAssessment,
} from "../src/lib/assessment";
import { sanitizeSaved } from "../src/components/store";

test("unknown answers do not become missing upgrades", () => {
  const result = analyzeCharacter({ ...blankAssessment, gs: 1800 }, "assassin");
  assert.equal(result.gaps.length, 0);
  assert.equal(result.checks.length, 8);
  assert.equal(result.ready.length, 0);
});
test("known equipment gaps survive partially unknown fields and early Arcana stays deferred", () => {
  const r = analyzeCharacter(
    { ...blankAssessment, gs: 1000, emptySlots: 2, arcana: 0 },
    "ranger",
  );
  assert.equal(r.gaps[0].id, "equipment");
  assert.equal(r.findings.find((f) => f.id === "arcana")?.status, "later");
  assert.ok(!r.next.some((f) => f.id === "arcana"));
});
test("goals reorder actionable gaps; time bounds the session without inventing progress", () => {
  const base = {
    ...blankAssessment,
    gs: 1800,
    skillLevel: 1,
    arcana: 1,
    enhance: 5,
    emptySlots: 0,
    story: "yes" as const,
    accuracy: "no" as const,
  };
  assert.equal(
    analyzeCharacter({ ...base, goal: "damage" }, "assassin").gaps[0].id,
    "skill",
  );
  assert.equal(
    analyzeCharacter({ ...base, goal: "gear" }, "assassin").gaps[0].id,
    "equipment",
  );
  assert.equal(
    analyzeCharacter({ ...base, goal: "survival" }, "assassin").gaps[0].id,
    "accuracy",
  );
  assert.equal(
    analyzeCharacter({ ...base, minutes: 15 }, "assassin").sessionCount,
    1,
  );
});
test("fully checked basics produce maintenance rather than fabricated deficits", () => {
  const r = analyzeCharacter(
    {
      ...blankAssessment,
      gs: 2700,
      story: "yes",
      binding: "yes",
      stigma: "yes",
      accuracy: "yes",
      enhance: 15,
      emptySlots: 0,
      skillLevel: 30,
      arcana: 5,
      genus: 10,
    },
    "assassin",
  );
  assert.equal(r.next.length, 0);
  assert.equal(r.ready.length, 8);
});
test("old saves migrate without pretending the user completed an assessment", () => {
  const legacy = sanitizeSaved({ classId: "assassin", profile: { gs: 2000 } });
  assert.deepEqual(legacy.assessments, {});
  assert.equal(legacy.onboardingDismissed, false);
  const saved = sanitizeSaved({
    assessments: {
      assassin: { ...blankAssessment, gs: 1800, genus: 999 },
      ranger: { ...blankAssessment, gs: 1000 },
    },
  });
  assert.equal(saved.assessments.assassin?.genus, 10);
  assert.equal(saved.assessments.ranger?.gs, 1000);
  assert.equal(sanitizeAssessment({ gs: NaN }), null);
  assert.equal(
    sanitizeAssessment({ gs: 2000, skillLevel: "20" })?.skillLevel,
    null,
  );
});
