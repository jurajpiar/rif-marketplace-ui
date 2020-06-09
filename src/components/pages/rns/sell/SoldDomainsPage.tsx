import { Web3Store } from '@rsksmart/rif-ui'
import { createService } from 'api/rif-marketplace-cache/cacheController'
import { fetchSoldDomains, RnsServicePaths } from 'api/rif-marketplace-cache/domainsController'
import { AddressItem, CombinedPriceCell } from 'components/molecules'
import DomainFilters from 'components/organisms/filters/DomainFilters'
import MarketPageTemplate from 'components/templates/MarketPageTemplate'
import { MarketListingTypes } from 'models/Market'
import { SoldDomain } from 'models/marketItems/DomainItem'
import React, { FC, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ROUTES from 'routes'
import { MARKET_ACTIONS } from 'store/Market/marketActions'
import MarketStore, { TxType } from 'store/Market/MarketStore'

const LISTING_TYPE = MarketListingTypes.DOMAINS
const TX_TYPE = TxType.SOLD

const SoldDomainsPage: FC<{}> = () => {
  const {
    state: {
      currentListing,
      exchangeRates: {
        currentFiat,
        crypto,
      },
      filters: {
        domains: domainFilters,
      },
    },
    dispatch,
  } = useContext(MarketStore)
  const {
    state: { account },
  } = useContext(Web3Store)
  const history = useHistory()

  const servicePath = currentListing?.servicePath
  const {
    status: statusFilter,
  } = domainFilters
  /* Initialise */
  useEffect(() => {
    if (statusFilter !== 'sold') {
      dispatch({
        type: MARKET_ACTIONS.TOGGLE_TX_TYPE,
        payload: {
          txType: TxType.SELL,
        },
      })
      history.replace(ROUTES.DOMAINS.SELL)
    }
  }, [statusFilter, dispatch, history])

  useEffect(() => {
    if (account && servicePath && servicePath !== RnsServicePaths.SOLD) {
      dispatch({
        type: MARKET_ACTIONS.TOGGLE_TX_TYPE,
        payload: {
          txType: TxType.SOLD,
        },
      })
    }
  }, [servicePath, account, dispatch])
  useEffect(() => {
    if (!servicePath && account) {
      const serviceAddr = createService(RnsServicePaths.SOLD, dispatch)
      dispatch({
        type: MARKET_ACTIONS.CONNECT_SERVICE,
        payload: {
          servicePath: serviceAddr,
          listingType: LISTING_TYPE,
          txType: TX_TYPE,
        },
      })
    }
  }, [servicePath, account, dispatch])

  useEffect(() => {
    if (account && servicePath === RnsServicePaths.SOLD && domainFilters.status === 'sold') { // TODO: refactor
      fetchSoldDomains(domainFilters)
        .then((items) => dispatch({
          type: MARKET_ACTIONS.SET_ITEMS,
          payload: {
            items,
          },
        }))
    }
  }, [account, servicePath, dispatch, domainFilters])

  if (!currentListing) return null

  const headers = {
    domainName: 'Name',
    buyer: 'Buyer',
    currency: 'Currency',
    sellingPrice: 'Selling price',
    soldDate: 'Selling date',
  }

  const collection = currentListing?.items
    .map((domainItem: SoldDomain) => {
      const {
        id,
        domainName,
        buyer,
        paymentToken,
        price,
        soldDate,
        tokenId,
      } = domainItem
      const currency = crypto[paymentToken]

      const pseudoResolvedName = domainFilters?.name?.$like && `${domainFilters?.name?.$like}.rsk`
      const displayItem = {
        id,
        domainName: domainName || pseudoResolvedName || <AddressItem pretext="Unknown RNS:" value={tokenId} />,
        buyer: <AddressItem value={buyer} />,
        currency: currency.displayName,
        sellingPrice: <CombinedPriceCell
          price={price.toString()}
          priceFiat={(currency.rate * price).toString()}
          currency={currency.displayName}
          currencyFiat={currentFiat.displayName}
          divider=" = "
        />,
        soldDate: soldDate.toLocaleDateString(),
      }

      return displayItem
    })

  return (
    <MarketPageTemplate
      className="Domains"
      filterItems={<DomainFilters />}
      itemCollection={collection}
      headers={headers}
      accountRequired
    />
  )
}

export default SoldDomainsPage
