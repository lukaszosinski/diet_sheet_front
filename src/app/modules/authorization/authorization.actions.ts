import { createAction, props } from '@ngrx/store';
import { User } from '../../api/models/user.model';


export const sinUp = createAction(
  '[Authorization] Sign up',
  props<{ user: Partial<User> }>()
);

export const sinIn = createAction(
  '[Authorization] Sign in',
  props<{ user: Partial<User> }>()
);

export const sinOut = createAction(
  '[Authorization] Sign out'
);
