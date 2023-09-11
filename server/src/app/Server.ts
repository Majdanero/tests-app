import express, { Express, Request, Response } from 'express'
import {Log} from "../common/Log";
import bodyParser from "body-parser";
import cors from 'cors'
import fileUpload from 'express-fileupload'
import path from "path";
import {Config} from "../Config";

export class Server {
    private app: Express;
    public constructor() {
        this.app = express();
        this.app.use(cors({credentials: true, origin: Config.cors}))
        this.app.use(bodyParser.json());
        this.app.use(fileUpload());
        this.app.use('/static', express.static(path.join(__dirname, '../../public')))
        this.MiddleWareLoader('bodyParser');
        this.RouterLoader('Auth', 'Test');
        this.app.listen(Config.port);
        Log.Label('Server').Success('Create on ' + Config.port);

    }
    private MiddleWareLoader(...names: string[]) {
        const middlewares = names.map(name => require('../middlewares/' + name).default);
        this.app.use(...middlewares);
    }
    private RouterLoader(...names: string[]) {
        const routes = names.map(name => require('../routes/' + name).default.router);
        this.app.use(...routes);
    }
}