import React from 'react'
import './Layout.scss'
import { use100vh } from 'react-div-100vh'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

function Layout({ children }) {
  const height100vh = use100vh()

  return (
    <React.Fragment>
      <div className="app-layout">
        <div className="outlet-container" style={{ height: `calc(${height100vh ? height100vh + 'px' : '100vh'} - 48px - 48px)` }}>
          <TransitionGroup component={null}>
            <CSSTransition
              key={location.pathname}
              classNames="fade"
              timeout={200}
            >
              {children}
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Layout