import React from 'react'
import {
  Switch, Route, Redirect,
} from 'react-router-dom'
import ROUTES from 'routes'
import networkConfig from 'config'
import { NotFound } from '..'
import {
  DomainOffersCheckoutPage, DomainOffersPage, DomainsCheckoutPage,
  SellDomainsListPage, DomainListed, DomainPurchased, CancelDomainCheckoutPage, DomainCanceled,
} from './index'
import RnsLandingPage from './RnsLandingPage'

const RnsRoutes = () => {
  const { services } = networkConfig
  const rnsEnabled = services && (services as string[]).includes('rns')

  if (rnsEnabled) {
    return (
      <Switch>
        <Redirect exact from={ROUTES.DOMAINS.BASE} to={ROUTES.DOMAINS.BUY} />
        <Route exact path={ROUTES.DOMAINS.BUY} component={DomainOffersPage} />
        <Route exact path={ROUTES.DOMAINS.CHECKOUT.BUY} component={DomainOffersCheckoutPage} />
        <Route exact path={ROUTES.DOMAINS.DONE.BUY} component={DomainPurchased} />
        <Route exact path={ROUTES.DOMAINS.SELL} component={SellDomainsListPage} />
        <Route exact path={ROUTES.DOMAINS.CHECKOUT.SELL} component={DomainsCheckoutPage} />
        <Route exact path={ROUTES.DOMAINS.DONE.SELL} component={DomainListed} />
        <Route exact path={ROUTES.DOMAINS.CHECKOUT.CANCEL} component={CancelDomainCheckoutPage} />
        <Route exact path={ROUTES.DOMAINS.DONE.CANCEL} component={DomainCanceled} />
        <Route component={NotFound} />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route exact path={ROUTES.DOMAINS.BASE} component={RnsLandingPage} />
      <Redirect from="*" to={ROUTES.DOMAINS.BASE} />
    </Switch>
  )
}

export default RnsRoutes
