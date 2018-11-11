import React from 'react'
import PropTypes from 'prop-types'
import { NavMenu } from 'Components/NavMenu'
import { Header } from 'Components/Header'

export const Dashboard = ({
  children,
  routerNext,
  language: { getTranslation, selectedLanguage },
  signalHub: { messages },
  proofLifeContract: { scribes }
}) => (
  <div>
    <Header getTranslation={getTranslation} selectedLanguage={selectedLanguage} />

    <div className="contentWrapper">
      <NavMenu
        items={[
          {
            name: getTranslation('navMenu.newProof'),
            icon: require('/static/icons/plus.svg'),
            route: '/',
            selected: routerNext.currentRoute === '/'
          },
          {
            name: getTranslation('navMenu.pastProof'),
            icon: require('/static/icons/calendar.svg'),
            route: '/history',
            selected: routerNext.currentRoute === '/history'
          },
          {
            name: `${getTranslation('navMenu.scribes')} (${scribes.length})`,
            icon: require('/static/icons/explore.svg'),
            route: '/scribes',
            selected: routerNext.currentRoute === '/scribes'
          },
          {
            name: `${getTranslation('navMenu.messages')} (${messages.length})`,
            icon: require('/static/icons/messages.svg'),
            route: '/proof-request',
            selected: routerNext.currentRoute === '/proof-request'
          }
        ]}
      />

      {children}
    </div>
  </div>
)

Dashboard.propTypes = {
  children: PropTypes.node,
  process: PropTypes.object,
  language: PropTypes.object,
  signalHub: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object
}