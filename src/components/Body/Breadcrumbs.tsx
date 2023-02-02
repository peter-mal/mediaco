import React from 'react'
import './breadcrumbs.scss'

const Breadcrumbs: React.FC = () => (
  <div className="govuk-breadcrumbs govuk-breadcrumbs--collapse-on-mobile">
    <ol className="govuk-breadcrumbs__list">
      <li className="govuk-breadcrumbs__list-item">
        <a className="govuk-breadcrumbs__link" href="#">Home</a>
      </li>
      <li className="govuk-breadcrumbs__list-item">
        <a className="govuk-breadcrumbs__link" href="#">Childcare and parenting</a>
      </li>
      <li className="govuk-breadcrumbs__list-item">
          <a className="govuk-breadcrumbs__link" href="#" >Financial help if you have children</a>
      </li>
      <li className="govuk-breadcrumbs__list-item">
          <a className="govuk-breadcrumbs__link" href="#" >Child Benefit</a>
      </li>
    </ol>
  </div>
)

export default Breadcrumbs;
