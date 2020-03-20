 import RequestAction from "./RequestAction";
 import RequestActionStatus from "./RequestActionStatus";
 import RequestActions from "./RequestActions";
 import Promise from "./Promise";
 
 class AjaxWrapper {

    private static instance: AjaxWrapper;
    private _requestActions: RequestActions;

    private constructor(){
        this._requestActions = new RequestActions();
    }

    private static getInstance(): AjaxWrapper {
        if(!AjaxWrapper.instance){
            AjaxWrapper.instance = new AjaxWrapper();
        }
        return AjaxWrapper.instance;
    }

    public static post<TResult, TErrors>(url: string, data: any): Promise<TResult, TErrors>  | null {
        return this.sendRequest<TResult, TErrors>('POST', url, JSON.stringify(data));
    }

    public static put<TResult, TErrors>(url: string, data: any): Promise<TResult, TErrors>  | null {
        return this.sendRequest<TResult, TErrors>('PUT', url, JSON.stringify(data));
    }

    public static delete<TResult, TErrors>(url: string, data: any): Promise<TResult, TErrors>  | null {
        return this.sendRequest<TResult, TErrors>('DELETE', url, JSON.stringify(data));
    }

    public static get<TResult, TErrors>(url: string, data?: any): Promise<TResult, TErrors> | null {
        return this.sendRequest<TResult, TErrors>('GET', url, data);
    }

    private static sendRequest<TResult, TErrors>(methodType: string, url: string, data?: any): Promise<TResult, TErrors> | null {
        const instance = AjaxWrapper.getInstance();
        let result = instance._requestActions.findExecutingRequest(methodType, url, data) as unknown as RequestAction<TResult, TErrors>;
        if(!result){
            result = instance._requestActions.addNewRequest(methodType, url, data);
            return new Promise<any, any>(            
            (onSuccess, onError, storePromise) => {  
                if(storePromise){
                    storePromise(result);
                }
                                const date = new Date();
                const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
                console.log("sending request ..." + url + " : " + methodType + ": " + data)
                setTimeout(() => {
                    const message = "recieved request: "  + time + ": " + url + " : " + methodType + ": " + data
                    const random = Math.floor(Math.random() * 10);
                    if(random % 2 === 0){
                        onSuccess(message);
                    }else{
                        onError(message);
                    }
                    instance._requestActions.removeRequest(result);                                    
                }, 10000);     
            }); 
        }else if(result){
            return new Promise<any, any>(
                (onSuccess, onError, storePromise) => {
                    if(storePromise){
                         storePromise(result);
                    }
                                        if(result){
                        const lastPromise = result.getLastPromise();
                        if(lastPromise){
                            lastPromise.onSuccess(value => onSuccess(value)).onError(value => onError(value));
                        }
                    }
                });
        }

        return null;
         
    }

}

export default AjaxWrapper;