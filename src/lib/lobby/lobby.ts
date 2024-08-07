import type { Challenge, ExecutionResult, Lobby, LobbySettings, LobbyState, User, UserId } from '$lib/types';
import { PUBLIC_LOBBY_WS } from '$env/static/public';
import backend from '$lib/backend';

let currentLobby: LobbyService | undefined;

export class LobbyService {
	path: string;
	connection: WebSocket | undefined;
	lobby: Lobby | undefined;
	customEventListeners: Partial<PacketHandlerFromType> = {};

	static async create() {
		currentLobby = new LobbyService('create');
		await currentLobby.start();
		return currentLobby;
	}

	static async join(lobbyId: string) {
		currentLobby = new LobbyService(`join/${lobbyId}`);
		await currentLobby.start();
		return currentLobby;
	}

	static async connect(lobbyId: string) {
		if (!currentLobby) {
			currentLobby = new LobbyService(`connect/${lobbyId}`);
			await currentLobby.start();
		}
		return currentLobby;
	}

	constructor(path: string) {
		this.path = path;
	}

	private async setupConnection() {
		this.connection = new WebSocket(`${PUBLIC_LOBBY_WS}/${this.path}`);
		if (!this.connection) throw new Error('Failed to create WebSocket connection.');

		return new Promise<void>((resolve, reject) => {
			this.connection!.addEventListener('open', () => {
				this.connection!.addEventListener('message', (event) => {
					const packet = JSON.parse(event.data) as PacketIn;
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					this.packetHandlers[packet.type]?.(packet as any);
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					this.customEventListeners[packet.type]?.(packet as any);
					if (packet.type === 'lobby') {
						return resolve();
					}
				});
				this.connection!.addEventListener('error', (event) => {
					console.error('WebSocket error', event);
					return reject(event);
				});
			});

			this.connection!.addEventListener('close', async (event) => {
				reject(event);
			});
		});
	}

	async start() {
		try {
			return await this.setupConnection();
		} catch (event) {
			if (event instanceof CloseEvent && event.code === 4401 && backend.isLoggedIn()) {
				await backend.refreshToken();
				return await this.setupConnection();
			}
			throw event;
		}
	}

	async close() {
		this.connection?.close();
	}

	async sendPacket(packet: PacketOut) {
		if (!this.connection) {
			throw new Error('Connection not available, call start() first.');
		}
		this.connection.send(JSON.stringify(packet));
	}

	async check(packet: PacketOutFromType['check']): Promise<PacketInFromType['checkResult']> {
		await this.sendPacket({ type: 'check', ...packet });
		return await this.waitPacket('checkResult');
	}

	async submit(packet: PacketOutFromType['submit']): Promise<PacketInFromType['submitResult']> {
		await this.sendPacket({ type: 'submit', ...packet });
		return await this.waitPacket('submitResult');
	}

	on<PacketType extends keyof PacketInFromType>(
		event: PacketType,
		listener: (packet: PacketInFromType[PacketType]) => void
	) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(this.customEventListeners as any)[event] = listener;
		return () => delete this.customEventListeners[event];
	}

	getLobby() {
		if (!this.lobby) throw new Error('Lobby not available, call start() first.');
		return this.lobby!;
	}

	getUsersList() {
		return Object.values(this.getLobby().users);
	}

	getGameDurationInMinutes() {
		const lobby = this.getLobby();
		return lobby.settings.gameDuration / 60000000000;
	}

	async waitPacket<PacketType extends keyof PacketInFromType>(type: PacketType): Promise<PacketInFromType[PacketType]> {
		return new Promise<PacketInFromType[PacketType]>((resolve) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(this.packetHandlers as any)[type] = (packet: PacketInFromType[PacketType]) => {
				delete this.packetHandlers[type];
				resolve(packet);
			};
		});
	}

	packetHandlers: Partial<PacketHandlerFromType> = {
		lobby: (packet) => {
			this.lobby = {
				id: packet.id,
				settings: packet.settings,
				owner: packet.owner,
				users: packet.users,
				state: packet.state
			};
			console.log('lobby', this.lobby);
		},
		gameStarted: (packet) => {
			this.getLobby().state = {
				type: 'game',
				startTime: packet.startTime,
				challenge: packet.challenge
			};
			console.log('gameStarted', packet);
		},
		usersUpdate: (packet) => {
			this.getLobby().users = packet.users;
			const state = this.getLobby().state;
			if (state.type === 'preLobby') state.ready = packet.readyUsers;
		},
		lobbyDelete: (packet) => {
			if (packet.deleted) {
				this.lobby = undefined;
				this.close();
			}
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
	gameStarted: {
		challenge: Challenge;
		startTime: number;
	};
	checkResult: {
		result: ExecutionResult[] | null;
		error: string | null;
	};
	submitResult: {
		result: ExecutionResult[] | null;
		error: string | null;
	};
	usersUpdate: {
		users: { [id: UserId]: User };
		readyUsers: UserId[];
	};
	lobbyDelete: {
		deleted: boolean;
	};
};

type PacketOutFromType = {
	start: { start: true };
	check: {
		language: string;
		code: string;
	};
	submit: {
		language: string;
		code: string;
	};
	lock: { lock: boolean };
	delete: { delete: true };
	ready: { ready: boolean };
	kick: { userId: UserId };
};

type PacketIn = { [Type in keyof PacketInFromType]: { type: Type } & PacketInFromType[Type] }[keyof PacketInFromType];

type PacketOut = {
	[Type in keyof PacketOutFromType]: { type: Type } & PacketOutFromType[Type];
}[keyof PacketOutFromType];

type PacketHandlerFromType = {
	[Packet in keyof PacketInFromType]: (packet: PacketInFromType[Packet]) => void;
};
