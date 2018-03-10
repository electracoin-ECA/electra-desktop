import * as React from 'react'
import { NavLink } from 'react-router-dom'
import '../../assets/images/icons/icon-sprite.svg'
import { Icon } from '../icon'

export default class Sidebar extends React.Component<any, any> {
  public render(): any {
    return (
      <div className='c-sidebar'>
        <div className='c-sidebar__nav'>
          <nav className='c-nav'>
              <div className='c-nav__title'>Navigation</div>
              <ul className='c-nav__items'>
                <li>
                  <NavLink exact to='/'>
                    <Icon name='home' size='xs'></Icon>
                    Overview
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/payments'>
                    <Icon name='handshake' size='xs'></Icon>
                    Payments
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/transactions'>
                    <Icon name='exchange-alt' size='xs'></Icon>
                    Transactions
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/address_book'>
                    <Icon name='address-book' size='xs'></Icon>
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
