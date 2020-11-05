import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/Checkbox.module.css';

const Checkbox = (props) => {
  const {
    handleChange,
    bikesIsChecked,
    standsIsChecked,
    bankingIsChecked,
  } = props;
  return (
    <section className={styles.allCheckboxes}>
      <div className={styles.checkbox}>
        <label htmlFor="bikes">
          <input
            type="checkbox"
            id="bikes"
            name="bikesIsChecked"
            defaultChecked
            isChecked={bikesIsChecked}
            onChange={handleChange}
          />
          Vélos restants
        </label>
      </div>
      <div className={styles.checkbox}>
        <label htmlFor="stands">
          <input
            type="checkbox"
            id="stands"
            name="standsIsChecked"
            defaultChecked
            isChecked={standsIsChecked}
            onChange={handleChange}
          />
          Places restantes
        </label>
      </div>
      <div className={styles.checkbox}>
        <label htmlFor="banking">
          <input
            type="checkbox"
            id="banking"
            name="bankingIsChecked"
            defaultChecked
            isChecked={bankingIsChecked}
            onChange={handleChange}
          />
          Borne de paiement
        </label>
      </div>
    </section>
  );
};

Checkbox.propTypes = {
  bikesIsChecked: PropTypes.bool.isRequired,
  standsIsChecked: PropTypes.bool.isRequired,
  bankingIsChecked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Checkbox;
