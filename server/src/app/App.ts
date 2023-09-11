import {Server} from "./Server";
import {Log} from "../common/Log";
import {TestService} from "../services/TestService";

interface User {
    id: number,
    name: string,
    createdAt: number,
    updatedAt: number,
}
export class App {
    private server: Server;
    public constructor() {
        this.server = new Server();
        this.Create();
    }
    public async Create() {
        await this.DataBaseInit();



        await TestService.Example();
        Log.Label('App').Success('Create');
    }

    public async DataBaseInit() {

    }
}