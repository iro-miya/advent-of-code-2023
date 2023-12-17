export interface Range {
	from: number; // Start of the source range
	to: number; // Inclusive end of the source range
}

/**
 * Computes the range of numbers contained in both a and b
 */
export function rangeIntersection(a: Range, b: Range): Range | null {
	// Chechs if the ranges overlap
	if (a.from <= b.to && a.to >= b.from) {
		return {
			from: Math.max(a.from, b.from),
			to: Math.min(a.to, b.to),
		};
	}

	return null;
}

/**
 * Computes the ranges of integers that are in a and not b
 */
export function rangeDifference(a: Range, b: Range): Range[] {
	// If range 'a' is completely outside range 'b'
	if (a.to < b.from || a.from > b.to) {
		// Return a copy of a (no numbers gets taken out)
		return [
			{
				from: a.from,
				to: a.to,
			},
		];
	}

	// If range 'a' is completely inside range 'b'
	if (a.from >= b.from && a.to <= b.to) {
		// Return nothing (every number gets taken out)
		return [];
	}

	const result: Range[] = [];

	// If the start of range 'a' is before range 'b'
	if (a.from < b.from) {
		result.push({
			from: a.from,
			to: Math.min(b.from - 1, a.to),
		});
	}

	// If the end of range 'a' is after range 'b'
	if (a.to > b.to) {
		result.push({
			from: Math.max(b.to + 1, a.from),
			to: a.to,
		});
	}

	return result;
}
