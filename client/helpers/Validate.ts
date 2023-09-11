export class Validate {
    public static Amount(min : any = -Infinity, max : any = Infinity) {
        if([null, undefined, false].includes(<any>min)) min = -Infinity
        if([null, undefined, false].includes(<any>max)) max = Infinity
        return (val: any) => {
            if(!val) return true;
            const v = Number(val);
            return !(!['string', 'number'].includes(typeof val) || isNaN(v) || v < min || v > max);
        }
    }
    public static Length(min : any = -Infinity, max : any = Infinity) {
        if([null, undefined, false].includes(<any>min)) min = -Infinity
        if([null, undefined, false].includes(<any>max)) max = Infinity
        return (val: any) => {
            let v = ['string', 'number'].includes(typeof val) ? (val + '').toString().length : 0;
            return !(v < min || v > max);
        }
    }
    public static Email(email : string) {
        if(!email) return true;
        const re = /^\S+@\S+\.\S+$/;
        return re.test(email) || false
    }
    public static Steamurl(link : string) {
        const re = /steamcommunity.com\/tradeoffer\/new\/\?partner\=.([0-9]*)\&token\=.([a-zA-Z0-9_-]*)/i;
        const m = link.match(re);
        return m !== null ? m.length === 3 : false
    }
    public static URL(link: string) {
        const re = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
        return re.test(link)
    }

}