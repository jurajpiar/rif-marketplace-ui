import { ConfirmationsItem } from 'api/rif-marketplace-cache/blockchain/confirmations'
import { ContextDispatcher } from 'context/storeUtils/interfaces'

export type BLOCKCHAIN_ACTION = 'NOOP' | 'SET_CONFIRMATIONS' | 'SET_TX_HASH' | 'CLEAR_CONFIRMATIONS'

export interface AddTxPayload {
    txHash: string
}

export type ConfirmationsPayload = ConfirmationsItem

export type BlockchainPayload = ConfirmationsPayload & AddTxPayload

export type BlockchainAction = ContextDispatcher<BLOCKCHAIN_ACTION, BlockchainPayload>
