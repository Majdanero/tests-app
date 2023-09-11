import {EventBus} from "~/helpers/EventBus";

export interface INotificationOptions {
    time?: number
    icon?: string
    callback? : () => any
    id? : any
}
export enum EToastType {
    Success = 0,
    Warn = 1,
    Error = 2,
}
export class Toast {
    public message : string | Error = '';
    public callback : any = null;
    public time : number = 0;
    public id : number = 0;
    public type : EToastType | undefined;
    public static Success(message : string, options : INotificationOptions = {}) { return new Toast().Success(message, options) }
    public Success(message : string, options : INotificationOptions = {}) {
        this.message = message;
        this.time = options.time || 3000;
        this.callback = options.callback;
        this.type = EToastType.Success
        this.Show()
    }
    public static Warn(message : string, options : INotificationOptions = {}) { return new Toast().Warn(message, options) }
    public Warn(message : string, options : INotificationOptions = {}) {
        this.message = message;
        this.time = options.time || 10000;
        this.callback = options.callback;
        this.type = EToastType.Warn
        this.Show()
    }
    public static Error(message : any, options : INotificationOptions = {}) { return new Toast().Error(message, options) }
    public Error(message : string, options : INotificationOptions = {}) {
        this.message = message;
        this.id = options.id;
        this.time = options.time || 10000;
        this.callback = options.callback;
        this.type = EToastType.Error
        this.Show()
    }
    private Show() {
        // if(this.message.constructor === TypeError) this.message = 'Internal Client Error';
        // if(this.message instanceof Error) this.message = this.message.message;

        EventBus.Emit('@Client->Toast', {message: `${this.id ? `#${this.id} | ` : ''}${this.message}`, time: this.time, type: this.type, callback: this.callback});
    }

}
