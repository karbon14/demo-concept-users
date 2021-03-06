import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'Components/Core/TextField'
import { FileUploader } from 'Components/FileUploader'
import style from './style.scss'

const Identification = ({ onSubmit, getTranslation, formActions, env, mock }) => {
  return (
    <Formik
      validateOnChange
      validateOnSubmit
      initialValues={{
        id: '',
        idImage: null,
        idImageUrl: '',
        userImage: null,
        userImageUrl: '',
        ...(env.MOCKED ? mock : {})
      }}
      validationSchema={Yup.object().shape({
        id: Yup.string()
          .typeError(getTranslation('proofForm.invalidValue'))
          .required(getTranslation('proofForm.requiredValue')),
        idImage: Yup.string().required(getTranslation('proofForm.requiredValue')),
        userImage: Yup.string().required(getTranslation('proofForm.requiredValue'))
      })}
      onSubmit={(values, api) => onSubmit(values, api)}
    >
      {api => (
        <form className={style.Identification} onSubmit={api.handleSubmit}>
          <div className="form__container">
            <TextField
              type="text"
              name="id"
              label={getTranslation('proofForm.id')}
              placeholder={api.errors.id}
              value={api.values.id}
              onKeyUp={new Function()}
              onChange={api.handleChange}
              onBlur={api.handleBlur}
              data-invalid={api.touched.id && !!api.errors.id}
            />

            <div className="line">
              <div className="item">
                <FileUploader
                  label={getTranslation('proofForm.idImage')}
                  dropLabel={getTranslation('proofForm.idImageDrop')}
                  onUpload={async files => {
                    api.setFieldValue('idImage', files[0])
                    api.setFieldValue('idImageUrl', URL.createObjectURL(files[0]))
                  }}
                  preview={
                    api.values.idImage
                      ? {
                          name: (api.values.idImage && api.values.idImage.name) || api.values.idImageUrl,
                          url: api.values.idImageUrl,
                          onClear: () => {
                            api.setFieldValue('idImage', null)
                            api.setFieldValue('idImageUrl', '')
                          }
                        }
                      : null
                  }
                />
              </div>

              <div className="item">
                <FileUploader
                  label={getTranslation('proofForm.userImage')}
                  dropLabel={getTranslation('proofForm.userImageDrop')}
                  onUpload={async files => {
                    api.setFieldValue('userImage', files[0])
                    api.setFieldValue('userImageUrl', URL.createObjectURL(files[0]))
                  }}
                  preview={
                    api.values.userImage
                      ? {
                          name: (api.values.userImage && api.values.userImage.name) || api.values.userImageUrl,
                          url: api.values.userImageUrl,
                          onClear: () => {
                            api.setFieldValue('userImage', null)
                            api.setFieldValue('userImageUrl', '')
                          }
                        }
                      : null
                  }
                />
              </div>
            </div>
          </div>

          {formActions(api)}
        </form>
      )}
    </Formik>
  )
}

Identification.propTypes = {
  onSubmit: PropTypes.func,
  getTranslation: PropTypes.func,
  formActions: PropTypes.any,
  env: PropTypes.object,
  mock: PropTypes.object
}

Identification.defaultProps = {
  mock: {
    id: '35621341',
    idImage: '/static/icons/plus.svg',
    idImageUrl: '/static/icons/plus.svg',
    userImage: '/static/icons/plus.svg',
    userImageUrl: '/static/icons/plus.svg'
  }
}

export { Identification }
