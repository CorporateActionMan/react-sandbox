import PromiseResultType from './PromiseResultType';

interface IPromiseResult<TResult, TErrors> {
        type: PromiseResultType,
        result?: TResult,
        errors?: TErrors
}



export default IPromiseResult;