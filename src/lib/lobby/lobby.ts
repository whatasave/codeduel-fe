import type { Lobby } from "$lib/types";

export class LobbyService {
    path: string;
    connection: WebSocket | undefined;
    lobby: Promise<Lobby> | undefined;

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
        this.connection = new WebSocket(`ws://localhost:8080/${this.path}`);
        this.lobby = new Promise((resolve, reject) => {
            this.connection!.addEventListener('message', (event) => {
                resolve(event.data);
            });
            this.connection!.addEventListener('error', (event) => {
                reject(event);
            });
        });
        return new Promise<void>((resolve, reject) => {
            this.connection!.addEventListener('open', () => {
                this.connection!.addEventListener('message', (event) => {
                    resolve(event.data);
                });
                this.connection!.addEventListener('error', (event) => {
                    reject(event);
                });
                resolve();
            });
            this.connection!.addEventListener('error', (event) => {
                reject(event);
            });
        });
    }

    async getLobby() {
        return await this.lobby!;
    }
}