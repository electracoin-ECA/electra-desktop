import * as numeral from 'numeral'
import * as React from 'react'

const ONE_THOUSAND = 1_000
const ONE_MILLION = 1_000_000
const ONE_CENT = 0.01
const ONE_MILLI_CENT = 0.000_01

interface ComponentProps {
  confirmedBalance: number
  currencyName: 'BTC' | 'ECA' | 'USD'
  unconfirmedBalance: number
}

interface ComponentState {
  confirmedBalance: string
  currencyPrefix: 'm' | 'μ' | undefined
  unconfirmedBalance: string
}

function formatPrice(price: number): string {
  const formattedPrice: string = numeral(price).format(price < ONE_THOUSAND ? '0,0.00000' : '0,0.00a')

  return (price !== 0 && price < ONE_MILLI_CENT) || formattedPrice === 'NaN' ? '~0.00' : formattedPrice.toUpperCase()
}

function formatPriceFiat(price: number): string {
  const formattedPrice: string = numeral(price).format('0,0.00a').toUpperCase()

  return (price !== 0 && price < ONE_CENT) || formattedPrice === 'NaN' ? '~0.00' : formattedPrice
}

export default class CardView extends React.PureComponent<ComponentProps, ComponentState> {
  public static getDerivedStateFromProps({
    confirmedBalance,
    currencyName,
    unconfirmedBalance,
  }: ComponentProps): ComponentState {
    if (currencyName === 'USD') {
      return {
        confirmedBalance: formatPriceFiat(confirmedBalance),
        currencyPrefix: undefined,
        unconfirmedBalance: formatPriceFiat(unconfirmedBalance),
      }
    }

    const priceMin: number = Math.max(confirmedBalance, unconfirmedBalance)

    switch (true) {
      case priceMin === 0 || priceMin >= ONE_CENT:
        return {
          confirmedBalance: formatPrice(confirmedBalance),
          currencyPrefix: undefined,
          unconfirmedBalance: formatPrice(unconfirmedBalance),
        }

      case priceMin >= ONE_MILLI_CENT:
        return {
          confirmedBalance: formatPrice(confirmedBalance * ONE_THOUSAND),
          currencyPrefix: 'm',
          unconfirmedBalance: formatPrice(unconfirmedBalance * ONE_THOUSAND),
        }

      default:
        return {
          confirmedBalance: formatPrice(confirmedBalance * ONE_MILLION),
          currencyPrefix: 'μ',
          unconfirmedBalance: formatPrice(unconfirmedBalance * ONE_MILLION),
        }
    }
  }

  public render(): any {
    return (
      <div className='c-grid__item'>
        <div className='c-card'>
          <div className='c-card__content text-center'>
            <div className='block text-3xl font-extra-bold'>
              {this.state.confirmedBalance}
            </div>
            <div className='text-grey'>
              {this.state.unconfirmedBalance}
            </div>
            <div className='block text-lg text-purple font-semi-bold'>
              {this.state.currencyPrefix}{this.props.currencyName}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
