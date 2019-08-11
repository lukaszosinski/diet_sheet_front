import { NgrxUtils } from '../../../modules/shared/utils/ngrx-utils';

export const unauthorized = NgrxUtils.createApiErrorAction('[Error response interceptor/API] 401 ERROR');
