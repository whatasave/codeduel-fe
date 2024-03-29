import type { languages } from './languages';

export type TestCase = {
	input: string;
	output: string;
};

export type TestCaseState =
	| { type: 'success' }
	| { type: 'failure', cause: 'test', output: string }
	| { type: 'failure', cause: 'errors', errors: string, output: string }
	| { type: 'failure', cause: 'status', status: number, output: string, errors: string }
	| { type: 'skipped' } | { type: 'none' };

export type Language = (typeof languages)[number];

export type Challenge = {
	title: string;
	description: string;
	testCases: TestCase[];
};

export type User = {
	id: UserId;
	username: string;
	avatar: string;
};

export type UserId = number;

export type PlayerStatus = { phase: 'progress' } | { phase: 'done'; score: number };

export type Lobby<State extends LobbyState = LobbyState> = {
    id: string;
    settings: LobbySettings;
    owner: User;
    users: { [id: UserId]: User };
    state: State;
}

export type LobbyStateByType = {
	preLobby: {
		ready: UserId[];
	};
	game: {
		startTime: number;
		challenge: Challenge;
	};
};

export type LobbyState = {
	[Type in keyof LobbyStateByType]: { type: Type } & LobbyStateByType[Type];
}[keyof LobbyStateByType];

export type LobbySettings = {
	maxPlayers: number;
	gameDuration: number;
	allowedLanguages: Language[];
};

export type ExecutionResult = {
	output: string;
	errors: string;
	status: number;
};