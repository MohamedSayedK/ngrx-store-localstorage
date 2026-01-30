// Selectors read slices of state efficiently and memoize results.
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SignupState } from './signup.models';
import { signupFeatureKey } from './signup.reducer';

// Select the entire signup feature state.
export const selectSignupState = createFeatureSelector<SignupState>(signupFeatureKey);

// Field-level selectors to make component bindings simple and testable.
export const selectName = createSelector(selectSignupState, (s) => s.name);
export const selectEmail = createSelector(selectSignupState, (s) => s.email);
export const selectPassword = createSelector(selectSignupState, (s) => s.password);
export const selectNewsletter = createSelector(selectSignupState, (s) => s.newsletter);
