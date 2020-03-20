import IPromiseResult from './IPromiseResult'
import IPromise from './IPromise'
import PromiseResultType from './PromiseResultType';
import RequestAction from './RequestAction';

enum CallbackType {
        OnSuccess,
        OnError,
        OnFinish
    }

interface Pair<TKey, TValue> {
    key: TKey;
    value: TValue;
}

export class Promise<TResult, TErrors> implements IPromise<TResult, TErrors> {
    constructor(func: (onSuccess: (param: TResult) => void, onError: (param: TErrors) => void, storedPromise: ((param: RequestAction<TResult, TErrors>) => void) | null) => void) {
        this._callbacks = [];
        
        func((data) => this.runSuccess(data), (data) => this.runError(data), (requestAction) => { requestAction.addSubsequentPromise(this)});
    }

    private _func: any;

    private _callbacks: Pair<CallbackType, (result?: any) => void>[];

    private _isFinished: boolean = false;

    private _result: IPromiseResult<TResult, TErrors> | null = null;

    private runSuccess(data: TResult) {
        this._isFinished = true;
        this._result = { type: PromiseResultType.Success, result: data };

        this._callbacks.forEach((pair) => {
            if (pair.key === CallbackType.OnSuccess || pair.key === CallbackType.OnFinish) {
                pair.value(data);
            }
        });
    }

    private runError(data: TErrors) {
        this._isFinished = true;
        this._result = { type: PromiseResultType.Error, errors: data };

        this._callbacks.forEach((pair) => {
            if (pair.key === CallbackType.OnError || pair.key === CallbackType.OnFinish) {
                pair.value(data);
            }
        });
    }

    public isFinished(): boolean {
        return this._isFinished;
    }

    public getResult(): IPromiseResult<TResult, TErrors> | null {
        return this._result;
    }

    public onSuccess(callback: (param: TResult) => void): Promise<TResult, TErrors> {
        if(!this._isFinished){
            //console.log("Attempting to assign onSuccess callback to finished Promise");
        }
        this._callbacks.push({key: CallbackType.OnSuccess, value: callback});
        return this;
    }

    public onError(callback: (param: TErrors) => void): Promise<TResult, TErrors> {
        if(!this._isFinished){
            //console.log("Attempting to assign onError callback to finished Promise");
        }

        this._callbacks.push({ key: CallbackType.OnError, value: callback });

        return this;
    }

    public onFinish(callback: () => void): Promise<TResult, TErrors> {
        if(!this._isFinished){
            //console.log("Attempting to assign onFinished callback to finished Promise");
        }
        
        this._callbacks.push({ key: CallbackType.OnFinish, value: callback });

        return this;
    }
}

export default Promise;