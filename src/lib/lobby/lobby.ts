import type { Challenge, ExecutionResult, Lobby, LobbySettings, LobbyState, User, UserId } from '$lib/types';
import { PUBLIC_LOBBY_URL } from '$env/static/public';

export class LobbyService {
	path: string;
	connection: WebSocket | undefined;
	lobby: Lobby | undefined;
	customEventListeners: Partial<PacketHandlerFromType> = {};

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
			this.connection = new WebSocket(`ws://${PUBLIC_LOBBY_URL}/${this.path}`);
			this.connection!.addEventListener('open', () => {
				this.connection!.addEventListener('message', (event) => {
					const packet = JSON.parse(event.data) as PacketIn;
					this.packetHandlers[packet.type]?.(packet as any);
					this.customEventListeners[packet.type]?.(packet as any);
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

	async check(packet: PacketOutFromType['check']): Promise<PacketInFromType['checkResult']> {
		await this.sendPacket({ type: 'check', ...packet });
		return await this.waitPacket('checkResult');
	}

	on<PacketType extends keyof PacketInFromType>(event: PacketType, listener: (packet: PacketInFromType[PacketType]) => void) {
		(this.customEventListeners as any)[event] = listener;
		return () => delete this.customEventListeners[event]; 
	}

	getLobby() {
		if (!this.lobby) {
			throw new Error('Lobby not available, call start() first.');
		}
		return this.lobby!;
	}

	async waitPacket<PacketType extends keyof PacketInFromType>(type: PacketType): Promise<PacketInFromType[PacketType]> {
		return new Promise<PacketInFromType[PacketType]>((resolve) => {
			(this.packetHandlers as any)[type] = (packet: PacketInFromType[PacketType]) => {
				delete this.packetHandlers[type]
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
	},
	checkResult: {
		result: ExecutionResult[]
	}
};

type PacketOutFromType = {
	startLobby: { start: true };
	check: {
		language: string;
		code: string
	};
};

type PacketIn = { [Type in keyof PacketInFromType]: { type: Type } & PacketInFromType[Type] }[keyof PacketInFromType];

type PacketOut = {
	[Type in keyof PacketOutFromType]: { type: Type } & PacketOutFromType[Type];
}[keyof PacketOutFromType];

type PacketHandlerFromType = {
	[Packet in keyof PacketInFromType]: (packet: PacketInFromType[Packet]) => void
};