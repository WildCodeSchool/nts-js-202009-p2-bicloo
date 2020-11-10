import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/PopUpContact.module.css';

import PhoneIcon from '../assets/icons/call.svg';
import EmailIcon from '../assets/icons/email.svg';
import IconLocation from '../assets/icons/locationContact.svg';

const PopupContact = (props) => {
  const { isOpen, handlePopup } = props;
  return (
    <div className={isOpen ? styles.popupBodyOpen : styles.popupBodyClose}>
      <div className={styles.popupContent}>
        <button
          type="button"
          onClick={handlePopup}
          className={styles.closePopup}
        >
          &times;
        </button>
        <h2 className={styles.popupTitle}>Nous contacter</h2>
        <div className={styles.phoneContact}>
          <img
            className={styles.contactIcons}
            src={PhoneIcon}
            alt="icon phone"
          />
          <a href="tel:+33130793344">01 30 79 33 44</a>
        </div>
        <div className={styles.opneningTime}>
          <p>Du lundi au vendredi 9h/17h</p>
          <p>Le samedi et jours fériés 9h/12h</p>
        </div>
        <div className={styles.adressContact}>
          <div className={styles.adress}>
            <img
              className={styles.contactIcons}
              src={EmailIcon}
              alt="icon email"
            />
            <a href="mailto:geobike@gmail.com">geobike@gmail.com</a>
          </div>
          <div className={styles.adress}>
            <img
              className={styles.contactIcons}
              src={IconLocation}
              alt="icon location"
            />
            <p>39 rue Khulman, Nantes 44000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

PopupContact.propTypes = {
  handlePopup: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default PopupContact;
