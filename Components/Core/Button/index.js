import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './style.scss'

const Button = ({ type, label, icon = '', ...rest }) => (
  <div className={style.react__core__button}>
    <button type={type} className={classNames({ primary: true, [type]: !!type })} {...rest}>
      <span className={`fa ${icon}`} />
      {type === 'menu' ? '' : label}
    </button>
  </div>
)

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string
}

Button.defaultProps = {
  type: 'primary'
}

export { Button }
