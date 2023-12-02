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

// Fiter the games to onlya have a list of the possiple ones according to the puzzle
const possibleGames = games.filter(
	(game) =>
		Math.max(...game.red) <= 12 &&
		Math.max(...game.green) <= 13 &&
		Math.max(...game.blue) <= 14
);

// Add up the IDs of the possible games
const sum = possibleGames.reduce((sum, game) => sum + game.id, 0);

console.timeEnd("Runtime");
console.log("The response is: " + sum);
