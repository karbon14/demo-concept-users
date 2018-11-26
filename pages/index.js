import React from 'react'
import 'isomorphic-unfetch'
import PropTypes from 'prop-types'
import { ProofForm } from 'Components/ProofForm'
import { Dashboard } from 'Templates'

const Index = ({
  translations,
  signalHub,
  routerNext,
  proofLifeContract,
  ethereum: { accounts, web3, network },
  proofLifeContract: { scribes },
  env
}) => (
  <Dashboard
    translations={translations}
    signalHub={signalHub}
    proofLifeContract={proofLifeContract}
    routerNext={routerNext}
    network={network}
  >
    <ProofForm
      getTranslation={translations.getTranslation}
      signalHub={signalHub}
      accounts={accounts}
      web3={web3}
      scribes={scribes}
      env={env}
    />
  </Dashboard>
)

Index.propTypes = {
  translations: PropTypes.object,
  signalHub: PropTypes.object,
  ethereum: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object,
  env: PropTypes.object
}

export default Index
