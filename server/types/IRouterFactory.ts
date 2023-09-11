import {NextFunction, Request} from "express";
export enum ERouterFactoryResultStatus {
    Error,
    Success
}
export interface IRouterFactoryResultSuccess {
    time: number,
    status: ERouterFactoryResultStatus.Success
    result: any,
}
export interface IRouterFactoryResultError {
    time: number,
    status: ERouterFactoryResultStatus.Error
    error: string,
}
export interface IRouterFactoryParam {
    method: 'get' | 'post' | 'put' | 'delete',
    path: string,
    callback: (request: Request) => any
    middlewares: any[]
    html?: boolean
}
