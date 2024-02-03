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
    allowedLanguages: Language[];
};

export type User = {
    id: UserId;
    username: string;
};

export type UserId = number;

export type PlayerStatus = { phase: 'progress' } | { phase: 'done', score: number };

export type Lobby<State extends LobbyState = LobbyState> = {
    settings: LobbySettings;
    challenge: Challenge;
    users: User[];
    state: State;
}

export type LobbyState = PreLobbyState | GameState

export type PreLobbyState = {
    ready: UserId[];
}

export type GameState = {
    players: User[];
}

export type LobbySettings = {
    maxPlayers: number;
    gameDuration: number;
    allowedLanguages: Language[];
}