import type { Challenge, Lobby, LobbySettings, LobbyState, User, UserId } from '$lib/types';

export class LobbyService {
	path: string;
	connection: WebSocket | undefined;
	lobby: Lobby | undefined;

	static async create() {
		const service = new LobbyService('create');
		await service.start();
		return service;
	}

	static async join(lobbyId: string) {
		const service = new LobbyService(`join/${lobbyId}`);
		await service.start();
		return service;
	}

	static async connect(lobbyId: string) {
		const service = new LobbyService(`connect/${lobbyId}`);
		await service.start();
		return service;
	}

	constructor(path: string) {
		this.path = path;
	}

	async start() {
		return new Promise<void>((resolve, reject) => {
			this.connection = new WebSocket(`ws://localhost:8080/${this.path}`);
			this.connection!.addEventListener('open', () => {
				this.connection!.addEventListener('message', (event) => {
					const packet = JSON.parse(event.data) as PacketIn;
					this.packetHandlers[packet.type](packet);
					if (packet.type === 'lobby') {
						resolve();
					}
				});
				this.connection!.addEventListener('error', (event) => {
					reject(event);
				});
			});
			this.connection!.addEventListener('close', (event) => {
				reject(event);
			});
		});
	}

	async sendPacket(packet: PacketOut) {
		if (!this.connection) {
			throw new Error('Connection not available, call start() first.');
		}
		this.connection.send(JSON.stringify(packet));
	}

	getLobby() {
		if (!this.lobby) {
			throw new Error('Lobby not available, call start() first.');
		}
		return this.lobby!;
	}

	packetHandlers = {
		lobby: (packet: PacketInFromType['lobby']) => {
			this.lobby = {
				id: packet.id,
				settings: packet.settings,
				challenge,
				owner: packet.owner,
				users: packet.users,
				state: packet.state
			};
			console.log('lobby', this.lobby);
		}
	};
}

type PacketInFromType = {
	lobby: {
		id: string;
		settings: LobbySettings;
		owner: User;
		users: { [id: UserId]: User };
		state: LobbyState;
	};
};

type PacketOutFromType = {
	startLobby: { start: true };
};

type PacketIn = { [Type in keyof PacketInFromType]: { type: Type } & PacketInFromType[Type] }[keyof PacketInFromType];

type PacketOut = {
	[Type in keyof PacketOutFromType]: { type: Type } & PacketOutFromType[Type];
}[keyof PacketOutFromType];

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
		{ input: '1 2', output: '3' },
		{ input: '3 4', output: '7' },
		{ input: '5 6', output: '11' },
		{ input: '7 8', output: '15' },
		{ input: '9 10', output: '19' },
		{ input: '11 12', output: '23' },
		{ input: '13 14', output: '27' },
		{ input: '15 16', output: '31' },
		{ input: '17 18', output: '35' },
		{ input: '19 20', output: '39' },
		{ input: '99\n<(^.^)>', output: `<(^.^)>\n`.repeat(99) }
	],
	allowedLanguages: ['cpp', 'java', 'python', 'javascript']
};
