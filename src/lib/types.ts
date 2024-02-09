import type { languages } from './languages';

export type TestCase = {
	input: string;
	output: string;
};

export type TestCaseState = 'success' | 'failure' | 'none';

export type Language = (typeof languages)[number];

export type Challenge = {
	title: string;
	description: string;
	testCases: TestCase[];
	allowedLanguages: Language[];
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
    challenge: Challenge;
    owner: User;
    users: { [id: UserId]: User };
    state: State;
}

export type LobbyStateByType = {
	preLobby: {
		ready: UserId[];
	};
	game: {
		players: User[];
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
