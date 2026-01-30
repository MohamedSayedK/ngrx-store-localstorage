// The shape of our signup form state in the store.
// Keep this small and serializable because it will be persisted to localStorage.
export interface SignupState {
  name: string;
  email: string;
  password: string; // For learning only; do NOT persist passwords in real apps.
  newsletter: boolean;
}

// Initial values the form starts with when there is no persisted state.
export const initialSignupState: SignupState = {
  name: '',
  email: '',
  password: '',
  newsletter: false,
};
