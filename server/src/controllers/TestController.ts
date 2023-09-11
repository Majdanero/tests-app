import {Request} from "express";
import {TestService} from "../services/TestService";
import * as fs from "fs";
export class TestController {

    public static async CreateTest(req: Request) : Promise<any> {
        return await TestService.CreateTest(req.body.name);
    }
    public static async CreateQuestion(req: Request) : Promise<any> {
        return await TestService.CreateQuestion(Number(req.params.id), req.body.content, req.body.multiple);
    }
    public static async CreateAnswer(req: Request) : Promise<any> {
        return await TestService.CreateAnswer(Number(req.params.id), req.body.content, req.body.correct);
    }
    public static async EditTest(req: Request) : Promise<any> {
        return await TestService.EditTest(Number(req.params.id), req.body.name);
    }
    public static async EditQuestion(req: Request) : Promise<any> {
        return await TestService.EditQuestion(Number(req.params.id), {content: req.body.content, multiple: req.body.multiple});
    }
    public static async EditAnswer(req: Request) : Promise<any> {
        return await TestService.EditAnswer(Number(req.params.id), {content: req.body.content, correct: req.body.correct});
    }
    public static async DeleteTest(req: Request) : Promise<boolean> {
        return await TestService.DeleteTest(Number(req.params.id));
    }
    public static async DeleteQuestion(req: Request) : Promise<boolean> {
        return await TestService.DeleteQuestion(Number(req.params.id));
    }
    public static async DeleteAnswer(req: Request) : Promise<boolean> {
        return await TestService.DeleteAnswer(Number(req.params.id));
    }
    public static async GetTests(req: Request) : Promise<any> {
        return await TestService.GetTests();
    }
    public static async GetTest(req: Request) : Promise<any> {
        return await TestService.GetTest(Number(req.params.id));
    }

}