import type { Lobby } from "$lib/types";

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
        const service = new LobbyService(`lobby/${lobbyId}`);
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
                    const packet = JSON.parse(event.data);
                    if (packet.type === 'lobby') {
                        this.lobby = packet;
                        resolve();
                    }
                    console.log(packet);
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

    getLobby() {
        if (!this.lobby) {
            throw new Error('Lobby not available, call start() first.');
        }
        return this.lobby!;
    }
}