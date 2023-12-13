import { readFile } from "node:fs/promises";
import { join } from "node:path";

const __dirname = new URL(".", import.meta.url).pathname;
const input = await readFile(join(__dirname, "/input.txt"), "utf-8");

const CARD_REGEX = /^Card +(\d+): ([\d ]+) \| ([\d ]+)$/;

console.time("Runtime");

interface Card {
	id: number;
	numbers: number[];
	winning: number[];
	copies: number;
}

// Parses every cards
const cards: Card[] = input
	.trim()
	.split(/\n(?:\r)?/g)
	.map((line) => {
		const [, idStr, winningStr, numbersStr] = CARD_REGEX.exec(line)!;

		const id = Number.parseInt(idStr, 10);
		const winning = winningStr
			.split(/ +/g)
			.map((str) => Number.parseInt(str, 10));
		const numbers = numbersStr
			.split(/ +/g)
			.map((str) => Number.parseInt(str, 10));

		return { id, winning, numbers, copies: 1 };
	});

// Computes the number of copies of each card
for (const [i, card] of cards.entries()) {
	let wins = 0;
	const winningSet = new Set(card.winning);

	for (const number of card.numbers) {
		if (winningSet.has(number)) {
			wins++;

			// We can just add the number of copies of this card,
			// instead of looping over the same card multiple times and extending the array
			cards[i + wins].copies += card.copies;
		}
	}
}

const sum = cards.reduce((prev, card) => prev + card.copies, 0);

console.timeEnd("Runtime");
console.log("The response is: " + sum);
