// The reducer describes how actions transform the signup state.
// - It must be a pure function (no side effects).
import { createReducer, on } from '@ngrx/store';
import { initialSignupState, SignupState } from './signup.models';
import { resetForm, setForm } from './signup.actions';

// Feature key under which this state is stored in the root store.
// - Must match the key used in provideState and meta-reducer 'keys' config.
export const signupFeatureKey = 'signup';

export const signupReducer = createReducer(
  // Initial state when the app starts (or when not rehydrated yet).
  initialSignupState,
  // Merge partial form changes into current state as the user types.
  on(setForm, (state, { changes }): SignupState => ({ ...state, ...changes })),
  // Reset to initial values when the user clears the form.
  on(resetForm, (): SignupState => initialSignupState)
);
