import RequestAction from './RequestAction';
import RequestActionStatus from './RequestActionStatus';
import Promise from './Promise';

class RequestActions{

    private _actions: Array<RequestAction<any, any>>;

    constructor(){
        this._actions = [];
    }

    public findExecutingRequest(methodType: string, url: string, data?: any): RequestAction<any, any> | null{
        const result = this._actions.find((actionRequest) => actionRequest.equalsProperties(url, methodType, data));
        if(result && result.status === RequestActionStatus.Executing){
            return result;
        }

        return null;
    }

    public addNewRequest(methodType: string, url: string, promise: Promise<any, any>, data?: any): RequestAction<any, any>{
        const requestAction = this.createExecutingActionRequest(methodType, url, promise, data);
        this._actions.push(requestAction);
        return requestAction;
    }

    public removeRequest(result: RequestAction<any, any>): void {
        const index = this._actions.indexOf(result);
        this._actions.splice(index, 1);
    }

    public updateSuccesfulActionRequest(methodType: string, url: string, data?: any){
        const result = this._actions.find((actionRequest) => actionRequest.equalsProperties(url, methodType, data));
        if(result){
            result.setToSucceeded();
        }        
    }

    public updateFailedActionRequest(methodType: string, url: string, data?: any){
        const result = this._actions.find((actionRequest) => actionRequest.equalsProperties(url, methodType, data));
        if(result){
            result.setToFailed();
        }        
    }

    private createExecutingActionRequest(methodType: string, url: string, data?: any, promise?: Promise<any, any>): RequestAction<any, any> {
        const requestAction = new RequestAction<any, any>(url, methodType, data);
        requestAction.setToExecuting();
        return requestAction;
    }
}

export default RequestActions;