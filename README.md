# My solutions to Advent of Code 2023

I am using Deno to run these example, you can also run them in Node but you need to compile them to JavaScript first.

## Day 1

`deno run --allow-read day-1/part-b.ts`

I decided to focus on keeping the code simpler instead of making it more efficient.

Since you need to find the first and last number, you could loop over the string twice, once for the first and once for the last, breaking on match. This would avoid reading the middle, but it would increase the amount of code and the complexity. In my case, I was using regular expressions, so I would need another regular expression to match numbers backwards (since numbers could be written in letters). One loop was simpler.

There is an edge case where letters from one number can count towards another numbers, like `eightwo` should be 8 2, so I had to work through that.
