import PropTypes from 'prop-types'
import Router from 'next/router'
import { toast } from 'Components/Core/Toast'

const Utils = ({ children }) =>
  children({
    onReject: async ({ proof, socketIO, accounts, successMsg, errorMsg }) => {
      try {
        const { removeMessage, broadcast } = socketIO
        const address = accounts.addresses[0]
        removeMessage({ ...proof, selectedScribe: null })
        broadcast('removeMessage', { type: 'selectedScribe', account: address })

        const href = '/proof-request'
        const as = href
        Router.push(href, as, { shallow: true })

        toast.info(successMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
      } catch (e) {
        toast.error(errorMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
      }
    },
    onApprove: async ({ proof, proofImages, hash, socketIO, accounts, web3, successMsg, errorMsg }) => {
      const { removeMessage, channel, broadcast } = socketIO
      const address = accounts.addresses[0]

      web3.eth.sign(address, hash, (err, res) => {
        if (err) {
          toast.error(errorMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
        }

        if (res) {
          toast.success(successMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
          removeMessage({ ...proof, selectedScribe: null })
          broadcast('removeMessage', { type: 'selectedScribe', account: address })

          const payload = {
            approvedUser: proof.address,
            proof: {
              message: proof.message,
              address,
              signedHash: res
            },
            proofImages
          }
          broadcast(channel, payload)

          const href = '/proof-request'
          const as = href
          Router.push(href, as, { shallow: true })
        }
      })
    }
  })

Utils.propTypes = {
  children: PropTypes.func
}

export { Utils }
