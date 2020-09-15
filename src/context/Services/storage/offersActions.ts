import { ContextDispatch } from 'context/storeUtils/interfaces'
import { StorageOffersFilters } from 'models/marketItems/StorageFilters'
import {
  initialState,
  OffersListing,
  StorageOffersState,
} from './OffersContext'

export type OFFERS_ACTION =
  | 'FILTER'
  | 'SET_LISTING'
  | 'REFRESH'
  | 'UPDATE_LIMITS'
  | 'CLEAN_UP'

export type ListingPayload = Pick<OffersListing, 'items'>

export interface RefreshPayload {
  refresh: boolean
}

export type FiltersLimits = Partial<StorageOffersFilters>
export type LimitsPayload = Pick<StorageOffersFilters, 'price' | 'size'>

export type StorageOffersPayload =
  | ListingPayload
  | RefreshPayload
  | LimitsPayload
  | FiltersLimits

export type StorageOffersAction = ContextDispatch<
  OFFERS_ACTION,
  StorageOffersPayload
>

export interface StorageOffersReducer<P extends StorageOffersPayload> {
  (state: StorageOffersState, payload: P): StorageOffersState
}

export type Actions = {
  SET_LISTING: StorageOffersReducer<ListingPayload>
  REFRESH: StorageOffersReducer<RefreshPayload>
  FILTER: StorageOffersReducer<FiltersLimits>
  UPDATE_LIMITS: StorageOffersReducer<LimitsPayload>
  CLEAN_UP: StorageOffersReducer<{}>
}

export const storageOffersActions: Actions = {
  SET_LISTING: (state, payload) => ({
    ...state,
    listing: {
      items: payload.items,
    },
  }),
  REFRESH: (state, { refresh }) => ({
    ...state,
    needsRefresh: refresh,
  }),
  FILTER: (state, payload) => ({
    ...state,
    filters: {
      ...state.filters,
      ...payload,
    },
  }),
  UPDATE_LIMITS: (state, payload) => ({
    ...state,
    limits: {
      ...state.limits,
      ...payload,
    },
  }),
  CLEAN_UP: (_, __) => initialState,
}
