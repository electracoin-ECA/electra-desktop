import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '../shared/icon'

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
                </li>
                <li>
                  <NavLink to='/purse'>
                    <Icon name='basket' size='xs'></Icon>
                    Purse
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/checking'>
                    <Icon name='briefcase' size='xs'></Icon>
                    Checking Account
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/savings'>
                    <Icon name='book' size='xs'></Icon>
                    Savings Account
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/legacy'>
                    <Icon name='warning' size='xs'></Icon>
                    Legacy Account
                  </NavLink>
                </li>
                <div className='c-nav__title'>Operations</div>
                <li>
                  <NavLink to='/payments'>
                    <Icon name='credit-card' size='xs'></Icon>
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
