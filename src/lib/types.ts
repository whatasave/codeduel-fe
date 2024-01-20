import type { languages } from "./languages";

export type TestCase = {
    input: string;
    output: string;
};

export type TestCaseState = "success" | "failure" | "none";

export type Language = typeof languages[number];

export type Challenge = {
    title: string;
    description: string;
    testCases: TestCase[];
    allowedLanguages?: Language[];
};

export type Player = {
    user: {
        username: string;
    };
    status: PlayerStatus;
};

export type PlayerStatus = { phase: 'progress' } | { phase: 'done', score: number };