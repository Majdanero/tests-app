import {NextFunction, Response, Request} from "express";
import {ResponseHandler} from "../app/ResponseHandler";
export enum EConfig {
    number,
    string,
    boolean,
    object,
    array

}
export interface IConfigAll {
    required?: boolean,
    default?: any,
}
export interface IConfigNumber extends IConfigAll {
    type: EConfig.number,
    min?: number,
    max?: number
}
export interface IConfigString extends IConfigAll {
    type: EConfig.string,
    min?: number,
    max?: number
    variant?: string[]
}
export interface IConfigBoolean extends IConfigAll {
    type: EConfig.boolean,
}
export interface IConfigObject extends IConfigAll {
    type: EConfig.object,
    config: IConfig,
}
export interface IConfigArray extends IConfigAll {
    type: EConfig.array,
    min?: number,
    max?: number
    config: Array<IConfigElement>
}
export type IConfigElement = IConfigNumber | IConfigString | IConfigObject | IConfigBoolean | IConfigArray
export interface IConfig {
    [key: string]: IConfigElement
}
function Validator(config: IConfig | IConfigElement, data: any) {
    const keys = Object.keys(config)
    const EachCallback = (options: IConfigElement, value: any, key?: any ) => {
        if(value === undefined && options.required !== false) throw new Error(`${key ? `key '${key}'` : 'body'} is required`);
        if(value === undefined && options.default) value = options.default;
        if(options.type === EConfig.string) {

            if(typeof value !== 'string') throw new Error(`key '${key}' has invalid type`)
            if(options.min !== undefined && value.length < options.min) throw new Error(`${key ? `key '${key}'` : 'body'} is to low`)
            if(options.max !== undefined && value.length > options.max) throw new Error(`${key ? `key '${key}'` : 'body'} is to high`)
            if(options.variant && !options.variant.includes(value)) throw new Error(`${key ? `key '${key}'` : 'body'} has invalid value`)
            return true
        }
        if(options.type === EConfig.number) {
            if(typeof value !== 'number') throw new Error(`key '${key}' has invalid type`)
            if(options.min !== undefined && value < options.min) throw new Error(`${key ? `key '${key}'` : 'body'} is to low`)
            if(options.max !== undefined && value > options.max) throw new Error(`${key ? `key '${key}'` : 'body'} is to high`)
            return true
        }
        if(options.type === EConfig.object) {
            if(typeof value !== 'object' && !Array.isArray(value)) throw new Error(`key '${key}' has invalid type`)
            Validator(options.config, value);
            return true
        }
        if(options.type === EConfig.array) {
            if(!Array.isArray(value)) throw new Error(`key '${key}' has invalid type`)
            if(options.min !== undefined && value.length < options.min) throw new Error(`${key ? `key '${key}'` : 'body'} is to low`)
            if(options.max !== undefined && value.length > options.max) throw new Error(`${key ? `key '${key}'` : 'body'} is to high`)
            for (let i = 0; i < value.length; i++) {
                const val = value[i];
                options.config.forEach((opt) => EachCallback(opt, val, i));
            }
            return true
        }
    }
    if(config.type !== undefined) EachCallback(<IConfigElement>config, data)
    else for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const options = config[key];
        EachCallback(<IConfigElement>options, data[key], key)
    }
}

export function BodyValidator(config: IConfig | IConfigElement) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            Validator(config, <any>req.body);
            next();
        }
        catch (e) {
            ResponseHandler.SendError(res, e);
        }
    }
}