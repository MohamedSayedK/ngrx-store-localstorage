// Actions describe events that change the store.
// - setForm: partial updates when the user edits form fields
// - resetForm: clear the form back to initial values
import { createAction, props } from '@ngrx/store';
import { SignupState } from './signup.models';

export const setForm = createAction('[Signup] Set Form',props<{ changes: Partial<SignupState> }>());

export const resetForm = createAction('[Signup] Reset Form');
