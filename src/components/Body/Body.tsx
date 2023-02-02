import React from 'react'
import Header from './Header'
import Footer from './Footer'
import './body.scss'
import Breadcrumbs from './Breadcrumbs'

const Body: React.FC = ({children}) => (
  <>
    <Header />
    <div className="govuk-width-container">
      <Breadcrumbs />
      <main className="govuk-main-wrapper" id="main-content" role="main">
            {children}
      </main>
    </div>
    <Footer />
  </>
)

export default Body;
