import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      handleChange,
      bikesIsChecked,
      standsIsChecked,
      bankingIsChecked,
    } = this.props;
    return (
      <section>
        <div>
          <label htmlFor="bikes">
            <input
              type="checkbox"
              id="bikes"
              name="bikes"
              defaultChecked
              isChecked={bikesIsChecked}
              onChange={handleChange}
            />
            Vélos restants
          </label>
        </div>
        <div>
          <label htmlFor="stands">
            <input
              type="checkbox"
              id="stands"
              name="stands"
              defaultChecked
              isChecked={standsIsChecked}
              onChange={handleChange}
            />
            Places restantes
          </label>
        </div>
        <div>
          <label htmlFor="banking">
            <input
              type="checkbox"
              id="banking"
              name="banking"
              defaultChecked
              isChecked={bankingIsChecked}
              onChange={handleChange}
            />
            Borne de paiement
          </label>
        </div>
      </section>
    );
  }
}

Checkbox.propTypes = {
  bikesIsChecked: PropTypes.bool.isRequired,
  standsIsChecked: PropTypes.bool.isRequired,
  bankingIsChecked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Checkbox;
