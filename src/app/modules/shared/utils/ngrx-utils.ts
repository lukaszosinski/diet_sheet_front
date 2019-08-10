import { createAction, props } from '@ngrx/store';
import { ApiError } from '../../../api/models/api-error.model';

export class NgrxUtils {
  static readonly createApiErrorAction = (type: string) => createAction(type, props<ApiError>());
}
