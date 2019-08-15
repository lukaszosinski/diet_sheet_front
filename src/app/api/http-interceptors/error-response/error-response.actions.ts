import { createApiErrorAction } from '../../../modules/shared/utils/ngrx-utils';

export const unauthorized = createApiErrorAction('[Error response interceptor/API] 401 ERROR');
