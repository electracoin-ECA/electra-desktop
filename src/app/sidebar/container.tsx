import * as React from 'react'

export default class Sidebar extends React.Component<any, any> {
  render() {
    return (
      <div className="c-sidebar">
          <div className="c-sidebar__nav">
              <nav className="c-nav">
                  <div className="c-nav__title">Navigation</div>
                  <ul className="c-nav__items">
                      <li>Overview</li>
                      <li>Payments</li>
                      <li className="active">Transactions</li>
                      <li>Address book</li>
                  </ul>
              </nav>
          </div>
      </div>
    )
  }
}
