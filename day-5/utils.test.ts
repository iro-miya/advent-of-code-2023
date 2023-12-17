import { rangeDifference, rangeIntersection, Range } from "./utils.ts";

import { assertEquals } from "https://deno.land/std@0.209.0/assert/mod.ts";

Deno.test("intersection", () => {
	const a = {
		from: 1,
		to: 2,
	}

	const b = {
		from: 0,
		to: 3,
	}

	const c = {
		from: 1,
		to: 4,
	}

	const d = {
		from: 4,
		to: 5,
	}
	const e = {
		from: 4,
		to: 4,
	}

	assertEquals(rangeIntersection(a, b), {
		from: 1,
		to: 2,
	})

	assertEquals(rangeIntersection(b, c), {
		from: 1,
		to: 3,
	});

	assertEquals(rangeIntersection(a, c), {
		from: 1,
		to: 2,
	})

	assertEquals(rangeIntersection(a, d), null);

	assertEquals(rangeIntersection(a, a), a);

	assertEquals(rangeIntersection(b, e), null);

	assertEquals(rangeIntersection(c, e), e);

	assertEquals(rangeIntersection(d, e), e);

	assertEquals(rangeIntersection(e, e), e);
});


Deno.test("difference", () => {
	const a = {
		from: 2,
		to: 3,
	}

	const b = {
		from: 0,
		to: 5,
	}

	const c = {
		from: 2,
		to: 4,
	}

	const d = {
		from: 4,
		to: 5,
	}

	assertEquals(rangeDifference(b, a), [
		{ from: 0, to: 1 },
		{ from: 4, to: 5 },
	])

	assertEquals(rangeDifference(a, b), [])

	assertEquals(rangeDifference(c, a), [
		{ from: 4, to: 4 },
	])

	assertEquals(rangeDifference(a, c), [])

	assertEquals(rangeDifference(a, d), [a])

	assertEquals(rangeDifference(c, d), [
		{ from: 2, to: 3 },
	])

	assertEquals(rangeDifference(d, c), [
		{ from: 5, to: 5 },
	])
});