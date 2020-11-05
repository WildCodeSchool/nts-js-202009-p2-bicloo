import React from 'react';
import PropTypes from 'prop-types';

import ListSlider from './ListSlider';
import BikesMap from './BikesMap';
import StationsList from './StationsList';
import styles from '../css/WrapperStation.module.css';

class WrapperStation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
    };
    this.handleDisplay = this.handleDisplay.bind(this);
  }

  handleDisplay() {
    const { display } = this.state;
    this.setState({ display: !display });
  }

  render() {
    const { display } = this.state;
    const {
      stations,
      bikesIsChecked,
      standsIsChecked,
      bankingIsChecked,
    } = this.props;
    return (
      <main>
        <nav className={styles.nav}>
          <button onClick={this.handleDisplay} type="button">
            Map
          </button>
          <button onClick={this.handleDisplay} type="button">
            List
          </button>
        </nav>
        {display ? (
          <BikesMap
            stations={stations}
            bikesIsChecked={bikesIsChecked}
            standsIsChecked={standsIsChecked}
            bankingIsChecked={bankingIsChecked}
          />
        ) : (
          <StationsList
            stations={stations}
            bikesIsChecked={bikesIsChecked}
            standsIsChecked={standsIsChecked}
            bankingIsChecked={bankingIsChecked}
          />
        )}

        <div className={styles.desktop}>
          <BikesMap
            stations={stations}
            bikesIsChecked={bikesIsChecked}
            standsIsChecked={standsIsChecked}
            bankingIsChecked={bankingIsChecked}
          />
          <ListSlider
            stations={stations}
            bikesIsChecked={bikesIsChecked}
            standsIsChecked={standsIsChecked}
            bankingIsChecked={bankingIsChecked}
          />
        </div>
      </main>
    );
  }
}

export default WrapperStation;

WrapperStation.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
  bikesIsChecked: PropTypes.bool.isRequired,
  standsIsChecked: PropTypes.bool.isRequired,
  bankingIsChecked: PropTypes.bool.isRequired,
};
