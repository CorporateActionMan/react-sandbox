import RequestActionStatus from "./RequestActionStatus";
import _ from 'lodash';
import Promise from './Promise';

class RequestAction<TResult, TErrors> {
    private _methodType: string;
    private _url: string;
    private _data: any;
    private _status: RequestActionStatus;
    private _subsequentPromises: Array<Promise<TResult, TErrors>>;

    public get methodType(): string {
        return this._methodType;
    }

    public get url(): string {
        return this._url;
    }

    public get data(): any {
        return this._data;
    }

    public get status(): RequestActionStatus {
        return this._status;
    }

    public get subsequentPromises(): Array<Promise<TResult, TErrors>> {
        return this._subsequentPromises;
    }

    constructor(methodType: string, url: string, data?: any){
        this._methodType = methodType;
        this._url = url;
        this._data = data;
        this._status = RequestActionStatus.Initialised;
        this._subsequentPromises = [];
    }

    public setToExecuting() {
        this._status = RequestActionStatus.Executing;
    }

    public setToSucceeded(){
        if(this._status === RequestActionStatus.Executing){
            this._status = RequestActionStatus.Successful
        }
        // throw an error
        console.log("Cannot set a request to Succeeded from: " + this._status);
    }

    public setToFailed(){
        if(this._status === RequestActionStatus.Executing){
            this._status = RequestActionStatus.Failed
        }
        // throw an error 
        console.log("Cannot set a request to Failed from: " + this._status);
    }

    public addSubsequentPromise(promise: Promise<TResult, TErrors>){
        this._subsequentPromises.push(promise);
    }

    public getLastPromise(): Promise<TResult, TErrors> | null{
        if(this.subsequentPromises.length > 1){
            return this._subsequentPromises[this._subsequentPromises.length - 2];
        }

        return null;        
    }

    public equals(other: RequestAction<TResult, TErrors>): boolean{
        return other.url === this._url 
            && other.methodType === this._methodType
            && _.isEqual(other.data, this._data);
    }

    public equalsProperties(methodType: string, url: string, data?: any){
        return url === this._url 
            && methodType === this._methodType
            && _.isEqual(data, this._data);
    }

}

export default RequestAction;