const colors = {
    Reset : "\x1b[0m",
    Bright : "\x1b[1m",
    Dim : "\x1b[2m",
    Underscore : "\x1b[4m",
    Blink : "\x1b[5m",
    Reverse : "\x1b[7m",
    Hidden : "\x1b[8m",
    color: {
        white : "\x1b[37m",
        cyan : "\x1b[36m",
        blue : "\x1b[34m",
        black: "\x1b[30m",
        red : "\x1b[31m",
        green : "\x1b[32m",
        yellow : "\x1b[33m",
        magenta : "\x1b[35m",
    },
    bg: {
        black : "\x1b[40m",
        red : "\x1b[41m",
        green : "\x1b[42m",
        yellow : "\x1b[43m",
        blue : "\x1b[44m",
        megenta : "\x1b[45m",
        cyan : "\x1b[46m",
        white : "\x1b[47m",
    }

}

export class Log {
    private label: string = 'APP'
    private messages: any[] = []
    public Label(l: string) {
        this.label = l;
        return this
    }
    public Success(...m: any[]) {
        this.messages = m;
        this.Show('success');
    }
    public Error(...m: any[]) {
        this.messages = m;
        this.Show('error');
    }
    public Warn(...m: any[]) {
        this.messages = m;
        this.Show('warn');
    }
    public static Label(l: string) {return new Log().Label(l)}
    public static Success(...m: any[]) {return new Log().Success(...m)}
    public static Error(...m: any[]) {return new Log().Error(...m)}
    public static Warn(...m: any[]) {return new Log().Warn(...m)}


    private Show(type: string) {
        let text = '';
        if(type === 'error') text += `${colors.color.red}`
        if(type === 'success') text += `${colors.color.green}`
        if(type === 'warn') text += `${colors.color.yellow}`
        text += `[${type.toUpperCase()}]`

        text += ` ${colors.color.cyan} ${this.label} ->`
        text += ` ${colors.Dim}${colors.color.magenta}${new Date().toLocaleString()}${colors.Reset}`
        text += ` ${colors.color.cyan}>${colors.Reset}`
        console.log(text, ...this.messages);
    }
}