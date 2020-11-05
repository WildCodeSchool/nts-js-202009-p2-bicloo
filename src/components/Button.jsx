import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/Button.module.css';

const Button = ({ className, value, logo, display, handleDisplay }) => (
  <div className={styles.wrapperButton}>
    <img className={styles.logoButton} src={logo} alt="logo button" />
    <button
      type="button"
      className={`${styles.button} ${className}`}
      onClick={() => handleDisplay()}
    >
      {value}
    </button>
  </div>
);

export default Button;

Button.propTypes = {
  value: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  display: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  handleDisplay: PropTypes.func.isRequired,
};
