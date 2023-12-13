# My solutions to Advent of Code 2023

I am using Deno to run these scripts, you can also run them in Node but you need to compile them to JavaScript first.

## [Day 1](https://adventofcode.com/2023/day/1)

`deno run --allow-read day-1/part-2.ts`

I decided to focus on keeping the code simpler instead of making it more efficient.

Since you need to find the first and last number, you could loop over the string twice, once for the first and once for the last, breaking on match. This would avoid reading the middle, but it would increase the amount of code and the complexity. In my case, I was using regular expressions, so I would need another regular expression to match numbers backwards (since numbers could be written in letters). One loop was simpler.

There is an edge case where letters from one number can count towards another number, like `eightwo` should be 8 2, so I had to work through that.

## [Day 2](https://adventofcode.com/2023/day/2)

`deno run --allow-read day-2/part-1.ts`
`deno run --allow-read day-2/part-2.ts`

Again, I focused on a simpler code over an efficient one. You could do everything in one loop, but I wanted to first parse the data and make use of TypeScript interfaces. This proved useful when part 2 came up as my code only needed minimal changes to work with it. :3

## [Day 3](https://adventofcode.com/2023/day/3)


`deno run --allow-read day-3/part-1.ts`
`deno run --allow-read day-3/part-2.ts`

Cool solution with a bunch of generator functions! Much nicer than a long hellish loop with labels. I was enthusiastically telling the people around me about JavaScript generator functions while working on that.