import {Toast} from "~/helpers/Toast";

export class Common {
    public static async Wait(time: number) {
        return new Promise(res => setTimeout(res, time));
    }
    public static Clipboard(text: string = '', msg = 'Copy') {
        const input : any = document.createElement("textarea");
        document.body.appendChild(input);
        input.setAttribute("type", "text");
        input.value = text;
        input.select();
        document.execCommand('copy');
        input.parentNode.removeChild(input);
        Toast.Success(msg)
    }
    public static Random(min = 0, max = 1) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}