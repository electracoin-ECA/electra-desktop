import * as React from 'react'
import { NavLink } from 'react-router-dom'

export default class Sidebar extends React.Component<any, any> {

  render() {
    return (
      <div className='c-sidebar'>
          <div className='c-sidebar__nav'>
              <nav className='c-nav'>
                  <div className='c-nav__title'>Navigation</div>
                  <ul className='c-nav__items'>
                    <li><NavLink exact to='/'> Overview</NavLink></li>
                    <li><NavLink to='/payments'>Payments</NavLink></li>
                    <li><NavLink to='/transactions'>Transactions</NavLink></li>
                    <li><NavLink to='/address_book'>Address book</NavLink></li>
                  </ul>
              </nav>
          </div>
      </div>
    )
  }
}
