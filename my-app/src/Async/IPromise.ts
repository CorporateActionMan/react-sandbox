 import IPromiseResult from './IPromiseResult'
 
 interface IPromise<TResult, TErrors> {
    getResult(): IPromiseResult<TResult, TErrors> | null;
    isFinished: () => boolean;
    onSuccess: (callback: (param: TResult) => void) => IPromise<TResult, TErrors>;
    onError: (callback: (param: TErrors) => void) => IPromise<TResult, TErrors>;
    onFinish: (callback: () => void) => IPromise<TResult, TErrors>;
}

export default IPromise;