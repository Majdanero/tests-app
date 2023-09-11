import {Request, Response} from "express";
import {
    ERouterFactoryResultStatus,
    IRouterFactoryResultError,
    IRouterFactoryResultSuccess
} from "../../types/IRouterFactory";

export class ResponseHandler {
    public static async Handler(req: Request, res: Response, callback: (req: Request) => any) {
        try {
            const result = await callback(req);
            ResponseHandler.SendSuccess(res, result)
        }
        catch (error) {
            ResponseHandler.SendError(res, error)
        }
    }
    public static SendSuccess(response: Response, result: any) : void {
        const resultData: IRouterFactoryResultSuccess = {
            time: Date.now(),
            status: ERouterFactoryResultStatus.Success,
            result
        }
        response.json(resultData);
    }
    public static SendError(response: Response, error: any | Error) : void {
        if(error instanceof Error) error = error.message;
        const result: IRouterFactoryResultError = {
            time: Date.now(),
            status: ERouterFactoryResultStatus.Error,
            error
        }
        response.status(500).json(result);
    }
}