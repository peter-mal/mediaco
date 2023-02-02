import React from 'react'

// declare const PCore;


const ConfirmationPage = () => {
  // const getPConnect = props;
  // const pConn = getPConnect();
  // const caseId = pConn.getCaseInfo().getID();


  // const caseId = PCore.caseId
  const caseId = "C-9238"
  return (
    <div className="govuk-width-container" id='content'>
      <main className="govuk-main-wrapper govuk-main-wrapper--l" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-panel govuk-panel--confirmation">
              <h1 className="govuk-panel__title">
                Application complete
              </h1>
              <div className="govuk-panel__body">
                Your reference number
                <br />
                <strong>{caseId}</strong>
              </div>
            </div>

            <p className="govuk-body">We have sent you a confirmation email.</p>

            <h2 className="govuk-heading-m">What happens next</h2>

            <p className="govuk-body">
              We’ve sent your application to Hackney Electoral Register Office.
            </p>
            <p className="govuk-body">
              They will contact you either to confirm your registration, or to ask for more information.
            </p>

            <p className="govuk-body">
              <a href="#" className="govuk-link">What did you think of this service?</a> (takes 30 seconds)
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ConfirmationPage;
