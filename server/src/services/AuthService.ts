import md5 from "md5";
import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {IUser} from "../../types/IUser";
import {Config} from "../Config";

const users : IUser[] = [
    {id: 1, username: 'mediaw', password: 'G3wS82rSwGn74mMg'},
]


export class AuthService {

    private static TOKEN_SECRET = Config.jwt_token_secret
    private static cache: any = {};
    private static TokenCacheCheck(token: string) {
        return !!this.cache[md5(token)];
    }
    public static TokenCacheAdd(token: string) {
        this.cache[md5(token)] = true;
        AuthService.TokenCacheSave();
    }
    public static TokenCacheDelete(token: string) {
        if(this.cache[md5(token)]) delete this.cache[md5(token)];
        AuthService.TokenCacheSave();
    }
    private static TokenCacheSave() {

    }

    public static async VerifyMiddleWare(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization']
        if(token == null || !AuthService.TokenCacheCheck(token)) return res.sendStatus(401)
        const user = await AuthService.Verify(token)

        if(!user) return res.sendStatus(403);
        (<any>req).user = user;
        next();

    }
    public static Verify(token: any) : Promise<IUser> | Promise<any> {
        return new Promise(res => {
            jwt.verify(token, AuthService.TOKEN_SECRET, (err: any, user: any) => {
                if (err) return res(<any>null)
                return res({id: user.id, username: user.username})
            })
        })

    }
    public static async Login(username: string, password: string) {
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) throw 403;
        const token = jwt.sign(user, AuthService.TOKEN_SECRET, { expiresIn: '1800s' });
        AuthService.TokenCacheAdd(token);
        return {
            token,
            user: {id: user.id, username: user.username}
        };
    }
    public static Logout(token: any) {
        AuthService.TokenCacheDelete(token);
        return true
    }
}