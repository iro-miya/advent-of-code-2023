import { readFile } from "node:fs/promises";
import { join } from "node:path";

const __dirname = new URL(".", import.meta.url).pathname;
const input = await readFile(join(__dirname, "/input.txt"), "utf-8");

console.time("Runtime");

// Split each line
const lines = input.trim().split(/\n(?:\r)?/g);

// Interfacs for every cube played in a game by color
interface Game {
	id: number;
	red: number[];
	green: number[];
	blue: number[];
}

// Matches the Game 123: part
const GAME_REGEX = () => /^Game (\d+): (.+)$/g;

// Matches the colors and the number befors
const COLOR_REGEX = () => /(\d+) (red|green|blue)/g;

// Loop around the lines to parse them into games
const games: Game[] = lines.map((line) => {
	const [, idStr, colors] = GAME_REGEX().exec(line)!;

	const id = Number.parseInt(idStr, 10);

	// These arrays will contain the values of cubes pulled each time
	let red: number[] = [];
	let green: number[] = [];
	let blue: number[] = [];

	for (const match of colors.matchAll(COLOR_REGEX())) {
		const [, numStr, color] = match;

		const num = Number.parseInt(numStr, 10);

		switch (color) {
			case "red":
				red.push(num);
				break;
			case "green":
				green.push(num);
				break;
			case "blue":
				blue.push(num);
				break;
		}
	}

	return {
		id,
		red,
		green,
		blue,
	};
});

// Calculate the game power of each game
const gamePower = games.map(
	(game) =>
		Math.max(...game.red) * Math.max(...game.green) * Math.max(...game.blue)
);

// Sum all the game power
const sum = gamePower.reduce((sum, power) => sum + power);

console.timeEnd("Runtime");
console.log("The response is: " + sum);
