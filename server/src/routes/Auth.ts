import {RouterFactory} from "../app/RouterFactory";
import {AuthController} from "../controllers/AuthController";
import {BodyValidator, EConfig} from "../middlewares/BodyValidator";
export default new RouterFactory([
    RouterFactory.Post('/login', AuthController.Login, [BodyValidator({
        username: { type: EConfig.string, min: 3, max:15 },
        password: { type: EConfig.string, min: 3, max:25 },
    })]),
    RouterFactory.Get('/logout', AuthController.Logout),
    RouterFactory.Get('/auth', AuthController.Auth)
]);




