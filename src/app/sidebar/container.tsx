import * as React from 'react'
import { NavLink } from 'react-router-dom'
import '../../assets/images/icons/icon-sprite.svg'

export default class Sidebar extends React.Component<any, any> {

  // tslint:disable-next-line:typedef
  render() {
    return (
      <div className='c-sidebar'>
        <div className='c-sidebar__nav'>
          <nav className='c-nav'>
              <div className='c-nav__title'>Navigation</div>
              <ul className='c-nav__items'>
                <li>
                  <NavLink exact to='/'>
                    <svg className='c-icon c-icon--size-xs'>
                      <use xlinkHref='#home' />
                    </svg>
                    Overview
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/payments'>
                    <svg className='c-icon c-icon--size-xs'>
                          <use xlinkHref='#handshake' />
                    </svg>
                    Payments
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/transactions'>
                    <svg className='c-icon c-icon--size-xs'>
                        <use xlinkHref='#exchange-alt' />
                    </svg>
                    Transactions
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/address_book'>
                    <svg className='c-icon c-icon--size-xs'>
                        <use xlinkHref='#address-book' />
                    </svg>
                    Address book
                  </NavLink>
                </li>
              </ul>
          </nav>
        </div>
      </div>
    )
  }
}
