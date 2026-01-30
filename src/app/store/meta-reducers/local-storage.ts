// This file configures ngrx-store-localstorage to persist a slice of NgRx state into
// the browser's localStorage and rehydrate it when the app starts.
//
// Why a meta-reducer?
// - Meta-reducers wrap your reducers and can intercept every action and resulting state.
// - ngrx-store-localstorage plugs in as a meta-reducer to automatically read/write storage
//   without you changing individual reducers.
import { MetaReducer, Action, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

// localStorageSyncReducer:
// - Wraps the root reducer and configures which keys to persist and how to restore them.
export function localStorageSyncReducer<State, A extends Action = Action>(
  reducer: ActionReducer<State, A>
): ActionReducer<State, A> {
  // localStorageSync options explained:
  // - keys: The feature state keys to persist. Here we persist 'signup' feature state.
  //         You can also persist only certain properties:
  //         keys: [{ signup: ['name', 'email', 'newsletter'] }]
  // - rehydrate: When true, the persisted state is merged back into the store at app start.
  // - storage: Which storage to use. window.localStorage persists across sessions.
  return localStorageSync({
    keys: ['signup'],
    rehydrate: true,
    storage: window.localStorage,
  })(reducer);
}

// Register meta-reducers:
// - This array will be passed into provideStore to enable persistence.
export const metaReducers: MetaReducer[] = [localStorageSyncReducer];
