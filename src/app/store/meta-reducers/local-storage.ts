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
  return localStorageSync({
    keys: [{ configuration: ['current'] }],
    rehydrate: true,
    mergeReducer: (state: any, rehydratedState: any) => {
      let urlSku: string | null = null;
      try {
        urlSku = new URL(window.location.href).searchParams.get('skuId');
      } catch {}
      const persistedSku: string | null =
        rehydratedState?.configuration?.current?.skuId ?? null;
      if (urlSku && persistedSku && urlSku !== persistedSku) {
        return { ...state, configuration: state?.configuration ?? undefined };
      }
      const next = { ...state };
      if (rehydratedState?.configuration?.current) {
        next.configuration = {
          ...(state?.configuration ?? {}),
          current: rehydratedState.configuration.current,
        };
      }

      return next;
    },
    storage: window.localStorage,
  })(reducer);
}

// Register meta-reducers:
// - This array will be passed into provideStore to enable persistence.
export const metaReducers: MetaReducer[] = [localStorageSyncReducer];
