export class EventBus {
    static _list = new Map();
    static _element: any = null;

    static Init() {
        if(!process.server) EventBus._element = document.createComment('my-event-bus')
    }
    static Emit(event: string, detail?: any) {
        if(!EventBus._element) return new Promise((r : any) => r());
        return new Promise(resolve => {
            const callback = ({detail}: any) => {
                EventBus._element.removeEventListener(event + '-result', callback);
                resolve(detail)
            };
            EventBus._element.addEventListener(event + '-result', callback);
            EventBus._element.dispatchEvent( new CustomEvent(event, {detail}) );
        })
    }
    static On(event: string, cb: any, once = false) {
        if(!EventBus._element) return;
        const callback = ({ detail }: any) => {
            if(once) EventBus._element.removeEventListener(event, callback);
            EventBus._element.dispatchEvent( new CustomEvent(event + '-result', {detail: cb(detail)}) );
        };
        if(!once) EventBus._list.set(cb, callback);
        EventBus._element.addEventListener(event, callback);
        return () => EventBus.OnRemove(event, cb);
    }
    static OnRemove(event: string, cb: any) {
        if(!EventBus._element) return;
        const callback = EventBus._list.get(cb);
        if(callback) EventBus._element.removeEventListener(event, callback);
    }
}
