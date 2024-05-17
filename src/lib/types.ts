import { languages } from './languages';

export type TestCase = {
	input: string;
	output: string;
};

export type TestCaseState =
	| { type: 'success' }
	| { type: 'failure'; cause: 'test'; output: string }
	| { type: 'failure'; cause: 'errors'; errors: string; output: string }
	| { type: 'failure'; cause: 'status'; status: number; output: string; errors: string }
	| { type: 'skipped' }
	| { type: 'none' };

export type Language = (typeof languages)[number];

export type Challenge = {
	id: number;
	owner: User;
	title: string;
	description: string;
	content: string;

	testCases: TestCase[];

	created_at: number;
	updated_at: number;
};

export type User = {
	id: UserId;
	name: string;
	username: string;
	avatar: string;
	email?: string;
	created_at?: number;
};

export type UserStats = {
	id: number;
	name: string;
	stat: string;
	created_at: string;
	updated_at: string;
};

export type UserProfile = {
	id: UserId;
	name: string;
	username: string;
	email: string;
	avatar: string;
	background_img: string;
	bio: string;
	created_at: string;
	updated_at: string;
	stats: UserStats[];
};

export type UserId = number;

export type PlayerStatus = { phase: 'progress' } | { phase: 'done'; score: number };

export type SimpleLobby = {
	id: string;
	owner: User;
	users: number;
	max_players: number;
	state: string;
};

export type Lobby<State extends LobbyState = LobbyState> = {
	id: string;
	settings: LobbySettings;
	owner: User;
	users: { [id: UserId]: User };
	state: State;
	max_players?: number; // TODO: Make this required
};

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
