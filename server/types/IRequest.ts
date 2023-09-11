import {IUser} from "./IUser";

interface IRequestExtend {
    user: IUser
}
declare module 'Express' { interface Request extends IRequestExtend {} }