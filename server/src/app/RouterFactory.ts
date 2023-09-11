import express, {Request, Response, Router} from 'express'
import {ResponseHandler} from "./ResponseHandler";
import {IRouterFactoryParam} from "../../types/IRouterFactory";
export class RouterFactory {
    public readonly router: Router;
    public constructor(routes: Array<IRouterFactoryParam>) {
        this.router = express.Router()
        routes.forEach((route) => {
            if(route.html) {
                this.router[route.method](route.path, async (req: any, res: any) => {

                    res.send(await route.callback(req))
                })
            }
            else this.router[route.method](route.path, ...route.middlewares, async (req: any, res: any) => ResponseHandler.Handler(req, res, route.callback))
        })
    }
    public static Get(path: string, callback: (request: Request) => any, middlewares: Array<any> = [], html = false) : IRouterFactoryParam{
        return {method: 'get', path, callback, middlewares, html}
    }
    public static Post(path: string, callback: (request: Request) => any, middlewares: Array<any> = []) : IRouterFactoryParam {
        return {method: 'post', path, callback, middlewares}
    }
    public static Put(path: string, callback: (request: Request) => any, middlewares: Array<any> = []) : IRouterFactoryParam {
        return {method: 'put', path, callback, middlewares}
    }
    public static Delete(path: string, callback: (request: Request) => any, middlewares: Array<any> = []) : IRouterFactoryParam {
        return {method: 'delete', path, callback, middlewares}
    }
}