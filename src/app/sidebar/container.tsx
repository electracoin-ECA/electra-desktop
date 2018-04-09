import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '../libraries/icon'

export default class Sidebar extends React.Component<any, any> {
  public render(): any {
    return (
      <div className='c-sidebar'>
        <div className='c-sidebar__nav'>
          <nav className='c-nav'>
              <div className='c-nav__title'>Accounts</div>
              <ul className='c-nav__items'>
                <li>
                  <NavLink exact to='/'>
                    <Icon name='home' size='xs'></Icon>
                    Overview
                  </NavLink>
                  <li>
                  <NavLink to='/transactions'>
                    <Icon name='exchange-alt' size='xs'></Icon>
                    Transactions
                  </NavLink>
                  {/* <NavLink to='/transactions'>
                    <Icon name='exchange-alt' size='xs'></Icon>
                    Purse
                  </NavLink>
                  <NavLink to='/transactions'>
                    <Icon name='exchange-alt' size='xs'></Icon>
                    Checking Account
                  </NavLink>
                  <NavLink to='/transactions'>
                    <Icon name='exchange-alt' size='xs'></Icon>
                    Savings Account
                  </NavLink> */}
                </li>
                </li>
                <div className='c-nav__title'>Operations</div>
                <li>
                  <NavLink to='/payments'>
                    <Icon name='handshake' size='xs'></Icon>
                    Payments
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink to='/address_book'>
                    <Icon name='address-book' size='xs'></Icon>
                    Address book
                  </NavLink>
                </li> */}
                <div className='c-nav__title'>Options</div>
                <li>
                  <NavLink to='/settings'>
                    <Icon name='cog' size='xs'></Icon>
                    Settings
                  </NavLink>
                </li>
              </ul>
          </nav>
        </div>
      </div>
    )
  }
}
