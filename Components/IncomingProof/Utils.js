import PropTypes from 'prop-types'
import Router from 'next/router'
import { toast } from 'Components/Core/Toast'
import { saveAs } from 'file-saver'

const Utils = ({ children }) =>
  children({
    onDownload: async ({ proof, proofImages, hash, setSaving }) => {
      setSaving(true)

      try {
        var blobProof = await new Blob([JSON.stringify({ proof, proofImages }, null, 2)], { type: 'application/json' })
        saveAs(blobProof, `proof_certificate_${hash}.k14`)
        setSaving(false)
      } catch (e) {
        setSaving(false)
      }
    },
    onSave: async ({
      owner,
      proof,
      hash,
      socketIO,
      ipfs,
      web3,
      deployedContracts,
      setSaving,
      updateUI,
      successMsg,
      successBuyMsg,
      errorMsg
    }) => {
      const { ProofLife = {} } = deployedContracts
      const { address, signedHash } = proof
      const { removeMessage, broadcast } = socketIO
      const { addData } = ipfs

      setSaving(true)
      try {
        const payload = { address, hash: `'${signedHash}'` }
        const ipfsFile = await addData(payload)

        await ProofLife.setProof(ipfsFile[0].path, hash, { from: owner }, (err, res) => {
          if (err) {
            setSaving(false)
            toast.error(errorMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
          }

          if (res) {
            setSaving(false)
            removeMessage(proof)
            broadcast('removeMessage', { type: 'approvedUser', account: owner })
            toast.warning(successMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })

            const href = '/incoming-proof'
            const as = href
            Router.push(href, as, { shallow: true })

            web3.eth.getTransactionReceiptMined(res).then(async () => {
              // Mining is finished
              await updateUI()
              toast.success(successBuyMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
            })
          }
        })
      } catch (e) {
        setSaving(false)
        toast.error(errorMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
      }
    }
  })

Utils.propTypes = {
  children: PropTypes.func
}

export { Utils }
