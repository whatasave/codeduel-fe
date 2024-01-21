import type { Challenge, Player } from '$lib/types.js';

export async function load({ params }) {
    const matchId = parseInt(params.id);
    const challenge: Challenge = {
        title: 'Add Two Numbers',
        description: `
## Goal
A complex palindrome is a string that is a palindrome when only its alphanumeric characters are considered and the case of the characters is ignored. The task is to determine whether a given string is a complex palindrome.

## Input
A string text made of ASCII characters.
## Output
if the string is a palindrome the program will return complex palindrome and the filtered text separated by a comma and a space. The filtered text will be all lowercase and will have a space between the words.

if the string is not a palindrome the program will return not a complex palindrome.`,
        testCases: [
            { input: "1 2", output: "3" },
            { input: "3 4", output: "7" },
            { input: "5 6", output: "11" },
            { input: "7 8", output: "15" },
            { input: "9 10", output: "19" },
            { input: "11 12", output: "23" },
            { input: "13 14", output: "27" },
            { input: "15 16", output: "31" },
            { input: "17 18", output: "35" },
            { input: "19 20", output: "39" },
            { input: "99\n<(^.^)>", output: `<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>
<(^.^)>` },
        ],
    };
    const players: Player[] = [
        { user: { username: 'user1' }, status: { phase: 'progress' } },
        { user: { username: 'user2' }, status: { phase: 'progress' } },
        { user: { username: 'user3' }, status: { phase: 'progress' } },
        { user: { username: 'user4' }, status: { phase: 'progress' } },
        { user: { username: 'user5' }, status: { phase: 'progress' } },
    ];
    return { challenge, players };
}