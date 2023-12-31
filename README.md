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

## [Day 4](https://adventofcode.com/2023/day/4)


`deno run --allow-read day-4/part-1.ts`
`deno run --allow-read day-4/part-2.ts`

Way easier than day 3, but this puzzle is pretty cute. Glad that I found the trick to compute card copies in O(1), without duplicating them!

## [Day 5](https://adventofcode.com/2023/day/5)

`deno run --allow-read day-5/part-1.ts`
`deno run --allow-read day-5/part-2.ts`

Part 1 was pretty easy, but part 2 was harsh...as the input turns out to be ranges, so you have to do some logic with ranges to map the numbers within them around. To make sure I was doing it right, *I wrote tests* for two essential functions that deal with operations on ranges of integers (intersection and difference), which you can run with `deno test`. Whew...