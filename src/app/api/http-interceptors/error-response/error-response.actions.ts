import { createApiErrorAction } from '../../api.actions';

export const unauthorized = createApiErrorAction('[Error response interceptor/API] 401 ERROR');
