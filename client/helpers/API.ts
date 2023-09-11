
interface IAPIResponse<T = any> {
    status: number,
    time: number,
    result: T
}
type IAPIMethods = 'GET' | 'POST' | 'PUT' | 'DELETE'
export class API {
    private static async Request(method: IAPIMethods, path: string, options: {body?: any, query?: any}) : Promise<IAPIResponse<any>> {
        const config = useRuntimeConfig()
        // const {token} = useUser();
        const url = config.public.api_path + path;
        const opt: any = {method, headers: {}, credentials: 'include',}
        // if(token.value) opt.headers[config.public.jwt_header] = token.value;
        if(options.body) opt.body = options.body;
        if(options.query) opt.query = options.query;
        return await $fetch<IAPIResponse<string>>(url, opt)
    }
    public static Get<T = any>(path: string, query?: any) : Promise<IAPIResponse<T>> {
        return API.Request('GET', path,{query})
    }
    public static Post<T = any>(path: string, body?: any, query?: any): Promise<IAPIResponse<T>> {
        return API.Request('POST', path,{body, query})
    }
    public static Put<T = any>(path: string, body?: any, query?: any): Promise<IAPIResponse<T>> {
        return API.Request('PUT', path,{body, query})
    }
    public static Delete<T = any>(path: string, body?: any, query?: any): Promise<IAPIResponse<T>> {
        return API.Request('DELETE', path,{body, query})
    }
}