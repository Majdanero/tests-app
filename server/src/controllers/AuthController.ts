import {Request} from "express";
import {AuthService} from "../services/AuthService";

export class AuthController {
    public static Login(req: Request) {
        return AuthService.Login(req.body.username, req.body.password);
    }
    public static Logout(req: Request) {
        return AuthService.Logout(req.headers['authorization']);
    }
    public static async Auth(req: Request) {
        return AuthService.Verify(req.headers['authorization']);
    }
}